import React, { useState, useEffect } from "react";
import AsmrVideo from "../Components/AsmrVideo";
import ReactPaginate from "react-paginate";
import "../Styles/asmr.css";
import "../Styles/adsBox.css";
import asmrIcon from "../Assets/images/asmrIconVideo.png";
import audioIcon from "../Assets/images/asmrIconAudio.png";

function Asmr({ account, setFocus, asmrVideos }) {
  const [currentVideos, setCurrentVideos] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [videoOffset, setVideoOffset] = useState(0);

  const [videoType, setVideoType] = useState("video");
  const videosPerPage = 20;

  useEffect(() => {
    setFocus("/asmr");
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
    // setVideoType("audio");
  };
  const toggleVideo = () => {
    setVideoType("video");
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
              onClick={toggleVideo}
              className={
                videoType === "video" ? "type-focus" : "type-video-img"
              }
              src={asmrIcon}
              alt=""
            />
          </div>
          <div className="asmr-video-box">
            {videoType === "video" ? (
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
              })
            ) : (
              <div>audio</div>
            )}
          </div>
        </>
      </div>
      <div className="pagination-container">
        <ReactPaginate
          breakLabel="..."
          nextLabel=">>"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="<<"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="active-page"
        />
      </div>
    </>
  );
}

export default Asmr;
