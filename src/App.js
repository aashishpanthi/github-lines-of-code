// routes
import Router from "./routes";
import Amplify, { API } from "aws-amplify";
import awsconfig from "./aws-exports";

// context api
import { UserProvider } from "./UserContext";

const App = () => {
  Amplify.configure(awsconfig);
  API.configure(awsconfig);

  return (
    <UserProvider>
      <Router />
    </UserProvider>
  );
};

export default App;
