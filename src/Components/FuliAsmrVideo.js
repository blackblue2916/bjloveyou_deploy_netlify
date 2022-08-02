import React from "react";
import zien_01 from "../Assets/images/zien/zien_01.png";
import "../Styles/asmrVideos.css";

function FuliAsmrVideo({ account, orgUrl, img, id, bj, info }) {
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
            if (account === null) {
              alert("請登錄賬號觀看!");
              return;
            } else {
              jumpTo(`/fuliasmrVideoplayer/${id}`);
            }
          }}
        >
          <img src={img || zien_01} alt="" />
        </div>
      </div>
      <p className="bj-info">@:{bj + "__" + info}</p>
    </>
  );
}

export default FuliAsmrVideo;
