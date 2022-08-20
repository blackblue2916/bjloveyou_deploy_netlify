import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/share.css";
import icon from "../Assets/images/ads.jpg";

function SourceLink({ id, title, panlink, code }) {
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
      <p>資源編號: {id}</p>
      <img src={icon} />
      <h1>{title}</h1>
      <div className="link-info">
        <p>
          {panlink ? (
            <a href={panlink} target="blank">
              百度網盤
            </a>
          ) : (
            "贊助會員可查看"
          )}
        </p>
        <p>提取碼: {code || "贊助會員可查看"}</p>
      </div>
      <p>
        <span style={{ color: "yellow" }}> 解壓密碼 : </span>
        <span style={{ color: "red" }}> www.bjloveyou.com</span>
      </p>
    </div>
  );
}

export default SourceLink;
