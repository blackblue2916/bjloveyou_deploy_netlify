import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import "../Styles/hot.css";
import "../Styles/paginate.css";
import "../App.css";

import Modal from "../Components/Modal";
import VipPreview from "../Components/VipPreview";
import IvPreview from "../Components/IvPreview";
import VipVideos from "../Components/VipVideos";
import IvVideos from "../Components/IvVideos";

import vipIcon from "../Assets/images/vipIconVideo.png";
import ivIcon from "../Assets/images/ivIconVideo.png";
import bestIcon from "../Assets/images/bestIconVideo.png";

const videosPerPage = 16;
function Hot({ account, isVip, setFocus, vipVideos_db, ivVideos_db }) {
  // vip videos list
  const [vip_HotVideos, setvip_HotVideos] = useState(null);
  const [pageCount_vip, setPageCount_vip] = useState(0);
  const [videoOffset_vip, setVideoOffset_vip] = useState(0);

  // iv videos list
  const [iv_HotVideos, setIv_HotVideos] = useState(null);
  const [pageCount_iv, setPageCount_iv] = useState(0);
  const [videoOffset_iv, setVideoOffset_iv] = useState(0);

  const [isCloseModal, setCloseModal] = useState(false);
  const [videoType, setVideoType] = useState("vip");

  const urlParams = new URL(window.location.href);
  const pathname = urlParams.pathname;

  // vip 視頻數據庫

  useEffect(() => {
    setFocus("/hot");

    // vip hot db video
    const endOffset_vip = videoOffset_vip + videosPerPage;
    setvip_HotVideos(vipVideos_db.slice(videoOffset_vip, endOffset_vip));
    setPageCount_vip(Math.ceil(vipVideos_db.length / videosPerPage));

    // iv hot db video
    const endOffset_iv = videoOffset_iv + videosPerPage;
    setIv_HotVideos(ivVideos_db.slice(videoOffset_iv, endOffset_iv));
    setPageCount_iv(Math.ceil(ivVideos_db.length / videosPerPage));
  }, [
    account,
    setFocus,
    videoOffset_vip,
    videoOffset_iv,
    pageCount_vip,
    pageCount_iv,
    vipVideos_db,
    ivVideos_db,
  ]);

  const handlePageClick_vip = (e) => {
    const newOffset = (e.selected * videosPerPage) % vipVideos_db.length;
    setVideoOffset_vip(newOffset);
  };

  const handlePageClick_iv = (e) => {
    const newOffset = (e.selected * videosPerPage) % ivVideos_db.length;
    setVideoOffset_iv(newOffset);
  };

  const toggleBest = () => {
    alert("資源整合中...");
    return;
  };
  const toggleIv = () => {
    setVideoType("iv");
  };
  const toggleVip = () => {
    setVideoType("vip");
  };

  return (
    <>
      <div className="hot">
        <p>videos</p>
        <h3>性 - 感 - 熱 - 舞 - 區</h3>
        <p className="announcement">
          <span style={{ color: "yellow" }}>會員區公告:</span>
          每周穩定更新中...
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
              onClick={toggleBest}
              className={videoType === "best" ? "type-focus" : "type-video-img"}
              src={bestIcon}
              alt=""
            />
            <img
              onClick={toggleIv}
              className={videoType === "iv" ? "type-focus" : "type-video-img"}
              src={ivIcon}
              alt=""
            />
            <img
              onClick={toggleVip}
              className={videoType === "vip" ? "type-focus" : "type-video-img"}
              src={vipIcon}
              alt=""
            />
          </div>
          {isVip === true ? (
            <div className="hotVideo-box">
              {videoType === "vip" &&
                vip_HotVideos &&
                vip_HotVideos.map((video, index) => {
                  return (
                    <div className="item" key={index}>
                      <VipVideos
                        orgUrl={pathname}
                        isVip={isVip}
                        key={video.__id__}
                        id={video.__id__}
                        bj={video.name}
                        img={video.img}
                        info={video.info}
                      />
                    </div>
                  );
                })}
              {videoType === "iv" &&
                iv_HotVideos &&
                iv_HotVideos.map((video, index) => {
                  return (
                    <div className="item" key={index}>
                      <IvVideos
                        orgUrl={pathname}
                        isVip={isVip}
                        key={video.__id__}
                        id={video.__id__}
                        bj={video.name}
                        img={video.img}
                        info={video.info}
                      />
                    </div>
                  );
                })}
            </div>
          ) : (
            <div className="hotVideo-box">
              {videoType === "vip" &&
                vip_HotVideos &&
                vip_HotVideos.map((video, index) => {
                  return (
                    <div className="item" key={index}>
                      <VipPreview
                        key={index}
                        bj={video.name}
                        img={video.img}
                        info={video.info}
                      />
                    </div>
                  );
                })}
              {videoType === "iv" &&
                iv_HotVideos &&
                iv_HotVideos.map((video, index) => {
                  return (
                    <div className="item" key={index}>
                      <IvPreview
                        key={index}
                        bj={video.name}
                        img={video.img}
                        info={video.info}
                      />
                    </div>
                  );
                })}
            </div>
          )}
        </>
        {!isCloseModal && !isVip && <Modal closeModal={setCloseModal} />}
      </div>
      <div className="pagination-container">
        {videoType === "vip" && (
          <ReactPaginate
            breakLabel="."
            nextLabel=">"
            onPageChange={handlePageClick_vip}
            // pageRangeDisplayed={2}
            pageCount={pageCount_vip}
            previousLabel="<"
            renderOnZeroPageCount={null}
            containerClassName="pagination"
            pageLinkClassName="page-num"
            previousLinkClassName="page-num"
            nextLinkClassName="page-num"
            activeLinkClassName="active-page"
          />
        )}
        {videoType === "iv" && (
          <ReactPaginate
            breakLabel="."
            nextLabel=">"
            onPageChange={handlePageClick_iv}
            // pageRangeDisplayed={2}
            pageCount={pageCount_iv}
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

export default Hot;
