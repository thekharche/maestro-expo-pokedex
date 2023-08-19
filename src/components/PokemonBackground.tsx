import { LinearGradient } from "expo-linear-gradient";
import clsx from "clsx";

interface PokemonBackgroundProps {
  type?: string;
}

export function PokemonBackground({ type }: PokemonBackgroundProps) {
  return (
    <LinearGradient
      start={{ x: 0, y: 1 }}
      end={{ x: 0, y: 0.4 }}
      colors={["rgba(0,0,0,.7)", "transparent"]}
      className={clsx("absolute w-screen h-56 rounded-b-full -mt-8", {
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
    />
  );
}
