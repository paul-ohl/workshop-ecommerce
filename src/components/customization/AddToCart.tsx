import { RxCross2 } from "react-icons/rx";

import TechConfiguration from "./TechConfiguration";
import { Config } from "../../types/config";
import { useEffect, useState } from "react";
interface AddToCartProps {
  totalPrice: number;
  setTotalPrice: (value: number) => void;
  extraConfigs: any;
  setExtraConfigs: (value: any) => void;
  techConfigs: any;
}

const AddToCart = ({
  totalPrice,
  setTotalPrice,
  extraConfigs,
  setExtraConfigs,
  techConfigs,
}: AddToCartProps) => {
  useEffect(() => {
    const total = extraConfigs.reduce(
      (accumulator, currentValue) => accumulator + currentValue.value,
      0
    );

    setTotalPrice(total);
  }, [extraConfigs]);

  return (
    <div className="flex flex-wrap justify-center">
      <div className="inline px-5 py-2 rounded-lg shadow-xl w-72">
        <div className="py-5">
          <p className="text-5xl font-bold">
            {(149 + totalPrice).toFixed(2)} €
          </p>
          <p className="text-sm">Prix Total</p>
        </div>
        <div className="py-2">
          <p className="text-sm">
            Accompte (30%) : {((totalPrice / 100) * 30).toFixed(2)} €
          </p>
          <p className="text-sm">Livraison dans 35 - 40 jours</p>
        </div>
        <div className="flex flex-col mt-4">
          {extraConfigs.length > 0 && (
            <p className="font-bold pb-2">ÉLEMENT(S) AJOUTÉ(S)</p>
          )}
          {extraConfigs.map((config, index) => {
            return (
              <div
                key={index}
                className="flex items-center p-1 hover:text-blue-600 cursor-pointer"
                onClick={() =>
                  setExtraConfigs(
                    extraConfigs.filter((item) => item !== config)
                  )
                }
              >
                <span className="text-sm font-semibold">+ {config.label}</span>
                <RxCross2 size={20} className="mt-1 mx-2" />
              </div>
            );
          })}
        </div>
        <div className="py-7 flex flex-col justify-center">
          <TechConfiguration
            techConfigs={techConfigs}
            extraConfigs={extraConfigs}
            setExtraConfigs={setExtraConfigs}
          />
          <button className="px-5 py-2 mt-4 text-white font-bold bg-black rounded-3xl hover:bg-blue-600">
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToCart;
