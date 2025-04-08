import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="">
      <main className="">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
