"use client";

import React, { useMemo, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Switch,
  FormControlLabel,
} from "@mui/material";

type FeatureItem = { label: string; enabled: boolean };
type Pkg = {
  id: string;
  codeName: string; // Free / Pro / Premium
  subtitle: string; // Vĩnh viễn / 1 tháng ...
  priceVnd: number; // 0, 299000 ...
  usersCount: number; // 1250 users ...
  headerGradient: string;
  borderColor: string;
  features: FeatureItem[];
};

function formatVnd(n: number) {
  if (!n) return "Miễn phí";
  return new Intl.NumberFormat("vi-VN").format(n);
}

function IconCheck() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M9 16.2l-3.5-3.5-1.4 1.4L9 19 20.3 7.7 18.9 6.3z"
      />
    </svg>
  );
}

function IconX() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M18.3 5.71L12 12l6.3 6.29-1.41 1.42L10.59 13.4 4.29 19.71 2.88 18.29 9.17 12 2.88 5.71 4.29 4.29l6.3 6.31 6.29-6.31z"
      />
    </svg>
  );
}

function IconPencil() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm2.92 2.83H5v-.92l9.06-9.06.92.92L5.92 20.08zM20.71 7.04a1.003 1.003 0 000-1.42l-2.34-2.34a1.003 1.003 0 00-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z"
      />
    </svg>
  );
}

function IconTrash() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6 19a2 2 0 002 2h8a2 2 0 002-2V7H6v12zm3.5-9h1v9h-1v-9zm4 0h1v9h-1v-9zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"
      />
    </svg>
  );
}

const DEFAULT_PACKAGES: Pkg[] = [
  {
    id: "free",
    codeName: "Free",
    subtitle: "Vĩnh viễn",
    priceVnd: 0,
    usersCount: 1250,
    headerGradient: "linear-gradient(90deg, #9CA3AF 0%, #6B7280 100%)",
    borderColor: "rgba(107,114,128,0.35)",
    features: [
      { label: "5 phỏng vấn", enabled: true },
      { label: "Phân tích AI", enabled: false },
      { label: "Xem lại video", enabled: false },
      { label: "Email", enabled: true },
    ],
  },
  {
    id: "pro",
    codeName: "Pro",
    subtitle: "1 tháng",
    priceVnd: 299000,
    usersCount: 450,
    headerGradient: "linear-gradient(90deg, #3B82F6 0%, #2563EB 100%)",
    borderColor: "rgba(37,99,235,0.35)",
    features: [
      { label: "50 phỏng vấn", enabled: true },
      { label: "Phân tích AI", enabled: true },
      { label: "Xem lại video", enabled: false },
      { label: "Email & Chat", enabled: true },
    ],
  },
  {
    id: "premium",
    codeName: "Premium",
    subtitle: "1 tháng",
    priceVnd: 599000,
    usersCount: 180,
    headerGradient: "linear-gradient(90deg, #A855F7 0%, #7C3AED 100%)",
    borderColor: "rgba(124,58,237,0.35)",
    features: [
      { label: "Không giới hạn phỏng vấn", enabled: true },
      { label: "Phân tích AI", enabled: true },
      { label: "Xem lại video", enabled: true },
      { label: "24/7 Priority", enabled: true },
    ],
  },
];

type FormState = {
  id?: string;
  codeName: string;
  subtitle: string;
  priceVnd: number;
  usersCount: number;
  f1: string;
  f1Enabled: boolean;
  f2: string;
  f2Enabled: boolean;
  f3: string;
  f3Enabled: boolean;
  f4: string;
  f4Enabled: boolean;
  theme: "gray" | "blue" | "purple";
};

