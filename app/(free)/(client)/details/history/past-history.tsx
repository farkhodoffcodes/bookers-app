import AppointmentCard from "@/components/(cards)/appointment-card";
import {RootStackParamList} from "@/type/root";
import {NavigationProp, useNavigation, useRoute} from "@react-navigation/native";
import NavigationMenu from "@/components/navigation/navigation-menu";
import tw from "tailwind-react-native-classnames";
import {FlatList, RefreshControl, ScrollView, StatusBar, Text, View} from "react-native";
import React, {useCallback, useEffect, useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {getPastClient} from "@/helpers/api-function/client/client";
import clientStore from "@/helpers/state_managment/client/clientStore";
import {handleRefresh} from "@/constants/refresh";
import {clientIdStore} from "@/constants/storage";

type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, '(free)/(client)/details/history/past-history'>;

const PastHistory = () => {
    const navigation = useNavigation<SettingsScreenNavigationProp>();
    const route = useRoute<any>();
    const {clientID} = route.params;
    const {pastData, setPastData, refreshing, setRefreshing} = clientStore()

    useEffect(() => {
        getPastClient(setPastData, clientID)
    }, []);

    const onRefresh = useCallback(() => {
        handleRefresh(setRefreshing);
    }, [setRefreshing]);

    return (
        <SafeAreaView style={[tw`flex-1`, {backgroundColor: '#21212E'}]}>
            <StatusBar backgroundColor={`#21212E`} barStyle={`light-content`}/>
            <NavigationMenu name={`Прошедшие записи`}/>
            <View style={tw`flex-1`}>
                {pastData ? (
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{paddingHorizontal: 16, paddingVertical: 24, gap: 16}}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                    >
                        <FlatList
                            data={pastData}
                            renderItem={({item}) => (
                                <AppointmentCard
                                    userID={clientID}
                                    data={item}
                                    serviceName={item.serviceName.trim().split(', ')}
                                    isBtn={item.orderStatus === 'WAIT'}
                                    clicks={() => {
                                        navigation.navigate('(free)/(client)/details/history/history-details', {historyData: item})
                                        clientIdStore(clientID)
                                    }}
                                />
                            )}
                        />
                    </ScrollView>
                ) : (
                    <View style={[tw`flex-1 items-center justify-center`]}>
                        <Text style={[tw`text-base font-bold text-white`, {opacity: .7}]}>Информация недоступна</Text>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

export default PastHistory;