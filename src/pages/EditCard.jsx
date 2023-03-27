import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { action } from "mobx";

const EditCard = observer(({ store }) => {
    const navigate = useNavigate();
    const handleEditChange = action(e => {
        e.preventDefault();
        const tg = e.target;
        const newEdit = {...store.currentCard};
        if (tg.name === "number") {
            newEdit[tg.name] = tg.value.replace(/(\W|[a-zA-Z -])/gi, "").replace(/(.{4})/g, "$1 ").trim();
        } else if (tg.name === "cvv" || tg.name === "pin") {
            newEdit[tg.name] = tg.value.match(/[0-9]*/);
        } else if (tg.name === "name") {
            newEdit[tg.name] = tg.value.match(/[a-zA-Z -]*/);
        } else if (tg.name === "valid") {
            newEdit[tg.name] = tg.value.replace(/(\W|[a-zA-Z -])/gi, "").replace(/(\d{2})(\d{2})/g, "$1/$2");
        } else {
            newEdit[tg.name] = tg.value;
        }
        store.currentCard = newEdit;
    })
    const showHidePin = action(() => {
        (!store.showPin)? store.showPin = true
        : store.showPin = false;
    })
    const handleEditSubmit = action(e => {
        e.preventDefault();
        const edited = {
            id: store.cardId,
            number: store.currentCard.number.replace(/\s/g, ""),
            name: store.currentCard.name,
            valid: store.currentCard.valid,
            cvv: store.currentCard.cvv,
            pin: store.currentCard.pin,
            amountEur: Number(Math.round(store.currentCard.amountEur * 100) / 100)
        }
        const newArr = [...store.cardData];
        const idx = store.cardData.findIndex(card => card.id === store.cardId);
        newArr[idx] = edited;
        store.cardData = newArr;
        store.cardId = null;
        navigate("/details");
    })
    return (
        <Container fluid="md" className="card-details p-2 p-sm-3">
            <Form onSubmit={handleEditSubmit}>
                <Row className="ms-sm-1">
                    <Col className="bank-name fw-bold">Bank name</Col>
                    <Col className="text-end">
                        <Button type="submit" className="card-btn me-2" size="sm">
                            Save
                        </Button>
                        <Button type="button" className="card-btn" size="sm" onClick={() => navigate("/home")}>
                            Cancel
                        </Button>
                    </Col>
                </Row>
                <Row className="my-3 ms-sm-1">
                    <img
                        className="chip-png"
                        src={require("../assets/chip.png")}
                        alt="Golden credit card chip"
                    />
                </Row>
                <Row className="details-inner-wrapper gap-4 gap-sm-3 pb-3 mx-sm-1">
                    <Col className="num-wrapper">
                        <h4 className="details-title fw-bold">Card number</h4>
                        <Form.Control
                            type="text"
                            name="number"
                            maxLength={19}
                            value={store.currentCard.number.replace(/\W/gi, "").replace(/(.{4})/g, "$1 ").trim()}
                            onChange={handleEditChange}
                            required
                        />
                    </Col>
                    <Row>
                        <Col className="valid-wrapper pe-0 pe-sm-1">
                            <h4 className="details-title fw-bold">Valid through</h4>
                            <Form.Control
                                type="text"
                                name="valid"
                                maxLength={5}
                                value={store.currentCard.valid}
                                onChange={handleEditChange}
                                required
                            />
                        </Col>
                        <Col className="cvv-wrapper pe-0 pe-sm-1">
                            <h4 className="details-title fw-bold">CVV</h4>
                            <Form.Control
                                type="text"
                                name="cvv"
                                maxLength={3}
                                value={store.currentCard.cvv}
                                onChange={handleEditChange}
                                required
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col className="carholder-wrapper pe-0 pe-sm-1">
                            <h4 className="details-title fw-bold">Cardholder</h4>
                            <Form.Control
                                type="text"
                                name="name"
                                value={store.currentCard.name}
                                onChange={handleEditChange}
                                required
                            />
                        </Col>
                        <Col className="pin-wrapper pe-0 pe-sm-1">
                            <h4 className="details-title fw-bold">PIN</h4>
                            <Row>
                                <Col className="d-flex align-items-start">
                                    <Form.Control
                                        type={store.showPin? "text" : "password"}
                                        name="pin"
                                        maxLength={4}
                                        value={store.currentCard.pin}
                                        onChange={handleEditChange}
                                        required
                                    />
                                    <Button type="button" className="fa-pin ms-1 ms-sm-2" onClick={showHidePin}>
                                        <FontAwesomeIcon icon={store.showPin? faEyeSlash : faEye} />
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Row>
                <Row className="amount-wrapper my-3 mx-sm-1">
                    <Col>
                        <h4 className="details-title text-end fw-bold mb-3">Amount on card (€):</h4>
                        <Form.Control
                            className="text-end"
                            type="number"
                            name="amountEur"
                            value={store.currentCard.amountEur}
                            onChange={handleEditChange}
                            required
                        />
                    </Col>
                </Row>
            </Form>
        </Container>
    )
})

export default EditCard