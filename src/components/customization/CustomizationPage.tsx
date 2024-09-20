import { useEffect, useState } from "react";
import AddToCart from "./AddToCart";
import ColorsConfiguration from "./ColorsConfiguration";
import ColorsLabels from "./ColorsLabels";
import ConsoleDisplay from "./ConsoleDisplay";
import useGetAllConfigs from "./utils/useGetAllConfig";

const CustomizationPage = () => {
  const [isColorsConfigurationDisplayed, setIsColorsConfigurationDisplayed] =
    useState(false);
  //node-back/config

  const { data, error, isLoading } = useGetAllConfigs();

  const techConfigs = data?.[0].techConfigs;
  const colorsConfigs = data?.[0].colorsConfigs;

  const [colorsToDisplay, setColorsToDisplay] = useState<any[]>([]);
  const [extraColorConfigs, setExtraColorConfigs] = useState<any>();
  const [extraConfigs, setExtraConfigs] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Il y a un soucis...</div>;
  }

  return (
    data && (
      <>
        <div className="text-white bg-gray-900 p-6 pt-20">
          <p className="font-extralight">À partir de 149€</p>
          <p className="font-extrabold text-3xl">GAMEBOY ADVANCE SP</p>
        </div>
        <div className="text-center text-white font-extralight bg-slate-100 py-6"></div>
        <ColorsLabels
          colorsConfigs={colorsConfigs}
          setColorsToDisplay={setColorsToDisplay}
          setIsColorsConfigurationDisplayed={setIsColorsConfigurationDisplayed}
        />
        <div className="flex flex-col justify-center items-center">
          <div className="lg:flex lg:justify-around lg:w-5/6 md:flex md:justify-center md:">
            <ColorsConfiguration
              colorsToDisplay={colorsToDisplay}
              extraColorConfigs={extraColorConfigs}
              setExtraColorConfigs={setExtraColorConfigs}
              isColorsConfigurationDisplayed={isColorsConfigurationDisplayed}
              setIsColorsConfigurationDisplayed={
                setIsColorsConfigurationDisplayed
              }
            />
            <ConsoleDisplay configs={extraColorConfigs} />
            <div className="">
              <AddToCart
                totalPrice={totalPrice}
                setTotalPrice={setTotalPrice}
                extraConfigs={extraConfigs}
                setExtraConfigs={setExtraConfigs}
                techConfigs={techConfigs}
              />
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default CustomizationPage;
