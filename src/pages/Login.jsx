import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { action } from "mobx";

const Login = observer(({ store }) => {
    const navigate = useNavigate();
    const handleLoginChange = action(e => {
        const tg = e.target;
        store.login[tg.name] = tg.value;
    })
    const handleLogin = action(e => {
        e.preventDefault();
        store.isLogged = true;
        navigate("/home");
    })
    return (
        <Container className="login-wrapper">
            <Form
                className="login-form d-flex flex-column justify-content-evenly align-items-center p-3"
                onSubmit={handleLogin}
            >
                <h3 className="login-title fw-bold mt-md-2 mt-0">User log in</h3>
                <Form.Group className="login-group">
                    <Form.Label className="login-label fw-bold my-sm-3">Username</Form.Label>
                    <Form.Control
                        className="login-input"
                        type="text"
                        name="user"
                        value={store.login.user}
                        maxLength={15}
                        onChange={handleLoginChange}
                        placeholder="Enter username"
                        required
                    />
                </Form.Group>
                <Form.Group className="login-group">
                    <Form.Label className="login-label fw-bold my-sm-3">Password</Form.Label>
                    <Form.Control
                        className="login-input mb-3"
                        type="password"
                        name="pass"
                        value={store.login.pass}
                        maxLength={15}
                        onChange={handleLoginChange}
                        placeholder="Enter password"
                        required
                    />
                </Form.Group>
                <Button className="login-btn my-sm-3 p-2 p-sm-1" type="submit">Log in</Button>
            </Form>
        </Container>
    )
})

export default Login