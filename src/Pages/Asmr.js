import React, { useState, useEffect } from "react";
import AsmrVideo from "../Components/AsmrVideo";
import ReactPaginate from "react-paginate";
// Audio player
import AudioPlayer from "../Components/AudioPlayer";
import "../Styles/asmr.css";
import "../Styles/paginate.css";
import asmrIcon from "../Assets/images/asmrIconVideo.png";
import audioIcon from "../Assets/images/asmrIconAudio.png";
import fuliIcon from "../Assets/images/asmrIconFuli.png";
import artistsDb from "../Data/audio_artist.json";

const videosPerPage = 16;
function Asmr({ account, setFocus, asmrVideos }) {
  const [currentVideos, setCurrentVideos] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [videoOffset, setVideoOffset] = useState(0);
  const [videoType, setVideoType] = useState("video");

  // audio

  const [artists, setArtists] = useState(null);
  const [artistIndex, setArtistIndex] = useState(0);
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const [nextAudioIndex, setNextAudioIndex] = useState(currentAudioIndex + 1);
  const [songs, setSongs] = useState([
    {
      title: "jok 01",
      src: "../Assets/music/1.aac",
    },
    {
      title: "步非烟 02",
      src: "../Assets/music/2.aac",
    },
    {
      title: "哈尼 03",
      src: "../Assets/music/3.aac",
    },
  ]);

  useEffect(() => {
    setFocus("/asmr");
    setArtists(artistsDb);
    const endOffset = videoOffset + videosPerPage;
    setCurrentVideos(asmrVideos.slice(videoOffset, endOffset));
    setPageCount(Math.ceil(asmrVideos.length / videosPerPage));
  }, [account, setFocus, asmrVideos, videoOffset]);

  const handlePageClick = (e) => {
    const newOffset = (e.selected * videosPerPage) % asmrVideos.length;
    setVideoOffset(newOffset);
  };

  const toggleAudio = () => {
    alert("資源整合中...");
    return;
    // if (account === null) {
    //   alert("请注册账号并登录使用!");
    //   return;
    // }
    // setVideoType("audio");
  };
  const toggleVideo = () => {
    setVideoType("video");
  };
  const toggleFuli = () => {
    alert("資源整合中...");
    return;
    // setVideoType("fuli");
  };
  return (
    <>
      <div className="asmr">
        <p>videos</p>
        <h3>呢 - 喃 - 音 - 聲</h3>
        <p>會員視頻</p>
        <>
          <div className="toggle-type">
            <img
              onClick={toggleAudio}
              className={
                videoType === "audio" ? "type-focus" : "type-video-img"
              }
              src={audioIcon}
              alt=""
            />
            <img
              onClick={toggleFuli}
              className={videoType === "fuli" ? "type-focus" : "type-video-img"}
              src={fuliIcon}
              alt=""
            />
            <img
              onClick={toggleVideo}
              className={
                videoType === "video" ? "type-focus" : "type-video-img"
              }
              src={asmrIcon}
              alt=""
            />
          </div>
          <div className="asmr-video-box">
            {videoType === "video" &&
              currentVideos &&
              currentVideos.map((video, index) => {
                return (
                  <div className="item" key={index}>
                    <AsmrVideo
                      key={video.__id__}
                      id={video.__id__}
                      bj={video.name}
                      img={video.img}
                      info={video.info}
                      account={account}
                    />
                  </div>
                );
              })}
          </div>
          {videoType === "audio" && songs && (
            <div className="audio-box">
              <h3>{artists[artistIndex].name}</h3>
              <AudioPlayer
                song={songs[currentAudioIndex]}
                nextsong={songs[nextAudioIndex]}
              />
              <p className="skip-btn">{artistIndex + 1}</p>
            </div>
          )}
        </>
      </div>
      <div className="pagination-container">
        {videoType === "video" && (
          <ReactPaginate
            breakLabel="."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={2}
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
            containerClassName="pagination"
            pageLinkClassName="page-num"
            previousLinkClassName="page-num"
            nextLinkClassName="page-num"
            activeLinkClassName="active-page"
          />
        )}
      </div>
    </>
  );
}

export default Asmr;
