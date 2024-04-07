const base = "https://image.tmdb.org/t/p/";

export const getCroppedImageUrl = (url?: string, small?: boolean) => {
  if (!url) return "no-image";

  if (small) return base + "w300_and_h450_bestv2" + url;

  return base + "w1280" + url;
};

const imageBase = "https://media.themoviedb.org/t/p/w276_and_h350_face/";

export const getProfileImage = (url?: string) => {
  if (!url) return "no-image";

  return imageBase + url;
};
