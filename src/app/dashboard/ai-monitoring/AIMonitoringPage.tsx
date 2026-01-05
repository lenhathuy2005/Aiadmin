"use client";

import React, { useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import SmartToyRoundedIcon from "@mui/icons-material/SmartToyRounded";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";

import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

type ModelKey = "gpt4" | "gpt35" | "claude3";
type ActivityType = "Phỏng vấn" | "CV" | "Hỏi đáp" | "Luyện tập";
type ActivityStatus = "Thành công" | "Cảnh báo" | "Thất bại";

function Pill(props: { text: string; bg: string; fg: string }) {
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        px: 1.2,
        py: 0.35,
        borderRadius: 999,
        bgcolor: props.bg,
        color: props.fg,
        fontWeight: 900,
        fontSize: 12,
        whiteSpace: "nowrap",
      }}
    >
      {props.text}
    </Box>
  );
}

function StatCard(props: {
  iconBg: string;
  iconColor: string;
  icon: React.ReactNode;
  title: string;
  value: string;
  deltaText: string;
  deltaBg: string;
  deltaColor: string;
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
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ gap: 2 }}>
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: 2.5,
            bgcolor: props.iconBg,
            display: "grid",
            placeItems: "center",
            flexShrink: 0,
          }}
        >
          <Box sx={{ color: props.iconColor }}>{props.icon}</Box>
        </Box>

        <Pill text={props.deltaText} bg={props.deltaBg} fg={props.deltaColor} />
      </Stack>

      <Typography sx={{ mt: 1.2, color: "text.secondary", fontWeight: 900, fontSize: 13 }}>
        {props.title}
      </Typography>

      <Typography sx={{ mt: 0.6, fontWeight: 900, fontSize: 26, letterSpacing: -0.2 }}>
        {props.value}
      </Typography>
    </Paper>
  );
}

