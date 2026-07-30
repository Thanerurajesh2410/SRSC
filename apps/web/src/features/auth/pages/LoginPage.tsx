import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  Chip,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PersonIcon from "@mui/icons-material/Person";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../hooks/useLogin";
import { loginSchema } from "../validation";
import type { LoginRequest } from "../types";
import { auth } from "../../../utils/auth";

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [validationErr, setValidationErr] = useState<string | null>(null);

  // Clear any existing session token on mount so login form is ALWAYS displayed
  useEffect(() => {
    auth.logout();
  }, []);

  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginRequest) => {
    setValidationErr(null);
    if (!data.email.trim() || !data.password.trim()) {
      setValidationErr("Username/Email and Password are both required.");
      return;
    }

    loginMutation.mutate(data, {
      onSuccess: (res: any) => {
        if (res?.accessToken) {
          auth.login(res.accessToken);
        }
        navigate("/dashboard");
      },
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `radial-gradient(circle at 50% 40%, rgba(245, 158, 11, 0.25) 0%, rgba(7, 10, 18, 0.95) 75%), url('/lord_rama_background.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
        py: 4,
        px: 2,
      }}
    >
      <Container maxWidth="xs">
        <Card
          elevation={12}
          sx={{
            borderRadius: 4,
            bgcolor: "rgba(15, 23, 42, 0.94)",
            color: "#fef3c7",
            border: "2px solid #b45309",
            boxShadow: "0 25px 60px rgba(180, 83, 9, 0.5)",
            backdropFilter: "blur(14px)",
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Stack spacing={3}>
              <Box sx={{ textAlign: "center" }}>
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #f59e0b 0%, #7c2d12 100%)",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 900,
                    fontSize: 34,
                    mx: "auto",
                    mb: 2,
                    border: "2px solid #fde68a",
                    boxShadow: "0 0 25px rgba(245, 158, 11, 0.8)",
                  }}
                >
                  🛕
                </Box>

                <Chip
                  label="SRI RAMA SEVA TRUST"
                  sx={{
                    mb: 1.5,
                    fontWeight: 900,
                    bgcolor: "#b45309",
                    color: "#fef3c7",
                    border: "1px solid #fde68a",
                    fontSize: "0.75rem",
                  }}
                />

                <Typography variant="h5" sx={{ fontWeight: 900, color: "#fef3c7" }}>
                  Admin ERP Sign In
                </Typography>
                <Typography variant="body2" color="#fde68a" sx={{ mt: 0.5 }}>
                  Enter Username and Password to access Temple ERP
                </Typography>
              </Box>

              {(loginMutation.isError || validationErr) && (
                <Alert severity="error" sx={{ bgcolor: "#451a03", color: "#fca5a5", border: "1px solid #ef4444" }}>
                  {validationErr || (loginMutation.error as Error)?.message || "Invalid Username or Password. Authentication failed."}
                </Alert>
              )}

              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2.5}>
                  <TextField
                    label="Username / Email *"
                    fullWidth
                    autoFocus
                    required
                    {...register("email")}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    sx={{
                      bgcolor: "#070a12",
                      borderRadius: 1.5,
                      input: { color: "#fff" },
                      label: { color: "#fde68a" },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "rgba(245, 158, 11, 0.4)" },
                        "&:hover fieldset": { borderColor: "#f59e0b" },
                      },
                    }}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon sx={{ color: "#f59e0b" }} />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />

                  <TextField
                    label="Password *"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    required
                    {...register("password")}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    sx={{
                      bgcolor: "#070a12",
                      borderRadius: 1.5,
                      input: { color: "#fff" },
                      label: { color: "#fde68a" },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "rgba(245, 158, 11, 0.4)" },
                        "&:hover fieldset": { borderColor: "#f59e0b" },
                      },
                    }}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword((prev) => !prev)}
                              edge="end"
                              sx={{ color: "#fde68a" }}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    }}
                  />

                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    size="large"
                    startIcon={loginMutation.isPending ? <CircularProgress size={20} color="inherit" /> : <LockOutlinedIcon />}
                    disabled={loginMutation.isPending}
                    sx={{
                      py: 1.6,
                      fontSize: "1rem",
                      fontWeight: 900,
                      background: "linear-gradient(135deg, #f59e0b 0%, #b45309 100%)",
                      color: "#7c2d12",
                      borderRadius: 3,
                      boxShadow: "0 6px 20px rgba(245, 158, 11, 0.5)",
                      "&:hover": {
                        background: "linear-gradient(135deg, #fef3c7 0%, #f59e0b 100%)",
                      },
                    }}
                  >
                    {loginMutation.isPending ? "Authenticating..." : "Admin Login"}
                  </Button>
                </Stack>
              </form>

              <Button
                color="inherit"
                size="small"
                onClick={() => navigate("/")}
                sx={{ color: "#fde68a", textTransform: "none", fontSize: "0.85rem" }}
              >
                ← Back to Public Website
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}