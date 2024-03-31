import noImage from "@/assets/icons/image.svg";

const base = "https://image.tmdb.org/t/p/";

export const getCroppedImageUrl = (url?: string, small?: boolean) => {
  if (!url) return noImage;

  if (small) return base + "w300_and_h450_bestv2" + url;

  return base + "w1280" + url;
};