function pkgToForm(p?: Pkg): FormState {
  if (!p) {
    return {
      codeName: "",
      subtitle: "1 tháng",
      priceVnd: 0,
      usersCount: 0,
      f1: "5 phỏng vấn",
      f1Enabled: true,
      f2: "Phân tích AI",
      f2Enabled: false,
      f3: "Xem lại video",
      f3Enabled: false,
      f4: "Email",
      f4Enabled: true,
      theme: "gray",
    };
  }
  const [f1, f2, f3, f4] = p.features;
  const theme: FormState["theme"] =
    p.id === "pro" ? "blue" : p.id === "premium" ? "purple" : "gray";

  return {
    id: p.id,
    codeName: p.codeName,
    subtitle: p.subtitle,
    priceVnd: p.priceVnd,
    usersCount: p.usersCount,
    f1: f1?.label ?? "",
    f1Enabled: !!f1?.enabled,
    f2: f2?.label ?? "",
    f2Enabled: !!f2?.enabled,
    f3: f3?.label ?? "",
    f3Enabled: !!f3?.enabled,
    f4: f4?.label ?? "",
    f4Enabled: !!f4?.enabled,
    theme,
  };
}

function themeToStyle(theme: FormState["theme"]) {
  if (theme === "blue") {
    return {
      headerGradient: "linear-gradient(90deg, #3B82F6 0%, #2563EB 100%)",
      borderColor: "rgba(37,99,235,0.35)",
    };
  }
  if (theme === "purple") {
    return {
      headerGradient: "linear-gradient(90deg, #A855F7 0%, #7C3AED 100%)",
      borderColor: "rgba(124,58,237,0.35)",
    };
  }
  return {
    headerGradient: "linear-gradient(90deg, #9CA3AF 0%, #6B7280 100%)",
    borderColor: "rgba(107,114,128,0.35)",
  };
}

