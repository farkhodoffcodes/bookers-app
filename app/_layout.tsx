import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { MenuProvider } from "react-native-popup-menu";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/components/useColorScheme";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Index from "./index";
import Auth from "./(auth)/auth";
import ChatDetails from "./(chat)/(communicatie)/chatDetails";
import Notification from "./(profile)/(notification)";
import WorkMain from "./(free)/(work-grafic)/workMain";
import MyServices from "./(standart)/(services)/(myServices)/myServices";
import Expenses from "./(profile)/(Expenses)";
import SessionHistory from "./(profile)/(sessionhistory)/sessionHistory";
import ServesGender from "./(standart)/(services)/(gender)/servesGender";
import Category from "./(standart)/(services)/(category)/category";
import Upcomingentries from "./(profile)/(sessionhistory)/components/Upcomingentries/Upcomingentries";
import PastEntries from "./(profile)/(sessionhistory)/components/Pastentries/Pastentries";
import Canceledentries from "./(profile)/(sessionhistory)/components/Canceledentries/Canceledentries";
import SettingsGallery from "./(settings)/(settings-gallery)/settings-gallery";
import Settings from "./(profile)/(settings)/settings";
import { StompProvider } from "@/context/StompContext";
import Expertise from "./(standart)/(services)/(expertise)/expertise";
import ServiceStyle from "./(standart)/(services)/serviceStyle/serviceStyle";
import SettingsGalleryMain from "./(settings)/(settings-gallery)/settings-gallery-main";
import PhoneNumberInput from "./(auth)/(login)/number-create";
import MainClient from "@/app/(free)/(client)/main";
import OtpInput from "./(auth)/(login)/checkSendMessage";
import CreatingClient from "./(free)/(client)/creating-client";
import MainClientList from "./(free)/(client)/client-list";
import AddressBook from "./(free)/(client)/address-book";
import Process from "./(standart)/(services)/(process)/process";
import AuthPage1 from "./(auth)/(register)/(greetings)/greetingFirst";
import AuthPage2 from "./(auth)/(register)/(greetings)/greetingSecond";
import AuthPage3 from "./(auth)/(register)/(greetings)/greetingThird";
import MasterorClient from "./(auth)/(register)/(roleSelection)/masterORclient";
import TariffsPage from "./(profile)/(tariff)/tariff";
import Location from "./(location)/Location";
import LocationData from "./(location)/(location-data)/LocationData";
import ResponseLocation from "./(location)/(response-location)/ResponseLocation";
import GrafficWork from "./(free)/(work-grafic)/workGraffic";
import TimeWork from "./(free)/(work-grafic)/workTime";
import MyServicesScreen from "./(standart)/(services)/(myServicesScreen)/MyServicesScreen";
import ClientPage from "./(profile)/(client)/ClientPage";
import ClientDetails from "./(profile)/(client)/(detail)/ClientDetails";
import AllClients from "./(profile)/(client)/components/AllClients";
import AddressBookClients from "./(profile)/(client)/components/AddressBookClients";
import SettingsPage from "./(profile)/(settings)/settings";
import ApplicationSettings from "./(profile)/(settings)/(childSettings)/(Application Settings)";
import LanguageSelection from "./(profile)/(settings)/(childSettings)/(Application Settings)/components/language";
import GalleryDetails from "./(settings)/(settings-gallery)/gallery-details";
import SwitchPage from "./(auth)/(register)/(roleSelection)/switchPage";
import OfferScreen from "./(auth)/(register)/(agreements)/getAgrement";
import WebPage from "./(profile)/(WebPage)/WebPage";
import GrafficWorkEdit from "./(free)/(work-grafic-edit)/workGraffic";
import TimeWorkEdit from "./(free)/(work-grafic-edit)/workTime";
import WorkMainEdit from "./(free)/(work-grafic-edit)/workMain";
import UserInfo from "./(auth)/(register)/(masterInformation)/getNameSurname";
import AboutUsFree from "./(free)/(help)/(aboutUs)/aboutUs";
import HelpFree from "./(free)/(help)/help";
import UpdatingAddressBook from "./(free)/(client)/updating-address-book";
import OnlineBooking from "./(standart)/(onlineBooking)/onlineBooking";
import Booking from "./(standart)/(onlineBooking)/(booking)/booking";
import InstallPin from "./(auth)/(setPinCode)/installPin";
import CheckPin from "./(auth)/(setPinCode)/checkInstalledPin";
import AboutUs from "./(standart)/(help)/(aboutUs)/aboutUs";
import UserCameraInfo from "./(auth)/(register)/(masterInformation)/getPhoto";
import StoppedVisiting from "./(standart)/client/stopped-visiting";
import NotVisiting from "./(standart)/client/not-visiting";
import StandardMain from "./(standart)/client/standard-main";
import AllClient from "@/app/(free)/(client)/all-client";
import DetailMain from "@/app/(free)/(client)/details/detail-main";
import Records from "@/app/(free)/(client)/details/records";
import ScheuleAllClient from "./(Schedule)/components/users";
import Schedule from "./(Schedule)/Schedule";
import RecordsInformation from "@/app/(free)/(client)/details/records-information";
import CenseledSession from "@/app/(detail)/censeled-session";
import UpcomingHistory from "@/app/(free)/(client)/details/history/upcoming-history";
import PastHistory from "@/app/(free)/(client)/details/history/past-history";
import CanceledHistory from "@/app/(free)/(client)/details/history/canceled-history";
import NotificationSettings from "./(notifications)/notifications";
import HelpPage from "./(profile)/(help)/help";
import EditProfile from "./(profile)/(settings)/(childSettings)/(Personaldata)/PersonalData";
import Messengers from "./(notifications)/(pages)/messengers";
import RemindAboutAppointment from "./(notifications)/(pages)/remind-about-appointment";
import CancelRecording from "./(notifications)/(pages)/cancel-recording";
import ChangingAnEntry from "./(notifications)/(pages)/changing-an-entry";
import RequestFeedback from "./(notifications)/(pages)/request-feedback";
import RequestWindow from "./(notifications)/(pages)/request-window";
import ServesGenderEdit from "./(standart)/(servicesEdit)/(gender)/servesGender";
import ExpertiseEdit from "./(standart)/(servicesEdit)/(expertiseEdit)/expertiseEdit";
import Welcome from "./(welcome)/Welcome";
import ProcessEdit from "./(standart)/(servicesEdit)/(processEdit)/processEdit";
import GalleryDetail from "./(profile)/(WebPage)/components/galleryDetail";
import HistoryDetailsInformation from "@/app/(free)/(client)/details/history/history-details";
import BreakBetweenSession from "./(standart)/(onlineBooking)/(booking)/breakBetweenSessions";
import ExpenseDetail from "./(profile)/(Expenses)/(component)/(detail)/expenseDetail";
import CreateExpenseCategory from "./(profile)/(Expenses)/(component)/CreateExpenseCategoty/CreateExpenseCategory";
import CreateExpense from "./(profile)/(Expenses)/(component)/CreateExpense/CreateExpense";
import MyServicesEdit from "./(standart)/(servicesEdit)/(processEdit)/(uslugi)/uslugi";
import ConfirmationRecord from "./(standart)/(onlineBooking)/(booking)/confirmationRecor";
import WebPageStandart from "./(profile)/(WebPage-standart)/WebPage";
import GalleryDetailStandart from "./(profile)/(WebPage-standart)/components/galleryDetail";
import CategoryEdit from "./(standart)/(servicesEdit)/(categoryEdit)/category";
import MyServicesScreenEdit from "./(standart)/(servicesEdit)/test";
import RequestWindowBook from "./(standart)/(onlineBooking)/(booking)/requestWindow";
import TimeSelect from "./(standart)/(onlineBooking)/(booking)/timeSelect";
import ChatScreen from "./(tabs)/(master)/chat";
import CheckPinOnCome from "./(auth)/(checkPinCode)/checkPinCode";
import Uslugi from "./(client)/(uslugi)/uslugi";
import Hair from "./(client)/(uslugi)/(hairHealth)/hair";
import MasterLocations from "./(client)/(map)/(master-locations)/master-locations";
import RecentMasters from "./(client)/(map)/(recent-masters)/recent-masters";
import Specialist from "./(client)/(uslugi)/(specialist)/specialist";
import Dashboard from "./(client)/(dashboard)/dashboard";
import MasterTabLayout from "./(tabs)/(master)/_layout";
import ClientTabLayout from "./(tabs)/(client)/_layout";
import OrderHistory from "./(client)/(profile)/(orderHistory)/orderHistory";
import ProfileEdit from "./(client)/(profile)/(profileEdit)/profileEdit";
import SettingsClient from "./(client)/(profile)/(settings)/settings";
import NotificationClient from "./(client)/(profile)/(notification)/notification";
import ClientInfo from "./(auth)/(register)/(clientInformations)/getNameSurname";
import getMasterNickName from "./(auth)/(register)/(masterInformation)/getNickName";
import ClientCameraInfo from "./(auth)/(register)/(clientInformations)/getPhoto";
// import CardClient from "./(client)/(profile)/(card)/card";
// import PaymentClient from "./(client)/(profile)/(payment)/payment";
import SalonLocation from "./(client)/(map)/(salon-location)/salon-location";
import EditProfilePage from "./(client)/(profile)/(profileEdit)/(editPages)/editPage";
import MasterInformation from "./(client)/(uslugi)/(masterInformation)/masterInformation";
import RecentMastersByCategory from "./(client)/(map)/(recent-masters)/recent-masters-by-category";
import Masters from "./(client)/(masters)/masters";
import SettingPage from "./(client)/(profile)/(settings)/(settingPage)/settingPage";
import ProfileMasterEdit from "./(profile)/(settings)/(childSettings)/(profileEdit)/profileEdit";
import ProfileMasterScreen from "./(profile)/(settings)/(childSettings)/(profileEdit)/profileScreen";
import EditProfileMasterPage from "./(profile)/(settings)/(childSettings)/(profileEdit)/(editPages)/editPage";
import TimeWorkDetail from "./(free)/(work-grafic-edit)/workTimeDetail";
import LocationEdit from "./(location)/LocationEdit";
import InternetNotice from "@/components/InternetNotise/internetNotice";
import LocationEditData from "./(location)/(location-data)/LocationEditData";
import OrderClient from "./(client)/(oreder)/order";
import ClientOrderDetail from "./(client)/(oreder)/orderDetail";
import ResponseLocationEdit from "./(location)/(response-location)/ResponseLocationEdit";
import ProfilePage from "./(profile)";
import FavouriteOrders from "./(client)/(favourite-orders)/favourite-orders";
// import ResponseLocationEdit from "./(location)/(response-location)/responseLocationEdit";

