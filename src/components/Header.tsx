import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Entypo, Feather } from "@expo/vector-icons";

interface Header {
  name?: string;
  showInput?: boolean;
  handleShowInput?: () => void;
}

export function Header({ name = "", showInput, handleShowInput }: Header) {
  const { goBack } = useNavigation();

  return (
    <View className="flex-row justify-between items-center mb-5">
      <TouchableOpacity activeOpacity={0.7} onPress={goBack}>
        <Entypo name="chevron-left" size={24} color="white" />
      </TouchableOpacity>
      <Text className="font-600 text-gray-200 text-lg capitalize">{name}</Text>
      {name ? (
        <TouchableOpacity activeOpacity={0.7} onPress={handleShowInput}>
          {showInput ? (
            <Feather name="x" size={24} color="white" />
          ) : (
            <Feather name="search" size={24} color="white" />
          )}
        </TouchableOpacity>
      ) : (
        <View className="w-6" />
      )}
    </View>
  );
}
