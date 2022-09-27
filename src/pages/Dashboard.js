import { UserContext } from "../UserContext";
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Page from "../components/Page";
import { Container, IconButton, Snackbar } from "@mui/material";

const Dashboard = () => {
  const user = useContext(UserContext);

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <Page title="Dashboard">
      <Container>
        <div>Dashboard</div>
      </Container>
    </Page>
  );
};

export default Dashboard;
