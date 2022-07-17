import React from "react";
import { auth, provider } from "../Helper/Chat_Auth_FirebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login({ setIsAuth }) {
  let navigate = useNavigate(); // 定义一个指定网址, 重定向

  const singInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/hot"); // 去到这个网址
    });
  };
  return (
    <div className="loginPage">
      <button className="login-with-btn" onClick={singInWithGoogle}>
        Sign up
      </button>
    </div>
  );
}

export default Login;
