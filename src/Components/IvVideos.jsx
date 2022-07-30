import React from "react";
import "../Styles/vipVideos.css";

function IvVideos({ orgUrl, isVip, img, id, bj, info }) {
  const jumpTo = (url) => {
    const w = window.open(
      "_blank",
      "width=200, height=200, menubar=no, toolbar=no, status=no, scrollbars=yes"
    );
    w.location.href = url;
    w.focus();
  };
  return (
    <>
      <div className="video-container">
        <div
          className="preview-img"
          onClick={() => {
            jumpTo(`/ivVideoplayer/${id}`);
          }}
        >
          <img src={img} alt="" />
        </div>
      </div>
      <p className="bj-info">@:{bj + "__" + info}</p>
    </>
  );
}

export default IvVideos;
