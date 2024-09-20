import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

interface ColorsLabelsProps {
  colorsConfigs: any;
  setColorsToDisplay: (value: any) => void;
  setIsColorsConfigurationDisplayed: (value: boolean) => void;
}

const ColorsLabels = ({
  colorsConfigs,
  setColorsToDisplay,
  setIsColorsConfigurationDisplayed,
}: ColorsLabelsProps) => {
  const handleRefSelection = (item) => {
    setColorsToDisplay(item);
    setIsColorsConfigurationDisplayed(true);
  };

  return (
    <div className="flex justify-center items-center m-4">
      <MdKeyboardDoubleArrowLeft size={25} className="m-1" />
      <ul className="bg-base-200 carousel rounded-box max-w-96">
        {colorsConfigs?.map((item, index) => {
          return (
            <li
              key={index}
              className="flex items-center px-4 py-2 rounded-3xl relative carousel-item hover:bg-black hover:text-slate-100 cursor-pointer"
            >
              <span
                className="text-lg font-semibold"
                onClick={() => handleRefSelection(item)}
              >
                {item.title}
              </span>
            </li>
          );
        })}
      </ul>
      <MdKeyboardDoubleArrowRight size={25} className="m-1" />
    </div>
  );
};

export default ColorsLabels;
