import { Image } from "react-native";

interface PokemonImageProps {
  pokemonId: number;
  size?: number;
}

export function PokemonImage({ pokemonId, size = 80 }: PokemonImageProps) {
  return (
    <Image
      source={{
        uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`,
      }}
      className="-m-4"
      style={{ height: size, width: size }}
    />
  );
}
