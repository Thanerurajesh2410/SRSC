import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  TextField,
  Button,
  Stack,
  Alert,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Grid,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import CollectionsIcon from "@mui/icons-material/Collections";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PaletteIcon from "@mui/icons-material/Palette";
import ImageIcon from "@mui/icons-material/Image";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import api from "../../../services/api";
import BankStatementUpload from "../../donations/components/BankStatementUpload";

export interface SiteSettings {
  logoUrl?: string;
  upiQrUrl?: string;
  upiId?: string;
  bankAccountName?: string;
  bankName?: string;
  accountNumber?: string;
  ifscCode?: string;
  branch?: string;

  // Block Colors
  bgHeader?: string;
  bgHero?: string;
  bgGallery?: string;
  bgSevas?: string;
  bgAbout?: string;
  bgConstruction?: string;
  bgDonate?: string;
  bgContact?: string;
  bgFooter?: string;
  bgCard?: string;

  // Background Images
  bgPageImage?: string;
  bgHeaderImage?: string;
  bgHeroImage?: string;
  bgGalleryImage?: string;
  bgSevasImage?: string;
  bgAboutImage?: string;
  bgConstructionImage?: string;
  bgDonateImage?: string;
  bgContactImage?: string;
  bgFooterImage?: string;
}

export interface HomeSlide {
  id: string;
  title: string;
  caption?: string;
  imageUrl: string;
  displayOrder: number;
  isActive: boolean;
}

