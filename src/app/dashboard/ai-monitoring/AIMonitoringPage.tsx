"use client";

import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

type TimeRange = "24h" | "7d" | "30d";

type AlertType = "error" | "warning" | "info";

type ModelPerf = {
  id: string;
  name: string;
  requests: number;
  avgTimeSec: number;
  accuracyPct: number;
  costUsd: number;
  status: "Hoạt động" | "Tạm dừng";
};

type ActivityRow = {
  id: string;
  type: "Phỏng vấn" | "Chấm điểm" | "Gợi ý" | "Tổng hợp";
  user: string;
  prompt: string;
  status: "Thành công" | "Đang chờ" | "Thất bại";
  latencySec: number;
  accuracyPct: number;
  timeAgo: string;
};

function pctChip(deltaPct: number) {
  const positive = deltaPct >= 0;
  const label = `${positive ? "+" : ""}${deltaPct.toFixed(1)}%`;
  return (
    <Chip
      label={label}
      size="small"
      sx={{
        height: 24,
        fontWeight: 600,
        bgcolor: positive ? "rgba(46, 204, 113, 0.18)" : "rgba(231, 76, 60, 0.18)",
        color: positive ? "#1f7a3a" : "#9b2c2c",
        border: "1px solid",
        borderColor: positive ? "rgba(46, 204, 113, 0.25)" : "rgba(231, 76, 60, 0.25)",
      }}
    />
  );
}

function iconBox(bg: string, text: string) {
  return (
    <Box
      sx={{
        width: 44,
        height: 44,
        borderRadius: 2,
        bgcolor: bg,
        color: "#fff",
        display: "grid",
        placeItems: "center",
        fontWeight: 800,
        userSelect: "none",
      }}
    >
      {text}
    </Box>
  );
}

function statusChip(label: string) {
  const map: Record<string, { bg: string; color: string; bd: string }> = {
    "Thành công": { bg: "rgba(46, 204, 113, 0.18)", color: "#1f7a3a", bd: "rgba(46, 204, 113, 0.25)" },
    "Đang chờ": { bg: "rgba(241, 196, 15, 0.18)", color: "#8a6d00", bd: "rgba(241, 196, 15, 0.25)" },
    "Thất bại": { bg: "rgba(231, 76, 60, 0.18)", color: "#9b2c2c", bd: "rgba(231, 76, 60, 0.25)" },
  };
  const s = map[label] ?? { bg: "rgba(52, 152, 219, 0.12)", color: "#1f4f7a", bd: "rgba(52, 152, 219, 0.20)" };

  return (
    <Chip
      label={label}
      size="small"
      sx={{
        height: 24,
        fontWeight: 600,
        bgcolor: s.bg,
        color: s.color,
        border: "1px solid",
        borderColor: s.bd,
      }}
    />
  );
}

function typeChip(label: ActivityRow["type"]) {
  const map: Record<ActivityRow["type"], { bg: string; color: string; bd: string }> = {
    "Phỏng vấn": { bg: "rgba(155, 89, 182, 0.18)", color: "#6b2d86", bd: "rgba(155, 89, 182, 0.25)" },
    "Chấm điểm": { bg: "rgba(52, 152, 219, 0.18)", color: "#1f4f7a", bd: "rgba(52, 152, 219, 0.25)" },
    "Gợi ý": { bg: "rgba(46, 204, 113, 0.18)", color: "#1f7a3a", bd: "rgba(46, 204, 113, 0.25)" },
    "Tổng hợp": { bg: "rgba(241, 196, 15, 0.18)", color: "#8a6d00", bd: "rgba(241, 196, 15, 0.25)" },
  };
  const s = map[label];

  // Không gắn onClick vào Chip để tránh lỗi "onClick is not a function"
  return (
    <Chip
      label={label}
      size="small"
      sx={{
        height: 24,
        fontWeight: 700,
        bgcolor: s.bg,
        color: s.color,
        border: "1px solid",
        borderColor: s.bd,
      }}
    />
  );
}

