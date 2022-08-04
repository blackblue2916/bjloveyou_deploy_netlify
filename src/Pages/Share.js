import React, { useState, useEffect } from "react";
import SourceLink from "../Components/SourceLink";
import { db } from "../Helper/Chat_Auth_FirebaseConfig";
import {
  // addDoc,
  // setDoc,
  // getDoc,
  getDocs,
  collection,
  // orderBy,
  // query,
  // where,
  // limit,
  // startAfter,
  // deleteDoc,
  // doc,
  // onSnapshot,
  // getDocFromCache,
  // updateDoc,
  // serverTimestamp,
} from "firebase/firestore";
import "../Styles/share.css";

function Share({ account, isVip, setFocus }) {
  const shareLinksRef = collection(db, "share_links");
  const [links, setLinks] = useState([]);

  useEffect(() => {
    setFocus("/share");
    if (account !== null) {
      const getShareLinks = async () => {
        const data = await getDocs(shareLinksRef);
        setLinks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
      getShareLinks();
    }
  }, [shareLinksRef, account, setFocus]);

  return (
    <div className="share-container">
      <div className="share-title">
        <p>resource</p>
        <h3>雲 - 盤 - 分 - 享 - 區</h3>
        <p>public share</p>
      </div>
      <div className="share-info">
        <p>
          提示: 分享區主要提供百度雲盤分享以及秒傳鏈接.
          <br />
          内容: 分享内容包括但不限於如下 -
          女主播熱舞合集/定制福利/絕版資源/後期精剪編輯視頻, 等.
          <br />
          細則:
          分享鏈接免費,但只對贊助會員開放,分享内容不定期更新,并自動覆蓋之前的分享.
          <br />
          注意: 目前分享功能尚未開放,資源整合中...
        </p>
      </div>
      {account !== null ? (
        <>
          {links.map((link, index) => {
            return (
              <SourceLink
                account={account}
                isVip={isVip}
                title={link.title}
                link={link.link}
                code={link.code}
                key={index}
              />
            );
          })}
        </>
      ) : (
        <div className="share-tip">您必須登錄成爲VIP才可以瀏覽本站分享内容</div>
      )}
    </div>
  );
}

export default Share;
