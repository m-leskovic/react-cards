import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { observer } from "mobx-react-lite"
import { action } from "mobx";
import { useNavigate } from "react-router-dom";

const Login = observer(({ store }) => {
    const navigate = useNavigate();
    const handleLoginChange = action(e => {
        const tg = e.target;
        store.login[tg.name] = tg.value;
    })
    const handleLogin = action(e => {
        e.preventDefault();
        store.logged = true;
        navigate("/home");
    })
    return (
        <Container className="login-wrapper">
            <Form className="d-flex flex-column align-items-center justify-content-evenly login-form p-3" onSubmit={handleLogin}>
                <h4 className="login-title fw-bold mb-4">User log in</h4>
                <Form.Group className="login-group text-start mb-4">
                    <Form.Label className="login-label fw-bold mb-4">Username</Form.Label>
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
                <Form.Group className="login-group text-start mb-4">
                    <Form.Label className="login-label fw-bold mb-4">Password</Form.Label>
                    <Form.Control
                        className="login-input"
                        type="password"
                        name="pass"
                        value={store.login.pass}
                        maxLength={15}
                        onChange={handleLoginChange}
                        placeholder="Enter password"
                        required
                    />
                </Form.Group>
                <Button className="login-btn fw-bold" type="submit">Log in</Button>
            </Form>
        </Container>
    )
})

export default Login