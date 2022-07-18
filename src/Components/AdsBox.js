import React, { useEffect } from "react";
import "../Styles/adsBox.css";
import ads_left from "../Assets/images/ads_left.png";
import ads_right from "../Assets/images/ads_right.png";

function AdsBox({ className, type }) {
  useEffect(() => {}, [className, type]);

  const leftAdsUrl = "https://justmysocks.net/members/aff.php?aff=21981";
  const rightAdsUrl =
    "https://www.youtube.com/channel/UCGuiz0Z-bz6B8xomTtBfLmw";

  const toUrl = () => {
    const w = window.open(
      "_blank",
      "width=200, height=200, menubar=no, toolbar=no, status=no, scrollbars=yes"
    );
    w.location.href = type === "left" ? leftAdsUrl : rightAdsUrl;
    w.focus();
  };

  return (
    <>
      <img
        onClick={() => {
          toUrl();
        }}
        src={type === "left" ? ads_left : ads_right}
        className={className}
        alt=""
      />
    </>
  );
}

export default AdsBox;
