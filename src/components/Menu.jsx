import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import youtube from "../img/logo.png.png";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import HistoryIcon from "@mui/icons-material/History";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import ArticleIcon from "@mui/icons-material/Article";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import SettingsIcon from "@mui/icons-material/Settings";
import FlagIcon from "@mui/icons-material/Flag";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from "react-redux";

function Menu({ darkMode, setDarkMode }) {
  const { currentUser } = useSelector((state) => state.user);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <MobileMenuToggle onClick={toggleMenu}>
        <MenuIcon />
      </MobileMenuToggle>
      
      <Container menuOpen={menuOpen}>
        <CloseButton onClick={toggleMenu}>×</CloseButton>
        <Wrapper>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Logo>
              <Img src={youtube} alt="" />
              Funtube
            </Logo>
          </Link>

          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Items onClick={() => setMenuOpen(false)}>
              <HomeIcon />
              Home
            </Items>
          </Link>
          
          <Link to="trends" style={{ textDecoration: "none", color: "inherit" }}>
            <Items onClick={() => setMenuOpen(false)}>
              <ExploreIcon />
              Explore
            </Items>
          </Link>
          
          <Link to="subscriptions" style={{ textDecoration: "none", color: "inherit" }}>
            <Items onClick={() => setMenuOpen(false)}>
              <SubscriptionsIcon />
              Subscription
            </Items>
          </Link>

          <Hr />

          <Items onClick={() => setMenuOpen(false)}>
            <LibraryAddIcon />
            Library
          </Items>
          <Items onClick={() => setMenuOpen(false)}>
            <HistoryIcon />
            History
          </Items>

          <Hr />

          {/* Check if user is logged in */}
          {currentUser ? (
            <>
              <WelcomeUser>Welcome, {currentUser.name}</WelcomeUser>
            </>
          ) : (
            <>
              <Hr />
              <Login>
                Sign in to like videos, comment, and Subscribe.
                <Link to="signin" style={{ textDecoration: "none" }}>
                  <Button onClick={() => setMenuOpen(false)}>
                    <AccountCircleIcon />
                    SIGN IN
                  </Button>
                </Link>
              </Login>
              <Hr />
            </>
          )}

          <Title>New Features</Title>
          <Items onClick={() => setMenuOpen(false)}>
            <LibraryMusicIcon />
            Music
          </Items>
          <Items onClick={() => setMenuOpen(false)}>
            <SportsBasketballIcon />
            Sports
          </Items>
          <Items onClick={() => setMenuOpen(false)}>
            <SportsEsportsIcon />
            Gaming
          </Items>
          <Items onClick={() => setMenuOpen(false)}>
            <MovieCreationIcon />
            Movies
          </Items>
          <Items onClick={() => setMenuOpen(false)}>
            <ArticleIcon />
            News
          </Items>
          <Items onClick={() => setMenuOpen(false)}>
            <LiveTvIcon />
            Live
          </Items>

          <Hr />

          <Items onClick={() => setMenuOpen(false)}>
            <SettingsIcon />
            Settings
          </Items>
          <Items onClick={() => setMenuOpen(false)}>
            <FlagIcon />
            Report
          </Items>
          <Items onClick={() => setMenuOpen(false)}>
            <HelpOutlineIcon />
            Help
          </Items>
          <Items onClick={() => {
            setDarkMode(!darkMode);
            setMenuOpen(false);
          }}>
            <SettingsBrightnessIcon />
            {darkMode ? "Light" : "Dark"} Mode
          </Items>
        </Wrapper>
      </Container>
      {menuOpen && <Overlay onClick={toggleMenu} />}
    </>
  );
}

export default Menu;

const MobileMenuToggle = styled.div`
  display: none;
  position: fixed;
  top: 15px;
  left: 15px;
  z-index: 1000;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  
  @media (max-width: 768px) {
    display: flex;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
  display: none;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const CloseButton = styled.div`
  display: none;
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const Container = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 100vh;
  color: ${({ theme }) => theme.text};
  font-size: 16px;
  position: sticky;
  top: 0;
  overflow-y: auto;
  
  @media (max-width: 768px) {
    position: fixed;
    left: ${props => props.menuOpen ? '0' : '-250px'};
    width: 250px;
    z-index: 999;
    transition: left 0.3s ease;
  }
`;

const Wrapper = styled.div`
  padding: 18px 15px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Img = styled.img`
  height: 35px;
`;

const Items = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 7.5px 0px;
  font-size: 14px;
  & > svg {
    font-size: 19px;
  }
  margin-top: 12px;

  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Login = styled.div``;

const Button = styled.div`
  padding: 4px 8px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  margin-top: 10px;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: fit-content;
  text-align: center;
  cursor: pointer;
`;

const Title = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: #aaaaaa;
  margin-bottom: 20px;
`;

const WelcomeUser = styled.div`
  padding-bottom: 15px;
`;
