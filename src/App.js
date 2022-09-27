// routes
import Router from "./routes";

// context api
import { UserProvider } from "./UserContext";

const App = () => {
  return (
    <UserProvider>
      <Router />
    </UserProvider>
  );
};

export default App;
