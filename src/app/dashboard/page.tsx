import * as React from 'react';
import type { Metadata } from 'next';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { config } from '@/config';
import { TotalUsers } from '@/components/dashboard/overview/total-users';
import { Recruiters } from '@/components/dashboard/overview/recruiters';
import { InterviewsToday } from '@/components/dashboard/overview/interviews-today';
import { MonthlyRevenue } from '@/components/dashboard/overview/monthly-revenue';
import { UserChart } from '@/components/dashboard/overview/user-chart';
import { AIMonitoring } from '@/components/dashboard/overview/ai-monitoring';
import { QuickActions } from '@/components/dashboard/overview/quick-actions';

export const metadata = { title: `Dashboard Tổng quan | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ mb: 1 }}>
          Dashboard Tổng quan
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Chào mừng trở lại! Đây là tổng quan hệ thống của bạn.
        </Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid
          size={{
            lg: 3,
            sm: 6,
            xs: 12,
          }}
        >
          <TotalUsers diff={12.5} trend="up" sx={{ height: '100%' }} value="12,458" />
        </Grid>
        <Grid
          size={{
            lg: 3,
            sm: 6,
            xs: 12,
          }}
        >
          <Recruiters diff={8.2} trend="up" sx={{ height: '100%' }} value="3,247" />
        </Grid>
        <Grid
          size={{
            lg: 3,
            sm: 6,
            xs: 12,
          }}
        >
          <InterviewsToday diff={23.1} trend="up" sx={{ height: '100%' }} value="847" />
        </Grid>
        <Grid
          size={{
            lg: 3,
            sm: 6,
            xs: 12,
          }}
        >
          <MonthlyRevenue diff={15.3} trend="up" sx={{ height: '100%' }} value="₫45.2M" />
        </Grid>
        <Grid
          size={{
            lg: 8,
            xs: 12,
          }}
        >
          <UserChart sx={{ height: '100%' }} />
        </Grid>
        <Grid
          size={{
            lg: 4,
            xs: 12,
          }}
        >
          <AIMonitoring sx={{ height: '100%' }} />
        </Grid>
        <Grid
          size={{
            xs: 12,
          }}
        >
          <QuickActions sx={{ height: '100%' }} />
        </Grid>
      </Grid>
    </Box>
  );
}
