import { View, Text, Image } from "react-native";

export function EmptyList() {
  return (
    <View className="mt-40 items-center">
      <Image
        source={require("../assets/magikarp.png")}
        style={{ height: 120, opacity: 0.7 }}
        resizeMode="contain"
      />
      <Text className="mt-3 px-4 font-500 text-gray-200/60 text-base text-center">
        Parece que não tem nenhum pokémon nessa área.
      </Text>
    </View>
  );
}
