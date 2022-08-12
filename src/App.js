import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

// 路由器
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import AdsBox from "./Components/AdsBox";
import Logo from "./Components/Logo";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import BottomAds from "./Components/BottomAds";
import Home from "./Pages/Home";
import Signin from "./Pages/Signin";
import Hot from "./Pages/Hot";
import Asmr from "./Pages/Asmr";
import Vip from "./Pages/Vip";
import Share from "./Pages/Share";
import Other from "./Pages/Other";
import PageNotFound from "./Pages/PageNotFound";
import VideoPlayer from "./Pages/VideoPlayer";
import FanVideoPlayer from "./Pages/FanVideoPlayer";
import VipVideoPlayer from "./Pages/VipVideoPlayer";
import IvVideoPlayer from "./Pages/IvVideoPlayer";
import AsmrVideoPlayer from "./Pages/AsmrVideoPlayer";
import FuliAsmrVideoPlayer from "./Pages/FuliAsmrVideoPlayer";

import { getDoc, getDocs, collection, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db } from "./Helper/Chat_Auth_FirebaseConfig";
import { auth } from "./Helper/Chat_Auth_FirebaseConfig";

function App() {
  const [freeVideos_db, setFreeVideosList] = useState([]);
  const [fanVideos_db, setFanVideosList] = useState([]);
  const [vipVideos_db, setVipVideos] = useState([]);
  const [asmrVideos_db, setAsmrVideos] = useState([]);
  const [ivVideos_db, setIvVideos] = useState([]);
  const [fuliAsmrVideos_db, setFuliAsmrVideos] = useState([]);

  const vipUsersRef = collection(db, "vip_users");
  const [focus, setFocus] = useState("/home");
  const [showNavbar, setNavbar] = useState(true);
  const [showSideAds, setSideAds] = useState(true);
  const [account, setAccount] = useState(null);
  const [currentUserId, setCurrentUserId] = useState("");
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  const [isVip, setVip] = useState(false);
  const [isSuperVip, setSuperVip] = useState(false);

  const [isCloseAdsModal, setCloseAdsModal] = useState(false);

  let tempEmail = "";

  useEffect(() => {
    let runEffect = true;

    if (runEffect) {
      // GET API 免費舞蹈視頻
      axios
        .get(process.env.REACT_APP_FREE_VIDEOS_02)
        .then((res) => {
          let array = res.data.sort((a, b) => {
            if (a.timeAt < b.timeAt) return 1;
            return -1;
          });
          setFreeVideosList(array);
        })
        .catch((error) => console.log("error: " + error));

      // GET API 網友提供視頻(有水印或雜項)
      axios
        .get(process.env.REACT_APP_FAN_VIDEOS_02)
        .then((res) => {
          let array = res.data.sort((a, b) => {
            if (a.timeAt < b.timeAt) return -1;
            return 1;
          });
          setFanVideosList(array);
        })
        .catch((error) => console.log("error: " + error));

      // GET API 會員舞蹈視頻
      axios
        .get(process.env.REACT_APP_VIP_VIDEOS_02)
        .then((res) => {
          let array = res.data.sort((a, b) => {
            if (a.timeAt < b.timeAt) return -1;
            return 1;
          });
          setVipVideos(array);
        })
        .catch((error) => console.log("error: " + error));

      // GET API 寫真視頻
      axios
        .get(process.env.REACT_APP_IV_VIDEOS_02)
        .then((res) => {
          let array = res.data.sort((a, b) => {
            if (a.timeAt < b.timeAt) return -1;
            return 1;
          });
          setIvVideos(array);
        })
        .catch((error) => console.log("error: " + error));

      // GET API ASMR視頻
      axios
        .get(process.env.REACT_APP_ASMR_VIDEOS_02)
        .then((res) => {
          let array = res.data.sort((a, b) => {
            if (a.timeAt < b.timeAt) return -1;
            return 1;
          });
          setAsmrVideos(array);
        })
        .catch((error) => console.log("error: " + error));

      // GET API 音頻MP4視頻
      axios
        .get(process.env.REACT_APP_FULIASMR_VIDEOS_02)
        .then((res) => {
          let array = res.data.sort((a, b) => {
            if (a.timeAt < b.timeAt) return -1;
            return 1;
          });
          setFuliAsmrVideos(array);
        })
        .catch((error) => console.log("error: " + error));

      // Git fuli videos links 福利ASMR定制視頻

      try {
        const storageAccountEmail = sessionStorage.getItem("accountEmail");
        const storageAccount = sessionStorage.getItem("account");
        if (storageAccountEmail !== null) {
          tempEmail = storageAccountEmail;
          setCurrentUserEmail(storageAccountEmail);
          if (storageAccount !== null) {
            setAccount(storageAccount);
          }
        } else {
          onAuthStateChanged(auth, (currentAccount) => {
            if (currentAccount != null) {
              setAccount(currentAccount);
              setCurrentUserEmail(currentAccount.email);
              tempEmail = currentAccount.email;
              sessionStorage.setItem("account", currentAccount);
              sessionStorage.setItem("accountEmail", currentAccount.email);
            }
          });
        }
      } catch (error) {
        console.log(error.code);
      }
      updateAccount();
    }

    return () => {
      runEffect = false;
    };
  }, [account]);

  const updateAccount = () => {
    // 方案02 獲取 vip 用戶訊息 id & gold
    try {
      const getUsers = async () => {
        let data = null;
        let id = "null";
        let vip = false;
        let superVip = false;
        let registerTime = null;

        // 臨時存儲一個用戶 ID 避免多次遍歷用戶列表
        const storageId = localStorage.getItem("userId");
        if (storageId !== null) {
          data = await getDocs(vipUsersRef);
          let docRef = doc(db, "vip_users", storageId);
          getDoc(docRef).then((doc) => {
            id = doc.id;
            vip = doc.data().vip;
            superVip = doc.data().superVip;
            registerTime = doc.data().createdAt.seconds;
            setCurrentUserId(id);
            localStorage.setItem("userId", doc.id);
            sessionStorage.setItem("createdAt", doc.data().createdAt.seconds);
            setVip(vip);
            setSuperVip(superVip);
          });
        } else {
          // 02 提取單個比較
          const storageAccount = sessionStorage.getItem("account");
          if (storageAccount !== null) {
            data = await getDocs(vipUsersRef);
            data.docs.filter((doc) => {
              if (doc.data().user === tempEmail) {
                id = doc.id;
                vip = doc.data().vip;
                superVip = doc.data().superVip;
                registerTime = doc.data().createdAt.seconds;
                setCurrentUserId(id);
                setVip(vip);
                setSuperVip(superVip);
                localStorage.setItem("userId", doc.id);
                sessionStorage.setItem(
                  "createdAt",
                  doc.data().createdAt.seconds
                );
              }
            });
          }
        }
      };
      getUsers();
    } catch (error) {
      console.log(error.code);
      alert(error.code);
    }
  };

  const path = window.location.pathname;

  return (
    <div className="app">
      {showSideAds && <AdsBox className="ad-img-box-right" type="right" />}
      {showSideAds && <AdsBox className="ad-img-box-left" type="left" />}
      <Router>
        <Logo />
        {showNavbar && (
          <Navbar
            focus={focus}
            account={account}
            currentUserEmail={currentUserEmail}
            isVip={isVip}
            isSuperVip={isSuperVip}
          />
        )}
        <Routes>
          <Route
            path="/"
            element={
              <Home
                account={account}
                setFocus={setFocus}
                freeVideos_db={freeVideos_db}
                fanVideos_db={fanVideos_db}
              />
            }
          />
          <Route
            path="/hot"
            element={
              <Hot
                account={account}
                isVip={isVip}
                setFocus={setFocus}
                vipVideos_db={vipVideos_db}
                ivVideos_db={ivVideos_db}
              />
            }
          />
          <Route
            path="/asmr"
            element={
              <Asmr
                account={account}
                isVip={isVip}
                setFocus={setFocus}
                asmrVideos_db={asmrVideos_db}
                fuliAsmrVideos_db={fuliAsmrVideos_db}
              />
            }
          />
          <Route
            path="/videoplayer/:videoId"
            element={
              <VideoPlayer
                setNavbar={setNavbar}
                setSideAds={setSideAds}
                freeVideos_db={freeVideos_db}
              />
            }
          />
          <Route
            path="/fanVideoplayer/:videoId"
            element={
              <FanVideoPlayer
                setNavbar={setNavbar}
                setSideAds={setSideAds}
                fanVideos_db={fanVideos_db}
              />
            }
          />
          <Route
            path="/vipVideoplayer/:videoId"
            element={
              <VipVideoPlayer
                setNavbar={setNavbar}
                setSideAds={setSideAds}
                vipVideos_db={vipVideos_db}
              />
            }
          />
          <Route
            path="/ivVideoplayer/:videoId"
            element={
              <IvVideoPlayer
                setNavbar={setNavbar}
                setSideAds={setSideAds}
                ivVideos_db={ivVideos_db}
              />
            }
          />
          <Route
            path="/asmrVideoplayer/:videoId"
            element={
              <AsmrVideoPlayer
                setNavbar={setNavbar}
                setSideAds={setSideAds}
                asmrVideos_db={asmrVideos_db}
              />
            }
          />
          <Route
            path="/fuliasmrVideoplayer/:videoId"
            element={
              <FuliAsmrVideoPlayer
                setNavbar={setNavbar}
                setSideAds={setSideAds}
                fuliAsmrVideos_db={fuliAsmrVideos_db}
              />
            }
          />
          <Route
            path="/signin"
            element={
              account ? (
                <Navigate to="/" />
              ) : (
                <Signin updateAccount={updateAccount} />
              )
            }
          />
          <Route
            path="/vip"
            element={<Vip account={account} setFocus={setFocus} />}
          />
          <Route
            path="/share"
            element={
              <Share account={account} isVip={isVip} setFocus={setFocus} />
            }
          />
          <Route path="/other" element={<Other setFocus={setFocus} />} />
          <Route path="*" element={<PageNotFound setFocus={setFocus} />} />
        </Routes>
        <Footer />
      </Router>
      {!isCloseAdsModal && <BottomAds setCloseAdsModal={setCloseAdsModal} />}
    </div>
  );
}

export default App;
