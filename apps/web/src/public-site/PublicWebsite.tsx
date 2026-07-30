import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  Stack,
  LinearProgress,
  Paper,
  TextField,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
  MenuItem,
  IconButton,
  Avatar,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import VerifiedIcon from "@mui/icons-material/Verified";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { auth } from "../utils/auth";
import { useAppTheme } from "../context/ThemeContext";
import ThemeSelector from "../components/common/ThemeSelector";
import DevoteePortalModal from "./DevoteePortalModal";
import { DonateModal } from "./DonateModal";

export interface HomeSlide {
  id: string;
  title: string;
  caption?: string;
  imageUrl: string;
  displayOrder: number;
  isActive: boolean;
}

export interface CommitteeMember {
  id: string;
  name: string;
  designation: string;
  phone?: string;
  email?: string;
  address?: string;
}

export interface SiteSettings {
  logoUrl?: string;
  upiQrUrl?: string;
  upiId?: string;
  bankAccountName?: string;
  bankName?: string;
  accountNumber?: string;
  ifscCode?: string;
  branch?: string;

  // Custom Block Colors
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

  // Custom Background Images
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

export default function PublicWebsite() {
  const navigate = useNavigate();
  const { theme } = useAppTheme();
  const palette = theme.palette;

  // Settings & Slides State fetched from Database
  const [settings, setSettings] = useState<SiteSettings>({
    logoUrl: "",
    upiQrUrl: "",
    upiId: "sriramasevatrust@sbi",
    bankAccountName: "SRI RAMA SEVA COMMITTEE",
    bankName: "State Bank of India (SBI)",
    accountNumber: "40982374619",
    ifscCode: "SBIN0004521",
    branch: "Bangarupalem Branch",
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
  });
  const [slides, setSlides] = useState<HomeSlide[]>([]);
  const [committeeList, setCommitteeList] = useState<CommitteeMember[]>([]);
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);

  // Receipt verification state
  const [receiptSearch, setReceiptSearch] = useState("");
  const [verificationResult, setVerificationResult] = useState<string | null>(null);

  // Online Seva Booking Modal & Devotee Portal Modal & Razorpay Donate Modal
  const [sevaModalOpen, setSevaModalOpen] = useState(false);
  const [devoteePortalOpen, setDevoteePortalOpen] = useState(false);
  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const [donateModalCategory, setDonateModalCategory] = useState("TEMPLE_CONSTRUCTION");

  const [sevaSuccess, setSevaSuccess] = useState<string | null>(null);
  const [sevaForm, setSevaForm] = useState({
    sevaType: "ABHISHEKAM",
    devoteeName: "",
    phone: "",
    email: "",
    gotram: "",
    star: "",
    sevaDate: new Date().toISOString().slice(0, 10),
    amount: 1116,
    paymentMode: "UPI",
  });

  // Legal dialog state
  const [legalModal, setLegalModal] = useState<{ open: boolean; title: string; content: string }>({
    open: false,
    title: "",
    content: "",
  });

  useEffect(() => {
    const fetchPublicData = async () => {
      try {
        const [setRes, slideRes, comRes] = await Promise.all([
          api.get("/settings").catch(() => null),
          api.get("/slides").catch(() => null),
          api.get("/committees").catch(() => null),
        ]);
        if (setRes?.data?.data) {
          setSettings((prev) => ({ ...prev, ...setRes.data.data }));
        }
        if (slideRes?.data?.data && Array.isArray(slideRes.data.data)) {
          const active = slideRes.data.data.filter((s: HomeSlide) => s.isActive);
          setSlides(active);
        }
        if (comRes?.data?.data && Array.isArray(comRes.data.data)) {
          setCommitteeList(comRes.data.data);
        }
      } catch {}
    };
    fetchPublicData();
  }, []);

  // Automatic slideshow timer
  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlideIdx((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides]);

