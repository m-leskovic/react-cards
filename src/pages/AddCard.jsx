import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CloseButton from 'react-bootstrap/CloseButton';
import { observer } from "mobx-react-lite";
import { action } from "mobx";
import { nanoid } from "nanoid";
import { ModalBody } from "react-bootstrap";


const AddCard = observer(({ store }) => {
    const handleHide = action(() => store.showModal = false);
    const handleChange = action(e => {
        const tg = e.target;
        store.createCard[tg.name] = tg.value;
    })
    const handleNumChange = action(e => {
        const tg = e.target;
        const newValue = tg.value.replace(/\W/gi, "").replace(/(.{4})/g, "$1 ");
        store.createCard.number = newValue;
    })
    const handleSubmit = action(e => {
        e.preventDefault();
        const newCard = {
            id: nanoid(),
            number: store.createCard.number.replace(/\s/g, ""),
            name: store.createCard.name,
            valid: store.createCard.valid,
            cvv: store.createCard.cvv,
            pin: store.createCard.pin,
            amountEur: store.createCard.amountEur
        }
        const newArr = [...store.cardData, newCard];
        store.cardData = newArr;
        handleHide();
    })
    const generate = action(() => {
        let num = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
        store.createCard.pin = num;
    })
    return (
        <Modal show={store.showModal} backdrop="static">
            <CloseButton className="close-btn align-self-end" onClick={handleHide} />
            <Modal.Header>
                <Modal.Title className="add-card-title my-2 mx-auto fw-bold">
                    Add a new card
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="add-card-form d-flex flex-column" onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label className="add-form-label fw-bold">Card number</Form.Label>
                        <Form.Control
                            type="text"
                            maxLength={19}
                            name="number"
                            value={store.createCard.number}
                            onChange={handleNumChange}
                            placeholder="Enter card number"
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="add-form-label fw-bold">Cardholder name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={store.createCard.name}
                            onChange={handleChange}
                            placeholder="Enter first and last name"
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="add-form-label fw-bold">Expiration date</Form.Label>
                        <Form.Control
                            type="text"
                            maxLength={5}
                            name="valid"
                            value={store.createCard.valid.replace(/\W/gi, "").replace(/(\d{2})(\d{2})/g, "$1/$2")}
                            onChange={handleChange}
                            placeholder="MM/YY"
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="add-form-label fw-bold">CVV</Form.Label>
                        <Form.Control
                            type="text"
                            maxLength={3}
                            name="cvv"
                            value={store.createCard.cvv.match(/[0-9]*/)}
                            onChange={handleChange} placeholder="Enter CVV"
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="add-form-label fw-bold">PIN</Form.Label>
                        <Form.Control
                            type="text"
                            maxLength={4}
                            name="pin"
                            value={store.createCard.pin.match(/[0-9]*/)}
                            onFocus={generate}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>          
                    <Form.Group>
                        <Form.Label className="add-form-label fw-bold">Amount on card (€)</Form.Label>
                        <Form.Control
                            type="number"
                            name="amountEur"
                            value={store.createCard.amountEur}
                            onChange={handleChange}
                            placeholder="Enter amount on card"
                            required
                        />
                    </Form.Group>
                    <Button className="submit-btn align-self-center" type="submit">
                        Save
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
})

export default AddCard