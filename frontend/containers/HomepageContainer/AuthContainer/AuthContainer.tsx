import { Box } from "@mui/material";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const AuthContainer: React.FC<Props> = ({ children }) => {
  return <Box>{children}</Box>;
};

export default AuthContainer;
