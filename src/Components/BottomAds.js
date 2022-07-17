import React from "react";
import "../Styles/bottomAds.css";

function BottomAds({ setCloseAdsModal }) {
  return (
    <>
      <div className="bottom-ads-container">
        <h5
          onClick={() => {
            setCloseAdsModal(true);
          }}
        >
          X
        </h5>
      </div>
    </>
  );
}

export default BottomAds;
