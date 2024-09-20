import { useState } from "react";
import { Config } from "../../types/config";
import { DynamicConfigs } from "../../types/dynamic-configs";

interface TechConfigurationProps {
  extraConfigs: any;
  setExtraConfigs: (value: any) => void;
  techConfigs: any;
}

const TechConfiguration = ({
  extraConfigs,
  setExtraConfigs,
  techConfigs,
}: TechConfigurationProps) => {
  const handleTechConfigSelection = (config) => {
    if (!extraConfigs.includes(config)) {
      return setExtraConfigs(extraConfigs.concat(config));
    }

    return setExtraConfigs(extraConfigs.filter((item) => item !== config));
  };
  return (
    <>
      <p className="text-xl font-bold">CONFIGURATIONS</p>
      <p className="text-sm mb-4">
        Modifiez les configurations initials <br /> de votre appareil{" "}
      </p>
      {techConfigs?.map((item, index) => {
        return (
          <div key={index}>
            <div className="collapse collapse-arrow">
              <input type="radio" name="my-accordion-1" />
              <div className="collapse-title w-full p-1">
                <p className="text-base font-medium">{item.title}</p>
                <p className="text-sm">{item.description}</p>
              </div>
              <div className="collapse-content flex flex-col justify-center items-start">
                {item?.ref.map((item, index) => {
                  return (
                    <span
                      key={index}
                      className={`inline text-sm my-1 p-2 px-3 border-2 ${
                        extraConfigs.includes(item)
                          ? "border-slate-500"
                          : "border-slate-200"
                      } rounded-full ${
                        extraConfigs.includes(item)
                          ? "hover:border-slate-200"
                          : "hover:border-slate-500"
                      } cursor-pointer`}
                      onClick={() => handleTechConfigSelection(item)}
                    >
                      {item.label}
                    </span>
                  );
                })}
              </div>
            </div>
            <span className="divider m-0"></span>
          </div>
        );
      })}
    </>
  );
};

export default TechConfiguration;
