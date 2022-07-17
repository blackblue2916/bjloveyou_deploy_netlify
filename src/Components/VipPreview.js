import React from "react";
import zien_01 from "../Assets/images/zien/zien_01.png";
import "../Styles/vipVideos.css";
function VipPreview({ img, bj, info }) {
  return (
    <>
      <div className="video-container">
        <div
          className="preview-img"
          onClick={() => {
            alert("請先成爲贊助會員");
          }}
        >
          <img src={img || zien_01} alt="" />
        </div>
      </div>
      <p className="bj-info">@:{bj + "__" + info}</p>
    </>
  );
}

export default VipPreview;
