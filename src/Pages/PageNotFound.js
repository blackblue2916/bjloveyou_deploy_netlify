import React, { useEffect } from "react";
import "../Styles/errorPage.css";

function PageNotFound({ setFocus }) {
  useEffect(() => {
    setFocus("*");
  }, [setFocus]);

  return (
    <div className="pagenotfound">
      <h1>404</h1>
      <h3>这个页面并不存在,您可以点击导航区进入其他页面!</h3>
      <h5>
        Sorry,this page does not exist,please click the navigation button to go
        other pages
      </h5>
    </div>
  );
}

export default PageNotFound;
