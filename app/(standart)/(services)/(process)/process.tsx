import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, TextInput, ScrollView, StatusBar, FlatList, TouchableOpacity, Button, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames';
import NavigationMenu from '@/components/navigation/navigation-menu';
import axios from 'axios';
import { router, useFocusEffect } from 'expo-router';
import { masterAdd_service } from '@/helpers/api';
import ServicesCategory from '@/components/services/servicesCatgegory';
import LocationInput from '@/app/locationInput';
import Buttons from '@/components/(buttons)/button';
import servicesStore from '@/helpers/state_managment/services/servicesStore';
import { getConfig } from '@/app/(tabs)/(master)/main';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Toast from 'react-native-simple-toast';
import clientStore from '@/helpers/state_managment/client/clientStore';
import { getMasterTariff } from '@/constants/storage';
import { AntDesign } from '@expo/vector-icons';

type GenderOption = {
    title: string;
    id: number;
};

const Process: React.FC = () => {
    const [service, setService] = useState<string>('');
    const { setTariff, tariff } = clientStore();
    const [price, setPrice] = useState<string>('');
    const [time, setTime] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [validate, setValidate] = useState<boolean>(false);
    const [selectedGender, setSelectedGender] = useState<GenderOption | null>(null);
    const { childCategoryData, selectedCategory } = servicesStore();
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [imageUri, setImageUri] = useState<string | null>(null);

    const Gender: GenderOption[] = [
        { title: 'Мужская для взрослых', id: 1 },
        { title: 'Женское для взрослых', id: 2 },
        { title: 'Мужская для детей', id: 3 },
        { title: 'Женское для детей', id: 4 }
    ];

    const uslugi = [{ label: 'Услуга', value: service, onPress: setService }];

    useFocusEffect(
        useCallback(() => {
            getMasterTariff(setTariff);
        }, [])
    );

    const postService = async () => {
        try {
            const config = await getConfig();
            const data = {
                categoryId: selectedCategory,
                genderId: selectedGender ? [selectedGender.id] : [],
                name: service,
                price: parseFloat(price),
                description: description,
                attachmentId: tariff && tariff === 'STANDARD' ? 'attachmentId' : null,
                active: true,
                serviceTime: convertTimeToMinutes(time)
            };

            const response = await axios.post(masterAdd_service, data, config ? config : {});

            if (response.data.success) router.push('(standart)/(services)/(myServicesScreen)/MyServicesScreen');
            else Toast.show(response.data.message, Toast.LONG);
        } catch (error) {
            console.error('Error adding service:', error);
        }
    };

    const convertTimeToMinutes = (time: any) => {
        if (typeof time === 'string' && time.includes(':')) {
            const [hours, minutes] = time.split(':').map(Number);
            return hours * 60 + (minutes || 0);
        } else if (!isNaN(time)) {
            return Number(time) * 60;
        } else {
            throw new Error('Invalid time format');
        }
    };
    useEffect(() => {
        if (service.length === 0 || price.length === 0 || time.length === 0 || description.length === 0) {
            setValidate(true);
        } else {
            setValidate(false);
        }
    }, [service, price, time, description]);

    const handleGenderPress = (gender: GenderOption) => {
        setSelectedGender(selectedGender?.id === gender.id ? null : gender);
    };

    const renderChildCategories = ({ item, index }: { item: any; index: number }) => {
        const isLast = index === childCategoryData.length - 1;
        return (
            <Text style={tw`flex flex-row flex-wrap text-black font-bold text-lg`}>
                {item.name}
                {!isLast && ', '}
            </Text>
        );
    };

    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const handleConfirm = (time: Date) => {
        const selectedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setTime(selectedTime);
        hideTimePicker();
    };
    return (
        <SafeAreaView style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
            <StatusBar backgroundColor={`#21212E`} barStyle={`light-content`} />
            <NavigationMenu name={`Процедура услуг`} />
            <View style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingHorizontal: 16,
                        flexGrow: 1,
                        justifyContent: 'space-between',
                        backgroundColor: '#21212E'
                    }}
                >
                    <View style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
                        <View style={[tw`w-full p-4 rounded-3xl mb-4`, { backgroundColor: '#B9B9C9' }]}>
                            <Text style={tw`text-gray-600`}>Ваша специализация</Text>
                            <View style={tw`flex flex-row flex-wrap`}>
                                <FlatList data={childCategoryData} renderItem={renderChildCategories} keyExtractor={(item, index) => index.toString()} />
                            </View>
                        </View>
                        {Gender.map((gender, index) => (
                            <ServicesCategory
                                key={index}
                                title={gender.title}
                                isRadioButton
                                isChecked={selectedGender?.id === gender.id}
                                onPress={() => handleGenderPress(gender)}
                            />
                        ))}
                        <View style={[tw`mt-5 p-2`, { backgroundColor: '#21212E' }]}>
                            {uslugi.map((usluga, index) => (
                                <LocationInput key={index} label={usluga.label} value={usluga.value} onChangeText={usluga.onPress} />
                            ))}
                        </View>
                        <View style={tw`mb-2 p-2`}>
                            <Text style={tw`text-gray-500 mb-3 text-lg`}>Цена</Text>
                            <TextInput
                                keyboardType='numeric'
                                onChangeText={text => setPrice(`${text}`)}
                                value={price}
                                style={[tw` p-3 mb-2 rounded-xl text-lg text-white`,{backgroundColor:'#4B4B64'}]}
                            />
                        </View>
                        <View style={tw`mb-2 p-2`}>
                            <Text style={tw`text-gray-500 mb-3 text-lg`}>Длительность (без учёта перерыва после процедуры)</Text>
                            <TouchableOpacity onPress={showTimePicker}>
                                <TextInput
                                    value={time}
                                style={[tw`bg-gray-500 p-3 mb-2 rounded-xl text-lg text-white` ,{backgroundColor:'#4B4B64'}]}
                                    editable={false}
                                />
                            </TouchableOpacity>
                            <DateTimePickerModal isVisible={isTimePickerVisible} mode='time' onConfirm={handleConfirm} onCancel={hideTimePicker} />
                        </View>
                        <View style={[tw`p-3 mb-2`, { backgroundColor: '#21212E' }]}>
                            <Text style={tw`text-gray-500 text-xl mb-2`}>Описание</Text>
                            <TextInput
                                style={[tw`bg-gray-500 p-2 rounded-xl text-lg text-white`, { height: 100,backgroundColor:'#4B4B64' }]}
                                multiline
                                numberOfLines={2}
                                value={description}
                                onChangeText={text => setDescription(text)}
                                scrollEnabled={true}
                            />
                        </View>
                        {tariff && tariff === 'STANDARD' &&
                        <TouchableOpacity
                        activeOpacity={.9} 
                        >
                           <View style={tw`p-3`}>
                            <Text style={tw`text-gray-500 text-xl mb-2`}>Фото услуги</Text>
                            <View style={[tw`p-4 h-50 border  bg-gray-500 rounded-xl`,{backgroundColor:'#4B4B64'}]}>
                                <View style={tw`flex flex-row justify-center items-center p-6 h-40`}>
                                    <AntDesign name="pluscircleo" size={24} color="black" />
                                    <Text style={tw`ml-2`}>Добавить фото</Text>
                                </View>
                            </View>
                        </View>
                        </TouchableOpacity>
                           
                        }
                    </View>
                    <View style={[tw`mb-3 p-3`, { backgroundColor: '#21212E' }]}>
                        <Buttons title='Сохранить' isDisebled={!validate} onPress={postService} />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default Process;
