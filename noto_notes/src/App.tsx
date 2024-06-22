import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Note from "./Note";
import Register from "./Register";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Note />} />
        <Route path="/sign_in" element={<Login />} />
        <Route path="/sign_up" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
