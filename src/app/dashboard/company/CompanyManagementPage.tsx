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

type CompanyStatus = "active" | "inactive";

type Company = {
  id: string;
  name: string;
  industry: string;
  size: string; // e.g. "10,000+" | "5,000-10,000" | ...
  interviews: number;
  status: CompanyStatus;
};

const MOCK_COMPANIES: Company[] = [
  { id: "c1", name: "FPT Software", industry: "IT", size: "10,000+", interviews: 234, status: "active" },
  { id: "c2", name: "Viettel Group", industry: "Telecom", size: "5,000-10,000", interviews: 189, status: "active" },
  { id: "c3", name: "VinGroup", industry: "Conglomerate", size: "10,000+", interviews: 156, status: "active" },
  { id: "c4", name: "Grab Vietnam", industry: "Technology", size: "1,000-5,000", interviews: 98, status: "inactive" },
];

function getInitial(name: string) {
  const trimmed = (name || "").trim();
  if (!trimmed) return "?";
  return trimmed[0].toUpperCase();
}

function SvgIcon({ children, size = 18 }: { children: React.ReactNode; size?: number }) {
  return (
    <Box component="svg" viewBox="0 0 24 24" sx={{ width: size, height: size, display: "block" }}>
      {children}
    </Box>
  );
}

