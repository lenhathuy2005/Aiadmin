'use client';

import * as React from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material';

import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import HourglassTopRoundedIcon from '@mui/icons-material/HourglassTopRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

type PaymentStatus = 'success' | 'pending' | 'failed';
type PaymentMethod = 'momo' | 'banking' | 'vnpay';

type PaymentPlan = 'Free' | 'Premium Monthly' | 'Premium Yearly';

interface PaymentRow {
  id: string;
  userName: string;
  plan: PaymentPlan;
  amountVnd: number;
  method: PaymentMethod;
  status: PaymentStatus;
  date: string; // dd/MM/yyyy
  email: string;
  phone: string;
}

function formatVnd(amount: number): string {
  // hiển thị dạng 299,000đ (đúng style trong ảnh)
  const s = new Intl.NumberFormat('vi-VN').format(amount);
  return `${s}đ`;
}

function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/);
  const a = parts[0]?.[0] ?? '';
  const b = parts[parts.length - 1]?.[0] ?? '';
  return (a + b).toUpperCase();
}

const STATUS_META: Record<
  PaymentStatus,
  { label: string; chipSx: any; icon: React.ReactNode }
> = {
  success: {
    label: 'Thành công',
    chipSx: {
      bgcolor: 'rgba(46, 204, 113, 0.15)',
      color: '#0f7a3c',
      fontWeight: 700,
      border: '1px solid rgba(46, 204, 113, 0.25)',
    },
    icon: <CheckCircleRoundedIcon sx={{ fontSize: 18 }} />,
  },
  pending: {
    label: 'Đang chờ',
    chipSx: {
      bgcolor: 'rgba(243, 156, 18, 0.15)',
      color: '#8a5a00',
      fontWeight: 700,
      border: '1px solid rgba(243, 156, 18, 0.25)',
    },
    icon: <HourglassTopRoundedIcon sx={{ fontSize: 18 }} />,
  },
  failed: {
    label: 'Thất bại',
    chipSx: {
      bgcolor: 'rgba(231, 76, 60, 0.12)',
      color: '#a11b10',
      fontWeight: 700,
      border: '1px solid rgba(231, 76, 60, 0.22)',
    },
    icon: <CancelRoundedIcon sx={{ fontSize: 18 }} />,
  },
};

const METHOD_META: Record<PaymentMethod, { label: string; sx: any }> = {
  momo: {
    label: 'Momo',
    sx: {
      bgcolor: 'rgba(155, 89, 182, 0.12)',
      color: '#6d2b86',
      fontWeight: 700,
      border: '1px solid rgba(155, 89, 182, 0.22)',
    },
  },
  banking: {
    label: 'Banking',
    sx: {
      bgcolor: 'rgba(155, 89, 182, 0.12)',
      color: '#6d2b86',
      fontWeight: 700,
      border: '1px solid rgba(155, 89, 182, 0.22)',
    },
  },
  vnpay: {
    label: 'VNPay',
    sx: {
      bgcolor: 'rgba(155, 89, 182, 0.12)',
      color: '#6d2b86',
      fontWeight: 700,
      border: '1px solid rgba(155, 89, 182, 0.22)',
    },
  },
};

