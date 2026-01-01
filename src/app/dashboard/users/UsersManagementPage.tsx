"use client";

import * as React from "react";
import dayjs from "dayjs";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import SearchIcon from "@mui/icons-material/Search";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

type UserPlan = "Premium" | "Free";
type UserStatus = "active" | "inactive" | "suspended";

type User = {
  id: string;
  fullName: string;
  email: string;
  plan: UserPlan;
  status: UserStatus;
  interviews: number;
  joinedAt: string; // yyyy-mm-dd
};

const MOCK_USERS: User[] = [
  { id: "u1", fullName: "Nguyễn Văn A", email: "nguyenvana@email.com", plan: "Premium", status: "active", interviews: 24, joinedAt: "2024-01-15" },
  { id: "u2", fullName: "Trần Thị B", email: "tranthib@email.com", plan: "Free", status: "active", interviews: 8, joinedAt: "2024-01-20" },
  { id: "u3", fullName: "Lê Văn C", email: "levanc@email.com", plan: "Premium", status: "inactive", interviews: 45, joinedAt: "2024-01-10" },
  { id: "u4", fullName: "Phạm Thị D", email: "phamthid@email.com", plan: "Free", status: "active", interviews: 3, joinedAt: "2024-01-25" },
  { id: "u5", fullName: "Hoàng Văn E", email: "hoangvane@email.com", plan: "Premium", status: "active", interviews: 67, joinedAt: "2024-01-05" },
  { id: "u6", fullName: "Vũ Thị F", email: "vuthif@email.com", plan: "Free", status: "suspended", interviews: 12, joinedAt: "2024-01-18" },
];

function getInitial(name: string) {
  const trimmed = (name || "").trim();
  if (!trimmed) return "?";
  const parts = trimmed.split(/\s+/);
  return (parts[parts.length - 1][0] || "?").toUpperCase();
}

function formatDDMMYYYY(value: string) {
  if (!value) return "";
  return dayjs(value).isValid() ? dayjs(value).format("DD/MM/YYYY") : value;
}

function PlanChip({ plan }: { plan: UserPlan }) {
  if (plan === "Premium") {
    return (
      <Chip
        size="small"
        label="Premium"
        sx={{
          borderRadius: 999,
          bgcolor: "rgba(139,92,246,0.12)",
          color: "rgb(109,40,217)",
          fontWeight: 600,
        }}
      />
    );
  }
  return (
    <Chip
      size="small"
      label="Free"
      sx={{
        borderRadius: 999,
        bgcolor: "rgba(148,163,184,0.14)",
        color: "rgb(51,65,85)",
        fontWeight: 600,
      }}
    />
  );
}

function StatusChip({ status }: { status: UserStatus }) {
  if (status === "active") {
    return (
      <Chip
        size="small"
        label="active"
        sx={{
          borderRadius: 999,
          bgcolor: "rgba(16,185,129,0.12)",
          color: "rgb(5,150,105)",
          fontWeight: 600,
        }}
      />
    );
  }
  if (status === "inactive") {
    return (
      <Chip
        size="small"
        label="inactive"
        sx={{
          borderRadius: 999,
          bgcolor: "rgba(148,163,184,0.14)",
          color: "rgb(71,85,105)",
          fontWeight: 600,
        }}
      />
    );
  }
  return (
    <Chip
      size="small"
      label="suspended"
      sx={{
        borderRadius: 999,
        bgcolor: "rgba(244,63,94,0.12)",
        color: "rgb(225,29,72)",
        fontWeight: 600,
      }}
    />
  );
}

