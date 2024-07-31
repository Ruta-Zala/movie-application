// pages/login.js
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useAuth } from "../../../../context/AuthContext";

interface props {
  isSignUp?: boolea;
}

const AuthSignin: React.FC<props> = ({ isSignUp }) => {
  const { login } = useAuth();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: Record<string, any>) => {
    login(data, isSignUp);
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ height: "100vh", display: "flex", alignItems: "center" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: { xs: "0px", md: "40px" },
          borderRadius: "8px",
        }}
      >
        <Typography
          component="h1"
          variant="h1"
          sx={{ color: "white", marginBottom: "20px" }}
        >
          {isSignUp ? 'Signup' : 'Sign in'}
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                variant="outlined"
                margin="normal"
                size="small"
                fullWidth
                id="email"
                placeholder="Email"
                autoComplete="email"
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ""}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                variant="outlined"
                margin="normal"
                size="small"
                fullWidth
                name="password"
                placeholder="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ""}
              />
            )}
          />
          <FormControlLabel
            control={<Checkbox color="primary" name="rememberMe" />}
            label="Remember me"
            sx={{
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 3, mb: 2 }}
          >
            {isSignUp ? 'Signup' : 'Signin'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AuthSignin;
