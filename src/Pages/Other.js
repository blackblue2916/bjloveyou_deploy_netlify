import React, { useEffect } from "react";
import "../Styles/other.css";

function Other({ setFocus }) {
  useEffect(() => {
    setFocus("/other");
  }, [setFocus]);

  const toUrl = (url) => {
    const w = window.open(
      "_blank",
      "width=200, height=200, menubar=no, toolbar=no, status=no, scrollbars=yes"
    );
    w.location.href = url;
    w.focus();
  };

  return (
    <div className="other-container">
      <p>cooperation</p>
      <h3 className="other-title">合 - 作 - 推 - 廣 - 區</h3>
      <p>public share</p>
      {/* <div className="other-consult">
        <p className="other-text">
          廣告:
          如果您有意創建一個視頻流量網站[比如影視,動漫,熱播劇,寫真,成人等類型]可加入下方電報群咨詢;
          <br />
          <a href="https://t.me/+qN1ztGp3HtIxNWRl">
            https://t.me/+qN1ztGp3HtIxNWRl
          </a>
          <br />
          提示:
          所有代碼由本人開發,非市面寶塔監控肉鷄韭菜模板,網站内容完全由您自主選擇,無任何後臺數據監控,及偷傳代碼;
          <br />
          服務:
          一條龍服務,包會.如果您懂一點點JS編程更佳,但不妨礙您建站,後期您的維護更新工作非常簡單,只需要將您獲取的資源,使用專用後臺上傳即可.
        </p>
      </div> */}
      <h3>關於本站</h3>
      <div className="other-consult">
        <p className="other-text">
          内容: 本站專注于收集-錄製-剪輯中囯,韓國女主播舞蹈視頻,包括19+.
          <br />
          初衷:
          鑒於近幾年來中國直播行業管制愈發嚴格,舞蹈看點越來越少,加之國内各大平臺,和雲盤内容審查標準嚴苛,大量視頻資源被和諧,痛惜之餘,本團隊決定建立在綫視頻網站.
          <br />
          維護:
          視頻網站維護成本高昂,您每次點擊觀看一個視頻都會燒掉0.001美金,如果您有條件,可以考慮成爲贊助會員.
          <br />
          目標:
          讓每一個LSP都能在這裏找到最新和以往精剪舞蹈視頻,藝術永存,LSP萬歲.
        </p>
      </div>
    </div>
  );
}

export default Other;
