const images = import.meta.glob("/src/assets/*/*.{jpg,png}", { eager: true });

type Section = "front" | "side" | "back";

const getImage = (section: Section, fileName: string): string | undefined => {
  const path = `/src/assets/${section}/${fileName}`;
  return (images[path] as { default: string })?.default;
};

export default getImage;
