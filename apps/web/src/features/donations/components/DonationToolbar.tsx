import { Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";

interface DonationToolbarProps {
    search: string;
    onSearchChange: (value: string) => void;
    onAddClick: () => void;
}

export default function DonationToolbar({
    search,
    onSearchChange,
    onAddClick,
}: DonationToolbarProps) {
    const navigate = useNavigate();

    return (
        <Stack
            direction="row"
            spacing={2}
            sx={{
                mb: 3,
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 2,
            }}>
            <TextField
                sx={{ flexGrow: 1, maxWidth: 500 }}
                placeholder="Search by donor name, transaction ID, or receipt..."
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
            />

            <Stack direction="row" spacing={1.5}>
                <Button
                    variant="outlined"
                    startIcon={<AccountBalanceIcon />}
                    onClick={() => navigate("/admin/bank-statement")}
                    sx={{
                        color: "#7c2d12",
                        borderColor: "#b45309",
                        fontWeight: 700,
                        "&:hover": { borderColor: "#7c2d12", bgcolor: "#fffbeb" },
                    }}
                >
                  Upload Bank Statement
                </Button>

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={onAddClick}
                    sx={{
                        bgcolor: "#b45309",
                        fontWeight: 700,
                        "&:hover": { bgcolor: "#7c2d12" },
                    }}
                >
                    Add Donation
                </Button>
            </Stack>
        </Stack>
    );
}