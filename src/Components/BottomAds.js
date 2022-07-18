import React from "react";
import "../Styles/bottomAds.css";
import bottomAdsIcon from "../Assets/images/bottomAdsIcon.png";

function BottomAds({ setCloseAdsModal }) {
  const toUrl = (url) => {
    const w = window.open(
      "_blank",
      "width=200, height=200, menubar=no, toolbar=no, status=no, scrollbars=yes"
    );
    w.location.href = url;
    w.focus();
  };
  return (
    <>
      <div className="bottom-ads-container">
        <p onClick={() => setCloseAdsModal(true)}>
          友情提示:中國内地網友請自行解決魔法上網環境,以避免視頻無法觀看,注冊等問題
          [ 點擊關閉廣告 ].
        </p>
        <img
          onClick={() => {
            toUrl("https://www.youtube.com/channel/UCGuiz0Z-bz6B8xomTtBfLmw");
          }}
          src={bottomAdsIcon}
          alt=""
        />
      </div>
    </>
  );
}

export default BottomAds;
