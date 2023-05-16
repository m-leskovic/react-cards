import Button from "react-bootstrap/Button";
import CardContent from "../components/CardContent";
import Container from "react-bootstrap/Container";
import { action } from "mobx";
import { observer } from "mobx-react-lite";

const Home = observer(({ store }) => {
  const handleModal = action(() => {
    store.showModal = true;
  });
  return (
    <>
      {store.isLogged ? (
        <Container
          fluid="md"
          className="home d-flex gap-md-3 flex-column justify-content-evenly align-items-center p-0"
        >
          <CardContent store={store} />
          <Button className="add-btn mt-3" onClick={handleModal}>
            + Add a new card
          </Button>
        </Container>
      ) : (
        <Container fluid="md" className="no-content text-center mt-5">
          <h3>No cards to show. Please log in.</h3>
        </Container>
      )}
    </>
  );
});

export default Home;
