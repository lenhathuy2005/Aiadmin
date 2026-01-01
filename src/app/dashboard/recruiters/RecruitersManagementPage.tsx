"use client";

import * as React from "react";

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
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
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

type RecruiterStatus = "active" | "inactive";

type Recruiter = {
  id: string;
  companyName: string;
  email: string;
  phone: string;
  candidates: number;
  status: RecruiterStatus;
  joinedAt: string; // yyyy-mm-dd or dd/mm/yyyy
};

const MOCK_RECRUITERS: Recruiter[] = [
  {
    id: "r1",
    companyName: "Công ty ABC",
    email: "hr@abc.com",
    phone: "0901234567",
    candidates: 45,
    status: "active",
    joinedAt: "2024-01-10",
  },
  {
    id: "r2",
    companyName: "Công ty XYZ",
    email: "recruit@xyz.com",
    phone: "0912345678",
    candidates: 32,
    status: "active",
    joinedAt: "2024-01-15",
  },
  {
    id: "r3",
    companyName: "Tech Solutions",
    email: "hr@tech.com",
    phone: "0923456789",
    candidates: 78,
    status: "active",
    joinedAt: "2024-01-05",
  },
  {
    id: "r4",
    companyName: "Digital Corp",
    email: "jobs@digital.com",
    phone: "0934567890",
    candidates: 23,
    status: "inactive",
    joinedAt: "2024-01-20",
  },
];

function getInitial(name: string) {
  const trimmed = (name || "").trim();
  if (!trimmed) return "?";
  // lấy chữ cái đầu tiên
  return trimmed[0].toUpperCase();
}

