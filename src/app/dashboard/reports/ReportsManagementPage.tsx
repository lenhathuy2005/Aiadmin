"use client";

import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  Tooltip,
} from "@mui/material";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import StorageRoundedIcon from "@mui/icons-material/StorageRounded";

import FilePresentRoundedIcon from "@mui/icons-material/FilePresentRounded";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

type ReportType = "Người dùng" | "Tài chính" | "AI" | "Phỏng vấn";
type ReportStatus = "Hoàn thành" | "Đang xử lý";

type ReportRow = {
  id: string;
  name: string;
  type: ReportType;
  createdAt: string; // YYYY-MM-DD
  status: ReportStatus;
  downloads: number;
  size: string; // "2.4 MB"
};

function StatCard(props: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <Paper
      sx={{
        p: 2,
        borderRadius: 3,
        border: "1px solid rgba(0,0,0,0.06)",
        height: "100%",
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography sx={{ color: "text.secondary", fontWeight: 700, fontSize: 13 }}>
            {props.title}
          </Typography>
          <Typography sx={{ mt: 0.5, fontSize: 24, fontWeight: 900 }}>
            {props.value}
          </Typography>
        </Box>

        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: 2,
            border: "1px solid rgba(0,0,0,0.06)",
            display: "grid",
            placeItems: "center",
          }}
        >
          {props.icon}
        </Box>
      </Stack>
    </Paper>
  );
}

function TypeChip({ type }: { type: ReportType }) {
  const map: Record<ReportType, { bg: string; color: string; bd: string }> = {
    "Người dùng": { bg: "rgba(59, 130, 246, 0.14)", color: "#1d4ed8", bd: "rgba(59,130,246,0.25)" },
    "Tài chính": { bg: "rgba(16, 185, 129, 0.14)", color: "#047857", bd: "rgba(16,185,129,0.25)" },
    "AI": { bg: "rgba(139, 92, 246, 0.14)", color: "#6d28d9", bd: "rgba(139,92,246,0.25)" },
    "Phỏng vấn": { bg: "rgba(59, 130, 246, 0.12)", color: "#1d4ed8", bd: "rgba(59,130,246,0.22)" },
  };
  const s = map[type];

  return (
    <Chip
      label={type}
      size="small"
      sx={{
        height: 24,
        fontWeight: 800,
        bgcolor: s.bg,
        color: s.color,
        border: "1px solid",
        borderColor: s.bd,
      }}
    />
  );
}

function StatusChip({ status }: { status: ReportStatus }) {
  if (status === "Hoàn thành") {
    return (
      <Chip
        label="Hoàn thành"
        size="small"
        sx={{
          height: 24,
          fontWeight: 800,
          bgcolor: "rgba(16, 185, 129, 0.14)",
          color: "#047857",
          border: "1px solid rgba(16,185,129,0.25)",
        }}
      />
    );
  }
  return (
    <Chip
      label="Đang xử lý"
      size="small"
      sx={{
        height: 24,
        fontWeight: 800,
        bgcolor: "rgba(245, 158, 11, 0.14)",
        color: "#92400e",
        border: "1px solid rgba(245,158,11,0.25)",
      }}
    />
  );
}