function alertBox(type: AlertType, title: string, desc: string, time: string) {
  const theme = {
    error: {
      bg: "rgba(231, 76, 60, 0.10)",
      bd: "rgba(231, 76, 60, 0.25)",
      iconBg: "rgba(231, 76, 60, 0.18)",
      icon: "!",
      title: "#b42318",
      text: "#7a271a",
    },
    warning: {
      bg: "rgba(241, 196, 15, 0.10)",
      bd: "rgba(241, 196, 15, 0.25)",
      iconBg: "rgba(241, 196, 15, 0.18)",
      icon: "△",
      title: "#b54708",
      text: "#7a2e0e",
    },
    info: {
      bg: "rgba(52, 152, 219, 0.10)",
      bd: "rgba(52, 152, 219, 0.25)",
      iconBg: "rgba(52, 152, 219, 0.18)",
      icon: "i",
      title: "#175cd3",
      text: "#1849a9",
    },
  }[type];

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        border: "1px solid",
        borderColor: theme.bd,
        bgcolor: theme.bg,
      }}
    >
      <Stack direction="row" spacing={1.5} alignItems="flex-start">
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: 1.5,
            bgcolor: theme.iconBg,
            display: "grid",
            placeItems: "center",
            color: theme.title,
            fontWeight: 900,
            flex: "0 0 auto",
            mt: 0.2,
          }}
        >
          {theme.icon}
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{ fontWeight: 800, color: theme.title }}>{title}</Typography>
          <Typography sx={{ mt: 0.5, color: theme.text, fontSize: 13 }}>{desc}</Typography>
          <Typography sx={{ mt: 0.8, color: theme.text, fontSize: 12, opacity: 0.85 }}>{time}</Typography>
        </Box>
      </Stack>
    </Box>
  );
}

