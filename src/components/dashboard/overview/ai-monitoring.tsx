import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { CheckCircleIcon } from '@phosphor-icons/react/dist/ssr/CheckCircle';

export interface AIMonitoringProps {
  sx?: SxProps;
}

export function AIMonitoring({ sx }: AIMonitoringProps): React.JSX.Element {
  return (
    <Card sx={sx}>
      <CardHeader title="Giám sát AI" />
      <CardContent>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2">Độ chính xác AI</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: 'var(--mui-palette-success-main)',
                }}
              />
              <Typography variant="body2" fontWeight={500}>
                94.5%
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2">Thời gian phản hồi</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: 'var(--mui-palette-warning-main)',
                }}
              />
              <Typography variant="body2" fontWeight={500}>
                1.2s
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2">Tỷ lệ lỗi</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: 'var(--mui-palette-success-main)',
                }}
              />
              <Typography variant="body2" fontWeight={500}>
                0.3%
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2">Requests/giờ</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: 'var(--mui-palette-warning-main)',
                }}
              />
              <Typography variant="body2" fontWeight={500}>
                2,847
              </Typography>
            </Box>
          </Box>
          <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid var(--mui-palette-divider)' }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Trạng thái hệ thống
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CheckCircleIcon color="var(--mui-palette-success-main)" fontSize="var(--icon-fontSize-md)" />
              <Typography variant="body2" fontWeight={500}>
                Hoạt động tốt
              </Typography>
            </Box>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

