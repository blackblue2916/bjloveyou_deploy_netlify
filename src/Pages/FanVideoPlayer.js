import React, { useEffect, useState } from "react";
// import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import "../Styles/videoPlayer.css";

function FanVideoPlayer({ setNavbar, fanVideos, setSideAds }) {
  // 取得当前网址内容
  const { videoId } = useParams();
  const [currentVideoUrl, setVideoUrl] = useState("");
  useEffect(() => {
    // eslint-disable-next-line array-callback-return
    fanVideos.filter((video) => {
      if (videoId === video.__id__) {
        setVideoUrl(video.u + video.r + video.l);
      }
    });
    setNavbar(false);
    setSideAds(false);
  }, [fanVideos, videoId, setNavbar, setSideAds]);

  const playPage = () => {
    if (videoId !== "") {
      return (
        <div className="public-video-title">
          {/* <p>正在播放</p> */}
          <iframe
            className="public-video-iframe"
            src={currentVideoUrl}
            title="WWW.BJLOVEYOU.COM"
            frameborder="0"
            marginwidth="0"
            marginheight="0"
            scrolling="no"
            width="1080"
            height="608"
            allowfullscreen="true"
            allowTransparency
          ></iframe>
        </div>
      );
    } else {
      return <h3>你為什麽打不開這個視頻呢......</h3>;
    }
  };

  return <div className="video-container">{playPage()}</div>;
}

export default FanVideoPlayer;
