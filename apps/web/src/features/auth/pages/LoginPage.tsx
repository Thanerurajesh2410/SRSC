import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
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
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `linear-gradient(to bottom, rgba(254, 243, 199, 0.85), rgba(255, 251, 235, 0.92)), url('/lord_rama_background.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
        boxSizing: "border-box",
        zIndex: 9999,
        overflowY: "auto",
        p: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 450,
          mx: "auto",
          my: "auto",
        }}
      >
        <Card
          elevation={12}
          sx={{
            width: "100%",
            borderRadius: 4,
            bgcolor: "#ffffff",
            color: "#7c2d12",
            border: "2px solid #fde68a",
            boxShadow: "0 20px 50px rgba(180, 83, 9, 0.2)",
            overflow: "hidden",
            boxSizing: "border-box",
          }}
        >
          {/* Light Header Banner */}
          <Box
            sx={{
              py: 2.5,
              px: 3,
              background: "linear-gradient(135deg, #7c2d12 0%, #b45309 100%)",
              borderBottom: "2px solid #fde68a",
              textAlign: "center",
              color: "#ffffff",
            }}
          >
            <Stack direction="row" spacing={1.5} sx={{ justifyContent: "center", alignItems: "center" }}>
              <AdminPanelSettingsIcon sx={{ fontSize: 32, color: "#fef3c7" }} />
              <Typography variant="h5" sx={{ fontWeight: 900, color: "#fef3c7", letterSpacing: 0.5 }}>
                SUPER ADMIN ERP LOGIN
              </Typography>
            </Stack>
            <Typography variant="caption" sx={{ color: "#fde68a", opacity: 0.9, mt: 0.5, display: "block" }}>
              Sri Rama Seva Committee — Integrated Management System
            </Typography>
          </Box>

          <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
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
                    mb: 1.5,
                    border: "2px solid #fde68a",
                    boxShadow: "0 4px 15px rgba(180, 83, 9, 0.3)",
                  }}
                >
                  🛕
                </Box>

                <Chip
                  label="SRI RAMA SEVA COMMITTEE"
                  sx={{
                    mb: 1,
                    fontWeight: 900,
                    bgcolor: "#fffbeb",
                    color: "#7c2d12",
                    border: "1px solid #b45309",
                    fontSize: "0.75rem",
                  }}
                />
              </Box>

              {(loginMutation.isError || validationErr) && (
                <Alert severity="error" sx={{ bgcolor: "#fef2f2", color: "#991b1b", border: "1px solid #fecaca" }}>
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
                      bgcolor: "#fffef5",
                      borderRadius: 1.5,
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#fde68a" },
                        "&:hover fieldset": { borderColor: "#b45309" },
                      },
                    }}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon sx={{ color: "#b45309" }} />
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
                      bgcolor: "#fffef5",
                      borderRadius: 1.5,
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#fde68a" },
                        "&:hover fieldset": { borderColor: "#b45309" },
                      },
                    }}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword((prev) => !prev)}
                              edge="end"
                              sx={{ color: "#b45309" }}
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
                      py: 1.5,
                      height: 46,
                      fontSize: "1rem",
                      fontWeight: 800,
                      background: "linear-gradient(135deg, #b45309 0%, #7c2d12 100%)",
                      color: "#ffffff",
                      borderRadius: 2.5,
                      boxShadow: "0 4px 14px rgba(180, 83, 9, 0.3)",
                      "&:hover": {
                        background: "linear-gradient(135deg, #d97706 0%, #9a3412 100%)",
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
                sx={{ color: "#7c2d12", textTransform: "none", fontSize: "0.85rem", width: "100%", fontWeight: 700 }}
              >
                ← Back to Public Website
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}