export function getImageSource(imageIndex: number) {
  const imageSourceList = [
    require("../assets/kanto.png"),
    require("../assets/johto.png"),
    require("../assets/hoenn.png"),
    require("../assets/kalos.png"),
    require("../assets/sinnoh.png"),
    require("../assets/unova.png"),
    require("../assets/alola.png"),
  ];

  return imageSourceList[imageIndex - 1];
}
