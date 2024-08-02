import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  SafeAreaView,
  FlatList,
  Pressable,
} from "react-native";
import { router, useFocusEffect, useNavigation } from "expo-router";
import tw from "tailwind-react-native-classnames";
import NavigationMenu from "@/components/navigation/navigation-menu";
import SwitchWithLabel from "@/components/switchWithLabel/switchWithLabel";
import Buttons from "@/components/(buttons)/button";
import MessageOption from "@/components/messageOption/messageOption";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { getNumbers, putNumbers } from "@/helpers/api-function/numberSittings/numbersetting";
import {
  OnlineBookingSettingsUrgentlyStory,
  OnlineBookingStory,
  OnlineBookingStory2,
  OnlineBookingStory3,
} from "@/helpers/state_managment/onlinBooking/onlineBooking";
import {
  getOnlineBookingAllowClient,
  getOnlineBookingHallWaiting,
  getOnlineBookingRecordDay,
  GetOnlineBookingSettingsUrgently,
  getOnlineBookingUserviceTimeAll,
  getOnlineConfirmationServices,
  onlineBookingAllowClient,
} from "@/helpers/api-function/onlineBooking/onlineBooking";
import { useTranslation } from "react-i18next";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "@/type/root";
import clientStore from "@/helpers/state_managment/client/clientStore";
import { getMasterTariff } from "@/constants/storage";
import { getVipCountS } from "./(booking)/timeSelect";
import { Loading } from "@/components/loading/loading";
import numberSettingStore from "@/helpers/state_managment/numberSetting/numberSetting";

type SettingsScreenNavigationProp = NavigationProp<
  RootStackParamList,
  "(standart)/(onlineBooking)/onlineBooking"
>;

