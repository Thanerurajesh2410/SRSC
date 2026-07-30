import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { useDeleteDonation } from "../hooks/useDonations";

interface DeleteDonationDialogProps {
  open: boolean;
  donationId: string | null;
  onClose: () => void;
  onDeleted: () => void;
}

const DeleteDonationDialog = ({
  open,
  donationId,
  onClose,
  onDeleted,
}: DeleteDonationDialogProps) => {

  const deleteDonation = useDeleteDonation();

  const handleDelete = async () => {
    if (!donationId) return;

    try {
      await deleteDonation.mutateAsync(donationId);
      onDeleted();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>
        Delete Donation
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this donation?
          <br />
          <br />
          This action cannot be undone.
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
          disabled={deleteDonation.isPending}
        >
          Cancel
        </Button>

        <Button
          color="error"
          variant="contained"
          startIcon={<DeleteIcon />}
          disabled={deleteDonation.isPending}
          onClick={handleDelete}
        >
          {deleteDonation.isPending ? (
            <CircularProgress
              size={20}
              color="inherit"
            />
          ) : (
            "Delete"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDonationDialog;