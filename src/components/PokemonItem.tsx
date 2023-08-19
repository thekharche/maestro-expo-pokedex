import { TouchableOpacity, View, Text, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { PokemonListProps } from "../screens/List";

import { PokemonImage } from "./PokemonImage";

export function PokemonItem({ name, url }: PokemonListProps) {
  const pokemonId = url.replace(/[^\d]|(?<=v)\d/gm, "");
  const formatedId = `Nº${pokemonId.padStart(3, "0")}`;

  const { navigate } = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className="px-6 py-7 flex-row justify-between items-center bg-white/10 border border-white/25 rounded-2xl"
      onPress={() =>
        Number(pokemonId) >= 808
          ? Alert.alert("Oh snap!", "Parece que esse pokemon escapou.")
          : navigate("pokemon", { name, pokemonId, formatedId })
      }
    >
      <View>
        <Text className="font-600 text-gray-200 text-xs">{formatedId}</Text>
        <Text className="font-600 text-white text-xl capitalize">{name}</Text>
      </View>
      <PokemonImage pokemonId={Number(pokemonId)} />
    </TouchableOpacity>
  );
}
