import React, { useState, useEffect } from "react";
import AsmrVideo from "../Components/AsmrVideo";
import ReactPaginate from "react-paginate";
import "../Styles/asmr.css";
import "../Styles/adsBox.css";

function Asmr({ account, setFocus, asmrVideos }) {
  const [currentVideos, setCurrentVideos] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [videoOffset, setVideoOffset] = useState(0);
  const videosPerPage = 12;

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

  return (
    <>
      <div className="asmr">
        <p>videos</p>
        <h3>呢 - 喃 - 音 - 聲</h3>
        <p>會員視頻</p>
        <>
          <div className="asmr-video-box">
            {currentVideos &&
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
