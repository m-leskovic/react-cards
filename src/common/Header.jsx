import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { action } from "mobx";
import {
  faUser,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

const Header = observer(({ store }) => {
  const navigate = useNavigate();

  const handleLogout = action(() => {
    store.login = {
      user: "",
      pass: "",
    };
    store.isLogged = false;
    navigate("/");
  });
  return (
    <Navbar expand="xs" className="mb-3">
      <Nav className="flex-row align-items-center">
        <Navbar.Brand className="ms-3 me-0">
          <Navbar.Text className="nav-brand-name">MyBank</Navbar.Text>
          <Navbar.Brand className="ms-2">
            <Image
              className="logo-png"
              src={require("../assets/logo.png")}
              alt="Logo"
            />
          </Navbar.Brand>
        </Navbar.Brand>
        <Nav.Link className="nav-home me-3" href="/home">
          Home
        </Nav.Link>
      </Nav>
      {store.isLogged ? (
        <Navbar.Text className="nav-logged-wrapper me-3">
          <FontAwesomeIcon className="fa-user ms-3" icon={faUser} />
          <Navbar.Text className="nav-logged-user mx-2">
            Logged in as: <b>{store.login.user}</b>
          </Navbar.Text>
          <Button size="sm" className="nav-logout-btn" onClick={handleLogout}>
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
          </Button>
        </Navbar.Text>
      ) : window.location.pathname === "/home" ? (
        <Button className="nav-login-btn me-3" onClick={() => navigate("/")}>
          Log in
        </Button>
      ) : null}
    </Navbar>
  );
});

export default Header;