export default function UsersManagementPage() {
  const [users, setUsers] = React.useState<User[]>(MOCK_USERS);

  const [q, setQ] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<"all" | UserStatus>("all");

  // pagination (1-based)
  const [page, setPage] = React.useState(1);
  const pageSize = 6;

  // dialogs
  const [openForm, setOpenForm] = React.useState(false);
  const [formMode, setFormMode] = React.useState<"create" | "edit">("create");
  const [editingUser, setEditingUser] = React.useState<User | null>(null);

  const [openDelete, setOpenDelete] = React.useState(false);
  const [deletingUser, setDeletingUser] = React.useState<User | null>(null);

  // form state
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [plan, setPlan] = React.useState<UserPlan>("Free");
  const [status, setStatus] = React.useState<UserStatus>("active");
  const [interviews, setInterviews] = React.useState<number>(0);
  const [joinedAt, setJoinedAt] = React.useState<string>(dayjs().format("YYYY-MM-DD"));

  const filtered = React.useMemo(() => {
    const keyword = q.trim().toLowerCase();
    return users.filter((u) => {
      const okKeyword = !keyword || u.fullName.toLowerCase().includes(keyword) || u.email.toLowerCase().includes(keyword);
      const okStatus = statusFilter === "all" ? true : u.status === statusFilter;
      return okKeyword && okStatus;
    });
  }, [users, q, statusFilter]);

  const total = filtered.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const pageSafe = Math.min(Math.max(1, page), pageCount);

  const pageItems = React.useMemo(() => {
    const start = (pageSafe - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, pageSafe]);

  const rangeStart = total === 0 ? 0 : (pageSafe - 1) * pageSize + 1;
  const rangeEnd = total === 0 ? 0 : Math.min(pageSafe * pageSize, total);

  function openCreate() {
    setFormMode("create");
    setEditingUser(null);
    setFullName("");
    setEmail("");
    setPlan("Free");
    setStatus("active");
    setInterviews(0);
    setJoinedAt(dayjs().format("YYYY-MM-DD"));
    setOpenForm(true);
  }

  function openEdit(u: User) {
    setFormMode("edit");
    setEditingUser(u);
    setFullName(u.fullName);
    setEmail(u.email);
    setPlan(u.plan);
    setStatus(u.status);
    setInterviews(u.interviews);
    setJoinedAt(u.joinedAt);
    setOpenForm(true);
  }

  function submitForm() {
    const nameTrim = fullName.trim();
    const emailTrim = email.trim();

    if (!nameTrim) return alert("Vui lòng nhập họ tên.");
    if (!emailTrim || !emailTrim.includes("@")) return alert("Vui lòng nhập email hợp lệ.");

    if (formMode === "create") {
      const newUser: User = {
        id: `u_${Date.now()}`,
        fullName: nameTrim,
        email: emailTrim,
        plan,
        status,
        interviews: Number(interviews) || 0,
        joinedAt,
      };
      setUsers((prev) => [newUser, ...prev]);
    } else if (formMode === "edit" && editingUser) {
      setUsers((prev) =>
        prev.map((x) =>
          x.id === editingUser.id
            ? { ...x, fullName: nameTrim, email: emailTrim, plan, status, interviews: Number(interviews) || 0, joinedAt }
            : x
        )
      );
    }

    setOpenForm(false);
  }

  function openDeleteConfirm(u: User) {
    setDeletingUser(u);
    setOpenDelete(true);
  }

  function confirmDelete() {
    if (!deletingUser) return;
    setUsers((prev) => prev.filter((x) => x.id !== deletingUser.id));
    setOpenDelete(false);
  }

  return (
    <Box sx={{ width: "100%" }}>
      {/* Header */}
      <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={2} sx={{ mb: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: "text.primary" }}>
            Quản lý Users
          </Typography>
          <Typography variant="body2" sx={{ mt: 0.5, color: "text.secondary" }}>
            Quản lý tất cả người dùng trong hệ thống
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<PersonAddAlt1Icon />}
          onClick={openCreate}
          sx={{
            bgcolor: "rgb(16,185,129)",
            "&:hover": { bgcolor: "rgb(5,150,105)" },
            borderRadius: 2.5,
            textTransform: "none",
            fontWeight: 700,
            px: 2,
            py: 1.1,
          }}
        >
          Thêm User
        </Button>
      </Stack>

      {/* Card */}
      <Card
        variant="outlined"
        sx={{
          borderRadius: 3,
          borderColor: "rgba(226,232,240,1)",
          overflow: "hidden",
        }}
      >
        {/* Filters */}
        <Box sx={{ p: 2, borderBottom: "1px solid rgba(241,245,249,1)" }}>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems={{ md: "center" }}>
            <TextField
              fullWidth
              placeholder="Tìm kiếm theo tên, email..."
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setPage(1);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "rgba(148,163,184,1)" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": { borderRadius: 2.5, height: 44 },
              }}
            />

            <FormControl sx={{ minWidth: { xs: "100%", md: 190 } }}>
              <Select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value as any);
                  setPage(1);
                }}
                size="small"
                sx={{ borderRadius: 2.5, height: 44 }}
              >
                <MenuItem value="all">Tất cả trạng thái</MenuItem>
                <MenuItem value="active">active</MenuItem>
                <MenuItem value="inactive">inactive</MenuItem>
                <MenuItem value="suspended">suspended</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Box>

        {/* Table */}
        <Box sx={{ overflowX: "auto" }}>
          <Table sx={{ minWidth: 900 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ px: 3, py: 2, fontSize: 12, fontWeight: 700, color: "text.secondary" }}>Họ tên</TableCell>
                <TableCell sx={{ px: 3, py: 2, fontSize: 12, fontWeight: 700, color: "text.secondary" }}>Email</TableCell>
                <TableCell sx={{ px: 3, py: 2, fontSize: 12, fontWeight: 700, color: "text.secondary" }}>Gói</TableCell>
                <TableCell sx={{ px: 3, py: 2, fontSize: 12, fontWeight: 700, color: "text.secondary" }}>Trạng thái</TableCell>
                <TableCell sx={{ px: 3, py: 2, fontSize: 12, fontWeight: 700, color: "text.secondary" }}>Phỏng vấn</TableCell>
                <TableCell sx={{ px: 3, py: 2, fontSize: 12, fontWeight: 700, color: "text.secondary" }}>Ngày tham gia</TableCell>
                <TableCell sx={{ px: 3, py: 2, fontSize: 12, fontWeight: 700, color: "text.secondary" }}>Thao tác</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {pageItems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} sx={{ py: 6, textAlign: "center", color: "text.secondary" }}>
                    Không có user phù hợp bộ lọc.
                  </TableCell>
                </TableRow>
              ) : (
                pageItems.map((u) => (
                  <TableRow key={u.id} hover sx={{ "& td": { borderTop: "1px solid rgba(241,245,249,1)" } }}>
                    <TableCell sx={{ px: 3, py: 2 }}>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Avatar sx={{ width: 36, height: 36, bgcolor: "rgba(16,185,129,0.14)", color: "rgb(5,150,105)", fontWeight: 800 }}>
                          {getInitial(u.fullName)}
                        </Avatar>
                        <Typography sx={{ fontWeight: 700, color: "text.primary" }}>{u.fullName}</Typography>
                      </Stack>
                    </TableCell>

                    <TableCell sx={{ px: 3, py: 2, color: "text.secondary" }}>{u.email}</TableCell>

                    <TableCell sx={{ px: 3, py: 2 }}>
                      <PlanChip plan={u.plan} />
                    </TableCell>

                    <TableCell sx={{ px: 3, py: 2 }}>
                      <StatusChip status={u.status} />
                    </TableCell>

                    <TableCell sx={{ px: 3, py: 2, color: "text.primary" }}>{u.interviews}</TableCell>

                    <TableCell sx={{ px: 3, py: 2, color: "text.secondary" }}>{formatDDMMYYYY(u.joinedAt)}</TableCell>

                    <TableCell sx={{ px: 3, py: 2 }}>
                      <Stack direction="row" spacing={1}>
                        <Tooltip title="Sửa">
                          <IconButton onClick={() => openEdit(u)} sx={{ color: "rgb(37,99,235)" }}>
                            <EditOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Xoá">
                          <IconButton onClick={() => openDeleteConfirm(u)} sx={{ color: "rgb(225,29,72)" }}>
                            <DeleteOutlineIcon />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Box>

        {/* Footer */}
        <Divider />

        <Box sx={{ px: 3, py: 2 }}>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems={{ md: "center" }} justifyContent="space-between">
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Hiển thị {rangeStart}-{rangeEnd} trong tổng số {total} users
            </Typography>

            <Stack direction="row" spacing={1} alignItems="center">
              <Button
                variant="outlined"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={pageSafe === 1}
                sx={{ borderRadius: 2, textTransform: "none", height: 36 }}
              >
                Trước
              </Button>

              <Pagination
                page={pageSafe}
                count={pageCount}
                onChange={(_, v) => setPage(v)}
                variant="outlined"
                shape="rounded"
                sx={{
                  "& .MuiPaginationItem-root": {
                    height: 36,
                    minWidth: 36,
                    borderRadius: 2,
                    fontWeight: 700,
                  },
                  "& .Mui-selected": {
                    bgcolor: "rgb(16,185,129) !important",
                    borderColor: "rgb(16,185,129) !important",
                    color: "#fff !important",
                  },
                }}
              />

              <Button
                variant="outlined"
                onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                disabled={pageSafe === pageCount}
                sx={{ borderRadius: 2, textTransform: "none", height: 36 }}
              >
                Sau
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Card>

      {/* Dialog: Create/Edit */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 800 }}>{formMode === "create" ? "Thêm User" : "Sửa User"}</DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          <Stack spacing={2.2} sx={{ mt: 1 }}>
            <TextField label="Họ tên" value={fullName} onChange={(e) => setFullName(e.target.value)} fullWidth />
            <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />

            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              <FormControl fullWidth>
                <Typography variant="caption" sx={{ mb: 0.5, color: "text.secondary" }}>
                  Gói
                </Typography>
                <Select value={plan} onChange={(e) => setPlan(e.target.value as UserPlan)}>
                  <MenuItem value="Free">Free</MenuItem>
                  <MenuItem value="Premium">Premium</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <Typography variant="caption" sx={{ mb: 0.5, color: "text.secondary" }}>
                  Trạng thái
                </Typography>
                <Select value={status} onChange={(e) => setStatus(e.target.value as UserStatus)}>
                  <MenuItem value="active">active</MenuItem>
                  <MenuItem value="inactive">inactive</MenuItem>
                  <MenuItem value="suspended">suspended</MenuItem>
                </Select>
              </FormControl>
            </Stack>

            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              <TextField
                label="Phỏng vấn"
                type="number"
                value={interviews}
                onChange={(e) => setInterviews(Number(e.target.value))}
                fullWidth
                inputProps={{ min: 0 }}
              />
              <TextField
                label="Ngày tham gia"
                type="date"
                value={joinedAt}
                onChange={(e) => setJoinedAt(e.target.value)}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenForm(false)} sx={{ textTransform: "none" }}>
            Huỷ
          </Button>
          <Button
            variant="contained"
            onClick={submitForm}
            sx={{
              textTransform: "none",
              fontWeight: 800,
              bgcolor: "rgb(16,185,129)",
              "&:hover": { bgcolor: "rgb(5,150,105)" },
              borderRadius: 2,
            }}
          >
            Lưu
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog: Delete */}
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)} fullWidth maxWidth="xs">
        <DialogTitle sx={{ fontWeight: 900 }}>Xoá User</DialogTitle>
        <DialogContent>
          <Typography sx={{ color: "text.secondary" }}>
            Bạn có chắc muốn xoá user <b style={{ color: "#0f172a" }}>{deletingUser?.fullName}</b> không?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenDelete(false)} sx={{ textTransform: "none" }}>
            Huỷ
          </Button>
          <Button variant="contained" onClick={confirmDelete} sx={{ textTransform: "none", fontWeight: 900, bgcolor: "rgb(225,29,72)", "&:hover": { bgcolor: "rgb(190,18,60)" }, borderRadius: 2 }}>
            Xoá
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
