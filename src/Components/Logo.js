import "../Styles/logo.css";
import logoimg from "../Assets/images/weblogo_purpletext.png";

// import { useNavigate } from "react-router-dom";

function Logo() {
  return (
    <div className="logo-box">
      <img className="logo" src={logoimg} alt="" />
    </div>
  );
}

export default Logo;
