import { Typography } from "@mui/material";
import { useEffect, ComponentType } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

const withAuth = (WrappedComponent: ComponentType) => {
  const ComponentWithAuth = (props: any) => {
    const router = useRouter();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!isAuthenticated && !token) {
        router.push("/");
      }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
      return <Typography>Loading...</Typography>;
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export default withAuth;
