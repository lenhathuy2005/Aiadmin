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
  Snackbar,
  Stack,
  Switch,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";

import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import SmartToyRoundedIcon from "@mui/icons-material/SmartToyRounded";
import BackupRoundedIcon from "@mui/icons-material/BackupRounded";

type TabKey = 0 | 1 | 2 | 3 | 4 | 5;

function TabPanel({
                    value,
                    index,
                    children,
                  }: {
  value: number;
  index: number;
  children: React.ReactNode;
}) {
  if (value !== index) return null;
  return <Box sx={{ pt: 2 }}>{children}</Box>;
}

export default function SystemSettingsPage() {
  const timezones = useMemo(
    () => [
      { value: "GMT+7", label: "GMT+7 (Hồ Chí Minh)" },
      { value: "GMT+0", label: "GMT+0 (London)" },
      { value: "GMT-5", label: "GMT-5 (New York)" },
    ],
    []
  );

  const languages = useMemo(
    () => [
      { value: "vi", label: "Tiếng Việt" },
      { value: "en", label: "English" },
    ],
    []
  );

  const [tab, setTab] = useState<TabKey>(0);

  const initial = useMemo(
    () => ({
      general: {
        systemName: "AIQuestTalk Platform",
        description: "Nền tảng luyện phỏng vấn với AI hàng đầu Việt Nam",
        timezone: "GMT+7",
        language: "vi",
        maintenance: false,
      },
      security: {
        require2FA: false,
        sessionTimeoutMin: 60,
        maxLoginAttempts: 10,
        passwordMinLength: 8,
        passwordRequireSpecial: true,
      },
      email: {
        provider: "smtp",
        smtpHost: "smtp.gmail.com",
        smtpPort: 587,
        smtpUser: "",
        smtpPass: "",
        fromName: "AIQuestTalk",
        fromEmail: "no-reply@aiquesttalk.com",
      },
      payment: {
        currency: "VND",
        momoEnabled: true,
        vnpayEnabled: true,
        bankingEnabled: true,
        webhookUrl: "https://your-domain.com/api/payments/webhook",
        invoicePrefix: "AQT-",
      },
      ai: {
        provider: "openai",
        apiKey: "",
        defaultModel: "gpt-4o-mini",
        temperature: 0.7,
        maxTokens: 2048,
        dailyLimit: 10000,
      },
      backup: {
        autoBackup: true,
        frequency: "daily",
        retentionDays: 14,
        destination: "cloud",
      },
    }),
    []
  );

  const [form, setForm] = useState(initial);
  const [snack, setSnack] = useState<{ open: boolean; msg: string; type: "success" | "error" }>({
    open: false,
    msg: "",
    type: "success",
  });

  const onCancel = () => {
    setForm(initial);
    setSnack({ open: true, msg: "Đã hoàn tác thay đổi.", type: "success" });
  };

  const onSave = () => {
    // TODO: gọi API lưu
    console.log("SAVE SETTINGS:", form);
    setSnack({ open: true, msg: "Đã lưu thay đổi.", type: "success" });
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "none",
        px: { xs: 2, md: 3 },
        py: 3,
      }}
    >
      <Box sx={{ mb: 2 }}>
        <Typography sx={{ fontSize: 28, fontWeight: 900, letterSpacing: -0.3 }}>
          Cài đặt hệ thống
        </Typography>
        <Typography sx={{ mt: 0.6, color: "text.secondary" }}>
          Quản lý cấu hình và thiết lập hệ thống
        </Typography>
      </Box>

      <Paper
        sx={{
          borderRadius: 3,
          border: "1px solid rgba(0,0,0,0.06)",
          overflow: "hidden",
        }}
      >
        {/* Tabs */}
        <Box sx={{ px: 2, pt: 1.5 }}>
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              minHeight: 44,
              "& .MuiTabs-indicator": { display: "none" },
              "& .MuiTab-root": {
                minHeight: 36,
                textTransform: "none",
                fontWeight: 800,
                borderRadius: 2,
                mr: 1,
                px: 1.5,
                color: "text.secondary",
                border: "1px solid transparent",
              },
              "& .MuiTab-root.Mui-selected": {
                bgcolor: "rgba(16, 185, 129, 0.14)",
                color: "#047857",
                borderColor: "rgba(16,185,129,0.22)",
              },
            }}
          >
            <Tab icon={<SettingsRoundedIcon fontSize="small" />} iconPosition="start" label="Cài đặt chung" />
            <Tab icon={<SecurityRoundedIcon fontSize="small" />} iconPosition="start" label="Bảo mật" />
            <Tab icon={<EmailRoundedIcon fontSize="small" />} iconPosition="start" label="Email" />
            <Tab icon={<PaymentsRoundedIcon fontSize="small" />} iconPosition="start" label="Thanh toán" />
            <Tab icon={<SmartToyRoundedIcon fontSize="small" />} iconPosition="start" label="Cấu hình AI" />
            <Tab icon={<BackupRoundedIcon fontSize="small" />} iconPosition="start" label="Sao lưu" />
          </Tabs>
        </Box>

        <Divider />

        {/* Content */}
        <Box sx={{ p: 2 }}>
          {/* TAB 0: General */}
          <TabPanel value={tab} index={0}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography sx={{ fontWeight: 900, mb: 0.5 }}>Tên hệ thống</Typography>
                <TextField
                  value={form.general.systemName}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, general: { ...p.general, systemName: e.target.value } }))
                  }
                  fullWidth
                  size="small"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography sx={{ fontWeight: 900, mb: 0.5 }}>Mô tả</Typography>
                <TextField
                  value={form.general.description}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, general: { ...p.general, description: e.target.value } }))
                  }
                  fullWidth
                  size="small"
                  multiline
                  minRows={3}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography sx={{ fontWeight: 900, mb: 0.5 }}>Múi giờ</Typography>
                <FormControl fullWidth size="small">
                  <Select
                    value={form.general.timezone}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, general: { ...p.general, timezone: String(e.target.value) } }))
                    }
                    sx={{ borderRadius: 2 }}
                  >
                    {timezones.map((t) => (
                      <MenuItem key={t.value} value={t.value}>
                        {t.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Typography sx={{ fontWeight: 900, mb: 0.5 }}>Ngôn ngữ mặc định</Typography>
                <FormControl fullWidth size="small">
                  <Select
                    value={form.general.language}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, general: { ...p.general, language: String(e.target.value) } }))
                    }
                    sx={{ borderRadius: 2 }}
                  >
                    {languages.map((l) => (
                      <MenuItem key={l.value} value={l.value}>
                        {l.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Paper
                  variant="outlined"
                  sx={{
                    borderRadius: 2.5,
                    p: 2,
                    borderColor: "rgba(0,0,0,0.08)",
                    bgcolor: "rgba(0,0,0,0.02)",
                  }}
                >
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Box>
                      <Typography sx={{ fontWeight: 900 }}>Chế độ bảo trì</Typography>
                      <Typography sx={{ color: "text.secondary", fontSize: 13 }}>
                        Tạm thời tắt hệ thống để bảo trì
                      </Typography>
                    </Box>
                    <Switch
                      checked={form.general.maintenance}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, general: { ...p.general, maintenance: e.target.checked } }))
                      }
                    />
                  </Stack>
                </Paper>
              </Grid>
            </Grid>
          </TabPanel>

          {/* TAB 1: Security */}
          <TabPanel value={tab} index={1}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Paper variant="outlined" sx={{ borderRadius: 2.5, p: 2, borderColor: "rgba(0,0,0,0.08)" }}>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Box>
                      <Typography sx={{ fontWeight: 900 }}>Bật 2FA cho Admin</Typography>
                      <Typography sx={{ color: "text.secondary", fontSize: 13 }}>
                        Yêu cầu xác thực 2 lớp khi đăng nhập quản trị
                      </Typography>
                    </Box>
                    <Switch
                      checked={form.security.require2FA}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, security: { ...p.security, require2FA: e.target.checked } }))
                      }
                    />
                  </Stack>
                </Paper>
              </Grid>

              <Grid item xs={12} md={4}>
                <Typography sx={{ fontWeight: 900, mb: 0.5 }}>Session timeout (phút)</Typography>
                <FormControl fullWidth size="small">
                  <Select
                    value={form.security.sessionTimeoutMin}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        security: { ...p.security, sessionTimeoutMin: Number(e.target.value) },
                      }))
                    }
                    sx={{ borderRadius: 2 }}
                  >
                    {[15, 30, 60, 120, 240].map((m) => (
                      <MenuItem key={m} value={m}>
                        {m} phút
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                <Typography sx={{ fontWeight: 900, mb: 0.5 }}>Số lần đăng nhập sai tối đa</Typography>
                <TextField
                  type="number"
                  value={form.security.maxLoginAttempts}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      security: { ...p.security, maxLoginAttempts: Number(e.target.value || 0) },
                    }))
                  }
                  fullWidth
                  size="small"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Typography sx={{ fontWeight: 900, mb: 0.5 }}>Độ dài mật khẩu tối thiểu</Typography>
                <TextField
                  type="number"
                  value={form.security.passwordMinLength}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      security: { ...p.security, passwordMinLength: Number(e.target.value || 0) },
                    }))
                  }
                  fullWidth
                  size="small"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
              </Grid>

              <Grid item xs={12}>
                <Paper variant="outlined" sx={{ borderRadius: 2.5, p: 2, borderColor: "rgba(0,0,0,0.08)" }}>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Box>
                      <Typography sx={{ fontWeight: 900 }}>Yêu cầu ký tự đặc biệt</Typography>
                      <Typography sx={{ color: "text.secondary", fontSize: 13 }}>
                        Mật khẩu phải có ít nhất 1 ký tự đặc biệt
                      </Typography>
                    </Box>
                    <Switch
                      checked={form.security.passwordRequireSpecial}
                      onChange={(e) =>
                        setForm((p) => ({
                          ...p,
                          security: { ...p.security, passwordRequireSpecial: e.target.checked },
                        }))
                      }
                    />
                  </Stack>
                </Paper>
              </Grid>
            </Grid>
          </TabPanel>

          {/* TAB 2: Email */}
          <TabPanel value={tab} index={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography sx={{ fontWeight: 900, mb: 0.5 }}>SMTP Host</Typography>
                <TextField
                  value={form.email.smtpHost}
                  onChange={(e) => setForm((p) => ({ ...p, email: { ...p.email, smtpHost: e.target.value } }))}
                  fullWidth
                  size="small"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography sx={{ fontWeight: 900, mb: 0.5 }}>SMTP Port</Typography>
                <TextField
                  type="number"
                  value={form.email.smtpPort}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, email: { ...p.email, smtpPort: Number(e.target.value || 0) } }))
                  }
                  fullWidth
                  size="small"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography sx={{ fontWeight: 900, mb: 0.5 }}>SMTP User</Typography>
                <TextField
                  value={form.email.smtpUser}
                  onChange={(e) => setForm((p) => ({ ...p, email: { ...p.email, smtpUser: e.target.value } }))}
                  fullWidth
                  size="small"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography sx={{ fontWeight: 900, mb: 0.5 }}>SMTP Password</Typography>
                <TextField
                  type="password"
                  value={form.email.smtpPass}
                  onChange={(e) => setForm((p) => ({ ...p, email: { ...p.email, smtpPass: e.target.value } }))}
                  fullWidth
                  size="small"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography sx={{ fontWeight: 900, mb: 0.5 }}>From name</Typography>
                <TextField
                  value={form.email.fromName}
                  onChange={(e) => setForm((p) => ({ ...p, email: { ...p.email, fromName: e.target.value } }))}
                  fullWidth
                  size="small"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography sx={{ fontWeight: 900, mb: 0.5 }}>From email</Typography>
                <TextField
                  value={form.email.fromEmail}
                  onChange={(e) => setForm((p) => ({ ...p, email: { ...p.email, fromEmail: e.target.value } }))}
                  fullWidth
                  size="small"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
              </Grid>

              <Grid item xs={12}>
                <Stack direction="row" spacing={1} justifyContent="flex-end">
                  <Button
                    variant="outlined"
                    sx={{ borderRadius: 2, fontWeight: 900 }}
                    onClick={() => setSnack({ open: true, msg: "Đã gửi email test (demo).", type: "success" })}
                  >
                    Gửi email test
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </TabPanel>

          {/* TAB 3: Payment */}
          <TabPanel value={tab} index={3}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Typography sx={{ fontWeight: 900, mb: 0.5 }}>Tiền tệ</Typography>
                <FormControl fullWidth size="small">
                  <Select
                    value={form.payment.currency}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, payment: { ...p.payment, currency: String(e.target.value) } }))
                    }
                    sx={{ borderRadius: 2 }}
                  >
                    <MenuItem value="VND">VND</MenuItem>
                    <MenuItem value="USD">USD</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={8}>
                <Typography sx={{ fontWeight: 900, mb: 0.5 }}>Webhook URL</Typography>
                <TextField
                  value={form.payment.webhookUrl}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, payment: { ...p.payment, webhookUrl: e.target.value } }))
                  }
                  fullWidth
                  size="small"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Typography sx={{ fontWeight: 900, mb: 0.5 }}>Invoice prefix</Typography>
                <TextField
                  value={form.payment.invoicePrefix}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, payment: { ...p.payment, invoicePrefix: e.target.value } }))
                  }
                  fullWidth
                  size="small"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
              </Grid>

              <Grid item xs={12}>
                <Paper variant="outlined" sx={{ borderRadius: 2.5, p: 2, borderColor: "rgba(0,0,0,0.08)" }}>
                  <Typography sx={{ fontWeight: 900, mb: 1 }}>Phương thức thanh toán</Typography>

                  <Stack spacing={1}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Typography sx={{ fontWeight: 800 }}>MoMo</Typography>
                      <Switch
                        checked={form.payment.momoEnabled}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, payment: { ...p.payment, momoEnabled: e.target.checked } }))
                        }
                      />
                    </Stack>

                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Typography sx={{ fontWeight: 800 }}>VNPay</Typography>
                      <Switch
                        checked={form.payment.vnpayEnabled}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, payment: { ...p.payment, vnpayEnabled: e.target.checked } }))
                        }
                      />
                    </Stack>

                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Typography sx={{ fontWeight: 800 }}>Banking</Typography>
                      <Switch
                        checked={form.payment.bankingEnabled}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            payment: { ...p.payment, bankingEnabled: e.target.checked },
                          }))
                        }
                      />
                    </Stack>
                  </Stack>
                </Paper>
              </Grid>
            </Grid>
          </TabPanel>

          {/* TAB 4: AI */}
          <TabPanel value={tab} index={4}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Typography sx={{ fontWeight: 900, mb: 0.5 }}>Provider</Typography>
                <FormControl fullWidth size="small">
                  <Select
                    value={form.ai.provider}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, ai: { ...p.ai, provider: String(e.target.value) } }))
                    }
                    sx={{ borderRadius: 2 }}
                  >
                    <MenuItem value="openai">OpenAI</MenuItem>
                    <MenuItem value="gemini">Google Gemini</MenuItem>
                    <MenuItem value="claude">Claude</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={8}>
                <Typography sx={{ fontWeight: 900, mb: 0.5 }}>API Key</Typography>
                <TextField
                  value={form.ai.apiKey}
                  onChange={(e) => setForm((p) => ({ ...p, ai: { ...p.ai, apiKey: e.target.value } }))}
                  fullWidth
                  size="small"
                  placeholder="Nhập API key..."
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Typography sx={{ fontWeight: 900, mb: 0.5 }}>Default model</Typography>
                <TextField
                  value={form.ai.defaultModel}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, ai: { ...p.ai, defaultModel: e.target.value } }))
                  }
                  fullWidth
                  size="small"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Typography sx={{ fontWeight: 900, mb: 0.5 }}>Temperature</Typography>
                <TextField
                  type="number"
                  inputProps={{ step: 0.1, min: 0, max: 2 }}
                  value={form.ai.temperature}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, ai: { ...p.ai, temperature: Number(e.target.value || 0) } }))
                  }
                  fullWidth
                  size="small"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Typography sx={{ fontWeight: 900, mb: 0.5 }}>Max tokens</Typography>
                <TextField
                  type="number"
                  value={form.ai.maxTokens}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, ai: { ...p.ai, maxTokens: Number(e.target.value || 0) } }))
                  }
                  fullWidth
                  size="small"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography sx={{ fontWeight: 900, mb: 0.5 }}>Daily usage limit (requests)</Typography>
                <TextField
                  type="number"
                  value={form.ai.dailyLimit}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, ai: { ...p.ai, dailyLimit: Number(e.target.value || 0) } }))
                  }
                  fullWidth
                  size="small"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
              </Grid>
            </Grid>
          </TabPanel>

          {/* TAB 5: Backup */}
          <TabPanel value={tab} index={5}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Paper variant="outlined" sx={{ borderRadius: 2.5, p: 2, borderColor: "rgba(0,0,0,0.08)" }}>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Box>
                      <Typography sx={{ fontWeight: 900 }}>Tự động sao lưu</Typography>
                      <Typography sx={{ color: "text.secondary", fontSize: 13 }}>
                        Tạo bản sao lưu định kỳ để khôi phục khi cần
                      </Typography>
                    </Box>
                    <Switch
                      checked={form.backup.autoBackup}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, backup: { ...p.backup, autoBackup: e.target.checked } }))
                      }
                    />
                  </Stack>
                </Paper>
              </Grid>

              <Grid item xs={12} md={4}>
                <Typography sx={{ fontWeight: 900, mb: 0.5 }}>Tần suất</Typography>
                <FormControl fullWidth size="small">
                  <Select
                    value={form.backup.frequency}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, backup: { ...p.backup, frequency: String(e.target.value) } }))
                    }
                    sx={{ borderRadius: 2 }}
                  >
                    <MenuItem value="daily">Hàng ngày</MenuItem>
                    <MenuItem value="weekly">Hàng tuần</MenuItem>
                    <MenuItem value="monthly">Hàng tháng</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                <Typography sx={{ fontWeight: 900, mb: 0.5 }}>Giữ lại (ngày)</Typography>
                <TextField
                  type="number"
                  value={form.backup.retentionDays}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      backup: { ...p.backup, retentionDays: Number(e.target.value || 0) },
                    }))
                  }
                  fullWidth
                  size="small"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Typography sx={{ fontWeight: 900, mb: 0.5 }}>Nơi lưu</Typography>
                <FormControl fullWidth size="small">
                  <Select
                    value={form.backup.destination}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, backup: { ...p.backup, destination: String(e.target.value) } }))
                    }
                    sx={{ borderRadius: 2 }}
                  >
                    <MenuItem value="cloud">Cloud</MenuItem>
                    <MenuItem value="local">Local</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Alert severity="info" sx={{ borderRadius: 2 }}>
                  Phần danh sách backup (download/restore) sẽ nối API sau. Hiện chỉ làm UI form theo đúng layout.
                </Alert>
              </Grid>
            </Grid>
          </TabPanel>
        </Box>

        <Divider />

        {/* Footer buttons */}
        <Box sx={{ p: 2 }}>
          <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
            <Button variant="outlined" onClick={onCancel} sx={{ borderRadius: 2, fontWeight: 900 }}>
              Hủy
            </Button>
            <Button
              variant="contained"
              onClick={onSave}
              sx={{ borderRadius: 2, fontWeight: 900 }}
              color="success"
            >
              Lưu thay đổi
            </Button>
          </Stack>
        </Box>
      </Paper>

      <Snackbar
        open={snack.open}
        autoHideDuration={2200}
        onClose={() => setSnack((p) => ({ ...p, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnack((p) => ({ ...p, open: false }))}
          severity={snack.type}
          sx={{ borderRadius: 2, fontWeight: 700 }}
        >
          {snack.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