export default function AIMonitoringPage() {
  const [range, setRange] = useState<"24h" | "7d" | "30d">("24h");

  // ===== Mock data giống layout bạn gửi =====
  const stats = useMemo(
    () => ({
      totalRequests: "12,456",
      avgLatency: "1.2s",
      accuracy: "94.8%",
      apiCost: "$234.50",
    }),
    []
  );

  const models = useMemo(
    () => [
      { key: "gpt4" as ModelKey, name: "GPT-4", req: "8,234 yêu cầu", latency: "1.1s", acc: "96.2%", cost: "$156.40" },
      { key: "gpt35" as ModelKey, name: "GPT-3.5 Turbo", req: "3,456 yêu cầu", latency: "0.8s", acc: "92.8%", cost: "$45.20" },
      { key: "claude3" as ModelKey, name: "Claude 3", req: "766 yêu cầu", latency: "1.3s", acc: "94.5%", cost: "$32.90" },
    ],
    []
  );

  const alerts = useMemo(
    () => [
      {
        type: "error" as const,
        title: "Lỗi API Timeout",
        desc: "Model GPT-4 phản hồi chậm hơn 3s",
        time: "5 phút trước",
      },
      {
        type: "warning" as const,
        title: "Cảnh báo chi phí",
        desc: "Chi phí API vượt ngưỡng 80%",
        time: "15 phút trước",
      },
      {
        type: "info" as const,
        title: "Thông báo",
        desc: "Độ chính xác tăng 2.1% so với tuần trước",
        time: "1 giờ trước",
      },
    ],
    []
  );

  const activities = useMemo(
    () => [
      { id: "a1", type: "Phỏng vấn" as ActivityType, user: "Nguyễn Văn A", question: "Giải thích về React Hooks", status: "Thành công" as ActivityStatus, latency: "1.1s", acc: "96%", time: "2 phút trước" },
      { id: "a2", type: "Hỏi đáp" as ActivityType, user: "Trần Thị B", question: "Tối ưu hóa CV cho Data Analyst", status: "Cảnh báo" as ActivityStatus, latency: "2.4s", acc: "90%", time: "12 phút trước" },
      { id: "a3", type: "CV" as ActivityType, user: "Lê Văn C", question: "Chấm điểm CV vị trí Backend", status: "Thành công" as ActivityStatus, latency: "0.9s", acc: "95%", time: "32 phút trước" },
      { id: "a4", type: "Luyện tập" as ActivityType, user: "Phạm Thị D", question: "Mock interview tiếng Anh", status: "Thất bại" as ActivityStatus, latency: "—", acc: "—", time: "1 giờ trước" },
    ],
    []
  );

  const statusPill = (s: ActivityStatus) => {
    if (s === "Thành công") return { bg: "rgba(16,185,129,0.14)", fg: "#047857" };
    if (s === "Cảnh báo") return { bg: "rgba(245,158,11,0.18)", fg: "#b45309" };
    return { bg: "rgba(239,68,68,0.16)", fg: "#b91c1c" };
  };

  const typePill = (t: ActivityType) => {
    if (t === "Phỏng vấn") return { bg: "rgba(168,85,247,0.14)", fg: "#7c3aed" };
    if (t === "CV") return { bg: "rgba(59,130,246,0.12)", fg: "#2563eb" };
    if (t === "Hỏi đáp") return { bg: "rgba(16,185,129,0.14)", fg: "#047857" };
    return { bg: "rgba(99,102,241,0.14)", fg: "#4f46e5" };
  };

  const onRefresh = () => {
    // demo refresh
    // nếu nối API thật thì gọi fetch ở đây
    console.log("refresh", range);
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "none",          // ✅ quan trọng: không bó chiều ngang
        px: { xs: 2, md: 3 },      // padding đẹp và đều
        py: 3,
      }}
    >
      {/* ===== Header ===== */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", md: "center" }}
        sx={{ gap: 2, mb: 2 }}
      >
        <Box>
          <Typography sx={{ fontSize: 28, fontWeight: 900, letterSpacing: -0.3 }}>
            Giám sát AI
          </Typography>
          <Typography sx={{ mt: 0.6, color: "text.secondary" }}>
            Theo dõi hiệu suất và hoạt động của AI
          </Typography>
        </Box>

        <Stack direction="row" spacing={1.2} justifyContent="flex-end" alignItems="center">
          <FormControl size="small">
            <Select
              value={range}
              onChange={(e) => setRange(e.target.value as any)}
              sx={{ borderRadius: 3, minWidth: 140 }}
            >
              <MenuItem value="24h">24 giờ qua</MenuItem>
              <MenuItem value="7d">7 ngày qua</MenuItem>
              <MenuItem value="30d">30 ngày qua</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            onClick={onRefresh}
            startIcon={<RefreshRoundedIcon />}
            sx={{
              borderRadius: 3,
              fontWeight: 900,
              px: 2,
              bgcolor: "#4f46e5",
              "&:hover": { bgcolor: "#4338ca" },
            }}
          >
            Làm mới
          </Button>
        </Stack>
      </Stack>

      {/* ===== Stats (full width, trải đều) ===== */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            iconBg="rgba(168,85,247,0.14)"
            iconColor="#7c3aed"
            icon={<SmartToyRoundedIcon />}
            title="Tổng yêu cầu AI"
            value={stats.totalRequests}
            deltaText="+12.5%"
            deltaBg="rgba(16,185,129,0.14)"
            deltaColor="#047857"
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            iconBg="rgba(59,130,246,0.12)"
            iconColor="#2563eb"
            icon={<ScheduleRoundedIcon />}
            title="Thời gian phản hồi TB"
            value={stats.avgLatency}
            deltaText="-8.3%"
            deltaBg="rgba(239,68,68,0.14)"
            deltaColor="#b91c1c"
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            iconBg="rgba(16,185,129,0.14)"
            iconColor="#047857"
            icon={<VerifiedRoundedIcon />}
            title="Độ chính xác"
            value={stats.accuracy}
            deltaText="+2.1%"
            deltaBg="rgba(16,185,129,0.14)"
            deltaColor="#047857"
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            iconBg="rgba(249,115,22,0.14)"
            iconColor="#ea580c"
            icon={<PaidRoundedIcon />}
            title="Chi phí API"
            value={stats.apiCost}
            deltaText="+15.2%"
            deltaBg="rgba(16,185,129,0.14)"
            deltaColor="#047857"
          />
        </Grid>
      </Grid>

      {/* ===== Middle blocks (2 cột đều) ===== */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} lg={6}>
          <Paper sx={{ p: 2, borderRadius: 3, border: "1px solid rgba(0,0,0,0.06)", height: "100%" }}>
            <Typography sx={{ fontWeight: 900, mb: 1.2 }}>Hiệu suất theo Model</Typography>

            <Stack spacing={1.2}>
              {models.map((m) => (
                <Paper
                  key={m.key}
                  variant="outlined"
                  sx={{ p: 1.6, borderRadius: 3, borderColor: "rgba(0,0,0,0.08)" }}
                >
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ gap: 2 }}>
                    <Stack direction="row" spacing={1.2} alignItems="center">
                      <Box
                        sx={{
                          width: 44,
                          height: 44,
                          borderRadius: 3,
                          bgcolor: "rgba(168,85,247,0.12)",
                          border: "1px solid rgba(168,85,247,0.18)",
                          display: "grid",
                          placeItems: "center",
                        }}
                      >
                        <Box sx={{ width: 10, height: 10, borderRadius: 999, bgcolor: "#7c3aed" }} />
                      </Box>

                      <Box>
                        <Typography sx={{ fontWeight: 900, lineHeight: 1.2 }}>{m.name}</Typography>
                        <Typography sx={{ color: "text.secondary", fontWeight: 800, fontSize: 12, mt: 0.3 }}>
                          {m.req}
                        </Typography>
                      </Box>
                    </Stack>

                    <Pill text="Hoạt động" bg="rgba(16,185,129,0.14)" fg="#047857" />
                  </Stack>

                  <Grid container spacing={1.2} sx={{ mt: 1 }}>
                    <Grid item xs={4}>
                      <Typography sx={{ color: "text.secondary", fontWeight: 900, fontSize: 12 }}>Thời gian TB</Typography>
                      <Typography sx={{ fontWeight: 900 }}>{m.latency}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography sx={{ color: "text.secondary", fontWeight: 900, fontSize: 12 }}>Độ chính xác</Typography>
                      <Typography sx={{ fontWeight: 900 }}>{m.acc}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography sx={{ color: "text.secondary", fontWeight: 900, fontSize: 12 }}>Chi phí</Typography>
                      <Typography sx={{ fontWeight: 900 }}>{m.cost}</Typography>
                    </Grid>
                  </Grid>
                </Paper>
              ))}
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Paper sx={{ p: 2, borderRadius: 3, border: "1px solid rgba(0,0,0,0.06)", height: "100%" }}>
            <Typography sx={{ fontWeight: 900, mb: 1.2 }}>Cảnh báo & Lỗi</Typography>

            <Stack spacing={1.2}>
              {alerts.map((a, idx) => {
                const boxStyle =
                  a.type === "error"
                    ? { bg: "rgba(239,68,68,0.10)", border: "rgba(239,68,68,0.25)" }
                    : a.type === "warning"
                      ? { bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.25)" }
                      : { bg: "rgba(59,130,246,0.10)", border: "rgba(59,130,246,0.22)" };

                const icon =
                  a.type === "error" ? (
                    <ErrorOutlineRoundedIcon sx={{ color: "#b91c1c" }} />
                  ) : a.type === "warning" ? (
                    <WarningAmberRoundedIcon sx={{ color: "#b45309" }} />
                  ) : (
                    <InfoOutlinedIcon sx={{ color: "#2563eb" }} />
                  );

                const titleColor =
                  a.type === "error" ? "#b91c1c" : a.type === "warning" ? "#b45309" : "#2563eb";

                return (
                  <Box
                    key={idx}
                    sx={{
                      p: 1.6,
                      borderRadius: 3,
                      bgcolor: boxStyle.bg,
                      border: `1px solid ${boxStyle.border}`,
                    }}
                  >
                    <Stack direction="row" spacing={1.2} alignItems="flex-start">
                      <Box sx={{ mt: 0.2 }}>{icon}</Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontWeight: 900, color: titleColor }}>{a.title}</Typography>
                        <Typography sx={{ mt: 0.3, color: "text.secondary", fontWeight: 800, fontSize: 13 }}>
                          {a.desc}
                        </Typography>
                        <Typography sx={{ mt: 0.6, color: "text.secondary", fontWeight: 800, fontSize: 12 }}>
                          {a.time}
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
                );
              })}
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      {/* ===== Recent activity (full width) ===== */}
      <Paper sx={{ borderRadius: 3, border: "1px solid rgba(0,0,0,0.06)", overflow: "hidden" }}>
        <Box sx={{ p: 2 }}>
          <Typography sx={{ fontWeight: 900 }}>Hoạt động AI gần đây</Typography>
        </Box>

        <Divider />

        <Box sx={{ p: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 900, color: "text.secondary", fontSize: 12 }}>LOẠI</TableCell>
                <TableCell sx={{ fontWeight: 900, color: "text.secondary", fontSize: 12 }}>NGƯỜI DÙNG</TableCell>
                <TableCell sx={{ fontWeight: 900, color: "text.secondary", fontSize: 12 }}>CÂU HỎI</TableCell>
                <TableCell sx={{ fontWeight: 900, color: "text.secondary", fontSize: 12 }}>TRẠNG THÁI</TableCell>
                <TableCell sx={{ fontWeight: 900, color: "text.secondary", fontSize: 12 }}>THỜI GIAN</TableCell>
                <TableCell sx={{ fontWeight: 900, color: "text.secondary", fontSize: 12 }}>ĐỘ CHÍNH XÁC</TableCell>
                <TableCell sx={{ fontWeight: 900, color: "text.secondary", fontSize: 12 }}>THỜI ĐIỂM</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {activities.map((r) => {
                const tp = typePill(r.type);
                const sp = statusPill(r.status);
                return (
                  <TableRow key={r.id} hover sx={{ "& td": { borderBottomColor: "rgba(0,0,0,0.06)" } }}>
                    <TableCell>
                      <Pill text={r.type} bg={tp.bg} fg={tp.fg} />
                    </TableCell>
                    <TableCell sx={{ fontWeight: 900 }}>{r.user}</TableCell>
                    <TableCell sx={{ color: "text.secondary", fontWeight: 800 }}>{r.question}</TableCell>
                    <TableCell>
                      <Pill text={r.status} bg={sp.bg} fg={sp.fg} />
                    </TableCell>
                    <TableCell sx={{ fontWeight: 900 }}>{r.latency}</TableCell>
                    <TableCell sx={{ fontWeight: 900 }}>{r.acc}</TableCell>
                    <TableCell sx={{ color: "text.secondary", fontWeight: 800 }}>{r.time}</TableCell>
                  </TableRow>
                );
              })}

              {activities.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7}>
                    <Alert severity="info" sx={{ borderRadius: 2 }}>
                      Chưa có dữ liệu hoạt động.
                    </Alert>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>
      </Paper>
    </Box>
  );
}