function StatCard(props: {
  title: string;
  value: React.ReactNode;
  icon: React.ReactNode;
  iconBg: string;
  iconFg?: string;
}) {
  const { title, value, icon, iconBg, iconFg } = props;

  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent sx={{ p: 2.5 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              {title}
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 800, lineHeight: 1.1 }}>
              {value}
            </Typography>
          </Box>

          {/* ✅ Fix icon lệch: box cố định + svg display block */}
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              backgroundColor: iconBg,
              color: iconFg ?? 'inherit',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              '& svg': { display: 'block' },
            }}
          >
            {icon}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default function PaymentsManagementPage(): React.JSX.Element {
  const [statusFilter, setStatusFilter] = React.useState<'all' | PaymentStatus>('all');
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;

  const [openDetail, setOpenDetail] = React.useState(false);
  const [selected, setSelected] = React.useState<PaymentRow | null>(null);

  const payments: PaymentRow[] = React.useMemo(
    () => [
      {
        id: 'TXN001234567',
        userName: 'Nguyễn Văn A',
        plan: 'Premium Monthly',
        amountVnd: 299000,
        method: 'momo',
        status: 'success',
        date: '28/01/2024',
        email: 'nguyenvana@email.com',
        phone: '0901234567',
      },
      {
        id: 'TXN001234568',
        userName: 'Trần Thị B',
        plan: 'Premium Yearly',
        amountVnd: 2990000,
        method: 'banking',
        status: 'success',
        date: '27/01/2024',
        email: 'tranthib@email.com',
        phone: '0902345678',
      },
      {
        id: 'TXN001234569',
        userName: 'Lê Văn C',
        plan: 'Premium Monthly',
        amountVnd: 299000,
        method: 'vnpay',
        status: 'pending',
        date: '27/01/2024',
        email: 'levanc@email.com',
        phone: '0903456789',
      },
      {
        id: 'TXN001234570',
        userName: 'Phạm Thị D',
        plan: 'Premium Monthly',
        amountVnd: 299000,
        method: 'momo',
        status: 'failed',
        date: '26/01/2024',
        email: 'phamthid@email.com',
        phone: '0904567890',
      },
      {
        id: 'TXN001234571',
        userName: 'Hoàng Văn E',
        plan: 'Premium Yearly',
        amountVnd: 2990000,
        method: 'banking',
        status: 'success',
        date: '26/01/2024',
        email: 'hoangvane@email.com',
        phone: '0905678901',
      },
    ],
    []
  );

  const filtered = React.useMemo(() => {
    if (statusFilter === 'all') return payments;
    return payments.filter((p) => p.status === statusFilter);
  }, [payments, statusFilter]);

  const totalRevenue = React.useMemo(() => {
    // theo ảnh: Tổng doanh thu thường tính từ giao dịch thành công
    return payments
      .filter((p) => p.status === 'success')
      .reduce((sum, p) => sum + p.amountVnd, 0);
  }, [payments]);

  const countSuccess = React.useMemo(() => payments.filter((p) => p.status === 'success').length, [payments]);
  const countPending = React.useMemo(() => payments.filter((p) => p.status === 'pending').length, [payments]);
  const countFailed = React.useMemo(() => payments.filter((p) => p.status === 'failed').length, [payments]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
  const safePage = Math.min(page, totalPages);
  const paged = React.useMemo(() => {
    const start = (safePage - 1) * rowsPerPage;
    return filtered.slice(start, start + rowsPerPage);
  }, [filtered, safePage]);

  const handleChangeFilter = (e: SelectChangeEvent) => {
    const val = e.target.value as any;
    setStatusFilter(val);
    setPage(1);
  };

  const openView = (row: PaymentRow) => {
    setSelected(row);
    setOpenDetail(true);
  };

  const closeView = () => {
    setOpenDetail(false);
    setSelected(null);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 900, mb: 0.5 }}>
          Quản lý Thanh toán
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Theo dõi và quản lý các giao dịch thanh toán
        </Typography>
      </Box>

      {/* Stats */}
      <Grid container spacing={2} sx={{ mb: 2.5 }}>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Tổng doanh thu"
            value={formatVnd(totalRevenue)}
            icon={<MonetizationOnRoundedIcon sx={{ fontSize: 20 }} />}
            iconBg="rgba(46, 204, 113, 0.18)"
            iconFg="#0f7a3c"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Giao dịch thành công"
            value={countSuccess.toLocaleString('vi-VN')}
            icon={<CheckCircleRoundedIcon sx={{ fontSize: 20 }} />}
            iconBg="rgba(52, 152, 219, 0.18)"
            iconFg="#1b5fb8"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Đang chờ xử lý"
            value={countPending.toLocaleString('vi-VN')}
            icon={<HourglassTopRoundedIcon sx={{ fontSize: 20 }} />}
            iconBg="rgba(243, 156, 18, 0.18)"
            iconFg="#8a5a00"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Giao dịch thất bại"
            value={countFailed.toLocaleString('vi-VN')}
            icon={<CancelRoundedIcon sx={{ fontSize: 20 }} />}
            iconBg="rgba(231, 76, 60, 0.16)"
            iconFg="#a11b10"
          />
        </Grid>
      </Grid>

      {/* Table */}
      <Card sx={{ borderRadius: 3 }}>
        <CardContent sx={{ p: 2.5 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 900 }}>
              Lịch sử giao dịch
            </Typography>

            <FormControl size="small" sx={{ minWidth: 180 }}>
              <Select value={statusFilter} onChange={handleChangeFilter} displayEmpty>
                <MenuItem value="all">Tất cả trạng thái</MenuItem>
                <MenuItem value="success">Thành công</MenuItem>
                <MenuItem value="pending">Đang chờ</MenuItem>
                <MenuItem value="failed">Thất bại</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          <Box
            sx={{
              border: '1px solid rgba(0,0,0,0.08)',
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse' }}>
              <Box component="thead" sx={{ bgcolor: 'rgba(0,0,0,0.02)' }}>
                <Box component="tr" sx={{ '& th': { py: 1.5, px: 2, textAlign: 'left', fontSize: 12, color: 'text.secondary' } }}>
                  <Box component="th">Người dùng</Box>
                  <Box component="th">Gói dịch vụ</Box>
                  <Box component="th">Số tiền</Box>
                  <Box component="th">Phương thức</Box>
                  <Box component="th">Trạng thái</Box>
                  <Box component="th">Ngày GD</Box>
                  <Box component="th" sx={{ textAlign: 'center' }}>
                    Thao tác
                  </Box>
                </Box>
              </Box>

              <Box component="tbody">
                {paged.map((row) => {
                  const status = STATUS_META[row.status];
                  const method = METHOD_META[row.method];

                  return (
                    <Box
                      component="tr"
                      key={row.id}
                      sx={{
                        borderTop: '1px solid rgba(0,0,0,0.06)',
                        '& td': { py: 1.4, px: 2, verticalAlign: 'middle' },
                      }}
                    >
                      <Box component="td">
                        <Stack direction="row" spacing={1.5} alignItems="center">
                          <Avatar sx={{ width: 36, height: 36, fontWeight: 800 }}>
                            {initialsFromName(row.userName)}
                          </Avatar>
                          <Typography sx={{ fontWeight: 800 }}>{row.userName}</Typography>
                        </Stack>
                      </Box>

                      <Box component="td">
                        <Typography sx={{ fontWeight: 700, color: 'text.primary' }}>{row.plan}</Typography>
                      </Box>

                      <Box component="td">
                        <Typography sx={{ fontWeight: 900 }}>{formatVnd(row.amountVnd)}</Typography>
                      </Box>

                      <Box component="td">
                        {/* ✅ Không truyền onClick -> tránh lỗi onClick is not a function */}
                        <Chip label={method.label} size="small" sx={{ ...method.sx, borderRadius: 999 }} />
                      </Box>

                      <Box component="td">
                        <Chip label={status.label} size="small" sx={{ ...status.chipSx, borderRadius: 999 }} />
                      </Box>

                      <Box component="td">
                        <Typography sx={{ fontWeight: 700 }}>{row.date}</Typography>
                      </Box>

                      <Box component="td" sx={{ textAlign: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <IconButton
                            size="small"
                            onClick={() => openView(row)}
                            sx={{
                              width: 32,
                              height: 32,
                              '& svg': { display: 'block', fontSize: 18 },
                            }}
                          >
                            <VisibilityRoundedIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>

          {/* Footer / Pagination */}
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Hiển thị {(safePage - 1) * rowsPerPage + 1}-{Math.min(safePage * rowsPerPage, filtered.length)} trong tổng số{' '}
              {filtered.length} giao dịch
            </Typography>

            <Stack direction="row" spacing={1} alignItems="center">
              <Button
                variant="outlined"
                size="small"
                disabled={safePage <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                sx={{ borderRadius: 999, minWidth: 70 }}
              >
                Trước
              </Button>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: 999,
                  bgcolor: 'rgba(46, 204, 113, 0.18)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                }}
              >
                {safePage}
              </Box>
              <Button
                variant="outlined"
                size="small"
                disabled={safePage >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                sx={{ borderRadius: 999, minWidth: 70 }}
              >
                Sau
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={openDetail} onClose={closeView} maxWidth="sm" fullWidth scroll="paper">
        <DialogTitle sx={{ fontWeight: 900 }}>
          Chi tiết biên lai giao dịch
          <IconButton onClick={closeView} sx={{ position: 'absolute', right: 10, top: 10 }}>
            <CloseRoundedIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers sx={{ pt: 2 }}>
          {selected ? (
            <Box>
              {/* Status pill center */}
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <Chip
                  icon={STATUS_META[selected.status].icon}
                  label={
                    selected.status === 'success'
                      ? 'Thanh toán thành công'
                      : selected.status === 'pending'
                        ? 'Đang chờ xử lý'
                        : 'Thanh toán thất bại'
                  }
                  sx={{
                    borderRadius: 999,
                    px: 1,
                    fontWeight: 900,
                    ...(selected.status === 'success'
                      ? {
                        bgcolor: 'rgba(46, 204, 113, 0.15)',
                        color: '#0f7a3c',
                        border: '1px solid rgba(46, 204, 113, 0.25)',
                      }
                      : selected.status === 'pending'
                        ? {
                          bgcolor: 'rgba(243, 156, 18, 0.15)',
                          color: '#8a5a00',
                          border: '1px solid rgba(243, 156, 18, 0.25)',
                        }
                        : {
                          bgcolor: 'rgba(231, 76, 60, 0.12)',
                          color: '#a11b10',
                          border: '1px solid rgba(231, 76, 60, 0.22)',
                        }),
                    '& svg': { display: 'block' },
                  }}
                />
              </Box>

              {/* Transaction info */}
              <Box
                sx={{
                  border: '1px solid rgba(0,0,0,0.08)',
                  borderRadius: 2,
                  p: 2,
                  mb: 2,
                }}
              >
                <Typography sx={{ fontWeight: 900, mb: 1 }}>Thông tin giao dịch</Typography>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">
                      Mã giao dịch
                    </Typography>
                    <Typography sx={{ fontWeight: 800 }}>{selected.id}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">
                      Ngày giao dịch
                    </Typography>
                    <Typography sx={{ fontWeight: 800 }}>{selected.date}</Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Divider sx={{ my: 0.5 }} />
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">
                      Gói dịch vụ
                    </Typography>
                    <Typography sx={{ fontWeight: 800 }}>{selected.plan}</Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">
                      Phương thức thanh toán
                    </Typography>
                    <Typography sx={{ fontWeight: 800 }}>{METHOD_META[selected.method].label}</Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Divider sx={{ my: 0.5 }} />
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">
                      Số tiền
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sx={{ textAlign: 'right' }}>
                    <Typography sx={{ fontWeight: 900, color: '#0f7a3c', fontSize: 20 }}>
                      {formatVnd(selected.amountVnd)}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>

              {/* Customer info */}
              <Box sx={{ border: '1px solid rgba(0,0,0,0.08)', borderRadius: 2, p: 2 }}>
                <Typography sx={{ fontWeight: 900, mb: 1 }}>Thông tin khách hàng</Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="caption" color="text.secondary">
                      Họ và tên
                    </Typography>
                    <Typography sx={{ fontWeight: 800 }}>{selected.userName}</Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Divider sx={{ my: 0.5 }} />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="caption" color="text.secondary">
                      Email
                    </Typography>
                    <Typography sx={{ fontWeight: 800 }}>{selected.email}</Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Divider sx={{ my: 0.5 }} />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="caption" color="text.secondary">
                      Số điện thoại
                    </Typography>
                    <Typography sx={{ fontWeight: 800 }}>{selected.phone}</Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          ) : null}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
