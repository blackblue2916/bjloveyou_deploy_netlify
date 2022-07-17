import React from "react";
import ad_Icon from "../Assets/images/ads_02.jpg";
import "../Styles/adsBox.css";

function AdsBox({ className }) {
  return (
    <>
      <img src={ad_Icon} className={className} alt="" />
    </>
  );
}

export default AdsBox;
