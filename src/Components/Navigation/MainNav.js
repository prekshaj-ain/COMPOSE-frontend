import React, { useContext, useEffect, useState } from "react";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Image from "../UIElements/Image";
import { Link } from "react-router-dom";
import MainHeader from "./MainHeader";
import SideDrawer from "./SideDrawer";
import BackDrop from "../UIElements/BackDrop";
import "./MainNav.css";
import { AuthContext } from "../Context/auth-context";
import UserMenu from "./UserMenu";
import axios from "../../instance";
import Search from "../UIElements/Search";
import CheckOutsideClick from "../CheckOutsideClick";
import { useHistory } from "react-router-dom";
function MainNav() {
  const auth = useContext(AuthContext);
  const [extend,setExtend] = useState(false);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [result, setResult] = useState();
  const [error, setError] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const { user } = auth;
  const history = useHistory();
  const search = (e)=>{
    setSearchOpen(false);
    setExtend(false);
    history.push(`/search?q=${query}`);
  }
  const openHandler = () => {
    setIsOpen(true);
  };
  const closeHandler = () => {
    setIsOpen(false);
  };
  const searchOpenHandler = () => {
    setSearchOpen(true);
  };
  const searchCloseHandler = () => {
    setSearchOpen(false);
  };
  useEffect(() => {
    if(!user){
      return;
    }
    const fetchUser = async () => {
      const res = await axios.get("/user/" + user);
      setUserData(res.data.user);
    };
    fetchUser();
  }, [user]);
  useEffect(() => {
    setError(null);
    const searchQuery = async () => {
      setSearchOpen(true)
      try {
        const res = await axios.get("/search?q="+ query)
        setResult(res.data);
      } catch (err) {
        setError(err.response.data.message);
      }
    };
    if (query.length > 2) searchQuery();
  }, [query]);
  return (
    <>
    <CheckOutsideClick onClickHandler={searchCloseHandler}>
      {result && (
        <Search
          data={result}
          className={searchOpen && !error ? "searchResult" : "hidden"}
          onClick={searchCloseHandler}
        />
      )}
    </CheckOutsideClick>
      {isOpen && <BackDrop onClick={closeHandler} />}
      <SideDrawer className={isOpen ? "drawer show" : "drawer"}>
        <UserMenu onClick={closeHandler} name={userData.username} />
      </SideDrawer>
      <MainHeader className="mainNav">
        <div className="heading">
          <Link className="main-nav--title" to="/">
            COMPOSE
          </Link>
          <div className="searchBar">
            <div className="searchIcon">
              <SearchOutlinedIcon fontSize="small" style={{ fill: "#666","marginTop":"8px" }} />
            </div>
            <input
              type="text"
              placeholder="Compose a search"
              className="searchInput"
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={(e) => (e.key === "Enter" ? search(e) : null)}
              onFocus={searchOpenHandler}
            />
          </div>
        </div>
        {!!auth.user && (
          <Link className="write" to="/post/new">
            <EditOutlinedIcon style={{ fontSize: "18px" }} />
            <p>Write</p>
          </Link>
        )}
        {!auth.user && (
          <Link className="login" to="/login">
            <p>Login</p>
          </Link>
        )}
        <div className={extend ? 'hide search--extend':'hide'} >
          <input
              type="text"
              placeholder="Compose a search"
              className="searchInput small"
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={(e) => (e.key === "Enter" ? search(e) : null)}
              onFocus={searchOpenHandler}
            />
          <SearchOutlinedIcon fontSize="small" className="search--small" onClick={()=>{setExtend(!extend)}}/>

        </div>
        {!!auth.user && (
          <button className="userButton" onClick={openHandler}>
            <Image src={userData.image} className="userIcon" />
            <KeyboardArrowDownOutlinedIcon fontSize="small" />
          </button>
        )}
      </MainHeader>
    </>
  );
}

export default MainNav;