export default function PackagesManagementPage() {
  const [packages, setPackages] = useState<Pkg[]>(DEFAULT_PACKAGES);

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(() => pkgToForm());

  const editingPkg = useMemo(
    () => packages.find((p) => p.id === editingId) ?? null,
    [packages, editingId]
  );

  const openCreate = () => {
    setEditingId(null);
    setForm(pkgToForm());
    setOpen(true);
  };

  const openEdit = (p: Pkg) => {
    setEditingId(p.id);
    setForm(pkgToForm(p));
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const removePkg = (id: string) => {
    setPackages((prev) => prev.filter((p) => p.id !== id));
  };

  const savePkg = () => {
    const { headerGradient, borderColor } = themeToStyle(form.theme);

    const nextPkg: Pkg = {
      id: form.id ?? `pkg_${Date.now()}`,
      codeName: form.codeName.trim() || "Gói mới",
      subtitle: form.subtitle,
      priceVnd: Number.isFinite(form.priceVnd) ? Number(form.priceVnd) : 0,
      usersCount: Number.isFinite(form.usersCount) ? Number(form.usersCount) : 0,
      headerGradient,
      borderColor,
      features: [
        { label: form.f1.trim(), enabled: form.f1Enabled },
        { label: form.f2.trim(), enabled: form.f2Enabled },
        { label: form.f3.trim(), enabled: form.f3Enabled },
        { label: form.f4.trim(), enabled: form.f4Enabled },
      ].filter((x) => x.label.length > 0),
    };

    setPackages((prev) => {
      const exists = prev.some((p) => p.id === nextPkg.id);
      if (exists) return prev.map((p) => (p.id === nextPkg.id ? nextPkg : p));
      return [...prev, nextPkg];
    });

    setOpen(false);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 2,
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
            Quản lý Gói dịch vụ
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Quản lý các gói dịch vụ và tính năng
          </Typography>
        </Box>

        <Button
          variant="contained"
          onClick={openCreate}
          sx={{
            borderRadius: 999,
            px: 2,
            py: 1,
            textTransform: "none",
            fontWeight: 700,
          }}
        >
          + Thêm gói mới
        </Button>
      </Box>

      {/* Cards row - full width & equal */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
          gap: 3,
          alignItems: "stretch",
          mb: 3,
          width: "100%",
        }}
      >
        {packages.map((p) => (
          <Card
            key={p.id}
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              border: `1px solid ${p.borderColor}`,
              boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
              display: "flex",
              flexDirection: "column",
              height: "100%",
              minWidth: 0,
            }}
          >
            {/* Header area */}
            <Box
              sx={{
                px: 3,
                py: 2.5,
                color: "white",
                background: p.headerGradient,
                position: "relative",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  right: 16,
                  top: 14,
                }}
              >
                <Chip
                  label={`${p.usersCount} users`}
                  size="small"
                  sx={{
                    bgcolor: "rgba(255,255,255,0.92)",
                    color: "rgba(0,0,0,0.75)",
                    fontWeight: 700,
                  }}
                />
              </Box>

              <Typography sx={{ fontWeight: 800, fontSize: 18 }}>
                {p.codeName}
              </Typography>
              <Typography sx={{ opacity: 0.9, fontSize: 13 }}>
                {p.subtitle}
              </Typography>

              <Box sx={{ mt: 1 }}>
                <Typography
                  sx={{
                    fontWeight: 900,
                    fontSize: 34,
                    lineHeight: 1.1,
                    letterSpacing: -0.5,
                  }}
                >
                  {formatVnd(p.priceVnd)}
                  {p.priceVnd > 0 && (
                    <Typography
                      component="span"
                      sx={{ fontSize: 12, fontWeight: 800, ml: 1, opacity: 0.9 }}
                    >
                      VNĐ
                    </Typography>
                  )}
                </Typography>
              </Box>
            </Box>

            {/* Body */}
            <CardContent sx={{ px: 3, py: 2.5, flex: 1 }}>
              <Stack spacing={1.25} sx={{ mb: 2 }}>
                {p.features.map((f, idx) => (
                  <Box
                    key={`${p.id}_${idx}`}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      color: f.enabled ? "text.primary" : "text.secondary",
                      opacity: f.enabled ? 1 : 0.55,
                    }}
                  >
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        display: "grid",
                        placeItems: "center",
                        color: f.enabled ? "#16a34a" : "#9ca3af",
                      }}
                    >
                      {f.enabled ? <IconCheck /> : <IconX />}
                    </Box>
                    <Typography variant="body2">{f.label}</Typography>
                  </Box>
                ))}
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                }}
              >
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => openEdit(p)}
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 700,
                    py: 1.1,
                  }}
                  startIcon={
                    <Box sx={{ display: "grid", placeItems: "center" }}>
                      <IconPencil />
                    </Box>
                  }
                >
                  Chỉnh sửa
                </Button>

                <IconButton
                  onClick={() => removePkg(p.id)}
                  sx={{
                    borderRadius: 2,
                    border: "1px solid rgba(239,68,68,0.35)",
                    color: "#ef4444",
                    width: 44,
                    height: 44,
                  }}
                >
                  <IconTrash />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Stats */}
      <Card
        sx={{
          borderRadius: 3,
          border: "1px solid rgba(15,23,42,0.08)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Typography sx={{ fontWeight: 800, mb: 2 }}>
            Thống kê gói dịch vụ
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
              gap: 2,
            }}
          >
            <StatCard
              title="Tổng doanh thu"
              value="247,500,000 VNĐ"
              delta="+12.5% so với tháng trước"
            />
            <StatCard
              title="Tổng người dùng"
              value="1,880"
              delta="+8.3% so với tháng trước"
            />
            <StatCard
              title="Tỷ lệ chuyển đổi"
              value="33.5%"
              delta="+5.2% so với tháng trước"
            />
          </Box>
        </CardContent>
      </Card>

      {/* Dialog Add/Edit */}
      <Dialog open={open} onClose={closeDialog} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 900 }}>
          {editingPkg ? "Chỉnh sửa gói" : "Thêm gói mới"}
        </DialogTitle>

        <DialogContent dividers>
          <Stack spacing={2}>
            <TextField
              label="Tên gói"
              value={form.codeName}
              onChange={(e) => setForm((s) => ({ ...s, codeName: e.target.value }))}
              fullWidth
            />

            <TextField
              select
              label="Chu kỳ"
              value={form.subtitle}
              onChange={(e) => setForm((s) => ({ ...s, subtitle: e.target.value }))}
              fullWidth
            >
              <MenuItem value="Vĩnh viễn">Vĩnh viễn</MenuItem>
              <MenuItem value="1 tháng">1 tháng</MenuItem>
              <MenuItem value="3 tháng">3 tháng</MenuItem>
              <MenuItem value="12 tháng">12 tháng</MenuItem>
            </TextField>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
                gap: 2,
              }}
            >
              <TextField
                type="number"
                label="Giá (VNĐ)"
                value={form.priceVnd}
                onChange={(e) =>
                  setForm((s) => ({ ...s, priceVnd: Number(e.target.value) }))
                }
                fullWidth
              />
              <TextField
                type="number"
                label="Số users"
                value={form.usersCount}
                onChange={(e) =>
                  setForm((s) => ({ ...s, usersCount: Number(e.target.value) }))
                }
                fullWidth
              />
            </Box>

            <TextField
              select
              label="Màu chủ đề"
              value={form.theme}
              onChange={(e) =>
                setForm((s) => ({ ...s, theme: e.target.value as FormState["theme"] }))
              }
              fullWidth
            >
              <MenuItem value="gray">Gray (Free)</MenuItem>
              <MenuItem value="blue">Blue (Pro)</MenuItem>
              <MenuItem value="purple">Purple (Premium)</MenuItem>
            </TextField>

            <Divider />

            <Typography sx={{ fontWeight: 800 }}>Tính năng hiển thị</Typography>

            <FeatureRow
              label="Dòng 1"
              text={form.f1}
              enabled={form.f1Enabled}
              onText={(v) => setForm((s) => ({ ...s, f1: v }))}
              onEnabled={(v) => setForm((s) => ({ ...s, f1Enabled: v }))}
            />
            <FeatureRow
              label="Dòng 2"
              text={form.f2}
              enabled={form.f2Enabled}
              onText={(v) => setForm((s) => ({ ...s, f2: v }))}
              onEnabled={(v) => setForm((s) => ({ ...s, f2Enabled: v }))}
            />
            <FeatureRow
              label="Dòng 3"
              text={form.f3}
              enabled={form.f3Enabled}
              onText={(v) => setForm((s) => ({ ...s, f3: v }))}
              onEnabled={(v) => setForm((s) => ({ ...s, f3Enabled: v }))}
            />
            <FeatureRow
              label="Dòng 4"
              text={form.f4}
              enabled={form.f4Enabled}
              onText={(v) => setForm((s) => ({ ...s, f4: v }))}
              onEnabled={(v) => setForm((s) => ({ ...s, f4Enabled: v }))}
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={closeDialog} sx={{ textTransform: "none" }}>
            Huỷ
          </Button>
          <Button
            variant="contained"
            onClick={savePkg}
            sx={{ textTransform: "none", fontWeight: 800, borderRadius: 2 }}
          >
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

