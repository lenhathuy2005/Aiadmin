import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import type { SxProps } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export interface UserChartProps {
  sx?: SxProps;
}

export function UserChart({ sx }: UserChartProps): React.JSX.Element {
  return (
    <Card sx={sx}>
      <CardHeader title="Biểu đồ người dùng" />
      <CardContent>
        <Box
          sx={{
            height: '300px',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-around',
            gap: 1,
            borderBottom: '1px solid var(--mui-palette-divider)',
            pb: 2,
          }}
        >
          {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8'].map((label) => (
            <Box key={label} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: '40px',
                  height: '200px',
                  backgroundColor: 'var(--mui-palette-action-hover)',
                  borderRadius: '4px 4px 0 0',
                }}
              />
              <Typography variant="caption" color="text.secondary">
                {label}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

