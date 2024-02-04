import React, { useRef, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// @ts-ignore
import HeaderLogo from "../images/7JLVA.png";
import Avatar from "@mui/material/Avatar";
import { BiSearch } from "react-icons/bi";
// @ts-ignore
import _ from "lodash";
import { searchClientDetails } from "../service/clientRequest.ts";
import { getUserInformation } from "../service/user.ts";
import { Menu, MenuItem, Button } from "@mui/material";
import { SiContentful } from "react-icons/si";

const NavbarComp = ({ setClients }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("task-token");
  const [userInfo, setUserInfo] = useState<any>(null);
  let searchRef = useRef<any>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const getLoginInformation = (token: any) => {
    getUserInformation(token)
      .then((response) => {
        setUserInfo(response?.data?.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getLoginInformation(token);
  }, []);

  const handleChangeSearch = _.debounce((event) => {
    const searchValue = event.target.value;
    searchClientDetails(token, searchValue)
      .then((response) => {
        setClients(response?.data?.results);
      })
      .catch((error) => {
        console.log(error);
      });
    handleChangeSearch.timeoutId = setTimeout(() => {
      if (searchRef.current) {
        searchRef.current.value = "";
      }
    }, 2000);
  }, 500);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/pages/login");
    setAnchorEl(null);
  };

  return (
    <div>
      <Navbar expand="lg" className="bg-dark">
        <Container fluid>
          <Navbar.Brand>
            <SiContentful size={45} className="text-warning"/>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <div
                className={`${
                  isActive("/pages/dashboard")
                    ? "active border-2 border-bottom border-warning"
                    : "text-light"
                }`}
              >
                <Nav.Link
                  className={`text-light`}
                  onClick={() => handleNavigation("/pages/dashboard")}
                >
                  Dashboard
                </Nav.Link>
              </div>
              <div
                className={` ${
                  isActive("/pages/add-client")
                    ? "active border-bottom border-warning border-2"
                    : "text-light"
                }`}
              >
                <Nav.Link
                  className={`text-light`}
                  onClick={() => handleNavigation("/pages/add-client")}
                >
                  Add Client
                </Nav.Link>
              </div>
              <div
                className={`${
                  isActive("/pages/client-list")
                    ? "active border-warning border-2 border-bottom"
                    : "text-light"
                }`}
              >
                <Nav.Link
                  className="text-light"
                  onClick={() => handleNavigation("/pages/client-list")}
                >
                  Client List
                </Nav.Link>
              </div>
            </Nav>
            <div className="border-end border-2 py-2 border-warning">
              <div className="d-flex mx-3 input-group" style={{ width: 300 }}>
                <span
                  className="input-group-text cursor-pointer"
                  id="basic-addon1"
                  style={{ backgroundColor: "#36373f" }}
                >
                  <BiSearch size={23} />
                </span>
                <input
                  type="text"
                  className="form-control"
                  style={{
                    backgroundColor: "#36373f",
                    color: "white",
                  }}
                  placeholder="Search"
                  onChange={handleChangeSearch}
                  ref={searchRef}
                />
              </div>
            </div>
            <div className="mx-2 cursor-pointer">
              <div className="d-flex gap-2" onClick={handleClick}>
                <Avatar
                  alt={userInfo?.name ?? ""}
                  className="cursor-pointer"
                  src="/static/images/avatar/2.jpg"
                />
                <span className="text-light mt-1">{userInfo?.name ?? ""}</span>
              </div>
              <Menu
                id="avatar-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "avatar-menu-button",
                }}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarComp;
