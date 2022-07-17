import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import PublicVideo from "../Components/PublicVideo";
import "../Styles/home.css";
import "../Styles/adsBox.css";

function Home({ account, setFocus, freeVideos }) {
  // videos list
  const [currentVideos, setCurrentVideos] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [videoOffset, setVideoOffset] = useState(0);
  const videosPerPage = 12;

  useEffect(() => {
    setFocus("/home");
    const endOffset = videoOffset + videosPerPage;
    setCurrentVideos(freeVideos.slice(videoOffset, endOffset));
    setPageCount(Math.ceil(freeVideos.length / videosPerPage));
  }, [account, freeVideos, setFocus, videoOffset]);

  const handlePageClick = (e) => {
    const newOffset = (e.selected * videosPerPage) % freeVideos.length;
    setVideoOffset(newOffset);
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
        <p>免費視頻</p>
        <>
          <div className="homeVideos-box">
            {currentVideos &&
              currentVideos.map((video, index) => (
                <div className="item" key={index}>
                  <PublicVideo
                    key={video.__id__}
                    id={video.__id__}
                    bj={video.name}
                    img={video.img}
                    info={video.info}
                    account={account}
                  />
                </div>
              ))}
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

export default Home;
