import {
  Alert,
  Box,
  Chip,
  CircularProgress,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ReceiptIcon from "@mui/icons-material/Receipt";

import { useMemo, useState } from "react";
import { useDonations } from "../hooks/useDonations";


interface DonationTableProps {
  searchText: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onView?: (id: string) => void;
  onReceipt?: (id: string) => void;
}

const DonationTable = ({
  searchText,
  onEdit,
  onDelete,
  onView,
  onReceipt,
}: DonationTableProps) => {
  const {
    data: donations = [],
    isLoading,
    isError,
  } = useDonations();

  console.log("========== DONATIONS DEBUG ==========");
  console.log("Donations:", donations);
  console.log("Is Array:", Array.isArray(donations));
  console.log("Type:", typeof donations);
  console.log("====================================");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredDonations = useMemo(() => {
    if (!searchText.trim()) {
      return donations;
    }

    const keyword = searchText.toLowerCase();

    return donations.filter((donation) => {
      return (
        donation.receiptNo?.toLowerCase().includes(keyword) ||
        donation.donorName?.toLowerCase().includes(keyword) ||
        donation.mobile?.toLowerCase().includes(keyword) ||
        donation.category?.toLowerCase().includes(keyword) ||
        donation.paymentMode?.toLowerCase().includes(keyword) ||
        donation.purpose?.toLowerCase().includes(keyword) ||
        donation.transactionId?.toLowerCase().includes(keyword)
      );
    });
  }, [donations, searchText]);

  console.log("donations:", donations);
  console.log("filteredDonations:", filteredDonations);
  console.log("Array.isArray(donations):", Array.isArray(donations));
  console.log(
    "Array.isArray(filteredDonations):",
    Array.isArray(filteredDonations)
  );

  const paginatedDonations = Array.isArray(filteredDonations)
    ? filteredDonations.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    )
    : [];

  const handlePageChange = (
    _: unknown,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (isLoading) {
    return (
      <Paper sx={{ p: 5 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      </Paper>
    );
  }

  if (isError) {
    return (
      <Alert severity="error">
        Failed to load donations.
      </Alert>
    );
  }

  return (
    <Paper>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Receipt No</TableCell>
              <TableCell>Donor</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Payment</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedDonations.map((donation) => (
              <TableRow hover key={donation.id}>
                <TableCell>
                  <Typography
                    sx={{
                      fontWeight: 600,
                    }}
                  >
                    {donation.receiptNo}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Stack spacing={0.5}>
                    <Typography
                      sx={{
                        fontWeight: 600,
                      }}
                    >
                      {donation.donorName}
                    </Typography>

                    {donation.mobile && (
                      <Typography
                        variant="caption"
                        color="text.secondary"
                      >
                        {donation.mobile}
                      </Typography>
                    )}
                  </Stack>
                </TableCell>

                <TableCell align="right">
                  <Typography
                    sx={{
                      fontWeight: 700,
                      color: "success.main",
                    }}
                  >
                    ₹ {Number(donation.amount).toLocaleString()}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Chip
                    label={donation.category}
                    size="small"
                    variant="outlined"
                  />
                </TableCell>

                <TableCell>
                  <Chip
                    label={donation.paymentMode}
                    size="small"
                  />
                </TableCell>

                <TableCell>
                  {new Date(
                    donation.donationDate
                  ).toLocaleDateString()}
                </TableCell>

                <TableCell align="center">
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                      justifyContent: "space-between",
                    }}
                  >
                    {onView && (
                      <Tooltip title="View">
                        <IconButton
                          color="info"
                          onClick={() => onView(donation.id)}
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                    )}

                    {onReceipt && (
                      <Tooltip title="Receipt">
                        <IconButton
                          color="secondary"
                          onClick={() => onReceipt(donation.id)}
                        >
                          <ReceiptIcon />
                        </IconButton>
                      </Tooltip>
                    )}

                    <Tooltip title="Edit">
                      <IconButton
                        color="primary"
                        onClick={() => onEdit(donation.id)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete">
                      <IconButton
                        color="error"
                        onClick={() => onDelete(donation.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredDonations.length === 0 && (
          <Box
            sx={{
              py: 6,
              textAlign: "center",
            }}
          >
            <Typography color="text.secondary">
              No donations found.
            </Typography>
          </Box>
        )}

        <TablePagination
          component="div"
          count={filteredDonations.length}
          page={page}
          onPageChange={handlePageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleRowsPerPageChange}
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
        />
      </TableContainer>
    </Paper>
  );
};

export default DonationTable;