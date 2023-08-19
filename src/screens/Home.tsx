import { Text } from "react-native";
import { FlashList } from "@shopify/flash-list";

import { Layout } from "../components/Layout";
import { ListSeparator } from "../components/ListSeparator";
import { RegionItem } from "../components/RegionItem";

import { regions } from "../utils/regionsData";

export function Home() {
  return (
    <Layout>
      <Text className="font-600 text-lg text-gray-200 mb-5">Regions</Text>
      <FlashList
        data={regions}
        renderItem={({ item }) => <RegionItem {...item} />}
        keyExtractor={(item) => item.name}
        ItemSeparatorComponent={ListSeparator}
        contentContainerStyle={{ paddingBottom: 44 }}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={114}
      />
    </Layout>
  );
}