function formatDDMMYYYY(input: string) {
  if (!input) return "";
  if (input.includes("/")) return input;
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return input;
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

/** Icon SVG tự viết để khỏi cần @mui/icons-material */
function SvgIcon({
                   children,
                   size = 18,
                 }: {
  children: React.ReactNode;
  size?: number;
}) {
  return (
    <Box
      component="svg"
      viewBox="0 0 24 24"
      sx={{ width: size, height: size, display: "block" }}
    >
      {children}
    </Box>
  );
}

function IconPlus() {
  return (
    <SvgIcon>
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </SvgIcon>
  );
}

function IconEdit() {
  return (
    <SvgIcon>
      <path
        d="M4 20h4l10.5-10.5a1.5 1.5 0 0 0 0-2.12L16.62 5.5a1.5 1.5 0 0 0-2.12 0L4 16v4z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        fill="none"
      />
    </SvgIcon>
  );
}

function IconTrash() {
  return (
    <SvgIcon>
      <path
        d="M6 7h12M10 7V5h4v2m-7 0l1 14h8l1-14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </SvgIcon>
  );
}

function StatusChip({ status }: { status: RecruiterStatus }) {
  if (status === "active") {
    return (
      <Chip
        size="small"
        label="active"
        sx={{
          borderRadius: 999,
          bgcolor: "rgba(16,185,129,0.12)",
          color: "rgb(5,150,105)",
          fontWeight: 700,
        }}
      />
    );
  }
  return (
    <Chip
      size="small"
      label="inactive"
      sx={{
        borderRadius: 999,
        bgcolor: "rgba(148,163,184,0.14)",
        color: "rgb(71,85,105)",
        fontWeight: 700,
      }}
    />
  );
}

export default function RecruitersManagementPage() {
  const [items, setItems] = React.useState<Recruiter[]>(MOCK_RECRUITERS);

  // Dialog state
  const [openForm, setOpenForm] = React.useState(false);
  const [formMode, setFormMode] = React.useState<"create" | "edit">("create");
  const [editing, setEditing] = React.useState<Recruiter | null>(null);

  const [openDelete, setOpenDelete] = React.useState(false);
  const [deleting, setDeleting] = React.useState<Recruiter | null>(null);

  // Form state
  const [companyName, setCompanyName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [candidates, setCandidates] = React.useState<number>(0);
  const [status, setStatus] = React.useState<RecruiterStatus>("active");
  const [joinedAt, setJoinedAt] = React.useState<string>(
    new Date().toISOString().slice(0, 10)
  );

  function openCreate() {
    setFormMode("create");
    setEditing(null);
    setCompanyName("");
    setEmail("");
    setPhone("");
    setCandidates(0);
    setStatus("active");
    setJoinedAt(new Date().toISOString().slice(0, 10));
    setOpenForm(true);
  }

  function openEdit(r: Recruiter) {
    setFormMode("edit");
    setEditing(r);
    setCompanyName(r.companyName);
    setEmail(r.email);
    setPhone(r.phone);
    setCandidates(r.candidates);
    setStatus(r.status);
    setJoinedAt(r.joinedAt.includes("/") ? new Date().toISOString().slice(0, 10) : r.joinedAt);
    setOpenForm(true);
  }

  function submitForm() {
    const c = companyName.trim();
    const e = email.trim();
    const p = phone.trim();

    if (!c) return alert("Vui lòng nhập tên công ty.");
    if (!e || !e.includes("@")) return alert("Vui lòng nhập email hợp lệ.");
    if (!p) return alert("Vui lòng nhập số điện thoại.");

    const payload: Omit<Recruiter, "id"> = {
      companyName: c,
      email: e,
      phone: p,
      candidates: Number.isFinite(candidates) ? candidates : 0,
      status,
      joinedAt,
    };

    if (formMode === "create") {
      const newItem: Recruiter = { id: `r_${Date.now()}`, ...payload };
      setItems((prev) => [newItem, ...prev]);
    } else if (formMode === "edit" && editing) {
      setItems((prev) => prev.map((x) => (x.id === editing.id ? { ...x, ...payload } : x)));
    }

    setOpenForm(false);
  }

  function openDeleteConfirm(r: Recruiter) {
    setDeleting(r);
    setOpenDelete(true);
  }

  function confirmDelete() {
    if (!deleting) return;
    setItems((prev) => prev.filter((x) => x.id !== deleting.id));
    setOpenDelete(false);
  }

  return (
    <Box sx={{ width: "100%" }}>
      {/* Header */}
      <Stack
        direction="row"
        alignItems="flex-start"
        justifyContent="space-between"
        spacing={2}
        sx={{ mb: 2 }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            Quản lý Recruiters
          </Typography>
          <Typography variant="body2" sx={{ mt: 0.5, color: "text.secondary" }}>
            Quản lý các nhà tuyển dụng và công ty
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<IconPlus />}
          onClick={openCreate}
          sx={{
            bgcolor: "rgb(16,185,129)",
            "&:hover": { bgcolor: "rgb(5,150,105)" },
            borderRadius: 2.5,
            textTransform: "none",
            fontWeight: 800,
            px: 2,
            py: 1.1,
          }}
        >
          Thêm Recruiter
        </Button>
      </Stack>

      {/* Card + Table */}
      <Card
        variant="outlined"
        sx={{
          borderRadius: 3,
          borderColor: "rgba(226,232,240,1)",
          overflow: "hidden",
        }}
      >
        <Box sx={{ overflowX: "auto" }}>
          <Table sx={{ minWidth: 980 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ px: 3, py: 2, fontSize: 12, fontWeight: 800, color: "text.secondary" }}>
                  Công ty
                </TableCell>
                <TableCell sx={{ px: 3, py: 2, fontSize: 12, fontWeight: 800, color: "text.secondary" }}>
                  Email
                </TableCell>
                <TableCell sx={{ px: 3, py: 2, fontSize: 12, fontWeight: 800, color: "text.secondary" }}>
                  Điện thoại
                </TableCell>
                <TableCell sx={{ px: 3, py: 2, fontSize: 12, fontWeight: 800, color: "text.secondary" }}>
                  Ứng viên
                </TableCell>
                <TableCell sx={{ px: 3, py: 2, fontSize: 12, fontWeight: 800, color: "text.secondary" }}>
                  Trạng thái
                </TableCell>
                <TableCell sx={{ px: 3, py: 2, fontSize: 12, fontWeight: 800, color: "text.secondary" }}>
                  Ngày tham gia
                </TableCell>
                <TableCell sx={{ px: 3, py: 2, fontSize: 12, fontWeight: 800, color: "text.secondary" }}>
                  Thao tác
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {items.map((r) => (
                <TableRow key={r.id} hover sx={{ "& td": { borderTop: "1px solid rgba(241,245,249,1)" } }}>
                  <TableCell sx={{ px: 3, py: 2 }}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Avatar
                        sx={{
                          width: 36,
                          height: 36,
                          bgcolor: "rgba(59,130,246,0.9)",
                          color: "#fff",
                          fontWeight: 900,
                        }}
                      >
                        {getInitial(r.companyName)}
                      </Avatar>
                      <Typography sx={{ fontWeight: 800, color: "text.primary" }}>
                        {r.companyName}
                      </Typography>
                    </Stack>
                  </TableCell>

                  <TableCell sx={{ px: 3, py: 2, color: "text.secondary" }}>
                    {r.email}
                  </TableCell>

                  <TableCell sx={{ px: 3, py: 2, color: "text.secondary" }}>
                    {r.phone}
                  </TableCell>

                  <TableCell sx={{ px: 3, py: 2, color: "text.primary", fontWeight: 700 }}>
                    {r.candidates}
                  </TableCell>

                  <TableCell sx={{ px: 3, py: 2 }}>
                    <StatusChip status={r.status} />
                  </TableCell>

                  <TableCell sx={{ px: 3, py: 2, color: "text.secondary" }}>
                    {formatDDMMYYYY(r.joinedAt)}
                  </TableCell>

                  <TableCell sx={{ px: 3, py: 2 }}>
                    <Stack direction="row" spacing={1}>
                      <Tooltip title="Sửa">
                        <IconButton onClick={() => openEdit(r)} sx={{ color: "rgb(37,99,235)" }}>
                          <IconEdit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Xoá">
                        <IconButton onClick={() => openDeleteConfirm(r)} sx={{ color: "rgb(225,29,72)" }}>
                          <IconTrash />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>

        <Divider />
        <Box sx={{ px: 3, py: 2 }}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Hiển thị 1-{items.length} trong tổng số {items.length} recruiters
          </Typography>
        </Box>
      </Card>

      {/* Dialog Create/Edit */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 900 }}>
          {formMode === "create" ? "Thêm Recruiter" : "Sửa Recruiter"}
        </DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Công ty"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              fullWidth
            />
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
            <TextField
              label="Điện thoại"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              fullWidth
            />

            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              <TextField
                label="Ứng viên"
                type="number"
                value={candidates}
                onChange={(e) => setCandidates(Number(e.target.value))}
                fullWidth
                inputProps={{ min: 0 }}
              />

              <FormControl fullWidth>
                <Typography variant="caption" sx={{ mb: 0.5, color: "text.secondary" }}>
                  Trạng thái
                </Typography>
                <Select value={status} onChange={(e) => setStatus(e.target.value as RecruiterStatus)}>
                  <MenuItem value="active">active</MenuItem>
                  <MenuItem value="inactive">inactive</MenuItem>
                </Select>
              </FormControl>
            </Stack>

            <TextField
              label="Ngày tham gia"
              type="date"
              value={joinedAt}
              onChange={(e) => setJoinedAt(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
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
              fontWeight: 900,
              bgcolor: "rgb(16,185,129)",
              "&:hover": { bgcolor: "rgb(5,150,105)" },
              borderRadius: 2,
            }}
          >
            Lưu
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog Delete */}
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)} fullWidth maxWidth="xs">
        <DialogTitle sx={{ fontWeight: 950 }}>Xoá Recruiter</DialogTitle>
        <DialogContent>
          <Typography sx={{ color: "text.secondary" }}>
            Bạn có chắc muốn xoá recruiter của{" "}
            <b style={{ color: "#0f172a" }}>{deleting?.companyName}</b> không?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenDelete(false)} sx={{ textTransform: "none" }}>
            Huỷ
          </Button>
          <Button
            variant="contained"
            onClick={confirmDelete}
            sx={{
              textTransform: "none",
              fontWeight: 950,
              bgcolor: "rgb(225,29,72)",
              "&:hover": { bgcolor: "rgb(190,18,60)" },
              borderRadius: 2,
            }}
          >
            Xoá
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
