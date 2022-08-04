import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/share.css";

function SourceLink({ account, isVip, title, link, code }) {
  const navigate = useNavigate();
  const jumpTo = (url) => {
    const w = window.open(
      "_blank",
      "width=200, height=200, menubar=no, toolbar=no, status=no, scrollbars=yes"
    );
    w.location.href = url;
    w.focus();
  };

  return (
    <div className="source-link">
      <div className="preview-img-array">
        <img src="" alt="" />
        <img src="" alt="" />
        <img src="" alt="" />
        <img src="" alt="" />
      </div>
      <p className="title">{title}</p>
      <div className="link-box">
        <p
          onClick={() => {
            jumpTo(link);
          }}
          className="link-click"
        >
          百度云鏈接
        </p>
        <p>{isVip ? `提取碼: [ ${code} ]` : "提取碼: [ 贊助會員可查看 ]"}</p>
      </div>
    </div>
  );
}

export default SourceLink;
