import React, { Fragment, useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";

import Search from "../forms/Search";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";

const Menu = () => {
  // context

  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  // hooks
  const categories = useCategory();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  // console.log("categories in menu => ", categories);
  const [isOpenDrop, setIsOpenDrop] = useState(false);
  const toggleDropdown = () => {
    setIsOpenDrop((prevState) => !prevState);
  };

  const logout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <Fragment>
      <div>
        <Navbar color="dark" dark expand="md" className="fixed-top">
          <NavbarBrand className=" text-white fs-4" href="/">
            GENS SHOP
          </NavbarBrand>
          <NavbarToggler onClick={toggle} className="text-white fs-6" />

          <Collapse isOpen={isOpen} navbar>
            <Nav className="m-auto text-center " navbar>
              <Search />
              <NavItem>
                <NavLink className="fs-5 px-4" href="/">
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="fs-5 px-4" href="/shop">
                  Shop
                </NavLink>
              </NavItem>
              <NavItem>
                <Dropdown isOpen={isOpenDrop} toggle={toggleDropdown}>
                  <DropdownToggle className="fs-5 px-4" nav>
                    <NavLink className="nav-link" href="/categories">
                      Category
                    </NavLink>
                  </DropdownToggle>
                  <DropdownMenu color="dark" dark>
                    {categories ? (
                      <>
                        {categories.map((c) => (
                          <DropdownItem key={c._id} color="dark" dark>
                            <NavLink
                              className="nav-link text-white"
                              href={`/category/${c.slug}`}
                            >
                              {c.name}
                            </NavLink>
                          </DropdownItem>
                        ))}
                      </>
                    ) : (
                      <DropdownItem disabled>
                        Loading ...
                      </DropdownItem>
                    )}
                  </DropdownMenu>
                </Dropdown>
              </NavItem>

              <NavItem>
                <Badge
                  count={cart?.length >= 1 ? cart.length : 0}
                  offset={[-5, 11]}
                  showZero={true}
                >
                  <NavLink className="fs-5 px-4" href="/cart">
                    Cart
                  </NavLink>
                </Badge>
              </NavItem>
              {!auth?.token ? (
                <Fragment>
                  <NavItem>
                    <NavLink className="fs-5 px-4" href="/login">
                      Login
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className="fs-5 px-4" href="/registration">
                      Registration
                    </NavLink>
                  </NavItem>
                </Fragment>
              ) : (
                <Fragment>
                  <NavItem>
                    <NavLink
                      className="fs-5 px-4"
                      href={`/dashboard/${
                        auth?.user?.role === 1 ? "admin" : "user"
                      }`}
                    >
                      Dashboard
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className="fs-5 px-4"
                      href="/login"
                      onClick={logout}
                    >
                      Logout
                    </NavLink>
                  </NavItem>
                </Fragment>
              )}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    </Fragment>
  );
};

export default Menu;
