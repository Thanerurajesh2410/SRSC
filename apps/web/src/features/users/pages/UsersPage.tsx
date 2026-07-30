import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  CircularProgress,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import api from "../../../services/api";

export interface UserAccount {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  isActive: boolean;
  role: {
    id: string;
    name: string;
    description?: string;
  };
}

export default function UsersPage() {
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    roleId: "",
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      setError(null);
      const [userRes, roleRes] = await Promise.all([api.get("/users"), api.get("/users/roles")]);
      setUsers(userRes.data.data || []);
      setRoles(roleRes.data.data || []);
      if (roleRes.data.data && roleRes.data.data.length > 0) {
        setFormData((prev) => ({ ...prev, roleId: roleRes.data.data[0].id }));
      }
    } catch (err: any) {
      setError(err?.message || "Failed to load user accounts & roles.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/users", formData);
      setOpen(false);
      setFormData({ firstName: "", lastName: "", email: "", password: "", phone: "", roleId: roles[0]?.id || "" });
      fetchData();
    } catch (err: any) {
      setError(err?.message || "Failed to create user account.");
    }
  };

  const handleToggleStatus = async (user: UserAccount) => {
    try {
      await api.put(`/users/${user.id}`, { isActive: !user.isActive });
      fetchData();
    } catch (err: any) {
      setError(err?.message || "Failed to update user status.");
    }
  };

  return (
    <Box>
      <Stack direction="row" sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Stack direction="row" spacing={1} sx={{ display: "flex", alignItems: "center" }}>
          <AdminPanelSettingsIcon color="primary" sx={{ fontSize: 32 }} />
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            User Management & Role-Based Access (RBAC)
          </Typography>
        </Stack>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)}>
          Create System User
        </Button>
      </Stack>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {loading ? (
        <CircularProgress />
      ) : (
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Full Name</TableCell>
                  <TableCell>Email / Username</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Assigned Role</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((u) => (
                  <TableRow hover key={u.id}>
                    <TableCell sx={{ fontWeight: 700 }}>
                      {u.firstName} {u.lastName || ""}
                    </TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell>{u.phone || "-"}</TableCell>
                    <TableCell>
                      <Chip label={u.role?.name || "USER"} color="primary" size="small" variant="outlined" />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={u.isActive ? "ACTIVE" : "INACTIVE"}
                        color={u.isActive ? "success" : "default"}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        size="small"
                        color={u.isActive ? "error" : "success"}
                        onClick={() => handleToggleStatus(u)}
                      >
                        {u.isActive ? "Deactivate" : "Activate"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}

                {users.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                      No system users found. Click "Create System User" to add administrators, treasurers, or secretary accounts.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <form onSubmit={handleSubmit}>
          <DialogTitle>Create System User Account</DialogTitle>
          <DialogContent dividers>
            <Stack spacing={2}>
              <TextField
                fullWidth label="First Name *" required
                value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
              <TextField
                fullWidth label="Last Name"
                value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
              <TextField
                fullWidth label="Email / Login ID *" type="email" required
                value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <TextField
                fullWidth label="Password *" type="password" required
                value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <TextField
                fullWidth label="Phone / Mobile"
                value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              <TextField
                fullWidth select label="Role & Access Permission *" required
                value={formData.roleId} onChange={(e) => setFormData({ ...formData, roleId: e.target.value })}
              >
                {roles.map((r) => (
                  <MenuItem key={r.id} value={r.id}>
                    {r.name} — {r.description || "System Role"}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained">Create Account</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
