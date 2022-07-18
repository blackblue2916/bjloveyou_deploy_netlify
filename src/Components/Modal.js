import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/modal.css";

function Modal({ closeModal }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="modal-background" />
      <div className="modal-container">
        <div className="title">
          <h2>主播愛你哦</h2>
        </div>
        <div className="infomation">
          <p>{"會員區需要贊助會員資格,如果有對你造成任何不便,深感抱歉!"}</p>
        </div>
        <div className="modal-foote">
          <button
            className="buyGold-btn"
            onClick={() => {
              navigate("/vip");
            }}
          >
            {`成爲贊助會員?`}
          </button>
          <button
            className="close-btn"
            onClick={() => {
              closeModal(true);
            }}
          >
            關閉提示
          </button>
        </div>
      </div>
    </>
  );
}

export default Modal;
