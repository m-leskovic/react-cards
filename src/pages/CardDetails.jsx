import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { action } from "mobx";

const CardDetails = observer(({ store }) => {
    const navigate = useNavigate();
    const handleDelete = action(() => {
        const newArray = [...store.cardData];
        const idx = store.cardData.findIndex(card => card.id === store.cardId);
        newArray.splice(idx, 1);
        store.cardData = newArray;
        navigate("/home");
    })
    const pinValue = action(() => {
        return (!store.showPin)? store.hiddenPin : store.currentCard.pin;
    })
    const showHidePin = action(() => {
        (!store.showPin)? store.showPin = true
        : store.showPin = false;
    })
    return (
        <Container fluid="md" className="card-details p-2 p-sm-3">
            <Row className="ms-sm-1">
                <Col className="bank-name fw-bold">Bank name</Col>
                <Col className="text-end">
                    <Button type="button" className="card-btn me-2" size="sm" onClick={() => navigate("/edit")}>
                        Edit
                    </Button>
                    <Button type="button" className="card-btn" size="sm" onClick={handleDelete}>
                        Delete
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
            <Row className="details-inner-wrapper pb-3 mx-sm-1">
                <Col className="num-wrapper">
                    <h4 className="details-title fw-bold">Card number</h4>
                    <p className="details-p details-num">
                        {store.currentCard.number.replace(/\W/gi, "").replace(/(.{4})/g, "$1 ")}
                    </p>
                </Col>
                <Row>
                    <Col className="valid-wrapper">
                        <h4 className="details-title fw-bold">Valid through</h4>
                        <p className="details-p">{store.currentCard.valid}</p>
                    </Col>
                    <Col className="cvv-wrapper cvv-details-wrapper">
                        <h4 className="details-title fw-bold">CVV</h4>
                        <p className="details-p">{store.currentCard.cvv}</p>
                    </Col>
                </Row>
                <Row>
                    <Col className="carholder-wrapper">
                        <h4 className="details-title fw-bold">Cardholder</h4>
                        <p className="details-p">{store.currentCard.name}</p>
                    </Col>
                    <Col className="pin-wrapper pin-details-wrapper">
                        <h4 className="details-title fw-bold">PIN</h4>
                        <Row>
                            <Col className="d-flex align-items-start">
                                <p className="details-p">{pinValue()}</p>
                                <Button type="button" className="fa-pin ms-2 ms-sm-3" size="sm" onClick={showHidePin}>
                                    <FontAwesomeIcon icon={store.showPin? faEyeSlash : faEye} />
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Row>
            <Row className="amount-wrapper text-end my-3 mx-sm-1">
                <Col>
                    <h4 className="details-title fw-bold mb-3">Amount on card (€):</h4>
                    <p className="details-p">
                        {Number(Math.round(store.currentCard.amountEur * 100) / 100)}
                    </p>
                    <Button
                        type="button"
                        className="back-btn"
                        size="sm"
                        onClick={() => navigate("/home")}
                    >
                        Back to cards
                    </Button>
                </Col>
            </Row>
        </Container>
    )
})

export default CardDetails