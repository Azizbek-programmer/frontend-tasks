import { Route, Routes } from "react-router";
import { Home } from "./pages/home";
import { TaskDetail } from "./pages/task-detail";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/task/:id" element={<TaskDetail />} />
      </Routes>
    </>
  );
}

export default App;
