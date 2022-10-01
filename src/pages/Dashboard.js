import { UserContext } from "../UserContext";
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Page from "../components/Page";
import { Container, Snackbar, LinearProgress, IconButton } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import CloseIcon from "@mui/icons-material/Close";

import styles from "./styles/dashboard.module.css";
import { API } from "aws-amplify";

const Dashboard = () => {
  const user = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  // state for the toast
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const handleClick = async () => {
    setLoading(true);
    openToast("Wait for couple of minutes...", "info");

    try {
      const response = await API.post("locapi", `/user/${user.username}`, {
        body: {
          username: user.username,
          access_token: user.access_token,
          photo: user.photo,
        },
      });

      console.log(response);
      openToast("Successfully generated your card", "success");
      setLoading(false);
    } catch (error) {
      console.log(error);
      openToast("Error generating card", "error");
      setLoading(false);
    }
  };

  const openToast = (message, severity) => {
    setToast({ message, severity, open: true });
  };

  const closeToast = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setToast({ message: "", severity: "", open: false });
  };

  // action buttons for the toast
  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={closeToast}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  const getCardDetails = async () => {
    console.log(user);
    try {
      const data = await API.get("locapi", `/user/${user.username}`);
      console.log("data", data);
      openToast("Card details fetched successfully", "success");
    } catch (error) {
      console.log("error", error);
      openToast("Error fetching card details", "error");
    }
  };

  useEffect(() => {
    //check if user already has a card or not
    if (user) {
      getCardDetails();
    }
  }, []);

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <Page title="Dashboard">
      <Container>
        <div className={styles.dash}>
          {loading && <LinearProgress className={styles.loader} />}
          <LoadingButton
            onClick={handleClick}
            loading={loading}
            loadingIndicator="Scanning repos..."
            variant="outlined"
            size="large"
          >
            Generate your custom GLOC card
          </LoadingButton>
        </div>
        <Snackbar
          open={toast.open}
          autoHideDuration={3000}
          onClose={closeToast}
          message={toast.message}
          action={action}
          severity={toast.severity}
        />
      </Container>
    </Page>
  );
};

export default Dashboard;
