import { useRoutes } from "react-router-dom";
import "./App.css";
import { routes } from "./routes";

function App() {
  const generateRoute = useRoutes(routes);
  return <>{generateRoute}</>;
}

export default App;
