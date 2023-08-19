import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";

import { Loading } from "./src/components/Loading";

import { Home } from "./src/screens/Home";
import { List } from "./src/screens/List";
import { Pokemon } from "./src/screens/Pokemon";

export default function App() {
  const { Navigator, Screen } = createNativeStackNavigator();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <>
      <NavigationContainer>
        <Navigator
          initialRouteName="home"
          screenOptions={{ headerShown: false }}
        >
          <Screen component={Home} name="home" />
          <Screen component={List} name="list" />
          <Screen component={Pokemon} name="pokemon" />
        </Navigator>
      </NavigationContainer>

      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent
      />
    </>
  );
}
