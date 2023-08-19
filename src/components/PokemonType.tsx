import { View, Text } from "react-native";
import clsx from "clsx";

interface PokemonTypeProps {
  type: string;
}

export function PokemonType({ type }: PokemonTypeProps) {
  return (
    <View
      className={clsx("px-3 py-1 rounded-full mr-2", {
        ["bg-type-water"]: type === "water",
        ["bg-type-grass"]: type === "grass",
        ["bg-type-fire"]: type === "fire",
        ["bg-type-bug"]: type === "bug",
        ["bg-type-electric"]: type === "electric",
        ["bg-type-normal"]: type === "normal",
        ["bg-type-ground"]: type === "ground",
        ["bg-type-fairy"]: type === "fairy",
        ["bg-type-rock"]: type === "rock",
        ["bg-type-poison"]: type === "poison",
        ["bg-type-psychic"]: type === "psychic",
        ["bg-type-steel"]: type === "steel",
        ["bg-type-dragon"]: type === "dragon",
        ["bg-type-fighting"]: type === "fighting",
        ["bg-type-dark"]: type === "dark",
        ["bg-type-ghost"]: type === "ghost",
        ["bg-type-ice"]: type === "ice",
        ["bg-type-flying"]: type === "flying",
      })}
    >
      <Text className="font-500 text-sm capitalize">{type}</Text>
    </View>
  );
}
