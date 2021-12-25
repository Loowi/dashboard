import React, { useState } from "react";
import style from "./map.module.scss";
import { countries } from "./countries";

function Map({ data, scale, sdata,cdata }) {
  const [popUpPosition, setPopUpPosition] = useState({ x: 0, y: 0 });
  const [popUpDetails, setPopUpDetails] = useState({ name: null, value: -1 });
  const [popUpShow, setPopUpShow] = useState(false);
  const [selectedScale, setSelectedScale] = useState({ min: -1, max: -1 });

  const handleMouseEnter = (e, name, value) => {
    const popUpOffsetX = e.clientX > window.innerWidth * 0.8 ? 75 : 0;
    const popUpOffsetY = 75 - window.scrollY;
    const vl = result(name)
    console.log(vl);
    setPopUpPosition({ x: e.clientX - popUpOffsetX, y: e.clientY - popUpOffsetY });
    setPopUpDetails({ name, value:vl.Value });
    setPopUpShow(true);  
  };    
  const result = (e)=>{
    const fn = sdata?.find(list =>list.Country.toUpperCase() === e.toUpperCase())
    return fn
  }
  const handleMouseLeave = () => {
    setPopUpDetails({ name: null, value: -1 });
    setPopUpShow(false);
  };

  const handleMouseEnterScale = (min, max) => {  
    setSelectedScale({ min, max });
  };

  const handleMouseLeaveScale = () => {
    setSelectedScale({ min: -1, max: -1 });
  };

  const isInRange = (min, max) => {
    return popUpDetails.value >= min && popUpDetails.value < max;
  };

  const isCountrySelected = (name) => {
    const value = data[name]?.value;
    return popUpDetails.name === name || (value >= selectedScale.min && value < selectedScale.max);
  };

  const capitalizeFirstLetter = (string) => {  
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const formatName = (name) => {
    if (!name) return;
    const names = name.split("-");
    return names.map((item) => capitalizeFirstLetter(item)).join(" ");
  };
   console.log(sdata,cdata,countries,scale)
  return (
    <div className={style.wrapper}>
      <div
        className={popUpShow ? style.popUp : `${style.popUp} ${style.popUpHide}`}
        style={{ left: popUpPosition.x, top: popUpPosition.y }}
      >
        <p className={style.countryName}>{formatName(popUpDetails.name)}</p>
        <p className={style.value}>{popUpDetails.value}</p>
      </div>
      <svg className={style.svg} version="1.1" id="Vrstva_1" x="0px" y="0px" viewBox="0 0 158.5 184.6">
        {cdata.map((e)=> {
          return countries.map((country, key) => (
            country.name === e.toLowerCase()?
            <country.path
            onMouseEnter={(e) => handleMouseEnter(e, country.name,  data[country.name]?.value)}
            onMouseLeave={handleMouseLeave}
            stroke="#419189"
            fill={data[country.name]?.color || "#fff"}
            strokeWidth={isCountrySelected(country.name) ? 0.3 : 0}
          />
          :null
          ))
        })}  
      </svg>
      <div className={style.scaleContainer}>
        <div className={style.scale}>
          {scale.map((item, key) => (
            <div className={style.scaleBoxContainer} key={key}>
              <div className={style.scaleValue}>
                <div>{item.min}</div>
                {scale.length === key + 1 && <div>{item.max}</div>}
              </div>
              <div
                onMouseEnter={() => handleMouseEnterScale(item.min, item.max)}
                onMouseLeave={() => handleMouseLeaveScale()}
                className={isInRange(item.min, item.max) ? style.scaleBoxSelected : style.scaleBox}
                style={{ backgroundColor: item.color }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Map;
