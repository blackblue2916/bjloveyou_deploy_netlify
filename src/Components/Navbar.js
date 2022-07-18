import React, { useEffect } from "react";
import "../Styles/navbar.css";
import loginIcon from "../Assets/images/login.png";
import outIcon from "../Assets/images/out.png";
// import vipIcon from "../Assets/images/vip.png";
import superVipIcon from "../Assets/images/supervip.png";
import { auth } from "../Helper/Chat_Auth_FirebaseConfig";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";
import FacebookIcon from "@mui/icons-material/Face";

// Link 其实就是 a 标签的强壮体

function Navbar({ focus, account, isVip, isSuperVip }) {
  const navigate = useNavigate();
  // log out
  const logout = async () => {
    await signOut(auth);
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
    navigate("/");
  };
  useEffect(() => {}, [account, isVip, isSuperVip]);
  // const checkVipState = () => {
  //   if (account !== null) {
  //     if (isSuperVip) {
  //       return <img className="vip-icon" src={vipIcon} alt="" />;
  //     } else if (isVip && !isSuperVip) {
  //       return <img className="vip-icon" src={superVipIcon} alt="" />;
  //     }
  //   }
  // };

  return (
    <div className="navbar-box">
      <div className="navbar">
        <Link className={focus === "/home" ? "focus" : "na"} to="/">
          免費區
        </Link>
        <Link className={focus === "/hot" ? "focus" : "na"} to="/hot">
          會員區
        </Link>
        <Link className={focus === "/asmr" ? "focus" : "na"} to="/asmr">
          ASMR
        </Link>
        <Link className={focus === "/share" ? "focus" : "na"} to="/share">
          分享
        </Link>
        <Link className={focus === "/vip" ? "focus" : "na"} to="/vip">
          贊助
        </Link>
        <Link className={focus === "/other" ? "focus" : "na"} to="/other">
          關於
        </Link>
        {/* <Link to="/webchat">Chat</Link> */}
        <div className="account-box">
          {/* <p className="user-email">{currentUserEmail}</p> */}
          {account === null ? (
            <NoAccountsIcon className="state-false" />
          ) : (
            <FacebookIcon className="state-true" />
          )}
          {isVip && !isSuperVip && (
            <img className="vip-icon" src={superVipIcon} alt="" />
          )}
          {isSuperVip && <img className="vip-icon" src={superVipIcon} alt="" />}
          {account === null ? (
            <Link to="/signin">
              <img className="login-icon" src={loginIcon} alt="" />
            </Link>
          ) : (
            <img className="out-icon" src={outIcon} alt="" onClick={logout} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
