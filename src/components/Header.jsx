import React, { useContext, useState } from "react";
import logo from "../img/LOGO.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { LanguageContext } from "../context";

const Header = ({ setMode, mode }) => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const changeTheme = () => {
    setMode(!mode);
    localStorage.setItem("mode", JSON.stringify(!mode));
  };
  const NavigateToResult = () => {
    navigate(`/movies/search-input/${value}`);
    setValue("");
  };
  const handleChange = (e) => setValue(e.target.value);
  const { setLanguage } = useContext(LanguageContext);
  return (
    <div>
      <div id="header">
        <div className="container">
          <div className="header">
            <div>
              <Link to={"/"}>
                <img src={logo} alt="" />
              </Link>
            </div>
            <nav className="header-nav">
              <NavLink to={"/"}>Home</NavLink>
              <NavLink to={"/recipes"}>Recipes</NavLink>
              <NavLink to={"/popular"}>Popular</NavLink>
              <NavLink to={"/top-rated"}>Top Rated</NavLink>
            </nav>
            <div className="search-movies">
              <input value={value} onChange={handleChange} type="text" />
              <button onClick={NavigateToResult}>search</button>
            </div>
            <div className="header-buttons">
              <select className="header-buttons-select" onChange={(e) => setLanguage(e.target.value)}>
                <option value="en-US">English</option>
                <option value="ru-RU">Русский</option>
                <option value="tr-TR">Turkce</option>
                <option value="fr-FR">Frances</option>
              </select>
              <div
                onClick={changeTheme}
                className="dark-mode"
                style={{
                  background: "white",
                }}
              >
                {mode ? "light" : "dark"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
