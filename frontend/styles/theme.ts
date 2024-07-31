// styles/theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2BD17E",
    },
    secondary: {
      main: "#ffffff",
    },
    error: {
      main: "#EB5757",
    },
    background: {
      default: "#093545",
      paper: "#092C39",
    },
  },
  typography: {
    fontFamily: "Montserrat, sans-serif",
    h1: {
      fontWeight: 600,
      fontSize: "64px",
      lineHeight: "80px",
    },
    h2: {
      fontWeight: 600,
      fontSize: "48px",
      lineHeight: "56px",
    },
    h3: {
      fontWeight: 600,
      fontSize: "32px",
      lineHeight: "40px",
    },
    h4: {
      fontWeight: 700,
      fontSize: "24px",
      lineHeight: "32px",
    },
    h5: {
      fontWeight: 700,
      fontSize: "20px",
      lineHeight: "24px",
    },
    h6: {
      fontWeight: 700,
      fontSize: "16px",
      lineHeight: "24px",
    },
    body1: {
      fontWeight: 400,
      fontSize: "20px",
      lineHeight: "32px",
    },
    body2: {
      fontWeight: 400,
      fontSize: "16px",
      lineHeight: "24px",
    },
    caption: {
      fontWeight: 400,
      fontSize: "14px",
      lineHeight: "16px",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          textTransform: "none",
          "&.MuiButton-contained": {
            color: "#fff",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontWeight: 400,
          fontSize: "14px",
          lineHeight: "24px",
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          "& .MuiFormHelperText-root": {
            marginLeft: 0,
            fontSize: '14px'
          },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          fontWeight: 400,
          fontSize: "14px",
          lineHeight: "24px",
        },
        label: {
          fontWeight: 400,
          fontSize: "14px",
          lineHeight: "24px",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          "&.Mui-error input": {
            backgroundColor: "#ffffff",
            color: "#000",
            borderColor: "#EB5757",
          },
        },
        input: {
          height: "20px",
          padding: "12px 14px",
          fontWeight: 400,
          fontSize: "14px",
          lineHeight: "16px",
          backgroundColor: "#224957",
          borderRadius: "10px",
          color: "#fff",
          "&:focus": {
            backgroundColor: "#ffffff",
            color: "#000",
            borderColor: "#224957",
            outline: "none",
          },
        },
        notchedOutline: {
          borderColor: "#093545",
          borderRadius: "10px",
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          color: "#224957",
          input: {
            backgroundColor: "#224957",
          },
        },
      },
    },
  },
});

export default theme;
