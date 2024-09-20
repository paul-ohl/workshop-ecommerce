const getImagePath = (path: string, orientation: string) => {
  return `../../../assets/${orientation}/${path}`;
};

export default getImagePath;
