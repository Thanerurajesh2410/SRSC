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
  Paper,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PersonIcon from "@mui/icons-material/Person";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

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

  useEffect(() => {
    auth.logout();
  }, []);

  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleFillDemo = () => {
    setValue("email", "admin@temple.com");
    setValue("password", "Admin@123");
  };

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
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#0f172a",
        background: "radial-gradient(ellipse at center, #1e293b 0%, #090d16 100%)",
        py: { xs: 4, md: 8 },
        px: 2,
        boxSizing: "border-box",
      }}
    >
      <Container maxWidth="sm" sx={{ width: "100%" }}>
        <Card
          elevation={24}
          sx={{
            borderRadius: 4,
            bgcolor: "rgba(15, 23, 42, 0.95)",
            color: "#fef3c7",
            border: "2px solid #b45309",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.8)",
            backdropFilter: "blur(16px)",
            overflow: "hidden",
          }}
        >
          {/* Header Banner */}
          <Box
            sx={{
              py: 2.5,
              px: 3,
              background: "linear-gradient(135deg, #7c2d12 0%, #b45309 100%)",
              borderBottom: "2px solid #fde68a",
              textAlign: "center",
            }}
          >
            <Stack direction="row" spacing={1.5} sx={{ justifyContent: "center", alignItems: "center" }}>
              <AdminPanelSettingsIcon sx={{ fontSize: 32, color: "#fef3c7" }} />
              <Typography variant="h5" sx={{ fontWeight: 900, color: "#fef3c7", letterSpacing: 0.5 }}>
                SUPER ADMIN ERP LOGIN
              </Typography>
            </Stack>
            <Typography variant="caption" sx={{ color: "#fde68a", opacity: 0.9, mt: 0.5, display: "block" }}>
              Sri Rama Seva Committee — Integrated Temple Management System
            </Typography>
          </Box>

          <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
            <Stack spacing={3}>
              <Box sx={{ textAlign: "center" }}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #f59e0b 0%, #7c2d12 100%)",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 900,
                    fontSize: 32,
                    mx: "auto",
                    mb: 1.5,
                    border: "2px solid #fde68a",
                    boxShadow: "0 0 20px rgba(245, 158, 11, 0.6)",
                  }}
                >
                  🛕
                </Box>

                <Chip
                  label="SRI RAMA SEVA COMMITTEE"
                  sx={{
                    mb: 1,
                    fontWeight: 900,
                    bgcolor: "#b45309",
                    color: "#fef3c7",
                    border: "1px solid #fde68a",
                    fontSize: "0.75rem",
                  }}
                />
              </Box>

              {/* Demo Credentials Quick Fill Banner */}
              <Paper
                elevation={0}
                onClick={handleFillDemo}
                sx={{
                  p: 1.5,
                  bgcolor: "rgba(180, 83, 9, 0.15)",
                  border: "1px dashed #fde68a",
                  borderRadius: 2.5,
                  cursor: "pointer",
                  textAlign: "center",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": { bgcolor: "rgba(180, 83, 9, 0.25)" },
                }}
              >
                <Typography variant="caption" sx={{ color: "#fde68a", fontWeight: 700, display: "block" }}>
                  🔑 Quick Demo Login (Click to Autofill Admin Credentials)
                </Typography>
                <Typography variant="caption" sx={{ color: "#ffffff", fontWeight: 800 }}>
                  Email: admin@temple.com | Password: Admin@123
                </Typography>
              </Paper>

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
                sx={{ color: "#fde68a", textTransform: "none", fontSize: "0.85rem", width: "100%" }}
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