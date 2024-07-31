import { Box } from "@mui/material";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const LayoutModule: React.FC<Props> = ({ children }) => {
  return <Box>{children}</Box>;
};

export default LayoutModule;