export default function ReportsManagementPage() {
  const [q, setQ] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | ReportType>("all");
  const [range, setRange] = useState<"7d" | "30d" | "90d">("7d");

  const rows: ReportRow[] = useMemo(
    () => [
      {
        id: "r1",
        name: "Báo cáo người dùng tháng 1/2025",
        type: "Người dùng",
        createdAt: "2025-01-31",
        status: "Hoàn thành",
        downloads: 245,
        size: "2.4 MB",
      },
      {
        id: "r2",
        name: "Báo cáo doanh thu Q4 2024",
        type: "Tài chính",
        createdAt: "2024-12-31",
        status: "Hoàn thành",
        downloads: 189,
        size: "3.1 MB",
      },
      {
        id: "r3",
        name: "Báo cáo hiệu suất AI tháng 12",
        type: "AI",
        createdAt: "2024-12-31",
        status: "Hoàn thành",
        downloads: 156,
        size: "1.8 MB",
      },
      {
        id: "r4",
        name: "Báo cáo phỏng vấn tuần 4",
        type: "Phỏng vấn",
        createdAt: "2025-01-28",
        status: "Đang xử lý",
        downloads: 0,
        size: "-",
      },
    ],
    []
  );

  const filtered = useMemo(() => {
    const kw = q.trim().toLowerCase();
    return rows.filter((r) => {
      const matchQ = !kw || r.name.toLowerCase().includes(kw);
      const matchType = typeFilter === "all" ? true : r.type === typeFilter;
      // range hiện demo UI giống ảnh, chưa lọc theo ngày thật (nếu cần mình bổ sung)
      return matchQ && matchType;
    });
  }, [q, typeFilter, rows]);

  const stats = useMemo(
    () => ({
      totalReports: "156",
      thisMonth: "24",
      downloads: "1,234",
      storage: "45.2 GB",
    }),
    []
  );

  const onCreate = () => console.log("create report");
  const onDownload = (id: string) => console.log("download", id);
  const onView = (id: string) => console.log("view", id);
  const onShare = (id: string) => console.log("share", id);
  const onDelete = (id: string) => console.log("delete", id);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "none",
        px: { xs: 2, md: 3 },
        py: 3,
        minHeight: "calc(100vh - 120px)",
      }}
    >
      {/* Header */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems={{ xs: "flex-start", md: "center" }} justifyContent="space-between">
        <Box>
          <Typography sx={{ fontSize: 28, fontWeight: 900, letterSpacing: -0.3 }}>Báo cáo</Typography>
          <Typography sx={{ mt: 0.6, color: "text.secondary" }}>Quản lý và tạo báo cáo hệ thống</Typography>
        </Box>

        <Button
          onClick={onCreate}
          variant="contained"
          sx={{ borderRadius: 2, fontWeight: 900, px: 2.2 }}
        >
          + Tạo báo cáo mới
        </Button>
      </Stack>

      {/* Stats */}
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard
            title="Tổng báo cáo"
            value={stats.totalReports}
            icon={<InsertDriveFileRoundedIcon color="primary" />}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard
            title="Báo cáo tháng này"
            value={stats.thisMonth}
            icon={<CalendarMonthRoundedIcon sx={{ color: "#10b981" }} />}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard
            title="Lượt tải xuống"
            value={stats.downloads}
            icon={<DownloadRoundedIcon sx={{ color: "#8b5cf6" }} />}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard
            title="Dung lượng lưu trữ"
            value={stats.storage}
            icon={<StorageRoundedIcon sx={{ color: "#f97316" }} />}
          />
        </Grid>
      </Grid>

      {/* Table block */}
      <Paper sx={{ mt: 2, borderRadius: 3, border: "1px solid rgba(0,0,0,0.06)" }}>
        {/* Toolbar */}
        <Box sx={{ p: 2 }}>
          <Stack direction={{ xs: "column", md: "row" }} spacing={1.5} alignItems={{ xs: "stretch", md: "center" }}>
            <TextField
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Tìm kiếm báo cáo..."
              size="small"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon sx={{ color: "text.secondary" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": { borderRadius: 2 },
              }}
            />

            <Stack direction="row" spacing={1.5} sx={{ flex: "0 0 auto" }}>
              <FormControl size="small">
                <Select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value as any)}
                  sx={{ minWidth: 140, borderRadius: 2 }}
                >
                  <MenuItem value="all">Tất cả loại</MenuItem>
                  <MenuItem value="Người dùng">Người dùng</MenuItem>
                  <MenuItem value="Tài chính">Tài chính</MenuItem>
                  <MenuItem value="AI">AI</MenuItem>
                  <MenuItem value="Phỏng vấn">Phỏng vấn</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small">
                <Select
                  value={range}
                  onChange={(e) => setRange(e.target.value as any)}
                  sx={{ minWidth: 120, borderRadius: 2 }}
                >
                  <MenuItem value="7d">7 ngày qua</MenuItem>
                  <MenuItem value="30d">30 ngày qua</MenuItem>
                  <MenuItem value="90d">90 ngày qua</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Stack>
        </Box>

        <Divider />

        {/* Table */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ "& th": { fontWeight: 900, color: "text.secondary", fontSize: 12 } }}>
                <TableCell>TÊN BÁO CÁO</TableCell>
                <TableCell>LOẠI</TableCell>
                <TableCell>NGÀY TẠO</TableCell>
                <TableCell>TRẠNG THÁI</TableCell>
                <TableCell align="right">LƯỢT TẢI</TableCell>
                <TableCell align="right">DUNG LƯỢNG</TableCell>
                <TableCell align="right">THAO TÁC</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filtered.map((r) => (
                <TableRow key={r.id} hover sx={{ "& td": { borderColor: "rgba(0,0,0,0.06)" } }}>
                  <TableCell>
                    <Stack direction="row" spacing={1.2} alignItems="center">
                      <Box
                        sx={{
                          width: 34,
                          height: 34,
                          borderRadius: 2,
                          bgcolor: "rgba(16, 185, 129, 0.14)",
                          border: "1px solid rgba(16,185,129,0.22)",
                          display: "grid",
                          placeItems: "center",
                          color: "#047857",
                          flex: "0 0 auto",
                        }}
                      >
                        <FilePresentRoundedIcon fontSize="small" />
                      </Box>
                      <Typography sx={{ fontWeight: 800 }}>{r.name}</Typography>
                    </Stack>
                  </TableCell>

                  <TableCell>
                    <TypeChip type={r.type} />
                  </TableCell>

                  <TableCell sx={{ color: "text.secondary", fontWeight: 700 }}>
                    {r.createdAt}
                  </TableCell>

                  <TableCell>
                    <StatusChip status={r.status} />
                  </TableCell>

                  <TableCell align="right" sx={{ fontWeight: 800, color: "text.secondary" }}>
                    {r.downloads}
                  </TableCell>

                  <TableCell align="right" sx={{ fontWeight: 800, color: "text.secondary" }}>
                    {r.size}
                  </TableCell>

                  <TableCell align="right">
                    <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                      <Tooltip title="Tải xuống">
                        <IconButton onClick={() => onDownload(r.id)} size="small" sx={{ color: "#2563eb" }}>
                          <DownloadRoundedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Xem">
                        <IconButton onClick={() => onView(r.id)} size="small" sx={{ color: "#16a34a" }}>
                          <VisibilityOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Chia sẻ">
                        <IconButton onClick={() => onShare(r.id)} size="small" sx={{ color: "#64748b" }}>
                          <ShareOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Xóa">
                        <IconButton onClick={() => onDelete(r.id)} size="small" sx={{ color: "#ef4444" }}>
                          <DeleteOutlineRoundedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Footer / Pagination */}
        <Box sx={{ p: 2, pt: 1.5 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography sx={{ color: "text.secondary", fontSize: 13 }}>
              Hiển thị 1-{filtered.length} trong tổng số {rows.length} báo cáo
            </Typography>

            <Stack direction="row" spacing={1} alignItems="center">
              <Button variant="outlined" size="small" sx={{ borderRadius: 2, fontWeight: 900 }}>
                Trước
              </Button>
              <Chip
                label="1"
                size="small"
                sx={{
                  height: 28,
                  px: 0.5,
                  fontWeight: 900,
                  bgcolor: "rgba(16, 185, 129, 0.14)",
                  border: "1px solid rgba(16,185,129,0.22)",
                  color: "#047857",
                }}
              />
              <Button variant="outlined" size="small" sx={{ borderRadius: 2, fontWeight: 900 }}>
                Sau
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}
