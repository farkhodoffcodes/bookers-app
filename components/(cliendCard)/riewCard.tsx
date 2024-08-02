// ReviewCard.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';
type ReiwCardProps = {
  item: ReiwCardPropsitem;
  onPress?: () => void;
}
type ReiwCardPropsitem = {
  name: string;
  rating: number;
  reviewText: string;
  timeAgo: string;
}



const ReviewCard: React.FC<ReiwCardProps | any> = ({ item, onPress }) => {

  const generateStars = (count: number) => {
    let stars = '';
    for (let i = 1; i < count; i++) {
      stars += '★';
    }
    for (let i = count; i < 5; i++) {
      stars += '☆';
    }
    return stars;
  };

  return (
    <TouchableOpacity
      activeOpacity={.9}
      onPress={onPress}
    >
      <View style={[tw`rounded-2xl p-3`, { backgroundColor: '#B9B9C9' }]}>
        <View style={tw`flex-row items-center mb-2`}>
          <FontAwesome name="user-circle" size={40} color="white" />
          <View style={tw`ml-4`}>
            <Text style={[tw`text-lg font-bold`, { color: '#000000' }]}>{item.name}</Text>
            <Text style={[tw`text-lg`, { color: '#9C0A35' }]}>{generateStars(item.rating || 0)}</Text>
          </View>
        </View>
        <Text style={tw`text-gray-600`}>
          {item.reviewText}
        </Text>
        <Text style={tw`text-gray-500 mt-2`}>{item.timeAgo}</Text>
      </View>
    </TouchableOpacity>

  );
};

export default ReviewCard;
