import React, { useEffect, useState } from "react";
// import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import "../Styles/videoPlayer.css";

function VideoPlayer({ setNavbar, freeVideos }) {
  // 取得当前网址内容
  const { videoId } = useParams();
  const [currentVideoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    // eslint-disable-next-line array-callback-return
    freeVideos.filter((video) => {
      if (videoId === video.__id__) {
        setVideoUrl(video.u + video.r + video.l);
      }
    });
    setNavbar(false);
  }, [freeVideos, videoId, setNavbar]);

  const playPage = () => {
    if (videoId !== "") {
      return (
        <div className="public-video-title">
          {/* <p>正在播放</p> */}
          <iframe
            className="public-video-iframe"
            src={currentVideoUrl}
            title="BJHOUSE.XYZ"
            frameborder="0"
            marginwidth="0"
            marginheight="0"
            scrolling="no"
            width="900"
            height="506"
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

export default VideoPlayer;
