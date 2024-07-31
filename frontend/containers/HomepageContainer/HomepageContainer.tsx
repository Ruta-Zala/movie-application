import { Button, Container } from "@mui/material";
import React from "react";

function HomePageContainer() {
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: 'center', gap: '15px' }}
    >
      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        sx={{ mt: 3, mb: 2 }}
        href="/login"
      >
        Login
      </Button>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        sx={{ mt: 3, mb: 2 }}
        href="/signup"
      >
        Sign up
      </Button>
    </Container>
  );
}

export default HomePageContainer;
