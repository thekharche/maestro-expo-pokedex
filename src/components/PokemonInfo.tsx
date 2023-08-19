import { View, Text } from "react-native";
import clsx from "clsx";
import {
  Ionicons,
  FontAwesome5,
  MaterialIcons,
  Entypo,
} from "@expo/vector-icons";

import { PokemonApiProps } from "../screens/Pokemon";

export function PokemonInfo({
  description,
  weight,
  height,
  gender,
  family,
  species,
  abilities,
}: PokemonApiProps) {
  return (
    <View>
      <Text className="text-gray-200 leading-5">{description}</Text>

      <View className="mt-9 flex-row flex-wrap">
        <View className="flex-1">
          <View className="flex-row items-center">
            <FontAwesome5 name="weight-hanging" size={18} color="white" />
            <Text className="ml-2 font-500 text-white text-xs uppercase">
            Weight
            </Text>
          </View>
          <Text className="mt-1 pt-3 pb-2 font-500 text-white text-lg text-center border border-white/20 rounded-2xl">
            {weight}
          </Text>
        </View>

        <View className="flex-1 ml-5">
          <View className="flex-row items-center">
            <MaterialIcons name="height" size={18} color="white" />
            <Text className="ml-2 font-500 text-white text-xs uppercase">
            Height
            </Text>
          </View>
          <Text className="mt-1 pt-3 pb-2 font-500 text-white text-lg text-center border border-white/20 rounded-2xl">
            {height}
          </Text>
        </View>
      </View>

      <View className="mt-5 flex-row flex-wrap">
        <View className="flex-1">
          <View className="flex-row items-center">
            <MaterialIcons name="category" size={18} color="white" />
            <Text className="ml-2 font-500 text-white text-xs uppercase">
            Category
            </Text>
          </View>
          <Text className="mt-1 pt-3 pb-2 font-500 text-white text-lg text-center border border-white/20 rounded-2xl">
            {species}
          </Text>
        </View>

        <View className="flex-1 ml-5">
          <View className="flex-row items-center">
            <Ionicons name="flash" size={18} color="white" />
            <Text className="ml-2 font-500 text-white text-xs uppercase">
            Abilities
            </Text>
          </View>
          <View className="mt-1 pt-3 pb-2 border border-white/20 rounded-2xl">
            {abilities.normal.map((ability) => (
              <Text
                key={ability}
                className="font-500 text-white text-lg text-center leading-7"
              >
                {ability}
              </Text>
            ))}
          </View>
        </View>
      </View>

      <Text className="mt-5 font-500 text-white uppercase text-center">
      Gender
      </Text>

      <View className="relative mt-3 h-2">
        <View
          className={clsx("w-full h-2 bg-gender-female absolute rounded-full", {
            ["bg-gray-200/20"]: gender[0] == null,
          })}
        />
        <View
          className={clsx("h-2 bg-gender-male absolute rounded-l-full", {
            ["rounded-full"]: gender[0] === 100,
          })}
          style={{ width: `${gender[0] ?? 0}%` }}
        />
      </View>

      <View className="flex-row justify-between mt-1">
        <View className="flex-row">
          <Ionicons name="md-male" size={16} color="white" />
          <Text className="ml-1 font-500 text-white text-xs">
            {gender[0] ?? 0}%
          </Text>
        </View>

        <View className="flex-row">
          <Text className="mr-1 font-500 text-white text-xs">
            {gender[1] ?? 0}%
          </Text>
          <Ionicons name="md-female" size={16} color="white" />
        </View>
      </View>

      <View>
        <Text className="mt-10  font-500 text-white text-lg">Evolutions</Text>

        {family.evolutionLine.length > 1 ? (
          <View className="mt-6">
            {family.evolutionLine.map((pokemon, index) => (
              <View key={`evolution:${pokemon}`} className="items-center">
                {index !== 0 && (
                  <View className="my-3">
                    <Entypo name="chevron-down" color="white" size={24} />
                  </View>
                )}
                <View
                  className={clsx(
                    "px-4 py-2 border border-gray-200/20 rounded-2xl opacity-75",
                    {
                      ["border-gray-200 bg-gray-200/10 opacity-100"]:
                        family.evolutionStage === index + 1,
                    }
                  )}
                >
                  <Text
                    className={clsx("text-gray-200 text-center", {
                      ["text-white"]: family.evolutionStage === index + 1,
                    })}
                  >
                    {pokemon}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <Text className="mt-2 font-400 text-gray-200 text-sm">
             This pokemon does not evolve.
          </Text>
        )}
      </View>
    </View>
  );
}
