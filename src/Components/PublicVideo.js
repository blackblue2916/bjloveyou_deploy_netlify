import React from "react";
import "../Styles/public-video.css";
// import zien_01 from "../Assets/images/zien/zien_01.png";

function PublicVideo({ img, id, bj, info }) {
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
            jumpTo(`/videoplayer/${id}`);
          }}
        >
          <img src={img} alt="" />
        </div>
      </div>
      <p className="bj-info">@:{bj + " : " + info}</p>
    </>
  );
}

export default PublicVideo;
