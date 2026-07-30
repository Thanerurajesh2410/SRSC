import { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Stack,
  Tabs,
  Tab,
  Grid,
} from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import DescriptionIcon from "@mui/icons-material/Description";

export default function PrintableTemplatesPage() {
  const [tab, setTab] = useState(0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <Box>
      <Stack direction="row" sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }} className="no-print">
        <Stack direction="row" spacing={1} sx={{ display: "flex", alignItems: "center" }}>
          <DescriptionIcon color="primary" sx={{ fontSize: 32 }} />
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Printable Temple Materials & Templates
          </Typography>
        </Stack>
        <Button variant="contained" startIcon={<PrintIcon />} onClick={handlePrint}>
          Print Current Document
        </Button>
      </Stack>

      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }} className="no-print">
        <Tabs value={tab} onChange={(_e, v) => setTab(v)}>
          <Tab label="A4 Construction Pamphlet / Appeal" />
          <Tab label="Official Trust Letterhead" />
          <Tab label="Trustee Visiting Card" />
        </Tabs>
      </Box>

      {/* Printable Area */}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {tab === 0 && (
          <Paper
            elevation={3}
            sx={{
              width: "210mm",
              minHeight: "297mm",
              p: 4,
              bgcolor: "white",
              color: "#0f172a",
              border: "3px double #d97706",
              borderRadius: 2,
            }}
          >
            <Stack direction="row" sx={{ borderBottom: "2px solid #d97706", pb: 2, mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box sx={{ width: 60, height: 60, borderRadius: "50%", bgcolor: "#f59e0b", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, fontWeight: 900 }}>
                🛕
              </Box>
              <Box sx={{ textAlign: "center", flexGrow: 1 }}>
                <Typography variant="h4" sx={{ fontWeight: 900, color: "#d97706", letterSpacing: 1 }}>
                  SRI RAMA SEVA TRUST
                </Typography>
                <Typography variant="subtitle2" sx={{ color: "#475569" }}>
                  Registered Public Charitable Trust Reg No: 409/2024 (80G Tax Exempt)
                </Typography>
                <Typography variant="body2" sx={{ color: "#64748b" }}>
                  Sri Ramalayam Temple Construction Project & Annadana Satram
                </Typography>
              </Box>
            </Stack>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" align="center" sx={{ fontWeight: 800, color: "#b45309", mb: 1 }}>
                🚩 GRAND TEMPLE CONSTRUCTION APPEAL 🚩
              </Typography>
              <Typography variant="body1" align="center" sx={{ fontStyle: "italic", color: "#334155", mb: 2 }}>
                "Srimad Valmiki Ramayana - Devotedly Constructing Sri Rama Temple"
              </Typography>
            </Box>

            <Paper variant="outlined" sx={{ p: 2.5, mb: 3, bgcolor: "#fffbeb", borderColor: "#fde68a" }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: "#7c2d12", mb: 1 }}>
                Construction Highlights & Features:
              </Typography>
              <ul>
                <li><strong>Garbhagudi (Main Sanctum):</strong> Hand-carved Granite Stone Architecture</li>
                <li><strong>Main Deities:</strong> Sri Sita Rama Swamy, Lakshmana & Bhakta Anjaneya</li>
                <li><strong>Maha Mandapam & Dvajastambham:</strong> Brass Clad Teakwood Stambham</li>
                <li><strong>Annadana Mandapam:</strong> Free Meals Facility for 500+ Devotees Daily</li>
              </ul>
            </Paper>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: "#7c2d12", mb: 1 }}>
                Bank Account Details for Online Donations (80G Exempt):
              </Typography>
              <Paper variant="outlined" sx={{ p: 2, bgcolor: "#f8fafc" }}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 6 }}>
                    <Typography variant="body2"><strong>Account Name:</strong> SRI RAMA SEVA TRUST</Typography>
                    <Typography variant="body2"><strong>Bank Name:</strong> State Bank of India</Typography>
                    <Typography variant="body2"><strong>Account No:</strong> 40982374619</Typography>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Typography variant="body2"><strong>IFSC Code:</strong> SBIN0004521</Typography>
                    <Typography variant="body2"><strong>Branch:</strong> Bangarupalem Branch</Typography>
                    <Typography variant="body2"><strong>UPI ID:</strong> sriramasevatrust@sbi</Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Box>

            <Box sx={{ mt: 6, pt: 2, borderTop: "1px dashed #cbd5e1", textAlign: "center" }}>
              <Typography variant="caption" color="text.secondary">
                For Enquiries & Seva Bookings, Contact Managing Committee: +91 98765 43210 | www.sriramasevatrust.org
              </Typography>
            </Box>
          </Paper>
        )}

        {tab === 1 && (
          <Paper
            elevation={3}
            sx={{
              width: "210mm",
              minHeight: "297mm",
              p: 5,
              bgcolor: "white",
              color: "#0f172a",
              borderRadius: 2,
              position: "relative",
            }}
          >
            <Stack direction="row" sx={{ borderBottom: "3px double #d97706", pb: 2, mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box sx={{ width: 50, height: 50, borderRadius: "50%", bgcolor: "#f59e0b", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 900 }}>
                🛕
              </Box>
              <Box sx={{ flexGrow: 1, ml: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 900, color: "#d97706" }}>
                  SRI RAMA SEVA TRUST
                </Typography>
                <Typography variant="caption" sx={{ color: "#64748b", display: "block" }}>
                  Regd. Public Charitable Trust | Reg No: 409/2024 | 80G Tax Exempt
                </Typography>
              </Box>
              <Box sx={{ textAlign: "right" }}>
                <Typography variant="caption" sx={{ display: "block" }}>Phone: +91 98765 43210</Typography>
                <Typography variant="caption" sx={{ display: "block" }}>Email: contact@sriramasevatrust.org</Typography>
              </Box>
            </Stack>

            <Box sx={{ minHeight: "200mm", color: "#94a3b8", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Typography variant="h6" sx={{ fontStyle: "italic", opacity: 0.5 }}>
                [Official Letterhead Document Body Area]
              </Typography>
            </Box>

            <Box sx={{ position: "absolute", bottom: 40, left: 40, right: 40, pt: 2, borderTop: "1px solid #e2e8f0", textAlign: "center" }}>
              <Typography variant="caption" color="text.secondary">
                Temple Address: Sri Ramalayam Temple, Main Road, Temple Town | Website: www.sriramasevatrust.org
              </Typography>
            </Box>
          </Paper>
        )}

        {tab === 2 && (
          <Paper
            elevation={3}
            sx={{
              width: "90mm",
              height: "55mm",
              p: 2.5,
              bgcolor: "#0f172a",
              color: "white",
              borderRadius: 2,
              border: "1px solid #f59e0b",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Stack direction="row" spacing={1.5} sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ width: 36, height: 36, borderRadius: "50%", bgcolor: "#f59e0b", color: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 18 }}>
                🛕
              </Box>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 900, color: "#f59e0b", lineHeight: 1.1 }}>
                  SRI RAMA SEVA TRUST
                </Typography>
                <Typography variant="caption" sx={{ color: "#94a3b8", fontSize: "0.65rem" }}>
                  Sri Ramalayam Temple Project
                </Typography>
              </Box>
            </Stack>

            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>K. Ramachandra Rao</Typography>
              <Typography variant="caption" color="#f59e0b" sx={{ display: "block" }}>President & Managing Trustee</Typography>
            </Box>

            <Stack direction="row" sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
              <Typography variant="caption" sx={{ fontSize: "0.65rem", color: "#cbd5e1" }}>
                +91 98765 43210 | www.sriramasevatrust.org
              </Typography>
              <Typography variant="caption" sx={{ fontSize: "0.6rem", color: "#94a3b8" }}>
                80G Tax Exempt
              </Typography>
            </Stack>
          </Paper>
        )}
      </Box>
    </Box>
  );
}
