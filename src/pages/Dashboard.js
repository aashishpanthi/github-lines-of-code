import { UserContext } from "../UserContext";
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Page from "../components/Page";
import { Container, Snackbar, LinearProgress, IconButton } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import CloseIcon from "@mui/icons-material/Close";

import styles from "./styles/dashboard.module.css";

const Dashboard = () => {
  const user = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  // state for the toast
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const handleClick = () => {
    setLoading(true);
    openToast("Wait for couple of minutes...", "info");
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

  useEffect(() => {
    //check if user already has a card or not
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
