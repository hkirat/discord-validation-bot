import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages";
import VerifyPage from "./pages/verify";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/verify" element={<VerifyPage />} />
    </Routes>
  );
};

export default App;
