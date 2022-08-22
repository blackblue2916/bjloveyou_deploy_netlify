import React, { useState, useEffect } from "react";
import AsmrVideo from "../Components/AsmrVideo";
import FuliAsmrVideo from "../Components/FuliAsmrVideo";
import ReactPaginate from "react-paginate";
// Audio player
import "../Styles/asmr.css";
import "../Styles/paginate.css";
import "../App.css";
import asmrIcon from "../Assets/images/asmrIconVideo.png";
import audioIcon from "../Assets/images/asmrIconAudio.png";
import fuliIcon from "../Assets/images/asmrIconFuli.png";

const videosPerPage = 16;
function Asmr({ account, isVip, setFocus, asmrVideos_db, fuliAsmrVideos_db }) {
  // 高能錄製 asmr 視頻
  const [currentAsmr_Videos, setAsmr_Videos] = useState(null);
  const [pageCount_asmr, setPageCount_asmr] = useState(0);
  const [videoOffset_asmr, setVideoOffset_asmr] = useState(0);

  // 福利 asmr 視頻
  const [currentFuliAsmr_videos, setFuliAsmr_videos] = useState(null);
  const [pageCount_fuliAsmr, setPageCount_fuliAsmr] = useState(0);
  const [videoOffset_fuliAsmr, setVideoOffset_fuliAsmr] = useState(0);

  const [videoType, setVideoType] = useState("fuli");

  useEffect(() => {
    setFocus("/asmr");

    // asmr db video
    const endOffset_asmr = videoOffset_asmr + videosPerPage;
    setAsmr_Videos(asmrVideos_db.slice(videoOffset_asmr, endOffset_asmr));
    setPageCount_asmr(Math.ceil(asmrVideos_db.length / videosPerPage));

    // fuli asmr db video
    const endOffset_fuliAsmr = videoOffset_fuliAsmr + videosPerPage;
    setFuliAsmr_videos(
      fuliAsmrVideos_db.slice(videoOffset_fuliAsmr, endOffset_fuliAsmr)
    );
    setPageCount_fuliAsmr(Math.ceil(fuliAsmrVideos_db.length / videosPerPage));
  }, [
    account,
    setFocus,
    asmrVideos_db,
    fuliAsmrVideos_db,
    pageCount_asmr,
    pageCount_fuliAsmr,
    videoOffset_asmr,
    videoOffset_fuliAsmr,
  ]);

  const handlePageClick_asmr = (e) => {
    const newOffset = (e.selected * videosPerPage) % asmrVideos_db.length;
    setVideoOffset_asmr(newOffset);
  };

  const handlePageClick_fuliAsmr = (e) => {
    const newOffset = (e.selected * videosPerPage) % fuliAsmrVideos_db.length;
    setVideoOffset_fuliAsmr(newOffset);
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
  const toggleAsmr = () => {
    alert("資源整合中...");
    return;
    // setVideoType("asmr");
  };
  const toggleFuli = () => {
    setVideoType("fuli");
  };
  return (
    <>
      <div className="asmr">
        <p>videos</p>
        <h3>呢 - 喃 - 音 - 聲</h3>
        <p className="announcement">
          <span style={{ color: "yellow" }}>公告:</span>
          ASMR視頻&amp;音頻正在更換服務器,暫不開放,
          福利視頻目前正常,每周穩定更新中...
        </p>
        <p>
          <span style={{ color: "rgba(255, 119, 0, 1)" }}>
            @:
            贊助會員將獲得進入原版1080P電報群的資格,視頻内容與網站同步以及更多
            <br />
            @: Sponsored members will get access to the original 1080P telegram
            group, video content synced with the website and more
          </span>
        </p>
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
              onClick={toggleAsmr}
              className={videoType === "asmr" ? "type-focus" : "type-video-img"}
              src={asmrIcon}
              alt=""
            />
          </div>
          <div className="asmr-video-box">
            {videoType === "asmr" &&
              currentAsmr_Videos &&
              currentAsmr_Videos.map((video, index) => {
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

            {videoType === "fuli" &&
              currentFuliAsmr_videos &&
              currentFuliAsmr_videos.map((video, index) => {
                return (
                  <div className="item" key={index}>
                    <FuliAsmrVideo
                      key={video.__id__}
                      id={video.__id__}
                      bj={video.name}
                      img={video.img}
                      info={video.info}
                      account={account}
                      isVip={isVip}
                    />
                  </div>
                );
              })}
          </div>
        </>
      </div>
      <div className="pagination-container">
        {videoType === "asmr" && (
          <ReactPaginate
            breakLabel="."
            nextLabel=">"
            onPageChange={handlePageClick_asmr}
            pageRangeDisplayed={2}
            pageCount={pageCount_asmr}
            previousLabel="<"
            renderOnZeroPageCount={null}
            containerClassName="pagination"
            pageLinkClassName="page-num"
            previousLinkClassName="page-num"
            nextLinkClassName="page-num"
            activeLinkClassName="active-page"
          />
        )}
        {videoType === "fuli" && (
          <ReactPaginate
            breakLabel="."
            nextLabel=">"
            onPageChange={handlePageClick_fuliAsmr}
            pageRangeDisplayed={2}
            pageCount={pageCount_fuliAsmr}
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
