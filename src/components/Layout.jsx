import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

import { ClearStorage, FromStorage } from "../library";
import { clearUser, setUser } from "../store";
import http from "../http";
import { useDispatch, useSelector } from "react-redux";
import { LoadingComponent } from "./Loading";
import "bootstrap/dist/css/bootstrap.min.css";

import "./Layout.css";
import { Dropdown, NavDropdown, Offcanvas } from "react-bootstrap";
import DropDownComponent from "./DropDownComponent";

const Layout = () => {

  
  const user = useSelector((state) => state.user.value);

  const cart = useSelector((state) => state.cart.value);




  const [term, setTerm] = useState("");

  const navigate = useNavigate();

  const [Loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const [categories, setCategories] = useState([]);

  const [brands, setBrands] = useState([]);

  const [totalPrice, setTotalPrice] = useState();

  const [totalQty, setTotalQty] = useState();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = (e) => {
    e.preventDefault();
    ClearStorage("r130fronttoken");
    dispatch(clearUser());
    navigate("/");
  };

  useEffect(() => {
  
    setLoading(true);
    if (!user) {
      const token = FromStorage("r130fronttoken");
      console.log(token);
      if (token) {
        http
          .get("/profile")
          .then(({ data }) => {
            dispatch(setUser(data))
          })
          .catch(() => {})
          .finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (cart) {
      let tp = 0;
      let tq = 0;
      for (let key in cart) {
        tp += cart[key].total;
        tq += cart[key].qty;
      }

      setTotalPrice(tp);
      setTotalQty(tq);
    } else {
      setTotalPrice(0);
      setTotalQty(0);
    }
  }, [cart]);

  // console.log(categories);

  useEffect(() => {
    setLoading(true);
    http
      .get("/categories")
      .then(({ data }) => setCategories(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [categories]);

  useEffect(() => {
    setLoading(true);
    http
      .get("/brands")
      .then(({ data }) => setBrands(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [brands]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?term=${term}`);
  };

  return (
    <>


      <div class="container-fluid">
        <div class="row min-vh-100">
          <div class="col-12">
            <header class="row " >
              <div class="col-12 bg-dark py-2 d-md-block">
                <div class="row">
                  <div class="col-auto me-auto bg-primary">
                    <ul class="top-nav">
                      <li>
                        <a href="tel:+123-456-7890">
                          <i class="fa fa-phone-square me-2"></i>+123-456-7890
                        </a>
                      </li>
                      <li>
                        <a href="mailto:mail@ecom.com">
                          <i class="fa fa-envelope me-2"></i>mail@ecom.com
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div class="col-auto bg-secondary">
                    <ul class="top-nav">
                      {user ? (
                        <>
                          <li>
                            <Link to="/dashboard">
                              <i class="fas fa-user-edit me-2"></i>
                              {user.name}
                            </Link>
                          </li>
                          <li>
                            <Link onClick={handleLogout}>
                              <i class="fas fa-sign-in-alt me-2"></i>
                              Logout
                            </Link>
                          </li>
                        </>
                      ) : (
                        <>
                          <li>
                            <Link to="/register">
                              <i class="fas fa-user-edit me-2"></i>Register
                            </Link>
                          </li>
                          <li>
                            <Link to="/login">
                              <i class="fas fa-sign-in-alt me-2"></i>Login
                            </Link>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>

              <div class="col-12 bg-white pt-4">
                <div class="row">
                  <div class="col-lg-auto">
                    <div class="site-logo text-center text-lg-left">
                      <a>E-Commerce</a>
                    </div>
                  </div>
                  <div class="col-lg-5 mx-auto mt-4 mt-lg-0">
                    <form onSubmit={handleSearch}>
                      <div class="form-group">
                        <div class="input-group">
                          <input
                            type="search"
                            class="form-control border-dark"
                            placeholder="Search..."
                            onChange={(e) => setTerm(e.target.value)}
                            value={term}
                          />
                          <button class="btn btn-outline-dark" type="submit">
                            <i class="fas fa-search"></i>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div class="col-lg-auto text-center text-lg-left header-item-holder ">
                    <a href="#" class="header-item ">
                      <i class="fas fa-heart me-2"></i>
                      <span id="header-favorite">0</span>
                    </a>
                    <Link to="/cart" class="header-item">
                      <i class="fas fa-shopping-bag me-2"></i>
                      <span id="header-qty" class="me-3">
                        {totalQty}
                      </span>
                      <i class="fas fa-money-bill-wave me-2"></i>
                      <span id="header-price">{totalPrice}</span>
                    </Link>
                  </div>
                </div>

                <div class="row">
                  <nav class="navbar navbar-expand-lg navbar-light bg-white col-12">
                    <button
                      class="navbar-toggler d-lg-none border-0"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#mainNav"
                    >
                      <span
                        class="navbar-toggler-icon"
                        onClick={handleShow}
                      ></span>

                      <Offcanvas show={show} onHide={handleClose}>
                        <Offcanvas.Header closeButton>
                          <Offcanvas.Title>Home</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>

                          {/* For small */}
                          <DropDownComponent
                            categories={categories}
                            brands={brands}
                            small
                          />
                        </Offcanvas.Body>
                      </Offcanvas>
                    </button>
                    <div class="collapse navbar-collapse" id="mainNav">
                      <ul class="navbar-nav mx-auto mt-2 mt-lg-0 bg-primary">
                        <li class="nav-item ">
                          <Link
                            class="nav-link "
                            to="/"
                            id="electronics"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            Home
                          </Link>
                          <div
                            class="dropdown-menu"
                            aria-labelledby="electronics"
                          >
                            <a class="dropdown-item" href="category.html">
                              Computers
                            </a>
                            <a class="dropdown-item" href="category.html">
                              Mobile Phones
                            </a>
                            <a class="dropdown-item" href="category.html">
                              Television Sets
                            </a>
                            <a class="dropdown-item" href="category.html">
                              DSLR Cameras
                            </a>
                            <a class="dropdown-item" href="category.html">
                              Projectors
                            </a>
                          </div>
                        </li>


                        {/* For large */}
                        <DropDownComponent
                          categories={categories}
                          brands={brands}
                          large
                        />

                        {/* <li class="nav-item active">
                          <a class="nav-link" href="/">
                            Home <span class="sr-only">(current)</span>
                          </a>
                        </li>
                        <li class="nav-item dropdown">
                          <a
                            class="nav-link dropdown-toggle"
                            href="#"
                            id="electronics"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            Electronics
                          </a>
                          <div
                            class="dropdown-menu"
                            aria-labelledby="electronics"
                          >
                            <a class="dropdown-item" href="category.html">
                              Computers
                            </a>
                            <a class="dropdown-item" href="category.html">
                              Mobile Phones
                            </a>
                            <a class="dropdown-item" href="category.html">
                              Television Sets
                            </a>
                            <a class="dropdown-item" href="category.html">
                              DSLR Cameras
                            </a>
                            <a class="dropdown-item" href="category.html">
                              Projectors
                            </a>
                          </div>
                        </li>
                        <li class="nav-item dropdown">
                          <a
                            class="nav-link dropdown-toggle"
                            href="#"
                            id="fashion"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            Fashion
                          </a>
                          <div class="dropdown-menu" aria-labelledby="fashion">
                            <a class="dropdown-item" href="category.html">
                              Men's
                            </a>
                            <a class="dropdown-item" href="category.html">
                              Women's
                            </a>
                            <a class="dropdown-item" href="category.html">
                              Children's
                            </a>
                            <a class="dropdown-item" href="category.html">
                              Accessories
                            </a>
                            <a class="dropdown-item" href="category.html">
                              Footwear
                            </a>
                          </div>
                        </li>
                        <li class="nav-item dropdown">
                          <a
                            class="nav-link dropdown-toggle"
                            href="#"
                            id="books"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            Books
                          </a>
                          <div class="dropdown-menu" aria-labelledby="books">
                            <a class="dropdown-item" href="category.html">
                              Adventure
                            </a>
                            <a class="dropdown-item" href="category.html">
                              Horror
                            </a>
                            <a class="dropdown-item" href="category.html">
                              Romantic
                            </a>
                            <a class="dropdown-item" href="category.html">
                              Children's
                            </a>
                            <a class="dropdown-item" href="category.html">
                              Non-Fiction
                            </a>
                          </div>
                        </li> */}
                      </ul>
                    </div>
                  </nav>
                </div>
              </div>
            </header>
          </div>

          {/* Change Part in Mulitple Page */}
          <Outlet />

          <div class="col-12 align-self-end">
            <footer class="row">
              <div class="col-12 bg-dark text-white pb-3 pt-5">
                <div class="row">
                  <div class="col-lg-2 col-sm-4 text-center text-sm-left mb-sm-0 mb-3">
                    <div class="row">
                      <div class="col-12">
                        <div class="footer-logo">
                          <a href="index.html">E-Commerce</a>
                        </div>
                      </div>
                      <div class="col-12">
                        <address>
                          221B Baker Street
                          <br />
                          London, England
                        </address>
                      </div>
                      <div class="col-12">
                        <a href="#" class="social-icon">
                          <i class="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" class="social-icon">
                          <i class="fab fa-twitter"></i>
                        </a>
                        <a href="#" class="social-icon">
                          <i class="fab fa-pinterest-p"></i>
                        </a>
                        <a href="#" class="social-icon">
                          <i class="fab fa-instagram"></i>
                        </a>
                        <a href="#" class="social-icon">
                          <i class="fab fa-youtube"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-3 col-sm-8 text-center text-sm-left mb-sm-0 mb-3">
                    <div class="row">
                      <div class="col-12 text-uppercase">
                        <h4>Who are we?</h4>
                      </div>
                      <div class="col-12 text-justify">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Nullam imperdiet vel ligula vel sodales. Aenean
                          vel ullamcorper purus, ac pharetra arcu. Nam enim
                          velit, ultricies eu orci nec, aliquam efficitur sem.
                          Quisque in sapien a sem vestibulum volutpat at eu
                          nibh. Suspendisse eget est metus. Maecenas mollis quis
                          nisl ac malesuada. Donec gravida tortor massa, vitae
                          semper leo sagittis a. Donec augue turpis, rutrum
                          vitae augue ut, venenatis auctor nulla. Sed posuere at
                          erat in consequat. Nunc congue justo ut ante sodales,
                          bibendum blandit augue finibus.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-2 col-sm-3 col-5 ms-lg-auto ms-sm-0 ms-auto mb-sm-0 mb-3">
                    <div class="row">
                      <div class="col-12 text-uppercase">
                        <h4>Quick Links</h4>
                      </div>
                      <div class="col-12">
                        <ul class="footer-nav">
                          <li>
                            <a href="#">Home</a>
                          </li>
                          <li>
                            <a href="#">Contact Us</a>
                          </li>
                          <li>
                            <a href="#">About Us</a>
                          </li>
                          <li>
                            <a href="#">Privacy Policy</a>
                          </li>
                          <li>
                            <a href="#">Terms & Conditions</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-1 col-sm-2 col-4 me-auto mb-sm-0 mb-3">
                    <div class="row">
                      <div class="col-12 text-uppercase text-underline">
                        <h4>Help</h4>
                      </div>
                      <div class="col-12">
                        <ul class="footer-nav">
                          <li>
                            <a href="#">FAQs</a>
                          </li>
                          <li>
                            <a href="#">Shipping</a>
                          </li>
                          <li>
                            <a href="#">Returns</a>
                          </li>
                          <li>
                            <a href="#">Track Order</a>
                          </li>
                          <li>
                            <a href="#">Report Fraud</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-3 col-sm-6 text-center text-sm-left">
                    <div class="row">
                      <div class="col-12 text-uppercase">
                        <h4>Newsletter</h4>
                      </div>
                      <div class="col-12">
                        <form action="#">
                          <div class="mb-3">
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Enter your email..."
                              required
                            />
                          </div>
                          <div class="mb-3">
                            <button class="btn btn-outline-light text-uppercase">
                              Subscribe
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>

      <div class="toast-container position-fixed bottom-0 start-0 p-3">
        <div class="toast align-items-center text-white bg-success border-0">
          <div class="d-flex">
            <div class="toast-body">
              <i class="fas fa-check-circle me-2"></i>
              This is a success alert message.
            </div>
            <button
              type="button"
              class="btn-close btn-close-white me-2 m-auto"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
        </div>
        <div class="toast align-items-center text-white bg-danger border-0">
          <div class="d-flex">
            <div class="toast-body">
              <i class="fas fa-times-circle me-2"></i>
              This is an error alert message.
            </div>
            <button
              type="button"
              class="btn-close btn-close-white me-2 m-auto"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
        </div>
        <div class="toast align-items-center text-white bg-warning border-0">
          <div class="d-flex">
            <div class="toast-body">
              <i class="fas fa-exclamation-circle me-2"></i>
              This is a warning alert message.
            </div>
            <button
              type="button"
              class="btn-close btn-close-white me-2 m-auto"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
        </div>
        <div class="toast align-items-center text-white bg-info border-0">
          <div class="d-flex">
            <div class="toast-body">
              <i class="fas fa-info-circle me-2"></i>
              This is a error alert message.
            </div>
            <button
              type="button"
              class="btn-close btn-close-white me-2 m-auto"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
        </div>
      </div>
    
    </>
  );
};

export default Layout;
