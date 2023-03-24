import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { observer } from "mobx-react-lite";
import { action } from "mobx";
import { useNavigate } from "react-router-dom";

const EditCard = observer(({ store }) => {
    const navigate = useNavigate();
    const handleClose = action(() => navigate("/details"));
    const handleUpdate = action(e => {
        const tg = e.target;
        const newValues = {...store.currentCard};
        if (tg.name === "cvv" || tg.name === "pin") {
            newValues[tg.name] = tg.value.match(/[0-9]*/);
        } else if (tg.name === "name") {
            newValues[tg.name] = tg.value.match(/[a-zA-Z -]*/)
        } else {
            newValues[tg.name] = tg.value;
        }
        store.currentCard = newValues;
    })
    const showHidePin = action(() => {
        (!store.showPin)? store.showPin = true
        : store.showPin = false;
    })
    return (
        <Container fluid className="details d-flex flex-column p-lg-5 p-4" key={store.currentCard.id} >
            <Row>
                <Col className="bank-name fs-2">Bank name</Col>
                <Col className="text-end">
                    <Button type="submit" size="lg" className="card-btn me-3" onClick={() => navigate("/details")}>
                        Save
                    </Button>
                    <Button size="lg" className="card-btn" onClick={handleClose}>
                        Cancel
                    </Button>
                </Col>
            </Row>
            <Row>
                <img
                    className="chip-png mt-4"
                    src={require("../assets/chip.png")}
                    alt="Golden credit card chip"
                />
            </Row>
            <Row className="details-main-wrapper mt-sm-5 mb-sm-3 pb-sm-3">
                <Col className="card-num-wrapper">
                    <h4 className="details-title fw-bold fs-4">Card number</h4>
                    <Form.Control
                        type="text"
                        maxLength={19}
                        name="number"
                        value={store.currentCard.number.replace(/\W/gi, "").replace(/(.{4})/g, "$1 ")}
                        onChange={handleUpdate}
                    />
                </Col>
                <Row>
                    <Col className="valid-wrapper">
                        <h4 className="details-title fw-bold fs-4">Valid through</h4>
                        <Form.Control
                            type="text"
                            name="valid"
                            maxLength={5}
                            value={store.currentCard.valid.replace(/\W/gi, "").replace(/(\d{2})(\d{2})/g, "$1/$2")}
                            onChange={handleUpdate}
                        />
                    </Col>
                    <Col className="cvv-wrapper">
                        <h4 className="details-title fw-bold fs-4">CVV</h4>
                        <Form.Control
                            type="text"
                            maxLength={3}
                            name="cvv"
                            value={store.currentCard.cvv}
                            onChange={handleUpdate}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col className="carholder-wrapper">
                        <h4 className="details-title fw-bold fs-4">Cardholder</h4>
                        <Form.Control
                            type="text"
                            name="name"
                            value={store.currentCard.name}
                            onChange={handleUpdate}
                        />
                    </Col>
                    <Col className="pin-wrapper">
                        <h4 className="details-title fw-bold fs-4">PIN</h4>
                        <Row>
                            <Col className="d-flex">
                                <Form.Control
                                    type={store.showPin? "text" : "password"}
                                    maxLength={4}
                                    name="pin"
                                    value={store.currentCard.pin}
                                    onChange={handleUpdate}
                                />
                                <Button className="fa-pin ms-3" onClick={showHidePin}>
                                    <FontAwesomeIcon icon={store.showPin? faEyeSlash : faEye} />
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Row>
            <Row className="amount-wrapper">
                <Col className="text-end">
                    <h4 className="details-title fw-bold fs-4 text-end">Amount on card (€):</h4>
                    <Form.Control
                        className="text-end"
                        type="number"
                        name="amountEur"
                        value={store.currentCard.amountEur}
                        onChange={handleUpdate}
                    />
                </Col>
            </Row>
        </Container>
    )
})

export default EditCard