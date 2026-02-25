const CLOUDINARY_BASE_REGEX = /\/upload\//;

export const getCloudinaryUrl = (url: string, width: number, quality = 'auto'): string => {
  if (!url || !CLOUDINARY_BASE_REGEX.test(url)) return url;

  return url.replace('/upload/', `/upload/w_${width},q_${quality},f_auto/`);
};
