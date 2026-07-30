import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Paper,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  CircularProgress,
  Stack,
  TextField,
  MenuItem,
  Chip,
} from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import DownloadIcon from "@mui/icons-material/Download";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

import {
  getCashBook,
  getDonationReport,
  getExpenseReport,
  type CashBookData,
  type DonationReportData,
  type ExpenseReportData,
} from "../api/reports.api";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

export default function ReportsPage() {
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);

  // Filter states
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [paymentModeFilter, setPaymentModeFilter] = useState("ALL");

  // Report Data
  const [cashBookData, setCashBookData] = useState<CashBookData | null>(null);
  const [donationData, setDonationData] = useState<DonationReportData | null>(null);
  const [expenseData, setExpenseData] = useState<ExpenseReportData | null>(null);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const filters = {
        ...(startDate && { startDate }),
        ...(endDate && { endDate }),
      };

      if (tabValue === 0) {
        const data = await getCashBook(filters);
        setCashBookData(data);
      } else if (tabValue === 1) {
        const data = await getDonationReport({
          ...filters,
          ...(categoryFilter !== "ALL" && { category: categoryFilter }),
          ...(paymentModeFilter !== "ALL" && { paymentMode: paymentModeFilter }),
        });
        setDonationData(data);
      } else if (tabValue === 2) {
        const data = await getExpenseReport({
          ...filters,
          ...(categoryFilter !== "ALL" && { category: categoryFilter }),
          ...(paymentModeFilter !== "ALL" && { paymentMode: paymentModeFilter }),
        });
        setExpenseData(data);
      }
    } catch (err) {
      console.error("Failed to load report", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [tabValue]);

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    if (tabValue === 0 && cashBookData) {
      csvContent += "Type,Ref/Receipt No,Name/Title,Category,Payment Mode,Date,Amount (INR)\n";
      cashBookData.donations.forEach((d) => {
        csvContent += `INCOME,${d.receiptNo},"${d.donorName}",${d.category},${d.paymentMode},${new Date(d.donationDate).toLocaleDateString()},${d.amount}\n`;
      });
      cashBookData.expenses.forEach((e) => {
        csvContent += `EXPENSE,${e.expenseNo},"${e.title}",${e.category},${e.paymentMode},${new Date(e.expenseDate).toLocaleDateString()},${e.amount}\n`;
      });
    } else if (tabValue === 1 && donationData) {
      csvContent += "Receipt No,Donor Name,Category,Payment Mode,Date,Amount (INR)\n";
      donationData.donations.forEach((d) => {
        csvContent += `${d.receiptNo},"${d.donorName}",${d.category},${d.paymentMode},${new Date(d.donationDate).toLocaleDateString()},${d.amount}\n`;
      });
    } else if (tabValue === 2 && expenseData) {
      csvContent += "Expense No,Title,Paid To,Category,Payment Mode,Date,Amount (INR)\n";
      expenseData.expenses.forEach((e) => {
        csvContent += `${e.expenseNo},"${e.title}","${e.paidTo}",${e.category},${e.paymentMode},${new Date(e.expenseDate).toLocaleDateString()},${e.amount}\n`;
      });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Financial_Report_Tab${tabValue + 1}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <Box>
      <Stack direction="row" sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Financial Reports & Cash Book
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" startIcon={<PrintIcon />} onClick={handlePrint}>
            Print
          </Button>
          <Button variant="contained" startIcon={<DownloadIcon />} onClick={handleExportCSV}>
            Export CSV
          </Button>
        </Stack>
      </Stack>

      <Paper sx={{ mb: 3, p: 2 }}>
        <Grid container spacing={2} sx={{ display: "flex", alignItems: "center" }}>
          <Grid size={{ xs: 12, sm: 3 }}>
            <TextField
              fullWidth
              size="small"
              type="date"
              label="Start Date"
              slotProps={{ inputLabel: { shrink: true } }}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 3 }}>
            <TextField
              fullWidth
              size="small"
              type="date"
              label="End Date"
              slotProps={{ inputLabel: { shrink: true } }}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Grid>

          {tabValue !== 0 && (
            <>
              <Grid size={{ xs: 12, sm: 2 }}>
                <TextField
                  fullWidth
                  select
                  size="small"
                  label="Category"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <MenuItem value="ALL">All Categories</MenuItem>
                  {tabValue === 1 ? (
                    ["GENERAL", "TEMPLE_CONSTRUCTION", "ANNADANAM", "FESTIVAL", "GOSHALA", "SPECIAL_POOJA", "CORPUS"].map((cat) => (
                      <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                    ))
                  ) : (
                    ["CONSTRUCTION", "FESTIVAL", "MAINTENANCE", "ELECTRICITY", "WATER", "SALARY", "DONATION_UTILIZATION", "MISCELLANEOUS"].map((cat) => (
                      <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                    ))
                  )}
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, sm: 2 }}>
                <TextField
                  fullWidth
                  select
                  size="small"
                  label="Payment Mode"
                  value={paymentModeFilter}
                  onChange={(e) => setPaymentModeFilter(e.target.value)}
                >
                  <MenuItem value="ALL">All Modes</MenuItem>
                  {["CASH", "UPI", "BANK_TRANSFER", "CHEQUE"].map((mode) => (
                    <MenuItem key={mode} value={mode}>{mode}</MenuItem>
                  ))}
                </TextField>
              </Grid>
            </>
          )}

          <Grid size={{ xs: 12, sm: 2 }}>
            <Button fullWidth variant="contained" onClick={fetchReports}>
              Apply Filter
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabValue} onChange={(_, newVal) => setTabValue(newVal)}>
          <Tab label="Cash Book (Income vs Expense)" />
          <Tab label="Donation Statement" />
          <Tab label="Expense Statement" />
        </Tabs>
      </Box>

      {/* Tab 1: Cash Book */}
      <TabPanel value={tabValue} index={0}>
        {loading ? (
          <CircularProgress />
        ) : cashBookData ? (
          <>
            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Card sx={{ bgcolor: "success.light", color: "white" }}>
                  <CardContent>
                    <Stack direction="row" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Box>
                        <Typography variant="subtitle2">Total Income (Donations)</Typography>
                        <Typography variant="h4" sx={{ fontWeight: 700 }}>
                          ₹ {Number(cashBookData.totalIncome).toLocaleString("en-IN")}
                        </Typography>
                      </Box>
                      <TrendingUpIcon sx={{ fontSize: 40 }} />
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <Card sx={{ bgcolor: "error.light", color: "white" }}>
                  <CardContent>
                    <Stack direction="row" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Box>
                        <Typography variant="subtitle2">Total Expenditure</Typography>
                        <Typography variant="h4" sx={{ fontWeight: 700 }}>
                          ₹ {Number(cashBookData.totalExpense).toLocaleString("en-IN")}
                        </Typography>
                      </Box>
                      <TrendingDownIcon sx={{ fontSize: 40 }} />
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <Card sx={{ bgcolor: "primary.main", color: "white" }}>
                  <CardContent>
                    <Stack direction="row" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Box>
                        <Typography variant="subtitle2">Net Fund Balance</Typography>
                        <Typography variant="h4" sx={{ fontWeight: 700 }}>
                          ₹ {Number(cashBookData.netBalance).toLocaleString("en-IN")}
                        </Typography>
                      </Box>
                      <AccountBalanceWalletIcon sx={{ fontSize: 40 }} />
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Paper>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Type</TableCell>
                      <TableCell>Ref / Receipt</TableCell>
                      <TableCell>Title / Donor</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Payment Mode</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell align="right">Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cashBookData.donations.map((d) => (
                      <TableRow key={`in-${d.id}`}>
                        <TableCell><Chip label="INCOME" color="success" size="small" /></TableCell>
                        <TableCell>{d.receiptNo}</TableCell>
                        <TableCell>{d.donorName}</TableCell>
                        <TableCell>{d.category}</TableCell>
                        <TableCell>{d.paymentMode}</TableCell>
                        <TableCell>{new Date(d.donationDate).toLocaleDateString()}</TableCell>
                        <TableCell align="right" sx={{ color: "success.main", fontWeight: 700 }}>
                          + ₹{Number(d.amount).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                    {cashBookData.expenses.map((e) => (
                      <TableRow key={`ex-${e.id}`}>
                        <TableCell><Chip label="EXPENSE" color="error" size="small" /></TableCell>
                        <TableCell>{e.expenseNo}</TableCell>
                        <TableCell>{e.title} (to {e.paidTo})</TableCell>
                        <TableCell>{e.category}</TableCell>
                        <TableCell>{e.paymentMode}</TableCell>
                        <TableCell>{new Date(e.expenseDate).toLocaleDateString()}</TableCell>
                        <TableCell align="right" sx={{ color: "error.main", fontWeight: 700 }}>
                          - ₹{Number(e.amount).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </>
        ) : null}
      </TabPanel>

      {/* Tab 2: Donation Statement */}
      <TabPanel value={tabValue} index={1}>
        {loading ? (
          <CircularProgress />
        ) : donationData ? (
          <Paper>
            <Box sx={{ p: 2, bgcolor: "action.hover" }}>
              <Typography variant="h6">
                Total Collection: <strong>₹ {Number(donationData.totalAmount).toLocaleString("en-IN")}</strong> ({donationData.count} entries)
              </Typography>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Receipt No</TableCell>
                    <TableCell>Donor Name</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Payment Mode</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell align="right">Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {donationData.donations.map((d: any) => (
                    <TableRow key={d.id}>
                      <TableCell>{d.receiptNo}</TableCell>
                      <TableCell>{d.donorName}</TableCell>
                      <TableCell><Chip label={d.category} size="small" variant="outlined" /></TableCell>
                      <TableCell>{d.paymentMode}</TableCell>
                      <TableCell>{new Date(d.donationDate).toLocaleDateString()}</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700, color: "success.main" }}>
                        ₹ {Number(d.amount).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        ) : null}
      </TabPanel>

      {/* Tab 3: Expense Statement */}
      <TabPanel value={tabValue} index={2}>
        {loading ? (
          <CircularProgress />
        ) : expenseData ? (
          <Paper>
            <Box sx={{ p: 2, bgcolor: "action.hover" }}>
              <Typography variant="h6">
                Total Expenses: <strong>₹ {Number(expenseData.totalAmount).toLocaleString("en-IN")}</strong> ({expenseData.count} entries)
              </Typography>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Expense No</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Paid To</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Payment Mode</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell align="right">Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {expenseData.expenses.map((e: any) => (
                    <TableRow key={e.id}>
                      <TableCell>{e.expenseNo}</TableCell>
                      <TableCell>{e.title}</TableCell>
                      <TableCell>{e.paidTo}</TableCell>
                      <TableCell><Chip label={e.category} size="small" color="secondary" variant="outlined" /></TableCell>
                      <TableCell>{e.paymentMode}</TableCell>
                      <TableCell>{new Date(e.expenseDate).toLocaleDateString()}</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700, color: "error.main" }}>
                        ₹ {Number(e.amount).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        ) : null}
      </TabPanel>
    </Box>
  );
}
