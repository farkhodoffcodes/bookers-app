import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, LayoutAnimation, Platform, UIManager } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useAccardionStoreId } from '@/helpers/state_managment/accardion/accardionStore';

interface AccordionItemProps {
  id: string|null;
  title: string | null;
  date: string | null;
  children: React.ReactNode;
}

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AccardionHistoryTwo: React.FC<AccordionItemProps> = ({ id, title, date, children }) => {
  const { expandidIdTwo, setExpendidIdTwo } = useAccardionStoreId();

  const toggleExpand = () => {
    // Animatsiya
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpendidIdTwo(expandidIdTwo === id ? null : id);
  };

  const isExpanded = expandidIdTwo === id;

  return (
    <View style={[styles.container]}>
      <TouchableOpacity
        style={styles.header}
        onPress={toggleExpand}
        activeOpacity={1}
      >
        <View style={styles.mainText}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.headerText}>{date}</Text>
        </View>
        <AntDesign name={isExpanded ? 'down' : 'right'} size={20} color="#4F4F4F" />
      </TouchableOpacity>
      {isExpanded && (
        <View style={styles.content}>
          {children}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    overflow: 'hidden', 
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#B9B9C9",
    borderRadius: 8,
  },
  mainText: {
    flexDirection: 'column',
  },
  titleText: {
    fontSize: 12,
    color: '#494949',
  },
  headerText: {
    fontSize: 16,
    fontWeight: "600",
    color: '#111',
  },
  content: {
    backgroundColor: '#B9B9C9',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: -7,
  },
  selectedGenderText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  radioButtonLabel: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  checkbox: {
    alignSelf: 'center',
  },
  communitySlider: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default AccardionHistoryTwo;