const OnlineBooking = () => {
    const { setNumber } = numberSettingStore();
    const { tariff, setTariff } = clientStore();
  const {
    setUrgentlyt,
    salonId,
    setSalonId,
    setSelectedHour,
    setSelectedMinute,
    selectedHour,
    selectedMinute,
  } = OnlineBookingSettingsUrgentlyStory();
  const { vipCount, setVipCount, setTimeEnabled } = OnlineBookingStory3();
  const { data2, setData2 } = OnlineBookingStory2();
  const { setData, data } = OnlineBookingStory();

  const {
    allowClient,
    setAllowClient,
    isLoading,
    setIsLoading,
  } = OnlineBookingStory();
  const navigation = useNavigation<SettingsScreenNavigationProp>();

  const { t } = useTranslation();

  useFocusEffect(
    useCallback(() => {
      getMasterTariff(setTariff);
      GetOnlineBookingSettingsUrgently(setUrgentlyt);
      getOnlineBookingRecordDay(setSalonId);
      getOnlineConfirmationServices(setData);
      getOnlineBookingHallWaiting(setData2);
      getVipCountS(setVipCount, setTimeEnabled);
      getOnlineBookingUserviceTimeAll(setSelectedHour, setSelectedMinute);
      return () => null;
    }, [])
  );

  const datas = [
    {
      id: "1",
      title: t("record_duration"),
      subtitle: salonId ? `${salonId.day} дня` : t("not_set"),
      IconComponent: (
        <FontAwesome5 name="calendar-alt" size={30} color="#9C0A35" />
      ),
      onPress: () => {
        navigation.navigate("(standart)/(onlineBooking)/(booking)/booking");
      },
      isDisabled: true,
    },
    {
      id: "2",
      title: t("break_between_sessions"),
      subtitle:
      selectedHour === 0 || selectedHour && selectedMinute === 0 || selectedMinute
          ? `${selectedHour} час.  ${selectedMinute} мин.`
          : "Разные перерывы для каждой процедуры",
      IconComponent: <Ionicons name="wine" size={30} color="#9C0A35" />,
      onPress: () => {
        navigation.navigate(
          "(standart)/(onlineBooking)/(booking)/breakBetweenSessions"
        );
      },
      isDisabled: salonId && salonId.day,
    },
    {
      id: "3",
      title: t("record_confirmation"),
      subtitle: data?.allClient
        ? "Подтверждать записи для всех клиентов"
        : data?.newClient
        ? "Подтверждать записи только для новых клиентов"
        : data?.notConfirm
        ? "Не подтверждать записи"
        : "not_set",
      IconComponent: <Feather name="check-circle" size={30} color="#9C0A35" />,
      onPress: () => {
        navigation.navigate(
          "(standart)/(onlineBooking)/(booking)/confirmationRecor"
        );
      },
      isDisabled: selectedHour === 0 || selectedHour && selectedMinute === 0 || selectedMinute,
    },
  ];

  if (tariff && tariff === "STANDARD") {
    datas.push(
      {
        id: "4",
        title: t("request_slot"),
        subtitle:
          data2 && data2.allClient
            ? "для всех клиентов"
            : data2 && data2.regularClient
            ? "для постоянных клиентов"
            : "not_set",
        IconComponent: <Feather name="watch" size={30} color="#9C0A35" />,
        onPress: () => {
          navigation.navigate(
            "(standart)/(onlineBooking)/(booking)/requestWindow"
          );
        },
        isDisabled:
          data?.allClient || data?.newClient || data?.notConfirm ? true : false,
      },
      {
        id: "5",
        title: t("time_for_vip_clients"),
        subtitle: vipCount
          ? `${vipCount.hour} час.  ${vipCount.minute} мин`
          : t("not_set"),
        IconComponent: <FontAwesome name="diamond" size={24} color="#9C0A35" />,
        onPress: () => {
          navigation.navigate(
            "(standart)/(onlineBooking)/(booking)/timeSelect"
          );
        },
        isDisabled: data2?.allClient || data2?.regularClient ? true : false,
      }
    );
  }

  const [isEnabledBtn, setIsEnabledBtn] = useState(allowClient);

  const toggleSwitch = () => {
    const newValue = !isEnabledBtn;
    setIsEnabledBtn(newValue);
    setAllowClient(newValue); // Update the global state
    onlineBookingAllowClient(newValue, setIsLoading);
  };

  const renderItem = ({ item }: { item: any }) => (
    <Pressable
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.8 : !item.isDisabled ? 0.5 : 1,
        },
      ]}
    >
      <MessageOption
        disabled={!item.isDisabled}
        title={item.title}
        subtitle={item.subtitle}
        onPress={item.onPress}
        IconComponent={item.IconComponent}
      />
    </Pressable>
  );
  useEffect(() => {
    getOnlineBookingAllowClient(setAllowClient);
  }, []);

  useEffect(() => {
    setIsEnabledBtn(allowClient);
  }, [allowClient]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <SafeAreaView style={[tw`flex-1 mt-6`, { backgroundColor: "#21212E" }]}>
          <StatusBar backgroundColor={`#21212E`} barStyle={`light-content`} />
          <NavigationMenu name={"Моё расписание"} />
          <View style={[tw`flex-1`, { backgroundColor: "#21212E" }]}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: 16,
                flexGrow: 1,
                justifyContent: "space-between",
                backgroundColor: "#21212E",
              }}
            >
              <View>
                <View style={tw`mb-5`}>
                  <SwitchWithLabel
                    label={"Разрешить запись клиентам"}
                    value={isEnabledBtn}
                    onToggle={toggleSwitch}
                  />
                </View>
                <View style={tw`text-white mb-3`}>
                  <Text style={tw`text-white mb-3`}>
                    {t("configure_app_notifications")}
                  </Text>
                </View>
                <FlatList
                  data={datas}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id}
                />
              </View>
              <View
                style={[tw` content-end mb-5`, { backgroundColor: "#21212E" }]}
              >
                <Buttons
                  title={t("to_home")}
                  onPress={() => {
                    putNumbers(6, () => getNumbers(setNumber));
                    navigation.goBack();
                  }}
                />
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
      )}
    </>
  );
};
export default OnlineBooking;
