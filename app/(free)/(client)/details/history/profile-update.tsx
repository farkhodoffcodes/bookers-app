import {NavigationProp, useNavigation} from "@react-navigation/native";
import {RootStackParamList} from "@/type/root";
import tw from "tailwind-react-native-classnames";
import {RefreshControl, ScrollView, StatusBar, StyleSheet, Text, View} from "react-native";
import React, {useCallback, useEffect, useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import Buttons from "@/components/(buttons)/button";
import LocationInput from "@/components/(location)/locationInput";
import CalendarComponent from "@/components/calendar/calendar";
import {MaterialIcons} from "@expo/vector-icons";
import ProfileImgUpload from "@/components/profile-img-upload";
import financeStore from "@/helpers/state_managment/finance/financeStore";
import clientStore from "@/helpers/state_managment/client/clientStore";
import {
    getClientAll,
    getClientStatistics,
    getDistrictList,
    updateClientData,
} from "@/helpers/api-function/client/client";
import {useForm, Controller} from 'react-hook-form';
import PhoneInput from 'react-native-phone-input';
import Toast from "react-native-simple-toast";
import {handleRefresh} from "@/constants/refresh";
import {SelectList} from "react-native-dropdown-select-list";

type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, '(free)/(client)/details/detail-main'>;

interface FormData {
    phoneNumber: string;
}

const genderData = [
    {key: "true", value: "Male"},
    {key: "false", value: "Female"},
]

const ProfileUpdate = ({clientData}: { clientData: any }) => {
    const navigation = useNavigation<SettingsScreenNavigationProp>();
    const {date} = financeStore()
    const {
        ageData,
        regionData,
        districtData,
        setDistrictData,
        attachmentID,
        isLoading,
        setIsLoading,
        setStatusData,
        setAllClients,
        refreshing,
        setRefreshing
    } = clientStore()
    const {control, formState: {errors}} = useForm<FormData>();
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [regex, setRegex] = useState<boolean>(false);
    const [showHide, setShowHide] = useState<boolean>(false);
    const [navigate, setNavigate] = useState<boolean>(false);
    const [newUpdateClient, setNewUpdateClient] = useState<any>(clientData);
    const [ages, setAges] = useState<any[] | null>(null);
    const [regions, setRegions] = useState<any[] | null>(null);
    const [districts, setDistricts] = useState<any[] | null>(null);

    useEffect(() => {
        setRegex(validateObject(newUpdateClient))
        newUpdateClient.attachmentId = attachmentID ? attachmentID : null
        newUpdateClient.phoneNumber = phoneNumber ? phoneNumber : newUpdateClient.phoneNumber;
        newUpdateClient.birthDate = date ? date : newUpdateClient.birthDate

        if (ageData) {
            const transformedAge = ageData.map(item => ({
                key: item.id,
                value: item.ageRange
            }));
            setAges(transformedAge)
        }

        if (regionData) {
            const transformedRegion = regionData.map(item => ({
                key: item.id,
                value: item.name
            }));
            setRegions(transformedRegion)
        }

        if (districtData) {
            const transformedDistrict = districtData.map(item => ({
                key: item.id,
                value: item.name
            }));
            setDistricts(transformedDistrict)
        }
    }, [newUpdateClient]);

    useEffect(() => {
        newUpdateClient.attachmentId = attachmentID ? attachmentID : null
        newUpdateClient.phoneNumber = phoneNumber ? phoneNumber : newUpdateClient.phoneNumber;
    }, [attachmentID, phoneNumber]);

    useEffect(() => {
        newUpdateClient.districtId = ''
    }, [newUpdateClient.regionId]);

    useEffect(() => {
        isLoading ? setRegex(false) : setRegex(true)
    }, [isLoading]);

    useEffect(() => {
        if (navigate) {
            navigation.navigate('(free)/(client)/main')
            getClientStatistics(setStatusData)
            getClientAll(setAllClients)
            setNavigate(false)
            setRegex(false)
        }
    }, [navigate]);

    const onRefresh = useCallback(() => {
        handleRefresh(setRefreshing);
    }, [setRefreshing]);

    const handleInputChange = (name: string, value: any) => {
        setNewUpdateClient({
            ...newUpdateClient,
            [name]: value
        });
    };

    function validateObject(obj: any) {
        for (let key in obj) {
            if ((
                key !== 'attachmentId' &&
                key !== 'comment' &&
                key !== 'email' &&
                key !== 'specialist' &&
                key !== 'telegram'
            ) && !obj[key]) return false
        }
        return true;
    }

    const handleSubmitChange = (e: any) => {
        if (e.length === 13) setPhoneNumber(e)
        else setPhoneNumber('')
    }

    const toggleShowHide = () => setShowHide(!showHide)

    return (
        <SafeAreaView style={[tw`flex-1`, {backgroundColor: '#21212E'}]}>
            <StatusBar backgroundColor={`#21212E`} barStyle={`light-content`}/>
            <View style={[tw`flex-1`, {transform: 'translateY(-30px)'}]}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{flexGrow: 1, justifyContent: 'space-between'}}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                >
                    <View>
                        <ProfileImgUpload attachmentID={clientData.attachmentId}/>
                        <LocationInput
                            value={newUpdateClient.firstName}
                            label={`Имя`}
                            onChangeText={e => handleInputChange('firstName', e)}
                        />
                        <LocationInput
                            value={newUpdateClient.lastName}
                            label={`Фамилия`}
                            onChangeText={e => handleInputChange('lastName', e)}
                        />
                        <LocationInput
                            value={newUpdateClient.job}
                            label={`Профессия`}
                            onChangeText={e => handleInputChange('job', e)}
                        />
                        <LocationInput
                            value={newUpdateClient.clientPreferences ? newUpdateClient.clientPreferences : ''}
                            label={`Предпочтения клинета`}
                            onChangeText={e => handleInputChange('clientPreferences', e)}
                        />
                        <Text style={[tw`text-gray-500 mb-2 text-base`]}>День рождения</Text>
                        <CalendarComponent defDate={newUpdateClient.birthDate}/>
                        <Text style={[tw`text-gray-500 mb-2 mt-3 text-base`]}>Номер телефона</Text>
                        <Controller
                            name="phoneNumber"
                            control={control}
                            rules={{
                                required: 'Phone number is required',
                                pattern: {
                                    value: /^\+998[0-9]{9}$/,
                                    message: 'Phone number is not valid',
                                },
                            }}
                            render={({field: {value}}) => (
                                <PhoneInput
                                    ref={(ref) => {
                                        this.phone = ref;
                                    }}
                                    initialValue={newUpdateClient.phoneNumber}
                                    initialCountry="uz"
                                    onChangePhoneNumber={handleSubmitChange}
                                    style={styles.phoneInputContainer}
                                    textStyle={styles.textInput}
                                    flagStyle={styles.flagButton}
                                />
                            )}
                        />
                        {errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber.message}</Text>}

                        <View style={tw`mb-5 mt-7 flex-row justify-between items-center`}>
                            <Text style={tw`text-base text-white font-bold`}>
                                Дополнительная информаци о клиенте
                            </Text>
                            <MaterialIcons
                                onPress={() => toggleShowHide()}
                                name="navigate-next"
                                size={30}
                                color="white"
                                style={{transform: showHide ? 'rotate(90deg)' : ''}}
                            />
                        </View>
                        <View style={tw`${showHide ? '' : 'hidden'}`}>
                            <Text style={tw`text-gray-500 mb-2 text-base`}>Пол</Text>
                            <SelectList
                                boxStyles={tw`w-60 z-50 w-full text-white bg-gray-500`}
                                inputStyles={tw`text-white text-lg`}
                                dropdownStyles={styles.dropdown}
                                dropdownTextStyles={tw`text-white text-lg`}
                                setSelected={(e: string) => handleInputChange('gender', e)}
                                data={genderData}
                                save="key"
                                search={false}
                                placeholder="Пол"
                            />
                            <Text style={tw`text-gray-500 mb-2 mt-3 text-base`}>Возраст</Text>
                            <SelectList
                                boxStyles={tw`w-60 z-50 w-full text-white bg-gray-500`}
                                inputStyles={tw`text-white text-lg`}
                                dropdownStyles={styles.dropdown}
                                dropdownTextStyles={tw`text-white text-lg`}
                                setSelected={(e: string) => handleInputChange('ageId', e)}
                                data={ages ? ages : [{key: 'Ma\'lumot yuq', value: ''}]}
                                save='key'
                                search={false}
                                placeholder="Возраст"
                            />
                            <Text style={tw`text-gray-500 mb-2 mt-3 text-base`}>Регион</Text>
                            <SelectList
                                boxStyles={tw`w-60 z-50 w-full text-white bg-gray-500`}
                                inputStyles={tw`text-white text-lg`}
                                dropdownStyles={styles.dropdown}
                                dropdownTextStyles={tw`text-white text-lg`}
                                setSelected={(e: string) => {
                                    handleInputChange('regionId', e)
                                    getDistrictList(setDistrictData, e)
                                }}
                                data={regions ? regions : [{key: '', value: 'Ma\'lumot yuq'}]}
                                save='key'
                                search={false}
                                placeholder="Регион"
                            />
                            <Text style={tw`text-gray-500 mb-2 mt-3 text-base`}>Город</Text>
                            <SelectList
                                boxStyles={tw`w-60 z-50 w-full text-white bg-gray-500`}
                                inputStyles={tw`text-white text-lg`}
                                dropdownStyles={styles.dropdown}
                                dropdownTextStyles={tw`text-white text-lg`}
                                setSelected={(e: string) => handleInputChange('districtId', e)}
                                data={districts ? districts : [{key: '', value: 'Ma\'lumot yuq'}]}
                                save='key'
                                search={false}
                                placeholder="Город"
                            />
                        </View>
                    </View>
                    <View style={tw`mt-5`}>
                        <Buttons
                            title={isLoading ? 'loading...' : `Сохранить`}
                            onPress={() => {
                                if (regex && !isLoading) updateClientData({
                                    firstName: newUpdateClient.firstName,
                                    lastName: newUpdateClient.lastName,
                                    job: newUpdateClient.job,
                                    ageId: newUpdateClient.ageId,
                                    phoneNumber: newUpdateClient.phoneNumber,
                                    gender: newUpdateClient.gender,
                                    birthDate: newUpdateClient.birthDate,
                                    districtId: newUpdateClient.districtId,
                                    regionId: newUpdateClient.regionId,
                                    attachmentId: attachmentID ? attachmentID : null,
                                    clientPreferences: newUpdateClient.clientPreferences
                                }, newUpdateClient.id, setNavigate, setIsLoading)
                                else Toast.show('Ma\'lumotlar yuklanmoqda.....', Toast.LONG)
                            }}
                            isDisebled={regex}
                        />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    phoneInputContainer: {
        width: '100%',
        height: 50,
        backgroundColor: '#6B7280',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    textContainer: {
        backgroundColor: '#6B7280',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        paddingVertical: 0,
        paddingHorizontal: 0,
    },
    textInput: {
        color: 'white',
        fontSize: 16,
        paddingVertical: 0,
        paddingHorizontal: 0,
        margin: 0,
    },
    codeText: {
        color: 'white',
        fontSize: 16,
    },
    flagButton: {
        marginLeft: 8,
    },
    errorText: {
        color: 'red',
    },
    dropdown: {
        zIndex: 1000,
        width: '100%',
        position: 'absolute',
        backgroundColor: '#4b4b63',
        top: 55
    }
});

export default ProfileUpdate;