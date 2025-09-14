import { useRoutes } from "react-router-dom";
import "./App.css";
import { routes } from "./routes";
import { Toaster } from "./components/ui/sonner";


function App() {
  const generateRoute = useRoutes(routes);
  return (
    <>
      <Toaster position="top-center" richColors/>
      {generateRoute}
    </>
  );
}

export default App;
