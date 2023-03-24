import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { action } from "mobx";
 
const Header = observer(({ store }) => {
    const navigate = useNavigate();
    const handleLogout = action(() => {
        store.login = {
            user: "",
            pass: ""
        };
        store.logged = false;
        navigate("/");
    })
    return (
        <Navbar expand="sm" className="navbar my-2 mx-3">
            <Navbar.Brand>
                <Navbar.Text className="nav-brand me-2 fs-4">MyBank</Navbar.Text>
                <Navbar.Brand className="m-auto">
                    <img className="logo-png" src={require("../assets/logo.png")} alt="Logo" />
                </Navbar.Brand>
            </Navbar.Brand>
            <Nav>
                <Nav.Link className="mb-2" href="/home">Home</Nav.Link>
            </Nav>
            { store.logged?
                <Navbar.Text className="nav-logged-wrapper ms-auto">
                    <FontAwesomeIcon className="fa-user" icon={faUser} />
                    <Navbar.Text className="nav-logged-user">Logged in as: <b>{store.login.user}</b></Navbar.Text>
                    <Button className="nav-logout-btn" onClick={handleLogout}>
                        <FontAwesomeIcon icon={faArrowRightFromBracket} />
                    </Button>
                </Navbar.Text>
            : (window.location.pathname === "/home")? <Button className="nav-login-btn mb-1 ms-auto fw-bold" onClick={() => navigate("/")}>Log in</Button>
            : null
            }
        </Navbar>
    )
})

export default Header