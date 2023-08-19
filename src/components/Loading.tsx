import { View, ActivityIndicator } from "react-native";

export function Loading() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <ActivityIndicator color="#CD3131" />
    </View>
  );
}