export default function AIMonitoringPage() {
  const [range, setRange] = useState<TimeRange>("24h");

  const stats = useMemo(
    () => ({
      totalRequests: { value: 12456, delta: 12.5 },
      avgTime: { value: 1.2, delta: -8.3 },
      accuracy: { value: 94.8, delta: 2.1 },
      cost: { value: 234.5, delta: 15.2 },
    }),
    []
  );

  const models: ModelPerf[] = useMemo(
    () => [
      { id: "m1", name: "GPT-4", requests: 8234, avgTimeSec: 1.1, accuracyPct: 96.2, costUsd: 156.4, status: "Hoạt động" },
      { id: "m2", name: "GPT-3.5 Turbo", requests: 3456, avgTimeSec: 0.8, accuracyPct: 92.8, costUsd: 45.2, status: "Hoạt động" },
      { id: "m3", name: "Claude 3", requests: 766, avgTimeSec: 1.3, accuracyPct: 94.5, costUsd: 32.9, status: "Hoạt động" },
    ],
    []
  );

  const alerts = useMemo(
    () => [
      { type: "error" as const, title: "Lỗi API Timeout", desc: "Model GPT-4 phản hồi chậm hơn 3s", time: "5 phút trước" },
      { type: "warning" as const, title: "Cảnh báo chi phí", desc: "Chi phí API vượt ngưỡng 80%", time: "15 phút trước" },
      { type: "info" as const, title: "Thông báo", desc: "Độ chính xác tăng 2.1% so với tuần trước", time: "1 giờ trước" },
    ],
    []
  );

  const activity: ActivityRow[] = useMemo(
    () => [
      { id: "a1", type: "Phỏng vấn", user: "Nguyễn Văn A", prompt: "Giải thích về React Hooks", status: "Thành công", latencySec: 1.1, accuracyPct: 96, timeAgo: "2 phút trước" },
      { id: "a2", type: "Chấm điểm", user: "Trần Thị B", prompt: "Đánh giá câu trả lời về SQL JOIN", status: "Thành công", latencySec: 0.9, accuracyPct: 92, timeAgo: "10 phút trước" },
      { id: "a3", type: "Gợi ý", user: "Lê Văn C", prompt: "Gợi ý câu hỏi phỏng vấn Backend", status: "Đang chờ", latencySec: 1.6, accuracyPct: 0, timeAgo: "25 phút trước" },
      { id: "a4", type: "Tổng hợp", user: "Phạm Thị D", prompt: "Tóm tắt feedback ứng viên", status: "Thất bại", latencySec: 2.4, accuracyPct: 0, timeAgo: "1 giờ trước" },
    ],
    []
  );

  const handleRangeChange = (e: SelectChangeEvent) => {
    setRange(e.target.value as TimeRange);
  };

  const handleRefresh = () => {
    console.log("refresh", range);
  };

  return (
    // ✅ FULL WIDTH: ép page không bị bó maxWidth
    <Box
      sx={{
        width: "100%",
        maxWidth: "none",
        mx: 0,
        px: { xs: 2, md: 3 },
        py: 3,
        // ✅ nhìn “đầy màn hình” hơn, không bị trắng quá nhiều
        minHeight: "calc(100vh - 120px)",
      }}
    >
      {/* Header */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems={{ xs: "flex-start", md: "center" }} justifyContent="space-between">
        <Box>
          <Typography sx={{ fontSize: 28, fontWeight: 900, letterSpacing: -0.3 }}>Giám sát AI</Typography>
          <Typography sx={{ mt: 0.6, color: "text.secondary" }}>Theo dõi hiệu suất và hoạt động của AI</Typography>
        </Box>

        <Stack direction="row" spacing={1.5} alignItems="center">
          <FormControl size="small">
            <Select value={range} onChange={handleRangeChange} sx={{ minWidth: 160, borderRadius: 2 }}>
              <MenuItem value="24h">24 giờ qua</MenuItem>
              <MenuItem value="7d">7 ngày qua</MenuItem>
              <MenuItem value="30d">30 ngày qua</MenuItem>
            </Select>
          </FormControl>

          <Button onClick={handleRefresh} variant="contained" sx={{ borderRadius: 2, fontWeight: 800, px: 2.2 }}>
            Làm mới
          </Button>
        </Stack>
      </Stack>

      {/* Stats */}
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ p: 2, borderRadius: 3, border: "1px solid rgba(0,0,0,0.06)", height: "100%" }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              {iconBox("#8e44ad", "AI")}
              {pctChip(stats.totalRequests.delta)}
            </Stack>
            <Typography sx={{ mt: 1.6, color: "text.secondary", fontWeight: 700, fontSize: 13 }}>Tổng yêu cầu AI</Typography>
            <Typography sx={{ mt: 0.4, fontSize: 28, fontWeight: 900 }}>{stats.totalRequests.value.toLocaleString("vi-VN")}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ p: 2, borderRadius: 3, border: "1px solid rgba(0,0,0,0.06)", height: "100%" }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              {iconBox("#2e6bdc", "⏱")}
              {pctChip(stats.avgTime.delta)}
            </Stack>
            <Typography sx={{ mt: 1.6, color: "text.secondary", fontWeight: 700, fontSize: 13 }}>Thời gian phản hồi TB</Typography>
            <Typography sx={{ mt: 0.4, fontSize: 28, fontWeight: 900 }}>{stats.avgTime.value}s</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ p: 2, borderRadius: 3, border: "1px solid rgba(0,0,0,0.06)", height: "100%" }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              {iconBox("#0f9d58", "✓")}
              {pctChip(stats.accuracy.delta)}
            </Stack>
            <Typography sx={{ mt: 1.6, color: "text.secondary", fontWeight: 700, fontSize: 13 }}>Độ chính xác</Typography>
            <Typography sx={{ mt: 0.4, fontSize: 28, fontWeight: 900 }}>{stats.accuracy.value}%</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ p: 2, borderRadius: 3, border: "1px solid rgba(0,0,0,0.06)", height: "100%" }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              {iconBox("#f2994a", "$")}
              {pctChip(stats.cost.delta)}
            </Stack>
            <Typography sx={{ mt: 1.6, color: "text.secondary", fontWeight: 700, fontSize: 13 }}>Chi phí API</Typography>
            <Typography sx={{ mt: 0.4, fontSize: 28, fontWeight: 900 }}>${stats.cost.value.toFixed(2)}</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Middle blocks */}
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} lg={7}>
          <Paper sx={{ p: 2, borderRadius: 3, border: "1px solid rgba(0,0,0,0.06)", height: "100%" }}>
            <Typography sx={{ fontWeight: 900, mb: 1.2 }}>Hiệu suất theo Model</Typography>

            <Stack spacing={1.3}>
              {models.map((m) => (
                <Paper
                  key={m.id}
                  variant="outlined"
                  sx={{
                    p: 1.6,
                    borderRadius: 3,
                    borderColor: "rgba(0,0,0,0.08)",
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: 2,
                        bgcolor: "rgba(142, 68, 173, 0.12)",
                        border: "1px solid rgba(142, 68, 173, 0.25)",
                        display: "grid",
                        placeItems: "center",
                        color: "#6b2d86",
                        fontWeight: 900,
                        flex: "0 0 auto",
                      }}
                    >
                      ⬡
                    </Box>

                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Box>
                          <Typography sx={{ fontWeight: 900 }}>{m.name}</Typography>
                          <Typography sx={{ color: "text.secondary", fontSize: 12 }}>{m.requests.toLocaleString("vi-VN")} yêu cầu</Typography>
                        </Box>
                        <Chip
                          label={m.status}
                          size="small"
                          sx={{
                            height: 24,
                            fontWeight: 800,
                            bgcolor: "rgba(46, 204, 113, 0.18)",
                            color: "#1f7a3a",
                            border: "1px solid rgba(46, 204, 113, 0.25)",
                          }}
                        />
                      </Stack>

                      <Grid container spacing={1.2} sx={{ mt: 0.8 }}>
                        <Grid item xs={12} sm={4}>
                          <Typography sx={{ color: "text.secondary", fontSize: 12, fontWeight: 700 }}>Thời gian TB</Typography>
                          <Typography sx={{ fontWeight: 900 }}>{m.avgTimeSec.toFixed(1)}s</Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Typography sx={{ color: "text.secondary", fontSize: 12, fontWeight: 700 }}>Độ chính xác</Typography>
                          <Typography sx={{ fontWeight: 900 }}>{m.accuracyPct.toFixed(1)}%</Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Typography sx={{ color: "text.secondary", fontSize: 12, fontWeight: 700 }}>Chi phí</Typography>
                          <Typography sx={{ fontWeight: 900 }}>${m.costUsd.toFixed(2)}</Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  </Stack>
                </Paper>
              ))}
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={5}>
          <Paper sx={{ p: 2, borderRadius: 3, border: "1px solid rgba(0,0,0,0.06)", height: "100%" }}>
            <Typography sx={{ fontWeight: 900, mb: 1.2 }}>Cảnh báo & Lỗi</Typography>
            <Stack spacing={1.3}>
              {alerts.map((a, idx) => (
                <Box key={idx}>{alertBox(a.type, a.title, a.desc, a.time)}</Box>
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      {/* Recent activity */}
      <Paper sx={{ mt: 2, p: 2, borderRadius: 3, border: "1px solid rgba(0,0,0,0.06)" }}>
        <Typography sx={{ fontWeight: 900, mb: 1.2 }}>Hoạt động AI gần đây</Typography>

        <TableContainer sx={{ width: "100%" }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ "& th": { fontWeight: 900, color: "text.secondary" } }}>
                <TableCell>LOẠI</TableCell>
                <TableCell>NGƯỜI DÙNG</TableCell>
                <TableCell>CÂU HỎI</TableCell>
                <TableCell>TRẠNG THÁI</TableCell>
                <TableCell align="right">THỜI GIAN</TableCell>
                <TableCell align="right">ĐỘ CHÍNH XÁC</TableCell>
                <TableCell align="right">THỜI ĐIỂM</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {activity.map((r) => (
                <TableRow key={r.id} hover sx={{ "& td": { borderColor: "rgba(0,0,0,0.06)" } }}>
                  <TableCell>{typeChip(r.type)}</TableCell>
                  <TableCell sx={{ fontWeight: 800 }}>{r.user}</TableCell>
                  <TableCell sx={{ width: "100%" }}>
                    <Typography sx={{ fontWeight: 700 }} noWrap title={r.prompt}>
                      {r.prompt}
                    </Typography>
                  </TableCell>
                  <TableCell>{statusChip(r.status)}</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 800 }}>
                    {r.latencySec.toFixed(1)}s
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 800 }}>
                    {r.accuracyPct > 0 ? `${r.accuracyPct}%` : "—"}
                  </TableCell>
                  <TableCell align="right" sx={{ color: "text.secondary", fontWeight: 700 }}>
                    {r.timeAgo}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Divider sx={{ mt: 2 }} />

        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 1.5 }}>
          <Typography sx={{ color: "text.secondary", fontSize: 13 }}>
            Hiển thị 1-{activity.length} trong tổng số {activity.length} hoạt động
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button variant="outlined" size="small" sx={{ borderRadius: 2, fontWeight: 800 }}>
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
                border: "1px solid rgba(16, 185, 129, 0.22)",
                color: "#0f766e",
              }}
            />
            <Button variant="outlined" size="small" sx={{ borderRadius: 2, fontWeight: 800 }}>
              Sau
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
}
