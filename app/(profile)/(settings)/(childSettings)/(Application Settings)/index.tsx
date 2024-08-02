import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import NavigationMenu from '@/components/navigation/navigation-menu';
import Toast from 'react-native-simple-toast';

const data: { icon: string | any, label: string, screen: string }[] = [
    { icon: 'globe', label: 'Сменить язык', screen: '(profile)/(settings)/(childSettings)/(Application Settings)/components/language' },
    { icon: 'check-square', label: 'Сменить тему', screen: '' },
    { icon: 'lock', label: 'Изменить пароль', screen: '(auth)/(setPinCode)/installPin' },
]

const ApplicationSettings: React.FC = () => {
    const navigation = useNavigation<any>();
    const navigateTo = (screen: string) => {
        if (screen.trim() !== '') {
            navigation.navigate(screen)
        } else {
            Toast.show('Страница не найдена', Toast.SHORT);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <NavigationMenu name='Настройки' />
                {data.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.menuItem}
                        onPress={() => navigateTo(item.screen)}
                    >
                        <View style={styles.menuItemContent}>
                            <FontAwesome name={item.icon} size={20} color="#9C0A35" />
                            <Text style={styles.menuItemText}>{item.label}</Text>
                        </View>
                        <FontAwesome name="chevron-right" size={20} color="#9C0A35" />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#21212E',
        padding: 16,
    },
    header: {
        color: '#ffffff',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#b9b9c9',
        padding: 16,
        borderRadius: 8,
        marginBottom: 8,
    },
    menuItemContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuItemText: {
        color: '#000',
        marginLeft: 16,
    },
});

export default ApplicationSettings;
