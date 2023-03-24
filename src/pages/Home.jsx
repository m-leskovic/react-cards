import Container from "react-bootstrap/Container";
import Content from "../components/Content";
import Button from "react-bootstrap/Button";
import { observer } from "mobx-react-lite";
import { action } from "mobx";

const Home = observer(({ store }) => {
    const handleModal = action(() => {
        store.showModal = true;
    })
    return (
        <>
            {store.logged?
                <Container fluid className="home d-flex flex-column align-items-center">
                    <Content store={store} />
                    <Button className="add-btn" onClick={handleModal}>
                        + Add a new card
                    </Button>
                </Container>
            :   <Container fluid className="text-center">
                    <h4>No cards to show. Please log in.</h4>
                </Container>
            }
        </>
        )
})

export default Home