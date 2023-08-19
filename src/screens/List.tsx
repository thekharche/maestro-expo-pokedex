import { useState, useEffect, useCallback } from "react";
import { TextInput, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { Feather } from "@expo/vector-icons";

import { RegionItemProps } from "../components/RegionItem";
import { ListRenderItemInfo } from "@shopify/flash-list";

import { Layout } from "../components/Layout";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { PokemonItem } from "../components/PokemonItem";
import { ListSeparator } from "../components/ListSeparator";
import { EmptyList } from "../components/EmptyListy";

export type PokemonListProps = {
  name: string;
  url: string;
};

export function List() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [pokemonList, setPokemonList] = useState<PokemonListProps[]>([]);

  const route = useRoute();

  const { name, gen } = route.params as RegionItemProps;

  const filteredPokemonList = pokemonList.filter((pokemon) =>
    pokemon.name.includes(search)
  );

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<PokemonListProps>) => (
      <PokemonItem {...item} />
    ),
    []
  );

  function handleShowInput() {
    if (showInput) {
      setSearch("");
    }

    setShowInput(!showInput);
  }

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/generation/${gen}`)
      .then((response) => response.json())
      .then((data) => {
        const pokemonApi = data.pokemon_species.sort(
          (a: any, b: any) =>
            a.url.replace(/[^\d]|(?<=v)\d/gm, "") -
            b.url.replace(/[^\d]|(?<=v)\d/gm, "")
        );

        setPokemonList(pokemonApi);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Layout>
      <Header
        name={name}
        showInput={showInput}
        handleShowInput={handleShowInput}
      />

      {showInput && (
        <View className="mb-3 px-5 py-3 flex-row items-center justify-center bg-white/5 border border-white/25 rounded-3xl">
          <Feather name="search" size={24} color="#999999" />

          <TextInput
            className="ml-2 flex-1"
            placeholder="Procurar Pókemon..."
            placeholderTextColor="#999999"
            value={search}
            onChangeText={(text) => setSearch(text)}
            style={{ color: "white" }}
            autoFocus
          />
        </View>
      )}

      <FlashList
        data={filteredPokemonList}
        keyExtractor={(item) => item.name}
        renderItem={renderItem}
        ItemSeparatorComponent={ListSeparator}
        contentContainerStyle={{ paddingBottom: 44 }}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={118}
        ListEmptyComponent={EmptyList}
      />
    </Layout>
  );
}
