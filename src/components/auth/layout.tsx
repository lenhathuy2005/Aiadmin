import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ChartLineUpIcon } from '@phosphor-icons/react/dist/ssr/ChartLineUp';
import { ShieldCheckIcon } from '@phosphor-icons/react/dist/ssr/ShieldCheck';
import { FastForwardIcon } from '@phosphor-icons/react/dist/ssr/FastForward';
import { ChartBarIcon } from '@phosphor-icons/react/dist/ssr/ChartBar';

export interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <Box
      sx={{
        display: { xs: 'flex', lg: 'grid' },
        flexDirection: 'column',
        gridTemplateColumns: '1fr 1fr',
        minHeight: '100vh',
      }}
    >
      {/* Left Side - Login Form */}
      <Box
        sx={{
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
          bgcolor: 'background.paper',
        }}
      >
        <Box sx={{ alignItems: 'center', display: 'flex', flex: '1 1 auto', justifyContent: 'center', p: 4 }}>
          <Box sx={{ maxWidth: '450px', width: '100%' }}>{children}</Box>
        </Box>
      </Box>

      {/* Right Side - Marketing Content */}
      <Box
        sx={{
          alignItems: 'center',
          background: 'linear-gradient(180deg, #10b981 0%, #059669 100%)',
          color: 'var(--mui-palette-common-white)',
          display: { xs: 'none', lg: 'flex' },
          flexDirection: 'column',
          justifyContent: 'center',
          p: 6,
          position: 'relative',
        }}
      >
        <Stack spacing={4} sx={{ maxWidth: '500px', width: '100%' }}>
          {/* Chart Icon */}
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <ChartLineUpIcon fontSize="120px" color="#fff" weight="duotone" />
          </Box>

          {/* Title */}
          <Typography
            color="inherit"
            sx={{
              fontSize: '32px',
              lineHeight: '40px',
              textAlign: 'center',
              fontWeight: 700,
            }}
            variant="h1"
          >
            Quản lý hiệu quả với Dashboard Admin
          </Typography>

          {/* Description */}
          <Typography align="center" variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '16px' }}>
            Theo dõi và quản lý toàn bộ hệ thống của bạn một cách dễ dàng với giao diện trực quan và các công cụ mạnh
            mẽ.
          </Typography>

          {/* Features */}
          <Stack spacing={3} sx={{ mt: 2 }}>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-start' }}>
              <Box sx={{ flexShrink: 0, mt: 0.5 }}>
                <ShieldCheckIcon fontSize="24px" color="#fff" weight="duotone" />
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                  Bảo mật cao
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  Mã hóa dữ liệu và xác thực an toàn
                </Typography>
              </Box>
            </Stack>

            <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-start' }}>
              <Box sx={{ flexShrink: 0, mt: 0.5 }}>
                <FastForwardIcon fontSize="24px" color="#fff" weight="duotone" />
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                  Hiệu suất cao
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  Xử lý nhanh chóng và mượt mà
                </Typography>
              </Box>
            </Stack>

            <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-start' }}>
              <Box sx={{ flexShrink: 0, mt: 0.5 }}>
                <ChartBarIcon fontSize="24px" color="#fff" weight="duotone" />
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                  Thống kê chi tiết
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  Báo cáo và phân tích dữ liệu thời gian thực
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
