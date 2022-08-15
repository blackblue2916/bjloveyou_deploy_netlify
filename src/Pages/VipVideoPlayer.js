import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../Styles/videoPlayer.css";

function VipVideoPlayer({ setNavbar, vipVideos_db, setSideAds, isVip }) {
  // 取得当前网址内容
  const { videoId } = useParams();
  const [currentVideoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    // eslint-disable-next-line array-callback-return
    vipVideos_db.filter((video) => {
      if (videoId === video.__id__) {
        setVideoUrl(video.u + video.r + video.l);
      }
    });
    setNavbar(false);
    setSideAds(false);
  }, [vipVideos_db, setNavbar, videoId, setSideAds, isVip]);

  const playPage = () => {
    if (videoId !== "" && isVip === true) {
      return (
        <div className="vip-video-title">
          <iframe
            className="vip-video-iframe"
            src={currentVideoUrl}
            title="BJHOUSE.XYZ"
            frameborder="0"
            marginwidth="0"
            marginheight="0"
            scrolling="no"
            width="920"
            height="518"
            allowfullscreen
            allowTransparency
          ></iframe>
        </div>
      );
    } else {
      return <h3>Loading......或許,您在其它地方打開了這個網址?</h3>;
    }
  };

  window.onbeforeunload = (e) => {
    // var e = window.event || e;
    // e.returnValue = "確定離開當前頁面?";
    setNavbar(true);
    setVideoUrl("");
  };

  return (
    <div className="video-container" onunload="goodbye()">
      {playPage()}
    </div>
  );
}

export default VipVideoPlayer;
