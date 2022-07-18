import React from "react";
import "../Styles/footer.css";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

function Footer() {
  const toUrl = (url) => {
    const w = window.open(
      "_blank",
      "width=200, height=200, menubar=no, toolbar=no, status=no, scrollbars=yes"
    );
    w.location.href = url;
    w.focus();
  };

  return (
    <div className="footer">
      <div className="socialMedia">
        <YouTubeIcon
          onClick={() => {
            toUrl("https://www.youtube.com/channel/UCGuiz0Z-bz6B8xomTtBfLmw");
          }}
        />
        <TelegramIcon
          onClick={() => {
            toUrl("https://t.me/lsp_hotdance");
          }}
        />
        <TwitterIcon />
        <InstagramIcon />
        <FacebookIcon />
      </div>
      <p>&copy; 2022-2025 www.bjloveyou.com</p>
    </div>
  );
}

export default Footer;