const Stack = createNativeStackNavigator();
export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "index",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <InternetNotice />
      <StompProvider>
        <MenuProvider>
          <Stack.Navigator initialRouteName="index">
            <Stack.Screen
              name="index"
              component={Index}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(tabs)/(master)"
              component={MasterTabLayout}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(tabs)/(client)"
              component={ClientTabLayout}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(auth)/auth"
              component={Auth}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(client)/(favourite-orders)/favourite-orders"
              component={FavouriteOrders}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(auth)/(login)/number-create"
              component={PhoneNumberInput}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(auth)/(login)/checkSendMessage"
              component={OtpInput}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(auth)/(register)/(greetings)/greetingFirst"
              component={AuthPage1}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(auth)/(register)/(greetings)/greetingSecond"
              component={AuthPage2}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(auth)/(register)/(greetings)/greetingThird"
              component={AuthPage3}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(auth)/(register)/(roleSelection)/masterORclient"
              component={MasterorClient}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(auth)/(register)/(roleSelection)/switchPage"
              component={SwitchPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(auth)/(register)/(agreements)/getAgrement"
              component={OfferScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(auth)/(register)/(masterInformation)/getNameSurname"
              component={UserInfo}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(auth)/(register)/(clientInformations)/getNameSurname"
              component={ClientInfo}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(auth)/(register)/(masterInformation)/getNickName"
              component={getMasterNickName}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(auth)/(register)/(masterInformation)/getPhoto"
              component={UserCameraInfo}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(auth)/(register)/(clientInformations)/getPhoto"
              component={ClientCameraInfo}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(auth)/(setPinCode)/installPin"
              component={InstallPin}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(client)/(masters)/masters"
              component={Masters}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(auth)/(setPinCode)/checkInstalledPin"
              component={CheckPin}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(standart)/client/stopped-visiting"
              component={StoppedVisiting}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(standart)/client/standard-main"
              component={StandardMain}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(standart)/client/not-visiting"
              component={NotVisiting}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="(chat)/(communicatie)/chatDetails"
              component={ChatDetails}
              options={{ title: "Chat Detail", headerShown: false }}
            />
            <Stack.Screen
              name="(tabs)/chat"
              component={ChatScreen}
              options={{ title: "Chat Detail", headerShown: false }}
            />
            <Stack.Screen
              name="(profile)/(notification)/index"
              component={Notification}
              options={{ title: "Services", headerShown: false }}
            />
            <Stack.Screen
              name="(free)/(work-grafic)/workTime"
              component={TimeWork}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(free)/(work-grafic)/workMain"
              component={WorkMain}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(free)/(work-grafic)/workGraffic"
              component={GrafficWork}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(free)/(work-grafic-edit)/workTime"
              component={TimeWorkEdit}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(free)/(work-grafic-edit)/workMain"
              component={WorkMainEdit}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(free)/(work-grafic-edit)/workGraffic"
              component={GrafficWorkEdit}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(settings)/settings"
              component={Settings}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(client)/(map)/(master-locations)/master-locations"
              component={MasterLocations}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(location)/(response-location)/ResponseLocationEdit"
              component={ResponseLocationEdit}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(client)/(map)/(salon-location)/salon-location"
              component={SalonLocation}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(client)/(map)/(recent-masters)/recent-masters"
              component={RecentMasters}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(client)/(map)/(recent-masters)/recent-masters-by-category"
              component={RecentMastersByCategory}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(settings)/(settings-gallery)/gallery-details"
              component={GalleryDetails}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(settings)/(settings-gallery)/settings-gallery-main"
              component={SettingsGalleryMain}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(settings)/(settings-gallery)/settings-gallery"
              component={SettingsGallery}
              options={{ headerShown: false }}
            />

            {/* expense start */}
            <Stack.Screen
              name="(profile)/(Expenses)/index"
              component={Expenses}
              options={{ title: "Services", headerShown: false }}
            />
            <Stack.Screen
              name="(profile)/(Expenses)/(component)/(detail)/expenseDetail"
              component={ExpenseDetail}
              options={{ title: "Services", headerShown: false }}
            />
            <Stack.Screen
              name="(profile)/(Expenses)/(component)/CreateExpense/CreateExpense"
              component={CreateExpense}
              options={{ title: "Services", headerShown: false }}
            />
            <Stack.Screen
              name="(profile)/(Expenses)/(component)/CreateExpenseCategoty/CreateExpenseCategory"
              component={CreateExpenseCategory}
              options={{ title: "Services", headerShown: false }}
            />
            {/* expense start */}

            <Stack.Screen
              name="(standart)/(services)/(process)/process"
              component={Process}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(standart)/(services)/(myServices)/myServices"
              component={MyServices}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(standart)/(services)/(gender)/servesGender"
              component={ServesGender}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(standart)/(services)/(category)/category"
              component={Category}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(notifications)/notifications"
              component={NotificationSettings}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(notifications)/(pages)/messengers"
              component={Messengers}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(notifications)/(pages)/remind-about-appointment"
              component={RemindAboutAppointment}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(notifications)/(pages)/cancel-recording"
              component={CancelRecording}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(notifications)/(pages)/changing-an-entry"
              component={ChangingAnEntry}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(notifications)/(pages)/request-feedback"
              component={RequestFeedback}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(notifications)/(pages)/request-window"
              component={RequestWindow}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(standart)/(services)/(expertise)/expertise"
              component={Expertise}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(standart)/(services)/serviceStyle/serviceStyle"
              component={ServiceStyle}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(standart)/(services)/(myServicesScreen)/MyServicesScreen"
              component={MyServicesScreen}
              options={{ headerShown: false }}
            />

            {/* Service edit start */}

            <Stack.Screen
              name="(standart)/(servicesEdit)/(gender)/servesGender"
              component={ServesGenderEdit}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(standart)/(servicesEdit)/(categoryEdit)/category"
              component={CategoryEdit}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(standart)/(servicesEdit)/(expertiseEdit)/expertiseEdit"
              component={ExpertiseEdit}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(standart)/(servicesEdit)/(processEdit)/processEdit"
              component={ProcessEdit}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(standart)/(servicesEdit)/(processEdit)/(uslugi)/uslugi"
              component={MyServicesEdit}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(standart)/(servicesEdit)/test"
              component={MyServicesScreenEdit}
              options={{ headerShown: false }}
            />
            {/* Service edit end */}

            {/* Client Uslugi start  */}
            <Stack.Screen
              name="(client)/(uslugi)/uslugi"
              component={Uslugi}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(client)/(uslugi)/(hairHealth)/hair"
              component={Hair}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(client)/(uslugi)/(specialist)/specialist"
              component={Specialist}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(client)/(uslugi)/(masterInformation)/masterInformation"
              component={MasterInformation}
              options={{ headerShown: false }}
            />

            {/* Client Uslugi end */}
            <Stack.Screen
              name="(profile)/(sessionhistory)/sessionHistory"
              component={SessionHistory}
              options={{ title: "Отменённые записи", headerShown: false }}
            />
            <Stack.Screen
              name="(profile)/(sessionhistory)/components/Upcomingentries/Upcomingentries"
              component={Upcomingentries}
              options={{ title: "Отменённые записи", headerShown: false }}
            />
            <Stack.Screen
              name="(profile)/(sessionhistory)/components/Pastentries/Pastentries"
              component={PastEntries}
              options={{ title: "Отменённые записи", headerShown: false }}
            />
            <Stack.Screen
              name="(profile)/(sessionhistory)/components/Canceledentries/Canceledentries"
              component={Canceledentries}
              options={{ title: "Отменённые записи", headerShown: false }}
            />
            <Stack.Screen
              name="(free)/(client)/main"
              component={MainClient}
              options={{ title: "Client", headerShown: false }}
            />
            <Stack.Screen
              name="(free)/(client)/all-client"
              component={AllClient}
              options={{ title: "ClientAll", headerShown: false }}
            />
            <Stack.Screen
              name="(free)/(client)/address-book"
              component={AddressBook}
              options={{ title: "Client-book", headerShown: false }}
            />
            <Stack.Screen
              name="(free)/(client)/client-list"
              component={MainClientList}
              options={{ title: "Client-list", headerShown: false }}
            />
            <Stack.Screen
              name="(free)/(client)/creating-client"
              component={CreatingClient}
              options={{ title: "CreatingClient", headerShown: false }}
            />
            <Stack.Screen
              name="(free)/(client)/updating-address-book"
              component={UpdatingAddressBook}
              options={{ title: "UpdatingClient", headerShown: false }}
            />
            <Stack.Screen
              name="(free)/(client)/details/records"
              component={Records}
              options={{ title: "Records", headerShown: false }}
            />
            <Stack.Screen
              name="(free)/(client)/details/records-information"
              component={RecordsInformation}
              options={{ title: "RecordsInformation", headerShown: false }}
            />
            <Stack.Screen
              name="(free)/(client)/details/detail-main"
              component={DetailMain}
              options={{ title: "ClientDetailMain", headerShown: false }}
            />
            <Stack.Screen
              name="(free)/(client)/details/history/upcoming-history"
              component={UpcomingHistory}
              options={{ title: "UpcomingHistory", headerShown: false }}
            />
            <Stack.Screen
              name="(free)/(client)/details/history/past-history"
              component={PastHistory}
              options={{ title: "PastHistory", headerShown: false }}
            />
            <Stack.Screen
              name="(free)/(client)/details/history/canceled-history"
              component={CanceledHistory}
              options={{ title: "CanceledHistory", headerShown: false }}
            />
            <Stack.Screen
              name="(free)/(client)/details/history/history-details"
              component={HistoryDetailsInformation}
              options={{
                title: "HistoryDetailsInformation",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="(location)/Location"
              component={Location}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(location)/(location-data)/LocationData"
              component={LocationData}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(profile)/(tariff)/tariff"
              component={TariffsPage}
              options={{ title: "CreatingClient", headerShown: false }}
            />
            <Stack.Screen
              name="(welcome)/Welcome"
              component={Welcome}
              options={{ title: "CreatingClient", headerShown: false }}
            />
            <Stack.Screen
              name="(location)/(response-location)/ResponseLocation"
              component={ResponseLocation}
              options={{ headerShown: false }}
            />
            {/*Help start */}

            <Stack.Screen
              name="(standart)/(help)/(aboutUs)/aboutUs"
              component={AboutUs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(free)/(help)/help"
              component={HelpFree}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(free)/(help)/(aboutUs)/aboutUs"
              component={AboutUsFree}
              options={{ headerShown: false }}
            />
            {/*Help end */}

            {/* Online booking start  */}
            <Stack.Screen
              name="(standart)/(onlineBooking)/onlineBooking"
              component={OnlineBooking}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(standart)/(onlineBooking)/(booking)/booking"
              component={Booking}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(standart)/(onlineBooking)/(booking)/breakBetweenSessions"
              component={BreakBetweenSession}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(standart)/(onlineBooking)/(booking)/confirmationRecor"
              component={ConfirmationRecord}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(standart)/(onlineBooking)/(booking)/requestWindow"
              component={RequestWindowBook}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(standart)/(onlineBooking)/(booking)/timeSelect"
              component={TimeSelect}
              options={{ headerShown: false }}
            />
            {/* Online booking end */}
            {/*  profile client start */}
            <Stack.Screen
              name="(profile)/(client)/ClientPage"
              component={ClientPage}
              options={{ title: "salom", headerShown: false }}
            />
            <Stack.Screen
              name="(profile)/(client)/components/AllClients"
              component={AllClients}
              options={{ title: "salom", headerShown: false }}
            />
            <Stack.Screen
              name="(profile)/(client)/components/AddressBookClients"
              component={AddressBookClients}
              options={{ title: "salom", headerShown: false }}
            />
            <Stack.Screen
              name="(profile)/(client)/(detail)/ClientDetails"
              component={ClientDetails}
              options={{ title: "Client", headerShown: false }}
            />
            {/* profile client end */}

            {/* Web page tariff start */}
            <Stack.Screen
              name="(profile)/(WebPage)/WebPage"
              component={WebPage}
              options={{ title: "CreatingClient", headerShown: false }}
            />
            <Stack.Screen
              name="(profile)/(WebPage-standart)/WebPage"
              component={WebPageStandart}
              options={{ title: "CreatingClient", headerShown: false }}
            />
            {/* Web page tariff end */}

            {/* profile settings start */}
            <Stack.Screen
              name="(profile)/(settings)/settings"
              component={SettingsPage}
              options={{ title: "Настройки ", headerShown: false }}
            />
            <Stack.Screen
              name="(profile)/index"
              component={ProfilePage}
              options={{ title: "Настройки ", headerShown: false }}
            />
            <Stack.Screen
              name="(profile)/(settings)/(childSettings)/(Application Settings)/index"
              component={ApplicationSettings}
              options={{ title: "Настройки ", headerShown: false }}
            />
            <Stack.Screen
              name="(profile)/(settings)/(childSettings)/(Application Settings)/components/language"
              component={LanguageSelection}
              options={{ title: "Настройки ", headerShown: false }}
            />
            <Stack.Screen
              name="(profile)/(settings)/(childSettings)/(Personaldata)/PersonalData"
              component={EditProfile}
              options={{ title: "Настройки ", headerShown: false }}
            />
            {/* profile settings end */}

            {/* schedule  start*/}
            <Stack.Screen
              name="(Schedule)/Schedule"
              component={Schedule}
              options={{ title: "Настройки ", headerShown: false }}
            />
            <Stack.Screen
              name="(Schedule)/components/users"
              component={ScheuleAllClient}
              options={{ title: "Настройки ", headerShown: false }}
            />
            {/* schedule  start*/}
            <Stack.Screen
              name="(detail)/censeled-session"
              component={CenseledSession}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(profile)/(WebPage)/components/galleryDetail"
              component={GalleryDetail}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(profile)/(WebPage-standart)/components/galleryDetail"
              component={GalleryDetailStandart}
              options={{ headerShown: false }}
            />

            {/*  help start  */}
            <Stack.Screen
              name="(profile)/(help)/help"
              component={HelpPage}
              options={{ headerShown: false }}
            />
            {/*  help end  */}

            {/* check pin start */}

            <Stack.Screen
              name="(checkPassword)/checkPassword"
              component={CheckPinOnCome}
              options={{ headerShown: false }}
            />
            {/* check pin end */}
            <Stack.Screen
              name="(client)/(dashboard)/dashboard"
              component={Dashboard}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(client)/(profile)/(orderHistory)/orderHistory"
              component={OrderHistory}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(client)/(profile)/(profileEdit)/profileEdit"
              component={ProfileEdit}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(client)/(profile)/(profileEdit)/(editPages)/editPage"
              component={EditProfilePage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(client)/(profile)/(settings)/settings"
              component={SettingsClient}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(client)/(profile)/(settings)/(settingPage)/settingPage"
              component={SettingPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(client)/(profile)/(notification)/notification"
              component={NotificationClient}
              options={{ headerShown: false }}
            />
            {/* <Stack.Screen
              name="(client)/(profile)/(card)/card"
              component={CardClient}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(client)/(profile)/(payment)/payment"
              component={PaymentClient}
              options={{ headerShown: false }}
            /> */}
            <Stack.Screen
              name="(profile)/(settings)/(childSettings)/(profileEdit)/profileEdit"
              component={ProfileMasterEdit}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(profile)/(settings)/(childSettings)/(profileEdit)/profileScreen"
              component={ProfileMasterScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(profile)/(settings)/(childSettings)/(profileEdit)/(editPages)/editPage"
              component={EditProfileMasterPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(free)/(work-grafic-edit)/workTimeDetail"
              component={TimeWorkDetail}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="(location)/LocationEdit"
              component={LocationEdit}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="(location)/(location-data)/LocationEditData"
              component={LocationEditData}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="(client)/(oreder)/order"
              component={OrderClient}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="(client)/(oreder)/orderDetail"
              component={ClientOrderDetail}
            />
          </Stack.Navigator>
        </MenuProvider>
      </StompProvider>
    </ThemeProvider>
    // I'm a good developer
  );
}
