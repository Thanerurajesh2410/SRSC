import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        textAlign: "center",
        py: 2,
        bgcolor: "#ffffff",
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} Temple ERP
      </Typography>
    </Box>
  );
}