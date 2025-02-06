import { RxCross2 } from "react-icons/rx";

import { RefType } from "./types/ref";
import { ConfigElement } from "./types/config-element";

interface ColorsConfigurationProps {
  colorsToDisplay: ConfigElement | undefined;
  extraColorConfigs: RefType[];
  setExtraColorConfigs: React.Dispatch<React.SetStateAction<RefType[]>>;
  isColorsConfigurationDisplayed: boolean;
  setIsColorsConfigurationDisplayed: (value: boolean) => void;
}

const ColorsConfiguration = ({
  colorsToDisplay,
  extraColorConfigs,
  setExtraColorConfigs,
  isColorsConfigurationDisplayed,
  setIsColorsConfigurationDisplayed,
}: ColorsConfigurationProps) => {
  const handleExtraColorConfigs = (config: RefType) => {
    if (!extraColorConfigs.includes(config)) {
      return setExtraColorConfigs(extraColorConfigs.concat(config));
    }

    return setExtraColorConfigs(
      extraColorConfigs.filter((item) => item !== config)
    );
  };

  return (
    isColorsConfigurationDisplayed && (
      <div className="absolute left-4 z-20">
        <li className="flex flex-col items-center bg-white w-14 p-4 rounded-2xl shadow-2xl">
          {colorsToDisplay?.refs.map((item: RefType, index: number) => {
            return (
              <div
                key={index}
                onClick={() => handleExtraColorConfigs(item)}
                style={{ backgroundColor: item.color }}
                className={`badge badge-lg m-2 cursor-pointer hover:border-2 hover:border-red-300`}
              ></div>
            );
          })}
          <RxCross2
            size={30}
            className="mt-4 hover:text-blue-600 cursor-pointer"
            onClick={() => setIsColorsConfigurationDisplayed(false)}
          />
        </li>
      </div>
    )
  );
};

export default ColorsConfiguration;
