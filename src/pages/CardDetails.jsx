import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { observer } from "mobx-react-lite";
import { action } from "mobx";
import { useNavigate } from "react-router-dom";

const CardDetails = observer(({ store }) => {
    const navigate = useNavigate();
    const handleDelete = action(() => {
        const idx = store.cardData.findIndex(card => card.id === store.cardId);
        const newArray = [...store.cardData];
        newArray.splice(idx, 1);
        store.cardData = newArray;
        navigate("/home");
    })
    const handleEdit = action(() => {
        navigate("/edit");
    })
    const pinValue = action(() => {
        return (!store.showPin)? store.hidden
        : store.currentCard.pin;
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
                    <Button size="lg" className="card-btn me-3" onClick={handleEdit}>
                        Edit
                    </Button>
                    <Button size="lg" className="card-btn" onClick={handleDelete}>
                        Delete
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
                    <p className="details-p fw-bold fs-2">
                        {store.currentCard.number.replace(/\W/gi, "").replace(/(.{4})/g, "$1 ")}
                    </p>
                </Col>
                <Row>
                    <Col className="valid-wrapper">
                        <h4 className="details-title fw-bold fs-4">Valid through</h4>
                        <p className="details-p fs-4">{store.currentCard.valid}</p>
                    </Col>
                    <Col className="cvv-wrapper">
                        <h4 className="details-title fw-bold fs-4">CVV</h4>
                        <p className="details-p fs-4">{store.currentCard.cvv}</p>
                    </Col>
                </Row>
                <Row>
                    <Col className="carholder-wrapper">
                        <h4 className="details-title fw-bold fs-4">Cardholder</h4>
                        <p className="details-p fs-4">{store.currentCard.name}</p>
                    </Col>
                    <Col className="pin-wrapper">
                        <h4 className="details-title fw-bold fs-4">PIN</h4>
                        <Row>
                            <Col className="d-flex align-items-start">
                                <p className="details-p fs-4">{pinValue()}</p>
                                <Button className="fa-pin ms-3" onClick={showHidePin}>
                                    <FontAwesomeIcon icon={store.showPin? faEyeSlash : faEye} />
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Row>
            <Row className="amount-wrapper">
                <Col>
                    <h4 className="details-title fw-bold fs-4 text-end">Amount on card (€):</h4>
                    <p className="details-p fw-bold fs-3 text-end">
                        {Number(Math.round(store.currentCard.amountEur * 100) / 100)}
                    </p>
                    <Button
                        className="back-btn p-2"
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