export default function SettingsPage() {
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Settings State
  const [settings, setSettings] = useState<SiteSettings>({
    logoUrl: "",
    upiQrUrl: "",
    upiId: "sriramasevatrust@sbi",
    bankAccountName: "SRI RAMA SEVA TRUST",
    bankName: "State Bank of India (SBI)",
    accountNumber: "40982374619",
    ifscCode: "SBIN0004521",
    branch: "Temple Road Branch",
    bgHeader: "#7c2d12",
    bgHero: "#180a04",
    bgGallery: "#120803",
    bgSevas: "#1c0e06",
    bgAbout: "#180a04",
    bgConstruction: "#120803",
    bgDonate: "#1c0e06",
    bgContact: "#180a04",
    bgFooter: "#090502",
    bgCard: "#231107",
    bgPageImage: "",
    bgHeaderImage: "",
    bgHeroImage: "",
    bgGalleryImage: "",
    bgSevasImage: "",
    bgAboutImage: "",
    bgConstructionImage: "",
    bgDonateImage: "",
    bgContactImage: "",
    bgFooterImage: "",
  });

  // Slides State
  const [slides, setSlides] = useState<HomeSlide[]>([]);
  const [slideDialogOpen, setSlideDialogOpen] = useState(false);
  const [newSlide, setNewSlide] = useState({
    title: "",
    caption: "",
    imageUrl: "",
    displayOrder: 1,
    isActive: true,
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      setError(null);
      const [setRes, slideRes] = await Promise.all([api.get("/settings"), api.get("/slides")]);
      if (setRes.data?.data) {
        setSettings((prev) => ({ ...prev, ...setRes.data.data }));
      }
      if (slideRes.data?.data) {
        setSlides(slideRes.data.data);
      }
    } catch (err: any) {
      setError(err?.message || "Failed to load settings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSavedSuccess(null);
      setError(null);
      await api.put("/settings", settings);
      setSavedSuccess("✅ Site settings, Logo, QR Code, Block Colors & Background Images saved to Database!");
    } catch (err: any) {
      setError(err?.message || "Failed to update settings.");
    }
  };

  const handleAddSlide = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/slides", newSlide);
      setSlideDialogOpen(false);
      setNewSlide({ title: "", caption: "", imageUrl: "", displayOrder: slides.length + 1, isActive: true });
      fetchData();
    } catch (err: any) {
      setError(err?.message || "Failed to add slideshow photo.");
    }
  };

  const handleDeleteSlide = async (id: string) => {
    try {
      await api.delete(`/slides/${id}`);
      fetchData();
    } catch (err: any) {
      setError(err?.message || "Failed to delete slide.");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, targetField: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      if (targetField === "slide") {
        setNewSlide((prev) => ({ ...prev, imageUrl: dataUrl }));
      } else {
        setSettings((prev) => ({ ...prev, [targetField]: dataUrl }));
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <Box sx={{ p: 1 }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, color: "#7c2d12" }}>
        System & Website Settings
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Manage Logo, Payment Details, Slideshow, Section Colors & Block Background Images
      </Typography>

      {savedSuccess && <Alert severity="success" sx={{ mb: 2 }}>{savedSuccess}</Alert>}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Paper sx={{ mb: 3, borderBottom: 1, borderColor: "divider", bgcolor: "#fffbeb" }}>
        <Tabs value={tab} onChange={(_e, v) => setTab(v)} textColor="primary" indicatorColor="primary" variant="scrollable" scrollButtons="auto">
          <Tab label="Logo & QR Code Settings" icon={<QrCode2Icon />} iconPosition="start" sx={{ fontWeight: 700 }} />
          <Tab label="Home Photo Slideshow" icon={<CollectionsIcon />} iconPosition="start" sx={{ fontWeight: 700 }} />
          <Tab label="Home Page Block Colors" icon={<PaletteIcon />} iconPosition="start" sx={{ fontWeight: 700 }} />
          <Tab label="Block & Page Background Images" icon={<ImageIcon />} iconPosition="start" sx={{ fontWeight: 700 }} />
          <Tab label="Bank Statement Upload" icon={<AccountBalanceIcon />} iconPosition="start" sx={{ fontWeight: 700 }} />
        </Tabs>
      </Paper>

      {loading ? (
        <CircularProgress color="warning" />
      ) : tab === 0 ? (
        /* Tab 0: Logo & QR Code Settings */
        <Paper sx={{ p: 4, borderRadius: 3, border: "1px solid #fde68a" }}>
          <form onSubmit={handleSaveSettings}>
            <Stack spacing={4}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, color: "#7c2d12", mb: 1 }}>
                  Temple / Trust Official Logo
                </Typography>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={3} sx={{ display: "flex", alignItems: "center" }}>
                  <Box
                    sx={{
                      width: 100,
                      height: 100,
                      borderRadius: 2,
                      border: "2px dashed #b45309",
                      bgcolor: "#fffbeb",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                    }}
                  >
                    {settings.logoUrl ? (
                      <img src={settings.logoUrl} alt="Logo" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                    ) : (
                      <Typography variant="h3">🛕</Typography>
                    )}
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Stack direction="row" spacing={2} sx={{ mb: 1 }}>
                      <Button variant="outlined" component="label" startIcon={<CloudUploadIcon />} color="warning">
                        Upload Logo File
                        <input type="file" hidden accept="image/*" onChange={(e) => handleFileUpload(e, "logoUrl")} />
                      </Button>
                    </Stack>
                    <TextField
                      fullWidth size="small" label="Or Paste Logo Image URL"
                      value={settings.logoUrl || ""}
                      onChange={(e) => setSettings({ ...settings, logoUrl: e.target.value })}
                      placeholder="https://example.com/logo.png"
                    />
                  </Box>
                </Stack>
              </Box>

              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, color: "#7c2d12", mb: 1 }}>
                  Donation UPI QR Code & Payment ID
                </Typography>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={3} sx={{ display: "flex", alignItems: "center" }}>
                  <Box
                    sx={{
                      width: 120,
                      height: 120,
                      borderRadius: 2,
                      border: "2px dashed #047857",
                      bgcolor: "#f0fdf4",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                    }}
                  >
                    {settings.upiQrUrl ? (
                      <img src={settings.upiQrUrl} alt="UPI QR Code" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                    ) : (
                      <Typography variant="h3">📱 QR</Typography>
                    )}
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Stack direction="row" spacing={2} sx={{ mb: 1 }}>
                      <Button variant="outlined" component="label" startIcon={<CloudUploadIcon />} color="success">
                        Upload QR Code Image
                        <input type="file" hidden accept="image/*" onChange={(e) => handleFileUpload(e, "upiQrUrl")} />
                      </Button>
                    </Stack>
                    <TextField
                      fullWidth size="small" label="Or Paste QR Code Image URL"
                      value={settings.upiQrUrl || ""}
                      onChange={(e) => setSettings({ ...settings, upiQrUrl: e.target.value })}
                      placeholder="https://example.com/qr-code.jpg"
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      fullWidth size="small" label="Official UPI ID *"
                      value={settings.upiId || ""}
                      onChange={(e) => setSettings({ ...settings, upiId: e.target.value })}
                    />
                  </Box>
                </Stack>
              </Box>

              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, color: "#7c2d12", mb: 2 }}>
                  Official Bank Transfer Details
                </Typography>
                <Stack spacing={2}>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <TextField fullWidth label="Account Name" value={settings.bankAccountName || ""} onChange={(e) => setSettings({ ...settings, bankAccountName: e.target.value })} />
                    <TextField fullWidth label="Bank Name" value={settings.bankName || ""} onChange={(e) => setSettings({ ...settings, bankName: e.target.value })} />
                  </Stack>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <TextField fullWidth label="Account Number" value={settings.accountNumber || ""} onChange={(e) => setSettings({ ...settings, accountNumber: e.target.value })} />
                    <TextField fullWidth label="IFSC Code" value={settings.ifscCode || ""} onChange={(e) => setSettings({ ...settings, ifscCode: e.target.value })} />
                    <TextField fullWidth label="Branch Name" value={settings.branch || ""} onChange={(e) => setSettings({ ...settings, branch: e.target.value })} />
                  </Stack>
                </Stack>
              </Box>

              <Button type="submit" variant="contained" size="large" startIcon={<SaveIcon />} sx={{ bgcolor: "#7c2d12", color: "#fff", "&:hover": { bgcolor: "#9a3412" }, py: 1.5, fontWeight: 800 }}>
                Save Logo & Payment Settings
              </Button>
            </Stack>
          </form>
        </Paper>
      ) : tab === 1 ? (
        /* Tab 1: Home Photo Slideshow */
        <Box>
          <Stack direction="row" sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6" sx={{ fontWeight: 800, color: "#7c2d12" }}>
              Home Page Photo Slideshow Carousel Manager
            </Typography>
            <Button variant="contained" color="warning" startIcon={<AddIcon />} onClick={() => { setNewSlide({ title: "", caption: "", imageUrl: "", displayOrder: slides.length + 1, isActive: true }); setSlideDialogOpen(true); }}>
              Add Slideshow Photo
            </Button>
          </Stack>

          <Paper sx={{ borderRadius: 3, overflow: "hidden", border: "1px solid #fde68a" }}>
            <TableContainer>
              <Table>
                <TableHead sx={{ bgcolor: "#7c2d12" }}>
                  <TableRow>
                    <TableCell sx={{ color: "#fef3c7", fontWeight: 700 }}>Order</TableCell>
                    <TableCell sx={{ color: "#fef3c7", fontWeight: 700 }}>Preview</TableCell>
                    <TableCell sx={{ color: "#fef3c7", fontWeight: 700 }}>Photo Title</TableCell>
                    <TableCell sx={{ color: "#fef3c7", fontWeight: 700 }}>Caption / Description</TableCell>
                    <TableCell sx={{ color: "#fef3c7", fontWeight: 700 }}>Status</TableCell>
                    <TableCell align="center" sx={{ color: "#fef3c7", fontWeight: 700 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {slides.map((slide) => (
                    <TableRow hover key={slide.id}>
                      <TableCell sx={{ fontWeight: 800 }}>
                        <Chip label={`Position #${slide.displayOrder}`} color="warning" size="small" />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ width: 60, height: 40, borderRadius: 1, overflow: "hidden", border: "1px solid #e2e8f0" }}>
                          <img src={slide.imageUrl} alt={slide.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>{slide.title}</TableCell>
                      <TableCell>{slide.caption || "-"}</TableCell>
                      <TableCell>
                        <Chip label={slide.isActive ? "ACTIVE" : "INACTIVE"} color={slide.isActive ? "success" : "default"} size="small" />
                      </TableCell>
                      <TableCell align="center">
                        <IconButton color="error" onClick={() => handleDeleteSlide(slide.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      ) : tab === 2 ? (
        /* Tab 2: Home Page Block Colors Customizer */
        <Paper sx={{ p: 4, borderRadius: 3, border: "1px solid #fde68a" }}>
          <form onSubmit={handleSaveSettings}>
            <Typography variant="h6" sx={{ fontWeight: 800, color: "#7c2d12", mb: 1 }}>
              Custom Section Color Picker for Home Page Blocks
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Select hex color codes or pick explicit background colors for each individual block on the home page.
            </Typography>

            <Grid container spacing={3} sx={{ mb: 4 }}>
              {[
                { label: "1. Navigation Header Bar", key: "bgHeader", default: "#7c2d12" },
                { label: "2. Hero Banner Section", key: "bgHero", default: "#180a04" },
                { label: "3. Photo Gallery Section", key: "bgGallery", default: "#120803" },
                { label: "4. Online Sevas Section", key: "bgSevas", default: "#1c0e06" },
                { label: "5. About Temple Section", key: "bgAbout", default: "#180a04" },
                { label: "6. Construction Progress Section", key: "bgConstruction", default: "#120803" },
                { label: "7. Donate & QR Code Section", key: "bgDonate", default: "#1c0e06" },
                { label: "8. Contact Us Section", key: "bgContact", default: "#180a04" },
                { label: "9. Footer Section", key: "bgFooter", default: "#090502" },
                { label: "10. Card & Form Box Color", key: "bgCard", default: "#231107" },
              ].map((item) => (
                <Grid key={item.key} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Paper sx={{ p: 2, border: "1px solid #e2e8f0", bgcolor: "#fafafa" }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1, color: "#334155" }}>
                      {item.label}
                    </Typography>
                    <Stack direction="row" spacing={1.5} sx={{ display: "flex", alignItems: "center" }}>
                      <input
                        type="color"
                        value={(settings as any)[item.key] || item.default}
                        onChange={(e) => setSettings({ ...settings, [item.key]: e.target.value })}
                        style={{ width: 45, height: 40, border: "none", borderRadius: 4, cursor: "pointer" }}
                      />
                      <TextField
                        size="small"
                        fullWidth
                        value={(settings as any)[item.key] || item.default}
                        onChange={(e) => setSettings({ ...settings, [item.key]: e.target.value })}
                      />
                    </Stack>
                  </Paper>
                </Grid>
              ))}
            </Grid>

            <Button type="submit" variant="contained" size="large" startIcon={<SaveIcon />} sx={{ bgcolor: "#7c2d12", color: "#fff", "&:hover": { bgcolor: "#9a3412" }, py: 1.5, fontWeight: 800 }}>
              Save Section Colors to Database
            </Button>
          </form>
        </Paper>
      ) : tab === 3 ? (
        /* Tab 3: Block-Wise & Page Background Image Customizer */
        <Paper sx={{ p: 4, borderRadius: 3, border: "1px solid #fde68a" }}>
          <form onSubmit={handleSaveSettings}>
            <Typography variant="h6" sx={{ fontWeight: 800, color: "#7c2d12", mb: 1 }}>
              Block-Wise & Page Background Image Manager
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Upload background image files or paste image URLs for the entire page or individual section blocks.
            </Typography>

            <Grid container spacing={3} sx={{ mb: 4 }}>
              {[
                { label: "Full Website Page Background", key: "bgPageImage" },
                { label: "Navigation Header Bar Background", key: "bgHeaderImage" },
                { label: "Hero Banner Background", key: "bgHeroImage" },
                { label: "Photo Gallery Section Background", key: "bgGalleryImage" },
                { label: "Online Sevas Section Background", key: "bgSevasImage" },
                { label: "About Temple Section Background", key: "bgAboutImage" },
                { label: "Construction Progress Background", key: "bgConstructionImage" },
                { label: "Donate & Payment Section Background", key: "bgDonateImage" },
                { label: "Contact Us Section Background", key: "bgContactImage" },
                { label: "Footer Section Background", key: "bgFooterImage" },
              ].map((item) => (
                <Grid key={item.key} size={{ xs: 12, sm: 6 }}>
                  <Paper sx={{ p: 2.5, border: "1px solid #e2e8f0", bgcolor: "#fffbeb" }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1, color: "#7c2d12" }}>
                      {item.label}
                    </Typography>
                    <Stack direction="row" spacing={2} sx={{ mb: 1.5, display: "flex", alignItems: "center" }}>
                      {(settings as any)[item.key] ? (
                        <Box sx={{ width: 60, height: 40, borderRadius: 1, overflow: "hidden", border: "1px solid #b45309" }}>
                          <img src={(settings as any)[item.key]} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </Box>
                      ) : (
                        <Box sx={{ width: 60, height: 40, borderRadius: 1, bgcolor: "#fef3c7", border: "1px dashed #b45309", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          🖼️
                        </Box>
                      )}
                      <Button variant="outlined" component="label" startIcon={<CloudUploadIcon />} color="warning" size="small">
                        Upload Image
                        <input type="file" hidden accept="image/*" onChange={(e) => handleFileUpload(e, item.key)} />
                      </Button>
                      {(settings as any)[item.key] && (
                        <Button variant="text" color="error" size="small" onClick={() => setSettings({ ...settings, [item.key]: "" })}>
                          Remove
                        </Button>
                      )}
                    </Stack>
                    <TextField
                      size="small"
                      fullWidth
                      label="Or Paste Image URL"
                      value={(settings as any)[item.key] || ""}
                      onChange={(e) => setSettings({ ...settings, [item.key]: e.target.value })}
                      placeholder="https://example.com/background.jpg"
                    />
                  </Paper>
                </Grid>
              ))}
            </Grid>

            <Button type="submit" variant="contained" size="large" startIcon={<SaveIcon />} sx={{ bgcolor: "#7c2d12", color: "#fff", "&:hover": { bgcolor: "#9a3412" }, py: 1.5, fontWeight: 800 }}>
              Save Background Images to Database
            </Button>
          </form>
        </Paper>
      ) : (
        /* Tab 4: Super Admin Bank Statement Upload */
        <BankStatementUpload />
      )}

      {/* Add Slide Dialog */}
      <Dialog open={slideDialogOpen} onClose={() => setSlideDialogOpen(false)} fullWidth maxWidth="sm">
        <form onSubmit={handleAddSlide}>
          <DialogTitle sx={{ bgcolor: "#7c2d12", color: "#fef3c7", fontWeight: 800 }}>
            Add Home Page Slideshow Photo
          </DialogTitle>
          <DialogContent dividers sx={{ p: 3 }}>
            <Stack spacing={2}>
              <TextField fullWidth label="Photo Title *" required value={newSlide.title} onChange={(e) => setNewSlide({ ...newSlide, title: e.target.value })} />
              <TextField fullWidth label="Caption / Short Description" multiline rows={2} value={newSlide.caption} onChange={(e) => setNewSlide({ ...newSlide, caption: e.target.value })} />
              <Button variant="outlined" component="label" startIcon={<CloudUploadIcon />} color="warning">
                Upload Photo File
                <input type="file" hidden accept="image/*" onChange={(e) => handleFileUpload(e, "slide")} />
              </Button>
              <TextField fullWidth label="Or Paste Image URL *" required value={newSlide.imageUrl} onChange={(e) => setNewSlide({ ...newSlide, imageUrl: e.target.value })} placeholder="https://example.com/photo.jpg" />
              <TextField fullWidth type="number" label="Display Order (e.g. 1 for first photo) *" required value={newSlide.displayOrder} onChange={(e) => setNewSlide({ ...newSlide, displayOrder: parseInt(e.target.value) || 1 })} />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={() => setSlideDialogOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained" color="warning">Save Slide</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
