import CardDetails from "./pages/CardDetails";
import EditCard from "./pages/EditCard";
import Footer from "./common/Footer";
import Header from "./common/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import rootStore from "./store/RootStore";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <Header store={rootStore.cardStore} />
      <Routes>
        <Route path="/" element={<Login store={rootStore.cardStore} />} />
        <Route path="/home" element={<Home store={rootStore.cardStore} />} />
        <Route
          path="/details"
          element={<CardDetails store={rootStore.cardStore} />}
        />
        <Route
          path="/edit"
          element={<EditCard store={rootStore.cardStore} />}
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
