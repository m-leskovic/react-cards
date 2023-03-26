import AddCard from "../pages/AddCard";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { action } from "mobx";

const CardContent = observer(({ store }) => {
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
            {store.cardData.map((card, i) => {
                return (
                    <Container fluid="md" className="content d-flex align-items-center p-3" key={card.id}>
                        <Image className="card-png" src={require("../assets/card.png")} alt="Credit card" />
                        <Table borderless className="content-table text-center mx-md-3 mb-0">
                            <thead className="content-table-top">
                                <tr>
                                    <th>Card number</th>
                                    <th>Valid through</th>
                                    <th>Cardholder</th>
                                </tr>
                            </thead>
                            <tbody className="content-table-bottom">
                                <tr>
                                    <td>{hideNum(card.number)}</td>
                                    <td>{card.valid}</td>
                                    <td>{card.name}</td>
                                </tr>
                            </tbody>
                        </Table>
                        <Button  className="details-btn align-self-end" onClick={() => handleDetails(card)}>
                            Details
                        </Button>
                    </Container>
                )
            })}
        </>
    )
})

export default CardContent