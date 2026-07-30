import { Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Stack } from "@mui/system";

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
                fullWidth
                placeholder="Search by donor name or receipt..."
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
            />

            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={onAddClick}
            >
                Add Donation
            </Button>
        </Stack>
    );
}