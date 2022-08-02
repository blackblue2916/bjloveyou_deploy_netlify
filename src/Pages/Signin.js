import React, { useState } from "react";
import { auth } from "../Helper/Chat_Auth_FirebaseConfig";
import { db } from "../Helper/Chat_Auth_FirebaseConfig";
// import axios from "axios";
// import { registerRoute } from "../utils/APIRoutes";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  addDoc,
  // getDoc,
  // getDocs,
  collection,
  // orderBy,
  // query,
  // limit,
  // startAfter,
  // deleteDoc,
  // doc,
  // onSnapshot,
  serverTimestamp,
  // setDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../Styles/signin.css";

function Signin() {
  const navigate = useNavigate();
  const btnActiveStyle = { backgroundColor: "#3c91b6", color: "#fff" };
  const btnNotActiveStyle = { backgroundColor: "#808080", color: "#000" };
  const [activeItem, setActiveItem] = useState("register");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const vipUsersRef = collection(db, "vip_users");

  // register
  const register = async () => {
    // 注册到 firebase
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      if (user !== null) {
        await createVipInfo();
        if (user !== null) {
          sessionStorage.setItem("user", email);
        }
      }
      navigate("/");
      // window.location.reload();
    } catch (error) {
      alert(error.code);
      // toast.error("出了點問題:", {
      //   position: "bottom-right",
      //   autoClose: 8000,
      //   pauseOnHover: true,
      //   draggable: true,
      //   theme: "dark",
      // });
    }
  };

  // login
  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      if (user !== null) {
        sessionStorage.setItem("user", email);
      }
      navigate("/");
      // const delay = (ms) => new Promise((res) => setTimeout(res, ms));
      // await delay(300);
      // window.location.reload();
    } catch (error) {
      alert(error.code);
    }
  };

  // ADD 一個新用戶到數據庫
  const createVipInfo = async () => {
    await addDoc(vipUsersRef, {
      user: email,
      vip: false,
      superVip: false,
      createdAt: serverTimestamp(),
    });
  };
  return (
    <div className="signin-page">
      <div className="log-sign">
        <button
          onClick={() => {
            setActiveItem("register");
          }}
          style={activeItem === "register" ? btnActiveStyle : btnNotActiveStyle}
        >
          注冊/Register
        </button>
        <button
          onClick={() => {
            setActiveItem("signin");
          }}
          style={activeItem === "signin" ? btnActiveStyle : btnNotActiveStyle}
        >
          登錄/SignUp
        </button>
      </div>
      <div className="input-container">
        <p>Emai:</p>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          value={email}
          placeholder="email..."
        ></input>
        <p>Password:</p>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          value={password}
          placeholder="password..."
        ></input>
        <button onClick={activeItem === "register" ? register : login}>
          {activeItem === "register" && "提交注冊"}
          {activeItem === "signin" && "登錄"}
        </button>
      </div>
      {
        <p>{`請務必使用正確的郵箱賬號注冊,系統將隨機驗證您郵箱的有效性,一經發現虛假郵箱,系統將會永久刪除您的賬號資料!`}</p>
      }
    </div>
  );
}

export default Signin;
