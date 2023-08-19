import { View, ViewProps } from "react-native";

export function Layout({ children }: ViewProps) {
  return (
    <View className="flex-1 pt-10 px-6 bg-background relative">{children}</View>
  );
}
