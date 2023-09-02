import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

import { getImageSource } from "../utils/getImageSource";

import { PokemonImage } from "./PokemonImage";

export interface RegionItemProps {
  name: string;
  gen: number;
  listStart: number;
}

export function RegionItem({ name, gen, listStart }: RegionItemProps) {
  const { navigate } = useNavigation();

  const imageSource = getImageSource(gen);

  const initialPokemon = name === "unova" ? 495 : listStart;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className="w-full"
      accessible={false}
      onPress={() => navigate("list", { name, gen })}
    >
      <ImageBackground source={imageSource} imageStyle={{ borderRadius: 16 }}>
        <LinearGradient
          className="px-6 py-7 rounded-2xl flex-row justify-between items-center"
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          colors={["rgba(0,0,0,.7)", "transparent"]}
        >
          <View>
            <Text testID={`name-${name}`} className="font-600 text-lg text-white capitalize">
              {name}
            </Text>
            <Text testID={`gen-${gen}`} className="font-500 text-xs text-gray-200 uppercase">
              {gen}ª Generation
            </Text>
          </View>

          <View className="flex-row">
            <PokemonImage pokemonId={initialPokemon} />
            <PokemonImage pokemonId={initialPokemon + 3} />
            <PokemonImage pokemonId={initialPokemon + 6} />
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}
