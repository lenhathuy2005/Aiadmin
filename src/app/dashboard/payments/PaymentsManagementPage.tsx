"use client";

import * as React from "react";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

type PaymentStatus = "success" | "pending" | "failed";
type Method = "Momo" | "Banking" | "VNPay";

type StatusFilter = "all" | PaymentStatus;

type Payment = {
  id: string;
  userName: string;
  packageName: string;
  amount: number; // VND
  method: Method;
  status: PaymentStatus;
  date: string; // dd/MM/yyyy
  // dữ liệu để hiện modal
  transactionCode: string;
  email: string;
  phone: string;
};

const PAYMENTS: Payment[] = [
  {
    id: "1",
    userName: "Nguyễn Văn A",
    packageName: "Premium Monthly",
    amount: 299000,
    method: "Momo",
    status: "success",
    date: "28/01/2024",
    transactionCode: "TXN001234567",
    email: "nguyenvana@email.com",
    phone: "0901234567",
  },
  {
    id: "2",
    userName: "Trần Thị B",
    packageName: "Premium Yearly",
    amount: 2990000,
    method: "Banking",
    status: "success",
    date: "27/01/2024",
    transactionCode: "TXN001234568",
    email: "tranthib@email.com",
    phone: "0912345678",
  },
  {
    id: "3",
    userName: "Lê Văn C",
    packageName: "Premium Monthly",
    amount: 299000,
    method: "VNPay",
    status: "pending",
    date: "27/01/2024",
    transactionCode: "TXN001234569",
    email: "levanc@email.com",
    phone: "0923456789",
  },
  {
    id: "4",
    userName: "Phạm Thị D",
    packageName: "Premium Monthly",
    amount: 299000,
    method: "Momo",
    status: "failed",
    date: "26/01/2024",
    transactionCode: "TXN001234570",
    email: "phamthid@email.com",
    phone: "0934567890",
  },
  {
    id: "5",
    userName: "Hoàng Văn E",
    packageName: "Premium Yearly",
    amount: 2990000,
    method: "Banking",
    status: "success",
    date: "26/01/2024",
    transactionCode: "TXN001234571",
    email: "hoangvane@email.com",
    phone: "0945678901",
  },
];

function formatVND(amount: number) {
  return new Intl.NumberFormat("vi-VN").format(amount) + "đ";
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  const a = parts[0]?.[0] ?? "";
  const b = parts[parts.length - 1]?.[0] ?? "";
  return (a + b).toUpperCase();
}

function statusChip(status: PaymentStatus) {
  if (status === "success") {
    return {
      label: "Thành công",
      sx: {
        bgcolor: "rgba(16,185,129,.15)",
        color: "rgb(16,185,129)",
        fontWeight: 700,
      },
    };
  }
  if (status === "pending") {
    return {
      label: "Đang chờ",
      sx: {
        bgcolor: "rgba(245,158,11,.15)",
        color: "rgb(245,158,11)",
        fontWeight: 700,
      },
    };
  }
  return {
    label: "Thất bại",
    sx: {
      bgcolor: "rgba(239,68,68,.15)",
      color: "rgb(239,68,68)",
      fontWeight: 700,
    },
  };
}

function methodChip(method: Method) {
  // style giống “pill” tím trong ảnh
  return {
    label: method,
    sx: {
      bgcolor: "rgba(168,85,247,.12)",
      color: "rgb(147,51,234)",
      fontWeight: 700,
    },
  };
}

function metricCard(title: string, value: string, iconBg: string, icon: string) {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <Box>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 800, mt: 0.5 }}>
          {value}
        </Typography>
      </Box>

      <Box
        sx={{
          width: 44,
          height: 44,
          borderRadius: 2,
          bgcolor: iconBg,
          display: "grid",
          placeItems: "center",
          color: "#fff",
          fontSize: 18,
          fontWeight: 900,
        }}
      >
        {icon}
      </Box>
    </Paper>
  );
}

