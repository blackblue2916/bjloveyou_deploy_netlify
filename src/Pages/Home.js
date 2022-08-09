import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import PublicVideo from "../Components/PublicVideo";
import FanVideo from "../Components/FanVideo";
import "../Styles/home.css";
import "../Styles/paginate.css";
import orgIcon from "../Assets/images/orgVideo.png";
import externalIcon from "../Assets/images/externalVideo.png";

import zien_01 from "../Assets/images/zien/zien_01.png";

const pageSize = 16;
function Home({ account, setFocus, freeVideos_db, fanVideos_db }) {
  // free videos list
  const [freeVideos, setFreeVideos] = useState(null);
  const [pageCount_free, setPageCount_free] = useState(0);
  const [videoOffset_free, setVideoOffset_free] = useState(0);

  // fan videos list
  const [fanVideos, setFanVideos] = useState(null);
  const [pageCount_fan, setPageCount_fan] = useState(0);
  const [videoOffset_fan, setVideoOffset_fan] = useState(0);

  const [videoType, setVideoType] = useState("org");

  useEffect(() => {
    setFocus("/home");

    if (freeVideos_db) {
      // free video db
      const endOffset_free = videoOffset_free + pageSize;
      setFreeVideos(freeVideos_db.slice(videoOffset_free, endOffset_free));
      setPageCount_free(Math.ceil(freeVideos_db.length / pageSize));
    }

    if (fanVideos_db) {
      // fan video db
      const endOffset_fan = videoOffset_fan + pageSize;
      setFanVideos(fanVideos_db.slice(videoOffset_fan, endOffset_fan));
      setPageCount_fan(Math.ceil(fanVideos_db.length / pageSize));
    }
  }, [
    account,
    freeVideos_db,
    fanVideos_db,
    setFocus,
    pageCount_free,
    videoOffset_free,
    videoOffset_fan,
    pageCount_fan,
  ]);

  const handlePageClick_free = (e) => {
    const newOffset = (e.selected * pageSize) % freeVideos_db.length;
    setVideoOffset_free(newOffset);
  };

  const handlePageClick_fan = (e) => {
    const newOffset = (e.selected * pageSize) % fanVideos_db.length;
    setVideoOffset_fan(newOffset);
  };

  const toggleExternal = () => {
    setVideoType("fan");
  };
  const toggleOrg = () => {
    setVideoType("org");
  };

  // window.onbeforeunload = (e) => {
  //   var e = window.event || e;
  //   e.returnValue = "確定離開當前頁面?";
  // };

  return (
    <>
      <div className="home">
        <p>free dance videos</p>
        <h3>熱 - 舞 - 分 - 享 - 區</h3>
        <p>每周穩定更新50~100部視頻</p>
        <>
          <div className="toggle-type">
            <img
              onClick={toggleExternal}
              className={videoType === "fan" ? "type-focus" : "type-video-img"}
              src={externalIcon}
              alt=""
            />
            <img
              onClick={toggleOrg}
              className={videoType === "org" ? "type-focus" : "type-video-img"}
              src={orgIcon}
              alt=""
            />
          </div>
          <div className="homeVideos-box">
            {videoType === "org" &&
              freeVideos &&
              freeVideos.map((video, index) => (
                <div className="item" key={index}>
                  <PublicVideo
                    key={video.__id__}
                    id={video.__id__}
                    bj={video.name}
                    img={video.img || zien_01}
                    info={video.info}
                    account={account}
                  />
                </div>
              ))}
            {videoType === "fan" &&
              fanVideos &&
              fanVideos.map((video, index) => (
                <div className="item" key={index}>
                  <FanVideo
                    key={video.__id__}
                    id={video.__id__}
                    bj={video.name}
                    img={video.img || zien_01}
                    info={video.info}
                    account={account}
                  />
                </div>
              ))}
          </div>
        </>
      </div>
      <div className="pagination-container">
        {videoType === "org" && (
          <ReactPaginate
            breakLabel="."
            nextLabel=">"
            onPageChange={handlePageClick_free}
            pageRangeDisplayed={2}
            pageCount={pageCount_free}
            previousLabel="<"
            renderOnZeroPageCount={null}
            containerClassName="pagination"
            pageLinkClassName="page-num"
            previousLinkClassName="page-num"
            nextLinkClassName="page-num"
            activeLinkClassName="active-page"
          />
        )}
        {videoType === "fan" && (
          <ReactPaginate
            breakLabel="."
            nextLabel=">"
            onPageChange={handlePageClick_fan}
            pageRangeDisplayed={2}
            pageCount={pageCount_fan}
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

export default Home;