function FeatureRow(props: {
  label: string;
  text: string;
  enabled: boolean;
  onText: (v: string) => void;
  onEnabled: (v: boolean) => void;
}) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "1fr auto" },
        gap: 1.5,
        alignItems: "center",
      }}
    >
      <TextField
        label={props.label}
        value={props.text}
        onChange={(e) => props.onText(e.target.value)}
        fullWidth
      />
      <FormControlLabel
        control={
          <Switch
            checked={props.enabled}
            onChange={(e) => props.onEnabled(e.target.checked)}
          />
        }
        label={props.enabled ? "Bật" : "Tắt"}
      />
    </Box>
  );
}

function StatCard(props: { title: string; value: string; delta: string }) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        border: "1px solid rgba(15,23,42,0.08)",
        boxShadow: "none",
      }}
    >
      <CardContent sx={{ p: 2.25 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 700 }}>
            {props.title}
          </Typography>
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: 999,
              bgcolor: "rgba(148,163,184,0.25)",
            }}
          />
        </Box>

        <Typography sx={{ fontWeight: 900, fontSize: 22, mt: 0.5 }}>
          {props.value}
        </Typography>
        <Typography variant="caption" sx={{ color: "success.main", fontWeight: 700 }}>
          {props.delta}
        </Typography>
      </CardContent>
    </Card>
  );
}
