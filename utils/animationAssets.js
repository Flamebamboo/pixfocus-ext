// Import assets using relative paths
import rabbitGif from "../assets/Rabbit.gif";

export const AnimationAssets = {
  RABBIT: rabbitGif,
};

export const getAnimationAsset = (type) => {
  const normalizedType = type.toUpperCase();
  return AnimationAssets[normalizedType] || AnimationAssets.FIRE_CAMP;
};
