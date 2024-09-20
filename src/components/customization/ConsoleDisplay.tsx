import testImage from "../../assets/front/shell_000000.jpg";
import testImage2 from "../../assets/front/buttons_000000.png";
import testBlueImage2 from "../../assets/front/buttons_0000FF.png";
import testSideImage from "../../assets/side/shell_000000.jpg";
import testSideImage2 from "../../assets/side/buttons_000000.png";
import testSideBlueImage2 from "../../assets/side/buttons_0000FF.png";
import testBackImage from "../../assets/back/shell_000000.jpg";
import testBackImage2 from "../../assets/back/buttons_000000.png";
import testBackBlueImage2 from "../../assets/back/buttons_0000FF.png";
import getImagePath from "./utils/getImagePath";
import { useEffect, useState } from "react";

interface ConsoleDisplayProps {
  configs: any;
}

const ConsoleDisplay = ({ configs }: ConsoleDisplayProps) => {
  console.log(configs);
  return (
    <div className="carousel rounded-box mx-4 md:w lg:w-3/6">
      <div className="relative carousel-item max-w-full min-h-full">
        <div className="absolute">
          <img
            src={configs ? testSideImage2 : testSideBlueImage2}
            alt=""
            className=""
          />
        </div>
        {
          <div>
            <img src={testSideImage} alt="" className="" />
          </div>
        }
      </div>
      <div className="relative carousel-item max-w-full min-h-full">
        <div className="absolute">
          <img src={configs ? testImage2 : testBlueImage2} className="" />
        </div>
        <div>
          <img src={testImage} className="" />
        </div>
      </div>
      <div className="relative  carousel-item max-w-full min-h-full">
        <div className="absolute">
          <img
            src={configs ? testBackImage2 : testBackBlueImage2}
            alt=""
            className=""
          />
        </div>
        <div>
          <img src={testBackImage} alt="" className="" />
        </div>
      </div>
    </div>
  );
};

export default ConsoleDisplay;
