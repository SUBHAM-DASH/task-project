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
            <img
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
              className="mb-2"
              height="30"
              width={50}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link
                className={`${
                  isActive("/pages/dashboard")
                    ? "active text-warning"
                    : "text-light"
                }`}
                onClick={() => handleNavigation("/pages/dashboard")}
              >
                Dashboard
              </Nav.Link>
              <Nav.Link
                className={`${
                  isActive("/pages/add-client")
                    ? "active text-warning"
                    : "text-light"
                }`}
                onClick={() => handleNavigation("/pages/add-client")}
              >
                Add Client
              </Nav.Link>
              <Nav.Link
                className={`${
                  isActive("/pages/client-list")
                    ? "active text-warning"
                    : "text-light"
                }`}
                onClick={() => handleNavigation("/pages/client-list")}
              >
                Client List
              </Nav.Link>
            </Nav>
            <Form className="d-flex mx-3 input-group" style={{ width: 300 }}>
              <span
                className="input-group-text cursor-pointer"
                id="basic-addon1"
              >
                <BiSearch size={23} />
              </span>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search Contacts"
                onChange={handleChangeSearch}
                ref={searchRef}
              />
            </Form>
            <div>
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
