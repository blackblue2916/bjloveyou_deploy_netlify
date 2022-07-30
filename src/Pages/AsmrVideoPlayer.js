import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../Styles/videoPlayer.css";

function AsmrVideoPlayer({ setNavbar, asmrVideos, setSideAds }) {
  // 取得当前网址内容
  const { videoId } = useParams();
  const [currentVideoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    // eslint-disable-next-line array-callback-return
    asmrVideos.filter((video) => {
      if (videoId === video.__id__) {
        setVideoUrl(video.u + video.r + video.l);
      }
    });
    setNavbar(false);
    setSideAds(false);
  }, [asmrVideos, videoId, setNavbar, setSideAds]);

  const playPage = () => {
    if (videoId !== "") {
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
            width="1080"
            height="608"
            allowfullscreen
            allowTransparency
          ></iframe>
        </div>
      );
    } else {
      return <h3>Loading......</h3>;
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

export default AsmrVideoPlayer;
