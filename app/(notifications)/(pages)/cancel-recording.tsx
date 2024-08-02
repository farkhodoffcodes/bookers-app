import Buttons from '@/components/(buttons)/button';
import LoadingButtons from '@/components/(buttons)/loadingButton';
import { Loading } from '@/components/loading/loading';
import NavigationMenu from '@/components/navigation/navigation-menu';
import { editCancelOrder, fetchAllData } from '@/helpers/api-function/notifications/notifications';
import useNotificationsStore from '@/helpers/state_managment/notifications/notifications';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Switch, TextInput, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const CancelRecording = () => {
  const { cancelData, setCancelData, isLoading, setIsloading, texts, setTexts } = useNotificationsStore();
  const navigation = useNavigation();
  const [hasChanges, setHasChanges] = useState(false);

  const toggleSwitch = () => {
    setCancelData({ ...cancelData, isActive: !cancelData.isActive });
    setHasChanges(true);
  };

  const onMessageChange = (text: string) => {
    setTexts({ ...texts, cancelText: text });
    setHasChanges(true);
  };

  useEffect(() => {
    fetchAllData(setCancelData, 'CANCEL_ORDER');
    setTexts({ ...texts, cancelText: cancelData.text ? cancelData.text : '' });
  }, []);

  const handleSave = () => {
    editCancelOrder(cancelData.isActive, cancelData.isActive ? texts.cancelText : cancelData.text, setHasChanges, navigation.goBack, setIsloading);
  };

  if (!cancelData) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Loading />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <StatusBar style="light" />
        <View style={styles.navigationMenu}>
          <NavigationMenu name='Напоминание об отмене' />
        </View>
        <View style={styles.content}>
          <View style={styles.switchContainer}>
            <View style={{ width: 250 }}>
              <Text style={styles.label}>Отправлять напоминание об отмене</Text>
            </View>
            <View>
              <Switch
                onValueChange={toggleSwitch}
                value={cancelData.isActive}
                trackColor={{ false: "#767577", true: "#9C0A35" }}
                thumbColor={'#fff'}
              />
            </View>
          </View>
          {cancelData.isActive && (
            <View style={styles.messageContainer}>
              <Text style={styles.messageLabel}>Шаблон сообщения</Text>
              <TextInput
                style={styles.textInput}
                multiline
                numberOfLines={10}
                onChangeText={onMessageChange}
                defaultValue={cancelData.text}
              />
            </View>
          )}
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        {isLoading ? <LoadingButtons title='Сохранить' /> : <Buttons title="Сохранить" onPress={handleSave} isDisebled={hasChanges} />}
      </View>
    </SafeAreaView>
  );
};

export default CancelRecording;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#21212E',
    position: 'relative'
  },
  navigationMenu: {
    padding: 16,
  },
  navigationTitle: {
    color: '#fff',
    fontSize: 18,
  },
  content: {
    padding: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#B9B9C9',
    padding: 13,
    borderRadius: 15
  },
  label: {
    color: '#000',
    fontSize: 17,
  },
  messageContainer: {
    backgroundColor: '#B9B9C9',
    padding: 15,
    borderRadius: 15,
  },
  messageLabel: {
    color: '#000',
    marginBottom: 10,
    fontSize: 16,
  },
  textInput: {
    backgroundColor: '#3a3a4e',
    color: '#fff',
    padding: 10,
    borderRadius: 8,
    height: 'auto',
    maxHeight: screenHeight / 3,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    width: '100%',
    padding: 10,
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#21212E'
  },
});
