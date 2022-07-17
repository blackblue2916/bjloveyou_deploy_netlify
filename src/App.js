import React, { useState, useEffect } from "react";
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
// import Best from "./Pages/Best";
import Asmr from "./Pages/Asmr";
import Vip from "./Pages/Vip";
import Share from "./Pages/Share";
import Other from "./Pages/Other";
import PageNotFound from "./Pages/PageNotFound";
// import WebChat from "./Chat/WebChat";
import VideoPlayer from "./Pages/VideoPlayer";
import VipVideoPlayer from "./Pages/VipVideoPlayer";
import AsmrVideoPlayer from "./Pages/AsmrVideoPlayer";

import {
  // addDoc,
  // setDoc,
  getDoc,
  getDocs,
  collection,
  // orderBy,
  // query,
  // where,
  // limit,
  // startAfter,
  // deleteDoc,/
  doc,
  // onSnapshot,
  // getDocFromCache,
  // updateDoc,
  // serverTimestamp,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db } from "./Helper/Chat_Auth_FirebaseConfig";
import { auth } from "./Helper/Chat_Auth_FirebaseConfig";

function App() {
  const [freeVideos, setVideosList] = useState([]);
  const [vipVideos, setVipVideos] = useState([]);
  const [asmrVideos, setAsmrVideos] = useState([]);

  const vipUsersRef = collection(db, "vip_users");
  const [focus, setFocus] = useState("/home");
  const [showNavbar, setNavbar] = useState(true);
  // const navigate = useNavigate();
  const [account, setAccount] = useState(null);
  // const [vipUsers, setVipUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState("");
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  // const [currentUserGold, setCurrentUserGold] = useState(0);
  const [isVip, setVip] = useState(false);
  const [isSuperVip, setSuperVip] = useState(false);
  // const [vipTime, setVipTime] = useState(null);

  const [isCloseAdsModal, setCloseAdsModal] = useState(false);

  // if (vipUsers.length > 0) {
  //   // console.log("01 message: ", vipUsers, typeof vipUsers);
  //   // console.log("03 message: ", account.uid);
  //   console.log("03 message: ", typeof account.email);
  // } else {
  //   console.log("01 沒有登錄!");
  // }

  let tempEmail = "";
  useEffect(() => {
    // 獲取當前用戶賬號訊息 - 并獲取和設置當前用戶 Email 即 ID 用於查詢 VIP 用戶資料
    // Git hub free videos link
    fetch(
      "https://blackblue2916.github.io/bjhouse.github.io/bjhouse/db/publicvideos.json"
    )
      .then((res) => res.json())
      .then((data) => setVideosList(data));

    // Git hub vip videos link
    fetch(
      "https://blackblue2916.github.io/bjhouse.github.io/bjhouse/db/vipvideos.json"
    )
      .then((res) => res.json())
      .then((data) => setVipVideos(data));

    // Git hub asmr videos link
    fetch(
      "https://blackblue2916.github.io/bjhouse.github.io/bjhouse/db/asmrvideos.json"
    )
      .then((res) => res.json())
      .then((data) => setAsmrVideos(data));

    try {
      const storageAccountEmail = sessionStorage.getItem("accountEmail");
      const storageAccount = sessionStorage.getItem("account");
      if (storageAccountEmail !== null) {
        tempEmail = storageAccountEmail;
        setCurrentUserEmail(storageAccountEmail);
        if (storageAccount != null) {
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
  }, [account]);

  const updateAccount = () => {
    // 方案01 vip 用戶快照
    // try {
    //   onSnapshot(vipUsersRef, (snapshot) => {
    //     setVipUsers(
    //       snapshot.docs.map((doc) => ({
    //         ...doc.data(),
    //         id: doc.id,
    //       }))
    //     );
    //   });
    // } catch (error) {
    //   console.log(error.code);
    // }
    // 方案02 獲取 vip 用戶訊息 id & gold
    try {
      const getUsers = async () => {
        let data = null;
        let id = "null";
        let vip = false;
        let superVip = false;
        let registerTime = null;

        // setVipUsers(
        //   data.docs.map((doc) => ({
        //     ...doc.data(),
        //     id: doc.id,
        //   }))
        // );

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
            // setVipTime(registerTime);
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
                // setVipTime(registerTime);
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
        // console.log(sessionStorage.getItem("createdAt"));
      };
      getUsers();

      // 01 提取單個比較
      // data.docs.forEach((doc) => {
      //   if (doc.data().user === tempEmail) {
      //     id = doc.id;
      //     gold = doc.data().gold;
      //   }
      // });
    } catch (error) {
      console.log(error.code);
      alert(error.code);
    }
  };

  // if (vipUsers.length > 0 && account !== null) {
  //   vipUsers.forEach((currentUser) => {
  //     if (currentUser.user === account.email) {
  //       vipGold = currentUser.gold;
  //       userId = currentUser.id;
  //       return;
  //     }
  //   });
  // }

  // const path = window.location.pathname;
  window.onbeforeunload = (e) => {
    // var e = window.event || e;
    // e.returnValue = "確定離開當前頁面?";
    localStorage.clear();
    sessionStorage.clear();
  };

  return (
    <div className="app" onunload="goodbye()">
      <AdsBox className={"ad-img-box-right"} />
      <AdsBox className={"ad-img-box-left"} />
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
                freeVideos={freeVideos}
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
                vipVideos={vipVideos}
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
                asmrVideos={asmrVideos}
              />
            }
          />
          <Route
            path="/videoplayer/:videoId"
            element={
              <VideoPlayer setNavbar={setNavbar} freeVideos={freeVideos} />
            }
          />
          <Route
            path="/vipVideoplayer/:videoId"
            element={
              <VipVideoPlayer setNavbar={setNavbar} vipVideos={vipVideos} />
            }
          />
          <Route
            path="/asmrVideoplayer/:videoId"
            element={
              <AsmrVideoPlayer setNavbar={setNavbar} asmrVideos={asmrVideos} />
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
          {/* <Route path="/games" element={<Games account={account} />} /> */}
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