function IconPlus() {
  return (
    <SvgIcon>
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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

function StatusChip({ status }: { status: CompanyStatus }) {
  if (status === "active") {
    return (
      <Chip
        size="small"
        label="active"
        sx={{
          borderRadius: 999,
          bgcolor: "rgba(16,185,129,0.12)",
          color: "rgb(5,150,105)",
          fontWeight: 900,
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
        fontWeight: 900,
      }}
    />
  );
}

export default function CompanyManagementPage() {
  const [items, setItems] = React.useState<Company[]>(MOCK_COMPANIES);

  // dialogs
  const [openForm, setOpenForm] = React.useState(false);
  const [formMode, setFormMode] = React.useState<"create" | "edit">("create");
  const [editing, setEditing] = React.useState<Company | null>(null);

  const [openDelete, setOpenDelete] = React.useState(false);
  const [deleting, setDeleting] = React.useState<Company | null>(null);

  // form state
  const [name, setName] = React.useState("");
  const [industry, setIndustry] = React.useState("");
  const [size, setSize] = React.useState("10,000+");
  const [interviews, setInterviews] = React.useState<number>(0);
  const [status, setStatus] = React.useState<CompanyStatus>("active");

  function openCreate() {
    setFormMode("create");
    setEditing(null);
    setName("");
    setIndustry("");
    setSize("10,000+");
    setInterviews(0);
    setStatus("active");
    setOpenForm(true);
  }

  function openEdit(c: Company) {
    setFormMode("edit");
    setEditing(c);
    setName(c.name);
    setIndustry(c.industry);
    setSize(c.size);
    setInterviews(c.interviews);
    setStatus(c.status);
    setOpenForm(true);
  }

  function submitForm() {
    const n = name.trim();
    const i = industry.trim();
    if (!n) return alert("Vui lòng nhập tên công ty.");
    if (!i) return alert("Vui lòng nhập ngành nghề.");

    const payload: Omit<Company, "id"> = {
      name: n,
      industry: i,
      size,
      interviews: Number.isFinite(interviews) ? interviews : 0,
      status,
    };

    if (formMode === "create") {
      setItems((prev) => [{ id: `c_${Date.now()}`, ...payload }, ...prev]);
    } else if (formMode === "edit" && editing) {
      setItems((prev) => prev.map((x) => (x.id === editing.id ? { ...x, ...payload } : x)));
    }

    setOpenForm(false);
  }

  function openDeleteConfirm(c: Company) {
    setDeleting(c);
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
      <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={2} sx={{ mb: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 900 }}>
            Quản lý Công ty
          </Typography>
          <Typography variant="body2" sx={{ mt: 0.5, color: "text.secondary" }}>
            Quản lý các công ty sử dụng hệ thống
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
            fontWeight: 900,
            px: 2,
            py: 1.1,
          }}
        >
          Thêm công ty
        </Button>
      </Stack>

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
                <TableCell sx={{ px: 3, py: 2, fontSize: 12, fontWeight: 900, color: "text.secondary" }}>
                  Công ty
                </TableCell>
                <TableCell sx={{ px: 3, py: 2, fontSize: 12, fontWeight: 900, color: "text.secondary" }}>
                  Ngành nghề
                </TableCell>
                <TableCell sx={{ px: 3, py: 2, fontSize: 12, fontWeight: 900, color: "text.secondary" }}>
                  Quy mô
                </TableCell>
                <TableCell sx={{ px: 3, py: 2, fontSize: 12, fontWeight: 900, color: "text.secondary" }}>
                  Phỏng vấn
                </TableCell>
                <TableCell sx={{ px: 3, py: 2, fontSize: 12, fontWeight: 900, color: "text.secondary" }}>
                  Trạng thái
                </TableCell>
                <TableCell sx={{ px: 3, py: 2, fontSize: 12, fontWeight: 900, color: "text.secondary" }}>
                  Thao tác
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {items.map((c) => (
                <TableRow key={c.id} hover sx={{ "& td": { borderTop: "1px solid rgba(241,245,249,1)" } }}>
                  <TableCell sx={{ px: 3, py: 2 }}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Avatar
                        sx={{
                          width: 36,
                          height: 36,
                          bgcolor: "rgba(147,51,234,0.9)", // tím giống ảnh
                          color: "#fff",
                          fontWeight: 900,
                        }}
                      >
                        {getInitial(c.name)}
                      </Avatar>
                      <Typography sx={{ fontWeight: 800, color: "text.primary" }}>{c.name}</Typography>
                    </Stack>
                  </TableCell>

                  <TableCell sx={{ px: 3, py: 2, color: "text.secondary" }}>{c.industry}</TableCell>
                  <TableCell sx={{ px: 3, py: 2, color: "text.secondary" }}>{c.size}</TableCell>
                  <TableCell sx={{ px: 3, py: 2, color: "text.primary", fontWeight: 700 }}>{c.interviews}</TableCell>

                  <TableCell sx={{ px: 3, py: 2 }}>
                    <StatusChip status={c.status} />
                  </TableCell>

                  <TableCell sx={{ px: 3, py: 2 }}>
                    <Stack direction="row" spacing={1}>
                      <Tooltip title="Sửa">
                        <IconButton onClick={() => openEdit(c)} sx={{ color: "rgb(37,99,235)" }}>
                          <IconEdit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Xoá">
                        <IconButton onClick={() => openDeleteConfirm(c)} sx={{ color: "rgb(225,29,72)" }}>
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
            Hiển thị 1-{items.length} trong tổng số {items.length} công ty
          </Typography>
        </Box>
      </Card>

      {/* Dialog create/edit */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 900 }}>{formMode === "create" ? "Thêm công ty" : "Sửa công ty"}</DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Tên công ty"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />

            <TextField
              label="Ngành nghề"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              fullWidth
            />

            <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems="stretch">
              <TextField
                select
                label="Quy mô"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                fullWidth
              >
                <MenuItem value="1-50">1-50</MenuItem>
                <MenuItem value="50-200">50-200</MenuItem>
                <MenuItem value="200-1,000">200-1,000</MenuItem>
                <MenuItem value="1,000-5,000">1,000-5,000</MenuItem>
                <MenuItem value="5,000-10,000">5,000-10,000</MenuItem>
                <MenuItem value="10,000+">10,000+</MenuItem>
              </TextField>

              <TextField
                label="Phỏng vấn"
                type="number"
                value={interviews}
                onChange={(e) => setInterviews(Number(e.target.value))}
                fullWidth
                inputProps={{ min: 0 }}
              />
            </Stack>

            <TextField
              select
              label="Trạng thái"
              value={status}
              onChange={(e) => setStatus(e.target.value as CompanyStatus)}
              fullWidth
            >
              <MenuItem value="active">active</MenuItem>
              <MenuItem value="inactive">inactive</MenuItem>
            </TextField>
          </Stack>>
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

      {/* Dialog delete */}
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)} fullWidth maxWidth="xs">
        <DialogTitle sx={{ fontWeight: 950 }}>Xoá công ty</DialogTitle>
        <DialogContent>
          <Typography sx={{ color: "text.secondary" }}>
            Bạn có chắc muốn xoá công ty <b style={{ color: "#0f172a" }}>{deleting?.name}</b> không?
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
