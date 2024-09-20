import { RxCross2 } from "react-icons/rx";
import { Config } from "../../types/config";

interface ColorsConfigurationProps {
  colorsToDisplay: any;
  extraColorConfigs: any;
  setExtraColorConfigs: (value: any) => void;
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
  const handleExtraColorConfigs = (value: any) => {};
  console.log(colorsToDisplay);
  return (
    isColorsConfigurationDisplayed && (
      <div className="absolute left-4 z-20">
        <li className="flex flex-col items-center bg-white w-14 p-4 rounded-2xl shadow-2xl">
          {colorsToDisplay?.ref.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => setExtraColorConfigs(!extraColorConfigs)}
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