export default function PaymentsManagementPage() {
  const [filter, setFilter] = React.useState<StatusFilter>("all");

  // paging đơn giản (giống ảnh: 5 dòng)
  const pageSize = 5;
  const [page, setPage] = React.useState(1);

  // modal xem chi tiết
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Payment | null>(null);

  const filtered = React.useMemo(() => {
    const base = filter === "all" ? PAYMENTS : PAYMENTS.filter((p) => p.status === filter);
    return base;
  }, [filter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);

  const paged = React.useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, safePage]);

  React.useEffect(() => {
    setPage(1);
  }, [filter]);

  const handleOpenReceipt = (p: Payment) => {
    setSelected(p);
    setOpen(true);
  };

  const handleCloseReceipt = () => {
    setOpen(false);
    setSelected(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 900, mb: 0.5 }}>
          Quản lý Thanh toán
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Theo dõi và quản lý các giao dịch thanh toán
        </Typography>
      </Box>

      {/* Metric cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          {metricCard("Tổng doanh thu", "₫125.4M", "rgb(16,185,129)", "₫")}
        </Grid>
        <Grid item xs={12} md={3}>
          {metricCard("Giao dịch thành công", "1,247", "rgb(59,130,246)", "✓")}
        </Grid>
        <Grid item xs={12} md={3}>
          {metricCard("Đang chờ xử lý", "23", "rgb(245,158,11)", "⏱")}
        </Grid>
        <Grid item xs={12} md={3}>
          {metricCard("Giao dịch thất bại", "12", "rgb(239,68,68)", "✕")}
        </Grid>
      </Grid>

      {/* Table */}
      <Paper variant="outlined" sx={{ borderRadius: 2, p: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 1.5,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            Lịch sử giao dịch
          </Typography>

          <FormControl size="small" sx={{ minWidth: 180 }}>
            <Select
              value={filter}
              onChange={(e) => setFilter(e.target.value as StatusFilter)}
              sx={{ borderRadius: 2 }}
            >
              <MenuItem value="all">Tất cả trạng thái</MenuItem>
              <MenuItem value="success">Thành công</MenuItem>
              <MenuItem value="pending">Đang chờ</MenuItem>
              <MenuItem value="failed">Thất bại</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 800, color: "text.secondary" }}>Người dùng</TableCell>
                <TableCell sx={{ fontWeight: 800, color: "text.secondary" }}>Gói dịch vụ</TableCell>
                <TableCell sx={{ fontWeight: 800, color: "text.secondary" }}>Số tiền</TableCell>
                <TableCell sx={{ fontWeight: 800, color: "text.secondary" }}>Phương thức</TableCell>
                <TableCell sx={{ fontWeight: 800, color: "text.secondary" }}>Trạng thái</TableCell>
                <TableCell sx={{ fontWeight: 800, color: "text.secondary" }}>Ngày GD</TableCell>
                <TableCell sx={{ fontWeight: 800, color: "text.secondary" }}>Thao tác</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paged.map((p) => (
                <TableRow key={p.id} hover>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <Box
                        sx={{
                          width: 38,
                          height: 38,
                          borderRadius: "999px",
                          bgcolor: "rgb(16,185,129)",
                          color: "#fff",
                          display: "grid",
                          placeItems: "center",
                          fontWeight: 900,
                        }}
                      >
                        {initials(p.userName)}
                      </Box>
                      <Typography sx={{ fontWeight: 700 }}>{p.userName}</Typography>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Typography sx={{ fontWeight: 700, color: "text.secondary" }}>
                      {p.packageName}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography sx={{ fontWeight: 800 }}>{formatVND(p.amount)}</Typography>
                  </TableCell>

                  <TableCell>
                    <Chip size="small" label={methodChip(p.method).label} sx={methodChip(p.method).sx} />
                  </TableCell>

                  <TableCell>
                    <Chip size="small" label={statusChip(p.status).label} sx={statusChip(p.status).sx} />
                  </TableCell>

                  <TableCell>
                    <Typography sx={{ color: "text.secondary", fontWeight: 700 }}>{p.date}</Typography>
                  </TableCell>

                  <TableCell>
                    <IconButton
                      onClick={() => handleOpenReceipt(p)}
                      sx={{
                        width: 34,
                        height: 34,
                        borderRadius: 2,
                        color: "rgb(37,99,235)",
                      }}
                    >
                      {/* icon “mắt” không cần thư viện */}
                      <Box component="span" sx={{ fontSize: 18, lineHeight: 1 }}>
                        👁
                      </Box>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}

              {paged.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} sx={{ py: 4 }}>
                    <Typography color="text.secondary" align="center">
                      Không có giao dịch phù hợp bộ lọc.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Footer */}
        <Box
          sx={{
            mt: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Hiển thị {(safePage - 1) * pageSize + 1}-{Math.min(safePage * pageSize, filtered.length)} trong tổng số{" "}
            {filtered.length} giao dịch
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setPage((v) => Math.max(1, v - 1))}
              disabled={safePage <= 1}
              sx={{ borderRadius: 2, textTransform: "none" }}
            >
              Trước
            </Button>

            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: 2,
                bgcolor: "rgb(16,185,129)",
                color: "#fff",
                display: "grid",
                placeItems: "center",
                fontWeight: 900,
              }}
            >
              {safePage}
            </Box>

            <Button
              variant="outlined"
              size="small"
              onClick={() => setPage((v) => Math.min(totalPages, v + 1))}
              disabled={safePage >= totalPages}
              sx={{ borderRadius: 2, textTransform: "none" }}
            >
              Sau
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Receipt Modal */}
      <Dialog open={open} onClose={handleCloseReceipt} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ pb: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Typography sx={{ fontWeight: 900 }}>Chi tiết biên lai giao dịch</Typography>
            <IconButton onClick={handleCloseReceipt}>
              <Box component="span" sx={{ fontSize: 22, lineHeight: 1 }}>
                ×
              </Box>
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent dividers sx={{ p: 3 }}>
          {selected && (
            <Box>
              <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                <Chip
                  label={
                    selected.status === "success"
                      ? "✓ Thanh toán thành công"
                      : selected.status === "pending"
                        ? "⏱ Đang chờ xử lý"
                        : "✕ Thanh toán thất bại"
                  }
                  sx={{
                    ...(statusChip(selected.status).sx as any),
                    bgcolor:
                      selected.status === "success"
                        ? "rgba(16,185,129,.15)"
                        : selected.status === "pending"
                          ? "rgba(245,158,11,.15)"
                          : "rgba(239,68,68,.15)",
                    px: 1,
                  }}
                />
              </Box>

              <Paper variant="outlined" sx={{ borderRadius: 2, p: 2.5, mb: 2 }}>
                <Typography sx={{ fontWeight: 900, mb: 2 }}>Thông tin giao dịch</Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Mã giao dịch
                    </Typography>
                    <Typography sx={{ fontWeight: 900 }}>{selected.transactionCode}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Ngày giao dịch
                    </Typography>
                    <Typography sx={{ fontWeight: 900 }}>{selected.date}</Typography>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Gói dịch vụ
                  </Typography>
                  <Typography sx={{ fontWeight: 900 }}>{selected.packageName}</Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Phương thức thanh toán
                  </Typography>
                  <Typography sx={{ fontWeight: 900 }}>{selected.method}</Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 700 }}>
                    Số tiền
                  </Typography>
                  <Typography sx={{ fontWeight: 1000, fontSize: 22, color: "rgb(16,185,129)" }}>
                    {formatVND(selected.amount)}
                  </Typography>
                </Box>
              </Paper>

              <Paper variant="outlined" sx={{ borderRadius: 2, p: 2.5 }}>
                <Typography sx={{ fontWeight: 900, mb: 2 }}>Thông tin khách hàng</Typography>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Họ và tên
                  </Typography>
                  <Typography sx={{ fontWeight: 900 }}>{selected.userName}</Typography>
                </Box>

                <Divider sx={{ my: 1.5 }} />

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Email
                  </Typography>
                  <Typography sx={{ fontWeight: 900 }}>{selected.email}</Typography>
                </Box>

                <Divider sx={{ my: 1.5 }} />

                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Số điện thoại
                  </Typography>
                  <Typography sx={{ fontWeight: 900 }}>{selected.phone}</Typography>
                </Box>
              </Paper>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
