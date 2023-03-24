import Container from "react-bootstrap/Container";
import AddCard from "../pages/AddCard";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { action } from "mobx";

const Content = observer(({ store }) => {
    const navigate = useNavigate();
    const hideNum = num => {
        return `${"*".repeat(num.length - 4)}${num.substr(-4)}`;
    }
    const handleDetails = action(card => {
        const current = {
            id: card.id,
            number: card.number,
            name: card.name,
            valid: card.valid,
            cvv: card.cvv,
            pin: card.pin,
            amountEur: card.amountEur
        }
        store.cardId = card.id;
        store.currentCard = current;
        navigate("/details");
    })
    return (
        <>
            {store.showModal? <AddCard store={store} /> : null }
            {store.cardData.map(card => {
                return (
                    <Container fluid className="content d-flex justify-content-between" key={card.id}>
                        <img className="card-png" src={require("../assets/card.png")} alt="Credit card" />
                        <Table className="content-info text-center">
                            <thead className="content-info-top fw-bold">
                                <tr>
                                    <th>Card number</th>
                                    <th>Valid through</th>
                                    <th>Cardholder</th>
                                </tr>
                            </thead>
                            <tbody className="content-info-bottom">
                                <tr>
                                    <td>{hideNum(card.number)}</td>
                                    <td>{card.valid}</td>
                                    <td>{card.name}</td>
                                </tr>
                            </tbody>
                        </Table>
                        <Button onClick={()=> handleDetails(card)} className="details-btn align-self-end">
                            Details
                        </Button>
                    </Container>
                )
            })}
        </>
    )
})

export default Content