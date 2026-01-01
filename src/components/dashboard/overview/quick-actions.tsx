import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { UserPlusIcon } from '@phosphor-icons/react/dist/ssr/UserPlus';
import { ChatCircleDotsIcon } from '@phosphor-icons/react/dist/ssr/ChatCircleDots';
import { ChartBarIcon } from '@phosphor-icons/react/dist/ssr/ChartBar';
import { GearSixIcon } from '@phosphor-icons/react/dist/ssr/GearSix';

export interface QuickActionsProps {
  sx?: SxProps;
}

export function QuickActions({ sx }: QuickActionsProps): React.JSX.Element {
  return (
    <Card sx={sx}>
      <CardHeader title="Thao tác nhanh" />
      <CardContent>
        <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', gap: 2 }}>
          <Button
            variant="outlined"
            sx={{
              flex: '1 1 calc(50% - 8px)',
              minWidth: '120px',
              height: '100px',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <UserPlusIcon fontSize="var(--icon-fontSize-xl)" color="var(--mui-palette-primary-main)" />
            <Typography variant="body2">Thêm User</Typography>
          </Button>
          <Button
            variant="outlined"
            sx={{
              flex: '1 1 calc(50% - 8px)',
              minWidth: '120px',
              height: '100px',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <ChatCircleDotsIcon fontSize="var(--icon-fontSize-xl)" color="var(--mui-palette-success-main)" />
            <Typography variant="body2">Thêm Câu hỏi</Typography>
          </Button>
          <Button
            variant="outlined"
            sx={{
              flex: '1 1 calc(50% - 8px)',
              minWidth: '120px',
              height: '100px',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <ChartBarIcon fontSize="var(--icon-fontSize-xl)" color="#9c27b0" />
            <Typography variant="body2">Xem Báo cáo</Typography>
          </Button>
          <Button
            variant="outlined"
            sx={{
              flex: '1 1 calc(50% - 8px)',
              minWidth: '120px',
              height: '100px',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <GearSixIcon fontSize="var(--icon-fontSize-xl)" color="#ff9800" />
            <Typography variant="body2">Cài đặt AI</Typography>
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

