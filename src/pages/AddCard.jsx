import Modal from "react-bootstrap/Modal";
import CloseButton from 'react-bootstrap/CloseButton';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { observer } from "mobx-react-lite";
import { action } from "mobx";
import { nanoid } from "nanoid";

const AddCard = observer(({ store }) => {
    const handleHide = action(() => store.showModal = false);
    const handleChange = action(e => {
        const tg = e.target;
        const newCreate = {...store.createCard};
        if (tg.name === "number") {
            newCreate[tg.name] = tg.value.replace(/(\W|[a-zA-Z -])/gi, "").replace(/(.{4})/g, "$1 ").trim();
        } else if (tg.name === "cvv" || tg.name === "pin") {
            newCreate[tg.name] = tg.value.match(/[0-9]*/);
        } else if (tg.name === "name") {
            newCreate[tg.name] = tg.value.match(/[a-zA-Z -]*/);
        } else if (tg.name === "valid") {
            newCreate[tg.name] = tg.value.replace(/(\W|[a-zA-Z -])/gi, "").replace(/(\d{2})(\d{2})/g, "$1/$2");
        } else {
            newCreate[tg.name] = tg.value;
        }
        store.createCard = newCreate;
    })
    const handleSubmit = action(e => {
        e.preventDefault();
        const newCard = {
            id: nanoid(),
            number: store.createCard.number.replace(/\s/g, ""),
            name: store.createCard.name,
            valid: store.createCard.valid.replace(/(\W|[a-zA-Z -])/gi, "").replace(/(\d{2})(\d{2})/g, "$1/$2"),
            cvv: store.createCard.cvv,
            pin: store.createCard.pin,
            amountEur: Number(Math.round(store.createCard.amountEur * 100) / 100)
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
            <CloseButton className="close-btn ms-auto" onClick={handleHide} />
            <Modal.Header>
                <Modal.Title className="add-card-title fw-bold mx-auto">
                    Add a new card
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form
                    className="add-card-form d-flex flex-column align-items-center"
                    onSubmit={handleSubmit}
                >
                    <Form.Group className="add-form-group">
                        <Form.Label className="add-form-label fw-bold">Card number</Form.Label>
                        <Form.Control
                            className="add-form-input"
                            type="text"
                            maxLength={19}
                            name="number"
                            value={store.createCard.number}
                            onChange={handleChange}
                            placeholder="Enter card number"
                            required
                        />
                    </Form.Group>
                    <Form.Group className="add-form-group">
                        <Form.Label className="add-form-label fw-bold">Cardholder name</Form.Label>
                        <Form.Control
                            className="add-form-input"
                            type="text"
                            name="name"
                            value={store.createCard.name}
                            onChange={handleChange}
                            placeholder="Enter first and last name"
                            required
                        />
                    </Form.Group>
                    <Form.Group className="add-form-group">
                        <Form.Label className="add-form-label fw-bold">Expiration date</Form.Label>
                        <Form.Control
                            className="add-form-input"
                            type="text"
                            maxLength={5}
                            name="valid"
                            value={store.createCard.valid}
                            onChange={handleChange}
                            placeholder="MM/YY"
                            required
                        />
                    </Form.Group>
                    <Form.Group className="add-form-group">
                        <Form.Label className="add-form-label fw-bold">CVV</Form.Label>
                        <Form.Control
                            className="add-form-input"
                            type="text"
                            maxLength={3}
                            name="cvv"
                            value={store.createCard.cvv}
                            onChange={handleChange} placeholder="Enter CVV"
                            required
                        />
                    </Form.Group>
                    <Form.Group className="add-form-group">
                        <Form.Label className="add-form-label fw-bold">PIN</Form.Label>
                        <Form.Control
                            className="add-form-input"
                            type="text"
                            maxLength={4}
                            name="pin"
                            value={store.createCard.pin}
                            onFocus={generate}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>          
                    <Form.Group className="add-form-group">
                        <Form.Label className="add-form-label fw-bold">Amount on card (€)</Form.Label>
                        <Form.Control
                            className="add-form-input"
                            type="number"
                            name="amountEur"
                            value={store.createCard.amountEur}
                            onChange={handleChange}
                            placeholder="Enter amount on card"
                            required
                        />
                    </Form.Group>
                    <Button className="submit-btn mt-3" type="submit">
                        Save
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
})

export default AddCard