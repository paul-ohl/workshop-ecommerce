import getImage from "./utils/getImagePath";
import { ConfigElement } from "./types/config-element";

interface ConsoleDisplayProps {
  colorsConfigs: ConfigElement[];
}

const ConsoleDisplay = ({ colorsConfigs }: ConsoleDisplayProps) => {
  const refs = colorsConfigs?.map((item) => item.refs).flat();
  const defaultRefs = refs.filter(
    (item) => item.pathToImg && item.isDefault === true
  );

  return (
    <div className="carousel rounded-box mx-4 md:w lg:w-3/6">
      <div className="relative carousel-item max-w-full min-h-full">
        <div className="absolute">
          <img src={getImage("side", "buttons_0000FF.png")} alt="" />
          {defaultRefs.map((item, index) => {
            if (!item.pathToImg) return null;
            const image = getImage("side", item.pathToImg);

            return <img key={index} src={image} alt="" />;
          })}
        </div>
      </div>
      <div className="relative carousel-item max-w-full min-h-full">
        {defaultRefs.map((item, index) => {
          if (!item.pathToImg) return null;
          const image = getImage("front", item.pathToImg);

          return <img key={index} src={image} alt="" />;
        })}
      </div>
      <div className="relative  carousel-item max-w-full min-h-full">
        <div className="absolute">
          {defaultRefs.map((item, index) => {
            if (!item.pathToImg) return null;
            const image = getImage("back", item.pathToImg);

            return <img key={index} src={image} alt="" />;
          })}
        </div>
      </div>
    </div>
  );
};

export default ConsoleDisplay;
