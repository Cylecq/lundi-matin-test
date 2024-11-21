import Router from "./navigation/Router.tsx";
import Providers from "./components/Providers.tsx";

function App() {
  return (
    <Providers>
      <Router />
    </Providers>
  );
}

export default App;
