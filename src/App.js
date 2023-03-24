import Header from "./components/Header";
import Login from "./pages/Login";
import Home from "./pages/Home";
import CardDetails from "./pages/CardDetails";
import EditCard from "./pages/EditCard";
import Footer from "./components/Footer"
import rootStore from "./store/RootStore";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <Header store={rootStore.cardStore} />
      <Routes>
        <Route path="/" element={<Login store={rootStore.cardStore} />} />
        <Route path="/home" element={<Home store={rootStore.cardStore} />} />
        <Route path="/details" element={<CardDetails store={rootStore.cardStore} />} />
        <Route path="/edit" element={<EditCard store={rootStore.cardStore} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
