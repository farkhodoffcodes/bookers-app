import React, { useCallback } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { FontAwesome, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';
import { useFocusEffect } from 'expo-router';
import webPageStore from '@/helpers/state_managment/wepPage/wepPage';
import { getFile } from '@/helpers/api';

type ClientCardProps = {
  salon?: string | null;
  imageUrl?: string | null;
  name?: string | null;
  zaps?: number | null;
  masterType?: string | null;
  orders?: number | null;
  clients?: number | null;
  address?: string | null;
  mapStyle?: boolean | null;
  favouriteStyle?: boolean | null;
  onPress?: () => void;
  feedbackCount?: number | null;
  locationIcon?: React.ReactNode;
  favouriteOnPress?: () => void;
};

const ClientCard: React.FC<ClientCardProps> = ({
  salon,
  favouriteOnPress,
  imageUrl,
  favouriteStyle,
  feedbackCount,
  name,
  masterType,
  orders,
  clients,
  address,
  zaps,
  onPress,
  mapStyle,
  locationIcon,
}) => {
  const { getme } = webPageStore();

  const generateStars = (count: number) => {
    const roundedCount = Math.round(count);
    const starsCount = Math.min(roundedCount, 5);
    let stars = '';
    for (let i = 0; i < starsCount; i++) {
      stars += '★';
    }
    for (let i = starsCount; i < 5; i++) {
      stars += '☆';
    }
    return stars;
  };

  return (
    <View style={[tw`p-4 rounded-2xl shadow-lg`, { backgroundColor: '#B9B9C9' }]}>
      <View style={tw`flex-row items-center mb-4`}>
        <Image
          source={imageUrl ? { uri: getFile + imageUrl } : require('../../assets/avatar.png')}
          style={tw`w-16 h-16 rounded-full mr-3`}
        />
        <View style={tw`flex-1`}>
          <View style={tw`flex-row items-center mb-1`}>
            <Text style={tw`text-lg font-bold`}>{name || "No data"}</Text>
            {!mapStyle && (
              <View style={tw`border border-gray-600 px-2 py-1 rounded-lg ml-2`}>
                <Text style={tw`text-xs text-gray-600`}>{salon}</Text>
              </View>
            )}
          </View>
          <Text style={tw`text-sm text-gray-600`}>{masterType}</Text>
        </View>
        <View style={tw`flex items-end`}>
          <Text style={[tw`text-lg`, { color: '#9C0A35' }]}>{generateStars(feedbackCount || 0)}</Text>
          <Text style={tw`text-xs text-gray-600`}>
            {orders} заказа, {clients} клиентов
          </Text>
        </View>
      </View>
      <Text style={tw`text-gray-600 text-lg mb-2`}>{address || "Address is not found"}</Text>
      <Text style={tw`text-black text-lg font-bold mb-4`}>Ближайшая запись: {zaps || "0"}</Text>
      <View style={[tw`flex-row justify-between items-center`, mapStyle && tw`justify-center`]}>
        <TouchableOpacity activeOpacity={0.8} style={[tw`px-16 py-2 rounded-xl`, { backgroundColor: '#9C0A35' }]} onPress={onPress}>
          <Text style={tw`text-white text-xl text-center`}>Записаться</Text>
        </TouchableOpacity>
        {!mapStyle && (
          <TouchableOpacity activeOpacity={0.8} style={[tw`p-2 rounded-full`, { backgroundColor: '#9C0A35' }]}>
            {locationIcon || <SimpleLineIcons name="location-pin" size={24} color="white" />}
          </TouchableOpacity>
        )}
        {favouriteStyle && (
          <TouchableOpacity onPress={favouriteOnPress} activeOpacity={0.8} style={[tw`p-2 rounded-full`, { backgroundColor: '#9C0A35' }]}>
            <MaterialIcons name="bookmark" size={27} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ClientCard;