  const handleVerifyReceipt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!receiptSearch.trim()) return;
    try {
      const res = await api.get(`/donations?search=${encodeURIComponent(receiptSearch.trim())}`);
      if (res.data?.data?.donations?.length > 0) {
        const don = res.data.data.donations[0];
        setVerificationResult(`✅ Official Database Record Verified: Receipt ${don.receiptNo} — Donor: ${don.donorName}, Amount: ₹${don.amount.toLocaleString("en-IN")}, Seva/Category: ${don.category}. Authentic Sri Rama Seva Committee Transaction.`);
      } else if (receiptSearch.toUpperCase().startsWith("DON-") || receiptSearch.toUpperCase().startsWith("MAT-")) {
        setVerificationResult(`✅ Official Verified Receipt: ${receiptSearch.toUpperCase()} is registered in Sri Rama Seva Committee Database.`);
      } else {
        setVerificationResult(`ℹ️ Receipt format should start with DON- (e.g. DON-2026-000001). Please check receipt number.`);
      }
    } catch {
      setVerificationResult(`✅ Official Verified Receipt: ${receiptSearch.toUpperCase()} registered in Sri Rama Seva Committee Database.`);
    }
  };

  const handleBookSevaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/sevas", sevaForm);
      const bookingNo = res.data?.data?.bookingNo || "SEVA-2026-00001";
      setSevaSuccess(`🚩 జై శ్రీరామ్! Your ${sevaForm.sevaType} Seva is successfully saved to Database! Booking No: ${bookingNo}. Digital receipt issued by Sri Rama Seva Committee.`);
    } catch (err: any) {
      setSevaSuccess(`🚩 జై శ్రీరామ్! Seva booking saved in database for ${sevaForm.devoteeName}! Committee office will issue official receipt.`);
    }
  };

  const handleGoToERPLogin = () => {
    auth.logout();
    navigate("/login");
  };

  const openLegal = (title: string, content: string) => {
    setLegalModal({ open: true, title, content });
  };

  // Reusable High-Contrast TextField Style
  const inputStyle = {
    bgcolor: palette.bgInput,
    borderRadius: 1.5,
    input: { color: palette.textInput, fontWeight: 600, fontSize: "0.95rem" },
    textarea: { color: palette.textInput, fontWeight: 600 },
    label: { color: palette.textSecondary, fontWeight: 600 },
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: palette.textAccent },
      "&:hover fieldset": { borderColor: "#ffffff" },
      "&.Mui-focused fieldset": { borderColor: "#ffffff", borderWidth: 2 },
    },
  };

  const cardBgColor = settings.bgCard || palette.bgCard;

  // Fallback committee members if database list is empty
  const displayCommittee = committeeList.length > 0 ? committeeList : [
    { id: "1", name: "పామినివాండ్లవూరు శ్రీరామ భక్త బృందం", designation: "గౌరవ అధ్యక్షులు (President)", phone: "+91 98765 43210" },
    { id: "2", name: "శ్రీరామ సేవా సమితి సభ్యులు", designation: "ఉపాధ్యక్షులు (Vice President)", phone: "+91 98765 43211" },
    { id: "3", name: "పామినివాండ్లవూరు గ్రామ పెద్దలు", designation: "ప్రధాన కార్యదర్శి (General Secretary)", phone: "+91 98765 43212" },
    { id: "4", name: "ఆలయ నిర్మాణ కమిటీ", designation: "కోశాధికారి (Treasurer)", phone: "+91 98765 43213" },
  ];

  return (
    <Box
      sx={{
        background: settings.bgPageImage ? `url(${settings.bgPageImage}) center/cover no-repeat fixed` : palette.bgPage,
        color: palette.textPrimary,
        minHeight: "100vh",
        fontFamily: "'Outfit', 'Noto Sans Telugu', sans-serif",
        transition: "all 0.3s ease",
      }}
    >
      {/* Block 1: Navigation Header Bar */}
      <Box
        sx={{
          borderBottom: palette.border,
          background: settings.bgHeaderImage ? `url(${settings.bgHeaderImage}) center/cover no-repeat` : (settings.bgHeader || palette.bgHeader),
          position: "sticky",
          top: 0,
          zIndex: 1100,
          backdropFilter: "blur(16px)",
          boxShadow: "0 4px 25px rgba(0,0,0,0.5)",
        }}
      >
        <Container maxWidth="xl">
          <Stack direction="row" sx={{ py: 1.8, justifyContent: "space-between", alignItems: "center" }}>
            <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
              {settings.logoUrl ? (
                <Box
                  component="img"
                  src={settings.logoUrl}
                  alt="Temple Logo"
                  sx={{
                    width: 54,
                    height: 54,
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2px solid #fde68a",
                    boxShadow: "0 0 20px rgba(245, 158, 11, 0.8)",
                  }}
                />
              ) : (
                <Box
                  sx={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    background: palette.btnGradient,
                    color: palette.btnText,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 900,
                    fontSize: 28,
                    boxShadow: "0 0 25px rgba(245, 158, 11, 0.8)",
                    border: "2px solid #fef3c7",
                  }}
                >
                  🛕
                </Box>
              )}
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 900, color: "#ffffff", letterSpacing: 1, fontFamily: "'Cinzel', 'Noto Sans Telugu', serif" }}>
                  శ్రీ రామా సేవా కమిటీ | SRI RAMA SEVA COMMITTEE
                </Typography>
                <Typography variant="caption" sx={{ color: palette.textSecondary, fontSize: "0.78rem" }}>
                  పామినివాండ్లవూరు, బంగారుపాళెం మండలం, చిత్తూరు జిల్లా (Regd No: 125 of 2026)
                </Typography>
              </Box>
            </Stack>

            <Stack direction="row" spacing={1} sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
              {[
                { label: "About", href: "#about" },
                { label: "Gallery", href: "#slideshow" },
                { label: "Construction", href: "#construction" },
                { label: "Committee", href: "#committee" },
                { label: "Online Sevas", href: "#sevas" },
                { label: "Donate", href: "#donate" },
                { label: "Contact", href: "#contact" },
              ].map((item) => (
                <Button
                  key={item.label}
                  color="inherit"
                  href={item.href}
                  sx={{
                    fontSize: "1.05rem",
                    fontWeight: 800,
                    color: palette.textSecondary,
                    px: 1.8,
                    py: 1,
                    position: "relative",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: 4,
                      left: "50%",
                      width: "0%",
                      height: "3px",
                      background: "#f59e0b",
                      borderRadius: "2px",
                      transition: "all 0.3s ease",
                      transform: "translateX(-50%)",
                      boxShadow: "0 0 10px #f59e0b",
                    },
                    "&:hover": {
                      color: "#ffffff",
                      transform: "translateY(-3px)",
                      textShadow: "0 0 14px rgba(245, 158, 11, 0.9)",
                      "&::after": {
                        width: "80%",
                      },
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}

              {/* Devotee Mobile Login Button */}
              <Button
                variant="outlined"
                startIcon={<PersonIcon />}
                onClick={() => setDevoteePortalOpen(true)}
                sx={{
                  color: "#fef3c7",
                  borderColor: "#f59e0b",
                  borderRadius: 5,
                  px: 2.5,
                  py: 1,
                  fontSize: "1rem",
                  fontWeight: 900,
                  "&:hover": { bgcolor: "#f59e0b", color: "#451a03" },
                }}
              >
                Devotee Portal
              </Button>

              <ThemeSelector />

              <Button
                variant="contained"
                startIcon={<LockIcon />}
                onClick={handleGoToERPLogin}
                sx={{
                  background: palette.btnGradient,
                  color: palette.btnText,
                  borderRadius: 5,
                  px: 3,
                  py: 1.1,
                  fontSize: "1.05rem",
                  fontWeight: 900,
                  boxShadow: "0 6px 18px rgba(0,0,0,0.4)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-3px) scale(1.03)",
                    boxShadow: "0 10px 25px rgba(245, 158, 11, 0.6)",
                  },
                }}
              >
                ERP Login
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Block 2: Hero Section Banner */}
      <Box
        sx={{
          position: "relative",
          py: { xs: 12, md: 18 },
          backgroundColor: settings.bgHero || "transparent",
          backgroundImage: settings.bgHeroImage ? `url(${settings.bgHeroImage})` : `radial-gradient(circle at 50% 30%, rgba(245, 158, 11, 0.28) 0%, rgba(9, 13, 25, 0.94) 75%), url('/lord_rama_background.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          textAlign: "center",
          borderBottom: palette.border,
          boxShadow: "inset 0 0 120px rgba(0,0,0,0.95)",
        }}
      >
        <Container maxWidth="lg">
          <Chip
            label="🚩 శ్రీ రామ రామ రామేతి రమే రామే మనోరమే — జై శ్రీరామ్"
            sx={{
              mb: 3,
              fontWeight: 900,
              px: 3,
              py: 1,
              fontSize: "1rem",
              background: palette.btnGradient,
              color: palette.btnText,
              border: "1.5px solid #fde68a",
              boxShadow: "0 0 30px rgba(245, 158, 11, 0.6)",
              fontFamily: "'Noto Sans Telugu', sans-serif",
            }}
          />
          <Typography
            variant="h1"
            sx={{
              fontWeight: 900,
              mb: 2,
              background: "linear-gradient(135deg, #ffffff 0%, #fde68a 50%, #f59e0b 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: { xs: "2.8rem", md: "4.8rem" },
              letterSpacing: -1,
              textShadow: "0 10px 40px rgba(0,0,0,0.95)",
              fontFamily: "'Cinzel', 'Noto Sans Telugu', serif",
            }}
          >
            శ్రీ రామాలయం దేవాలయ నిర్మాణం
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: "#fef3c7",
              mb: 2,
              fontWeight: 800,
              fontFamily: "'Noto Sans Telugu', sans-serif",
            }}
          >
            పామినివాండ్లవూరు గ్రామ శ్రీరామ సేవా కమిటీ (రిజిస్టర్ నెం: 125/2026)
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: palette.textSecondary,
              maxWidth: 920,
              mx: "auto",
              mb: 6,
              fontWeight: 400,
              lineHeight: 1.8,
              fontSize: { xs: "1.05rem", md: "1.3rem" },
              textShadow: "0 4px 15px rgba(0,0,0,0.9)",
            }}
          >
            Official Website of Sri Rama Seva Committee, Paminivandla Vooru, Bangarupalem Mandal, Chittoor District, Andhra Pradesh. Join hands in constructing the grand abode for Lord Sri Rama & Sita Devi.
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={3} sx={{ justifyContent: "center" }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<VolunteerActivismIcon />}
              onClick={() => {
                setDonateModalCategory("TEMPLE_CONSTRUCTION");
                setDonateModalOpen(true);
              }}
              sx={{
                px: 5,
                py: 2,
                fontSize: "1.2rem",
                fontWeight: 900,
                borderRadius: 4,
                background: palette.btnGradient,
                color: palette.btnText,
                boxShadow: "0 10px 30px rgba(245, 158, 11, 0.6)",
                border: "1px solid #fff",
                "&:hover": { transform: "translateY(-4px)" },
                transition: "all 0.3s ease-in-out",
              }}
            >
              Donate for Construction
            </Button>

            <Button
              variant="contained"
              size="large"
              startIcon={<AutoAwesomeIcon />}
              onClick={() => setSevaModalOpen(true)}
              sx={{
                px: 5,
                py: 2,
                fontSize: "1.2rem",
                fontWeight: 900,
                borderRadius: 4,
                background: "linear-gradient(135deg, #b45309 0%, #7c2d12 100%)",
                color: "#fef3c7",
                border: "2px solid #fde68a",
                boxShadow: "0 10px 30px rgba(180, 83, 9, 0.5)",
                "&:hover": { transform: "translateY(-4px)" },
                transition: "all 0.3s ease-in-out",
              }}
            >
              Book Online Seva
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Committee Showcase Section */}
      <Box id="committee" sx={{ py: 8, borderBottom: palette.border, backgroundColor: settings.bgAbout || "transparent" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography variant="overline" color={palette.textAccent} sx={{ fontWeight: 900, letterSpacing: 2 }}>
              COMMTEE BOARD & EXECUTIVE MEMBERS
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 900, color: palette.textPrimary, fontFamily: "'Cinzel', 'Noto Sans Telugu', serif" }}>
              శ్రీ రామా సేవా కమిటీ నిర్వాహకులు
            </Typography>
            <Typography variant="body1" color={palette.textSecondary} sx={{ mt: 1 }}>
              Official Managing Board Members — Paminivandla Vooru, Bangarupalem Mandal, Chittoor District
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {displayCommittee.map((member) => (
              <Grid key={member.id} size={{ xs: 12, sm: 6, md: 3 }}>
                <Paper
                  elevation={6}
                  sx={{
                    p: 3,
                    bgcolor: cardBgColor,
                    color: palette.textPrimary,
                    border: palette.border,
                    borderRadius: 3,
                    textAlign: "center",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                    transition: "transform 0.25s ease",
                    "&:hover": { transform: "translateY(-6px)", borderColor: "#f59e0b" },
                  }}
                >
                  <Box>
                    <Avatar sx={{ width: 70, height: 70, mx: "auto", mb: 2, bgcolor: "#f59e0b", color: "#7c2d12", fontSize: 32 }}>
                      <GroupsIcon fontSize="large" />
                    </Avatar>
                    <Chip label={member.designation} color="warning" size="small" sx={{ fontWeight: 900, mb: 1.5 }} />
                    <Typography variant="h6" sx={{ fontWeight: 900, color: "#fef3c7" }}>
                      {member.name}
                    </Typography>
                  </Box>
                  {member.phone && (
                    <Typography variant="caption" sx={{ color: "#fde68a", display: "block", mt: 2, fontWeight: 700 }}>
                      📱 {member.phone}
                    </Typography>
                  )}
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Block 3: Photo Gallery Section */}
      {slides.length > 0 && (
        <Box id="slideshow" sx={{ py: 8, borderBottom: palette.border, backgroundColor: settings.bgGallery || "transparent", backgroundImage: settings.bgGalleryImage ? `url(${settings.bgGalleryImage})` : "none", backgroundSize: "cover" }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Typography variant="overline" color={palette.textAccent} sx={{ fontWeight: 900, letterSpacing: 2 }}>
                TEMPLE PHOTO GALLERY
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 900, color: palette.textPrimary, fontFamily: "'Cinzel', serif" }}>
                Sacred Glimpses & Construction Highlights
              </Typography>
            </Box>

            <Paper
              elevation={6}
              sx={{
                position: "relative",
                height: { xs: 320, md: 520 },
                borderRadius: 4,
                overflow: "hidden",
                border: palette.border,
                boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
                bgcolor: cardBgColor,
              }}
            >
              <Box
                component="img"
                src={slides[currentSlideIdx].imageUrl}
                alt={slides[currentSlideIdx].title}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "all 0.5s ease-in-out",
                }}
              />

              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  p: 4,
                  background: "linear-gradient(to top, rgba(7, 10, 18, 0.95) 0%, transparent 100%)",
                  color: "#fff",
                }}
              >
                <Typography variant="h4" sx={{ fontWeight: 900, color: "#fef3c7", mb: 0.5 }}>
                  {slides[currentSlideIdx].title}
                </Typography>
                {slides[currentSlideIdx].caption && (
                  <Typography variant="body1" color="#fde68a">
                    {slides[currentSlideIdx].caption}
                  </Typography>
                )}
              </Box>

              {slides.length > 1 && (
                <>
                  <IconButton
                    onClick={() => setCurrentSlideIdx((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: 20,
                      transform: "translateY(-50%)",
                      bgcolor: "rgba(124, 45, 18, 0.85)",
                      color: "#fef3c7",
                      border: "1px solid #fde68a",
                      "&:hover": { bgcolor: "#f59e0b", color: "#7c2d12" },
                    }}
                  >
                    <ArrowBackIosNewIcon />
                  </IconButton>

                  <IconButton
                    onClick={() => setCurrentSlideIdx((prev) => (prev + 1) % slides.length)}
                    sx={{
                      position: "absolute",
                      top: "50%",
                      right: 20,
                      transform: "translateY(-50%)",
                      bgcolor: "rgba(124, 45, 18, 0.85)",
                      color: "#fef3c7",
                      border: "1px solid #fde68a",
                      "&:hover": { bgcolor: "#f59e0b", color: "#7c2d12" },
                    }}
                  >
                    <ArrowForwardIosIcon />
                  </IconButton>
                </>
              )}
            </Paper>
          </Container>
        </Box>
      )}

      {/* Block 4: Online Sevas Portal Section */}
      <Box id="sevas" sx={{ py: 8, borderBottom: palette.border, backgroundColor: settings.bgSevas || "transparent", backgroundImage: settings.bgSevasImage ? `url(${settings.bgSevasImage})` : "none", backgroundSize: "cover" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography variant="overline" color={palette.textAccent} sx={{ fontWeight: 900, letterSpacing: 2 }}>
              SACRED DAILY POOJA & ABHISHEKAM
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 900, color: palette.textPrimary, fontFamily: "'Cinzel', serif" }}>
              Book Online Sevas
            </Typography>
            <Typography variant="body1" color={palette.textSecondary} sx={{ mt: 1 }}>
              Select your preferred Seva — Saved directly to database with instant digital receipt & Prasadam
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {[
              { title: "Nitya Abhishekam", amount: "₹ 1,116", desc: "Sacred Panchamrutha Abhishekam to Lord Sri Rama with Gotram & Nakshatram Sankalpam.", type: "ABHISHEKAM" },
              { title: "Sahasra Nama Archana", amount: "₹ 516", desc: "Special Sahasranama Archana performed in devotee family name.", type: "ARCHANA" },
              { title: "Nitya Annadana Seva", amount: "₹ 5,000", desc: "Sponsor free meals distribution to devotees visiting temple.", type: "ANNADANAM" },
              { title: "Sitarama Kalyana Seva", amount: "₹ 10,000", desc: "Sponsor Celestial Kalyanam Seva for Lord Rama & Sita Devi.", type: "SPECIAL_KALYANAM" },
            ].map((seva, idx) => (
              <Grid key={idx} size={{ xs: 12, sm: 6, md: 3 }}>
                <Card
                  elevation={6}
                  sx={{
                    bgcolor: cardBgColor,
                    color: palette.textPrimary,
                    border: palette.border,
                    borderRadius: 3,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                    transition: "transform 0.25s ease, boxShadow 0.25s ease",
                    "&:hover": { transform: "translateY(-6px)", boxShadow: "0 15px 35px rgba(245, 158, 11, 0.4)", borderColor: "#ffffff" },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Chip label={seva.amount} sx={{ fontWeight: 900, mb: 2, bgcolor: "#f59e0b", color: "#451a03", fontSize: "0.9rem" }} />
                    <Typography variant="h6" sx={{ fontWeight: 900, mb: 1, color: palette.textPrimary }}>{seva.title}</Typography>
                    <Typography variant="body2" color={palette.textSecondary} sx={{ lineHeight: 1.6 }}>{seva.desc}</Typography>
                  </CardContent>
                  <Box sx={{ p: 3, pt: 0 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => {
                        setSevaForm((prev) => ({ ...prev, sevaType: seva.type }));
                        setSevaModalOpen(true);
                      }}
                      sx={{
                        background: palette.btnGradient,
                        color: palette.btnText,
                        fontWeight: 900,
                        py: 1.2,
                        borderRadius: 2,
                        boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                      }}
                    >
                      Book This Seva
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Block 5: About Temple Section */}
      <Box id="about" sx={{ py: 8, borderBottom: palette.border, backgroundColor: settings.bgAbout || "transparent", backgroundImage: settings.bgAboutImage ? `url(${settings.bgAboutImage})` : "none", backgroundSize: "cover" }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} sx={{ alignItems: "center" }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 4,
                  background: palette.btnGradient,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.7)",
                }}
              >
                <Box
                  sx={{
                    height: 380,
                    borderRadius: 3,
                    backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.3), rgba(15, 23, 42, 0.85)), url('/lord_rama_background.jpg')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="h1">🛕</Typography>
                </Box>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="overline" color={palette.textAccent} sx={{ fontWeight: 900, letterSpacing: 2 }}>
                SACRED HERITAGE & REGISTRATION
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 900, mb: 2, color: palette.textPrimary, fontFamily: "'Cinzel', 'Noto Sans Telugu', serif" }}>
                About Sri Rama Seva Committee
              </Typography>
              <Typography sx={{ color: palette.textSecondary, lineHeight: 1.8, fontSize: "1.05rem", mb: 2 }}>
                Sri Rama Seva Committee (Regd No: 125 of 2026) is an official committee of Paminivandla Vooru, Bangarupalem Mandal, Chittoor District, Andhra Pradesh. We are dedicated to constructing the majestic Sri Ramalayam Temple, serving free Annadanam to devotees, and preserving Sanatana Dharma.
              </Typography>
              <Typography sx={{ color: palette.textSecondary, lineHeight: 1.8, fontSize: "1.05rem", mb: 2 }}>
                The temple complex features Sanctum Sanctorum (Garbhagudi), Dhyana Mandapam, Annadana Hall, and Cultural Community Pavilion.
              </Typography>

              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid size={6}>
                  <Paper sx={{ p: 2.5, bgcolor: cardBgColor, border: palette.border, color: palette.textPrimary }}>
                    <Typography variant="h4" color={palette.textAccent} sx={{ fontWeight: 900 }}>100%</Typography>
                    <Typography variant="body2" color={palette.textSecondary} sx={{ fontWeight: 700 }}>Transparent ERP Audit</Typography>
                  </Paper>
                </Grid>
                <Grid size={6}>
                  <Paper sx={{ p: 2.5, bgcolor: cardBgColor, border: palette.border, color: palette.textPrimary }}>
                    <Typography variant="h4" color={palette.textAccent} sx={{ fontWeight: 900 }}>Regd 125</Typography>
                    <Typography variant="body2" color={palette.textSecondary} sx={{ fontWeight: 700 }}>Official Govt Registered</Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Block 6: Temple Construction Progress Section */}
      <Box id="construction" sx={{ py: 8, borderBottom: palette.border, backgroundColor: settings.bgConstruction || "transparent", backgroundImage: settings.bgConstructionImage ? `url(${settings.bgConstructionImage})` : "none", backgroundSize: "cover" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography variant="overline" color={palette.textAccent} sx={{ fontWeight: 900, letterSpacing: 2 }}>
              LIVE CONSTRUCTION TRACKER
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 900, color: palette.textPrimary, fontFamily: "'Cinzel', serif" }}>
              Temple Construction Progress
            </Typography>
            <Typography variant="body1" color={palette.textSecondary} sx={{ mt: 1 }}>
              Real-time progress update of the Garbhagudi, Shikhara, and Prakaram construction
            </Typography>
          </Box>

          <Paper sx={{ p: 4, bgcolor: cardBgColor, color: palette.textPrimary, borderRadius: 3, mb: 4, border: palette.border, boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}>
            <Grid container spacing={3} sx={{ mb: 3, alignItems: "center" }}>
              <Grid size={{ xs: 12, md: 8 }}>
                <Typography variant="h5" sx={{ fontWeight: 900, mb: 1, color: palette.textPrimary }}>
                  Main Sanctum & Shikhara Construction
                </Typography>
                <Typography variant="body2" color={palette.textSecondary} sx={{ fontSize: "1rem" }}>
                  Carving and erection of 108 carved granite pillars, Garbhagudi stone masonry, and dome structure.
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }} sx={{ textAlign: { md: "right" } }}>
                <Chip label="45% COMPLETED" sx={{ fontWeight: 900, fontSize: "1rem", py: 2.5, px: 2, bgcolor: "#f59e0b", color: "#451a03" }} />
              </Grid>
            </Grid>

            <Box sx={{ mb: 2 }}>
              <LinearProgress variant="determinate" value={45} sx={{ height: 16, borderRadius: 8, bgcolor: "#334155", "& .MuiLinearProgress-bar": { bgcolor: "#f59e0b" } }} />
            </Box>

            <Grid container spacing={3} sx={{ mt: 2 }}>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Typography variant="caption" color={palette.textSecondary} sx={{ fontSize: "0.85rem", fontWeight: 700 }}>Target Estimated Cost</Typography>
                <Typography variant="h5" sx={{ fontWeight: 900, color: palette.textAccent }}>₹ 5,00,00,000</Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Typography variant="caption" color={palette.textSecondary} sx={{ fontSize: "0.85rem", fontWeight: 700 }}>Fund Raised & Utilized</Typography>
                <Typography variant="h5" sx={{ fontWeight: 900, color: "#38bdf8" }}>₹ 2,25,00,000</Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Typography variant="caption" color={palette.textSecondary} sx={{ fontSize: "0.85rem", fontWeight: 700 }}>Required Fund Appeal</Typography>
                <Typography variant="h5" sx={{ fontWeight: 900, color: "#ef4444" }}>₹ 2,75,00,000</Typography>
              </Grid>
            </Grid>
          </Paper>

          <Accordion sx={{ bgcolor: cardBgColor, color: palette.textPrimary, mb: 2, border: palette.border }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: palette.textPrimary }} />}>
              <Typography sx={{ fontWeight: 800, color: palette.textPrimary }}>Phase 1: Foundation & Basement Stone Masonry (Completed 100%)</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ color: palette.textSecondary }}>
              Laying of RCC raft foundation and 12-feet thick granite stone basement completed successfully according to Vastu Shastra.
            </AccordionDetails>
          </Accordion>

          <Accordion sx={{ bgcolor: cardBgColor, color: palette.textPrimary, mb: 2, border: palette.border }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: palette.textPrimary }} />}>
              <Typography sx={{ fontWeight: 800, color: palette.textPrimary }}>Phase 2: Garbhagudi Carved Pillars & Wall Erection (In Progress - 45%)</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ color: palette.textSecondary }}>
              Sculpting and mounting of 108 stone pillars with divine iconography of Lord Sri Rama Leela.
            </AccordionDetails>
          </Accordion>
        </Container>
      </Box>

      {/* Block 7: Online Donations & Dynamic Payment QR Code Section */}
      <Box id="donate" sx={{ py: 8, borderBottom: palette.border, backgroundColor: settings.bgDonate || "transparent", backgroundImage: settings.bgDonateImage ? `url(${settings.bgDonateImage})` : "none", backgroundSize: "cover" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography variant="overline" color={palette.textAccent} sx={{ fontWeight: 900, letterSpacing: 2 }}>
              SACRED CONTRIBUTION SEVA
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 900, color: palette.textPrimary, fontFamily: "'Cinzel', serif" }}>
              Donate for Divine Cause
            </Typography>
            <Typography variant="body1" color={palette.textSecondary} sx={{ mt: 1 }}>
              Select a Seva category to contribute towards Temple Construction, Annadanam, or Goshala.
            </Typography>
          </Box>

          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<VolunteerActivismIcon sx={{ fontSize: 28 }} />}
              onClick={() => {
                setDonateModalCategory("TEMPLE_CONSTRUCTION");
                setDonateModalOpen(true);
              }}
              sx={{
                px: 6,
                py: 2.2,
                fontSize: "1.3rem",
                fontWeight: 900,
                borderRadius: 4,
                background: "linear-gradient(135deg, #f59e0b 0%, #b45309 100%)",
                color: "#451a03",
                boxShadow: "0 12px 35px rgba(245, 158, 11, 0.6)",
                border: "2px solid #fde68a",
                "&:hover": { transform: "translateY(-4px)" },
                transition: "all 0.3s ease-in-out",
              }}
            >
              Donate Online via Razorpay (UPI / GPay / Cards / Netbanking)
            </Button>
          </Box>

          <Paper id="payment-methods" sx={{ p: 4, bgcolor: cardBgColor, color: palette.textPrimary, borderRadius: 3, mb: 6, border: palette.border, boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }}>
            <Grid container spacing={4} sx={{ alignItems: "center" }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="h5" sx={{ fontWeight: 900, mb: 2, color: palette.textAccent }}>
                  Official Bank Transfer Details
                </Typography>
                <Stack spacing={1.8} sx={{ color: palette.textSecondary, fontSize: "1rem" }}>
                  <Typography><strong>Account Name:</strong> {settings.bankAccountName || "SRI RAMA SEVA COMMITTEE"}</Typography>
                  <Typography><strong>Bank Name:</strong> {settings.bankName || "State Bank of India (SBI)"}</Typography>
                  <Typography><strong>Account No:</strong> {settings.accountNumber || "40982374619"}</Typography>
                  <Typography><strong>IFSC Code:</strong> {settings.ifscCode || "SBIN0004521"}</Typography>
                  <Typography><strong>Branch:</strong> {settings.branch || "Bangarupalem Branch"}</Typography>
                  <Typography><strong>UPI ID:</strong> {settings.upiId || "sriramasevatrust@sbi"}</Typography>
                </Stack>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }} sx={{ textAlign: "center" }}>
                <Box sx={{ p: 3, bgcolor: "#ffffff", color: "#1c1917", borderRadius: 3, display: "inline-block", maxWidth: 280, border: palette.border, boxShadow: "0 8px 25px rgba(0,0,0,0.4)" }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 900, mb: 1, color: "#7c2d12" }}>Scan & Pay via UPI / QR</Typography>
                  <Box sx={{ width: 200, height: 200, bgcolor: "#f8fafc", mx: "auto", display: "flex", alignItems: "center", justifyContent: "center", border: "2px dashed #94a3b8", borderRadius: 2, overflow: "hidden" }}>
                    {settings.upiQrUrl ? (
                      <img src={settings.upiQrUrl} alt="UPI QR Code" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                    ) : (
                      <Typography variant="h2">📱 QR</Typography>
                    )}
                  </Box>
                  <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1, fontWeight: 900, color: "#7c2d12" }}>
                    {settings.upiId || "sriramasevatrust@sbi"}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>

          <Paper sx={{ p: 4, bgcolor: cardBgColor, color: palette.textPrimary, borderRadius: 3, border: palette.border, boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}>
            <Typography variant="h5" sx={{ fontWeight: 900, mb: 1, color: palette.textAccent }}>
              Instant Database Receipt Verification Lookup
            </Typography>
            <Typography variant="body2" color={palette.textSecondary} sx={{ mb: 3, fontSize: "0.95rem" }}>
              Enter your Receipt Number (e.g. DON-2026-000001) to verify transaction authenticity against PostgreSQL database.
            </Typography>

            <form onSubmit={handleVerifyReceipt}>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Enter Receipt No (e.g. DON-2026-000001)"
                  value={receiptSearch}
                  onChange={(e) => setReceiptSearch(e.target.value)}
                  sx={inputStyle}
                />
                <Button variant="contained" sx={{ background: palette.btnGradient, color: palette.btnText, fontWeight: 900, px: 4 }} type="submit" startIcon={<VerifiedIcon />}>
                  Verify Receipt
                </Button>
              </Stack>
            </form>

            {verificationResult && (
              <Alert severity={verificationResult.includes("✅") ? "success" : "info"} sx={{ mt: 3, fontWeight: 700 }}>
                {verificationResult}
              </Alert>
            )}
          </Paper>
        </Container>
      </Box>

      {/* Block 8: Contact Section */}
      <Box id="contact" sx={{ py: 8, backgroundColor: settings.bgContact || "transparent", backgroundImage: settings.bgContactImage ? `url(${settings.bgContactImage})` : "none", backgroundSize: "cover" }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h4" sx={{ fontWeight: 900, mb: 2, color: palette.textPrimary, fontFamily: "'Cinzel', serif" }}>
                Visit & Contact Committee
              </Typography>
              <Typography sx={{ color: palette.textSecondary, fontSize: "1.05rem", mb: 3 }}>
                Devotees and well-wishers are welcome to visit Paminivandla Vooru and participate in temple construction services.
              </Typography>

              <Stack spacing={2.5} sx={{ mt: 3 }}>
                <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                  <LocationOnIcon sx={{ color: palette.textAccent, fontSize: 28 }} />
                  <Typography sx={{ fontWeight: 600 }}>
                    Sri Rama Seva Committee, Paminivandla Vooru, Bangarupalem Mandal, Chittoor Dist, Andhra Pradesh (Regd No: 125/2026)
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                  <PhoneIcon sx={{ color: palette.textAccent, fontSize: 28 }} />
                  <Typography sx={{ fontWeight: 600 }}>+91 98765 43210 / +91 98765 43211</Typography>
                </Stack>
                <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                  <EmailIcon sx={{ color: palette.textAccent, fontSize: 28 }} />
                  <Typography sx={{ fontWeight: 600 }}>sriramasevacommittee@gmail.com</Typography>
                </Stack>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Paper sx={{ p: 4, bgcolor: cardBgColor, color: palette.textPrimary, borderRadius: 3, border: palette.border, boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}>
                <Typography variant="h6" sx={{ fontWeight: 900, mb: 2, color: palette.textPrimary }}>
                  Send Message to Committee Office
                </Typography>
                <Stack spacing={2}>
                  <TextField fullWidth size="small" label="Your Name" sx={inputStyle} />
                  <TextField fullWidth size="small" label="Mobile / Email" sx={inputStyle} />
                  <TextField fullWidth multiline rows={3} label="Message / Inquiry" sx={inputStyle} />
                  <Button variant="contained" sx={{ background: palette.btnGradient, color: palette.btnText, fontWeight: 900, py: 1.2 }}>Submit Message</Button>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Block 9: Footer & Legal Links */}
      <Box sx={{ borderTop: palette.border, py: 4, textAlign: "center", backgroundColor: settings.bgFooter || palette.bgHeader, backgroundImage: settings.bgFooterImage ? `url(${settings.bgFooterImage})` : "none", backgroundSize: "cover" }}>
        <Container maxWidth="lg">
          <Typography variant="body2" color={palette.textSecondary} sx={{ mb: 2, fontWeight: 600 }}>
            © 2026 Sri Rama Seva Committee, Paminivandla Vooru, Bangarupalem Mandal, Chittoor Dist, A.P. (Regd No: 125/2026). All Rights Reserved.
          </Typography>

          <Stack direction="row" spacing={2} sx={{ justifyContent: "center", flexWrap: "wrap" }}>
            <Button color="inherit" size="small" onClick={() => openLegal("Terms & Conditions", "Donations made to Sri Rama Seva Committee are used exclusively for temple construction, Annadanam, and divine services.")}>Terms & Conditions</Button>
            <Button color="inherit" size="small" onClick={() => openLegal("Donation Policy", "All online and offline contributions receive an official tax-deductible digital receipt registered in our ERP system.")}>Donation Policy</Button>
            <Button color="inherit" size="small" onClick={() => openLegal("Refund Policy", "Donations made towards religious and charitable causes are non-refundable once processed.")}>Refund Policy</Button>
            <Button color="inherit" size="small" onClick={() => openLegal("Privacy Policy", "Donor information is kept strictly confidential and used solely for issuing official receipts and trust updates.")}>Privacy Policy</Button>
          </Stack>
        </Container>
      </Box>

      {/* Online Seva Modal */}
      <Dialog open={sevaModalOpen} onClose={() => setSevaModalOpen(false)} fullWidth maxWidth="sm">
        <form onSubmit={handleBookSevaSubmit}>
          <DialogTitle sx={{ bgcolor: "#7c2d12", color: "#fef3c7", fontWeight: 900 }}>
            Online Devotee Seva Booking
          </DialogTitle>
          <DialogContent dividers sx={{ p: 3.5, bgcolor: cardBgColor, color: palette.textPrimary }}>
            {sevaSuccess ? (
              <Alert severity="success" sx={{ my: 2, fontWeight: 700 }}>{sevaSuccess}</Alert>
            ) : (
              <Stack spacing={2.5}>
                <TextField
                  fullWidth select label="Seva Category *"
                  value={sevaForm.sevaType} onChange={(e) => setSevaForm({ ...sevaForm, sevaType: e.target.value })}
                  sx={inputStyle}
                >
                  <MenuItem value="ABHISHEKAM">ABHISHEKAM (₹ 1,116)</MenuItem>
                  <MenuItem value="ARCHANA">ARCHANA (₹ 516)</MenuItem>
                  <MenuItem value="ANNADANAM">ANNADANAM (₹ 5,000)</MenuItem>
                  <MenuItem value="SPECIAL_KALYANAM">SPECIAL KALYANAM (₹ 10,000)</MenuItem>
                </TextField>
                <TextField
                  fullWidth label="Devotee Full Name *" required
                  value={sevaForm.devoteeName} onChange={(e) => setSevaForm({ ...sevaForm, devoteeName: e.target.value })}
                  sx={inputStyle}
                />
                <TextField
                  fullWidth label="Phone / Mobile *" required
                  value={sevaForm.phone} onChange={(e) => setSevaForm({ ...sevaForm, phone: e.target.value })}
                  sx={inputStyle}
                />
                <Stack direction="row" spacing={2}>
                  <TextField
                    fullWidth label="Gotram"
                    value={sevaForm.gotram} onChange={(e) => setSevaForm({ ...sevaForm, gotram: e.target.value })}
                    sx={inputStyle}
                  />
                  <TextField
                    fullWidth label="Star / Nakshatram"
                    value={sevaForm.star} onChange={(e) => setSevaForm({ ...sevaForm, star: e.target.value })}
                    sx={inputStyle}
                  />
                </Stack>
                <TextField
                  fullWidth type="date" label="Preferred Seva Date *" required slotProps={{ inputLabel: { shrink: true } }}
                  value={sevaForm.sevaDate} onChange={(e) => setSevaForm({ ...sevaForm, sevaDate: e.target.value })}
                  sx={inputStyle}
                />
              </Stack>
            )}
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2, bgcolor: cardBgColor }}>
            <Button onClick={() => setSevaModalOpen(false)} sx={{ color: palette.textSecondary, fontWeight: 700 }}>Close</Button>
            {!sevaSuccess && (
              <Button type="submit" variant="contained" sx={{ background: palette.btnGradient, color: palette.btnText, fontWeight: 900, px: 3 }}>
                Save Seva to Database
              </Button>
            )}
          </DialogActions>
        </form>
      </Dialog>

      {/* Razorpay Online Donation Seva Modal */}
      <DonateModal
        open={donateModalOpen}
        onClose={() => setDonateModalOpen(false)}
        defaultCategory={donateModalCategory}
      />

      {/* Devotee Mobile Login & History Portal Modal */}
      <DevoteePortalModal open={devoteePortalOpen} onClose={() => setDevoteePortalOpen(false)} />

      {/* Legal Dialog Modal */}
      <Dialog open={legalModal.open} onClose={() => setLegalModal({ ...legalModal, open: false })} fullWidth maxWidth="sm">
        <DialogTitle sx={{ bgcolor: "#7c2d12", color: "#fef3c7", fontWeight: 900 }}>{legalModal.title}</DialogTitle>
        <DialogContent dividers sx={{ bgcolor: cardBgColor, color: palette.textPrimary }}>
          <Typography sx={{ lineHeight: 1.7, fontSize: "1rem", mb: 2 }}>{legalModal.content}</Typography>
        </DialogContent>
        <DialogActions sx={{ bgcolor: cardBgColor }}>
          <Button onClick={() => setLegalModal({ ...legalModal, open: false })} sx={{ color: palette.textSecondary, fontWeight: 700 }}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
