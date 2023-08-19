import { useEffect, useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import clsx from "clsx";

import { Header } from "../components/Header";
import { Layout } from "../components/Layout";
import { Loading } from "../components/Loading";
import { PokemonBackground } from "../components/PokemonBackground";
import { PokemonType } from "../components/PokemonType";
import { PokemonInfo } from "../components/PokemonInfo";

interface PokemonParamsProps {
  name: string;
  pokemonId: string;
  formatedId: string;
}

export interface PokemonApiProps {
  types: string[];
  abilities: {
    normal: string[];
    hidden: string[];
  };
  gender: number[];
  height: string;
  weight: string;
  family: {
    id: number;
    evolutionStage: number;
    evolutionLine: number[];
  };
  description: string;
  species: string;
}

export function Pokemon() {
  const [pokemonApi, setPokemonApi] = useState<PokemonApiProps>();
  const [loadingApi, setLoadingApi] = useState(true);
  const [loadingImage, setLoadingImage] = useState(true);
  const [isHidden, setIsHidden] = useState(true);

  const route = useRoute();

  const { name, pokemonId, formatedId } = route.params as PokemonParamsProps;

  useEffect(() => {
    fetch(`https://pokeapi.glitch.me/v1/pokemon/${pokemonId}`)
      .then((response) => response.json())
      .then((data) => setPokemonApi(data[0]))
      .finally(() => setLoadingApi(false));
  }, []);

  useEffect(() => {
    if (!loadingApi && !loadingImage) {
      setIsHidden(false);
    }
  }, [loadingApi, loadingImage]);

  return (
    <Layout>
      {!isHidden && pokemonApi && (
        <PokemonBackground type={pokemonApi.types[0].toLowerCase()} />
      )}

      <Header />

      {isHidden && <Loading />}

      {pokemonApi && (
        <View className={clsx("", { ["hidden"]: isHidden })}>
          <View className="w-full items-center">
            <Image
              source={{
                uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`,
              }}
              style={{ width: 180, height: 180, marginTop: -32 }}
              onLoad={() => setLoadingImage(false)}
            />
          </View>

          <Text className="mt-3 font-500 text-white text-3xl capitalize w-">
            {name}
          </Text>
          <Text className="text-white">{formatedId}</Text>

          <View className="flex-row my-5">
            {pokemonApi.types.map((type) => (
              <PokemonType key={type} type={type.toLowerCase()} />
            ))}
          </View>

          <ScrollView
            className="h-[52%]"
            contentContainerStyle={{ paddingBottom: 32 }}
          >
            <PokemonInfo {...pokemonApi} />
          </ScrollView>
        </View>
      )}
    </Layout>
  );
}
