'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { BellIcon } from '@phosphor-icons/react/dist/ssr/Bell';
import { ListIcon } from '@phosphor-icons/react/dist/ssr/List';
import { MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import { CaretDownIcon } from '@phosphor-icons/react/dist/ssr/CaretDown';

import { usePopover } from '@/hooks/use-popover';
import { Logo } from '@/components/core/logo';
import { paths } from '@/paths';
import RouterLink from 'next/link';

import { MobileNav } from './mobile-nav';
import { UserPopover } from './user-popover';

export function MainNav(): React.JSX.Element {
  const [openNav, setOpenNav] = React.useState<boolean>(false);

  const userPopover = usePopover<HTMLDivElement>();

  return (
    <React.Fragment>
      <Box
        component="header"
        sx={{
          borderBottom: '1px solid var(--mui-palette-divider)',
          backgroundColor: 'var(--mui-palette-background-paper)',
          position: 'sticky',
          top: 0,
          zIndex: 'var(--mui-zIndex-appBar)',
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{ alignItems: 'center', justifyContent: 'space-between', minHeight: '64px', px: 3 }}
        >
          <Stack sx={{ alignItems: 'center' }} direction="row" spacing={3}>
            <IconButton
              onClick={(): void => {
                setOpenNav(true);
              }}
              sx={{ display: { lg: 'none' } }}
            >
              <ListIcon />
            </IconButton>
            <Box component={RouterLink} href={paths.home} sx={{ display: 'inline-flex' }}>
              <Logo color="dark" height={32} width={122} />
            </Box>
            <Box
              sx={{
                position: 'relative',
                borderRadius: 1,
                backgroundColor: 'var(--mui-palette-action-hover)',
                '&:hover': {
                  backgroundColor: 'var(--mui-palette-action-selected)',
                },
                width: '300px',
                display: { xs: 'none', md: 'flex' },
              }}
            >
              <Box
                sx={{
                  padding: '8px 12px',
                  height: '100%',
                  position: 'absolute',
                  pointerEvents: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <MagnifyingGlassIcon />
              </Box>
              <InputBase
                placeholder="Q Tìm kiếm..."
                sx={{
                  color: 'inherit',
                  width: '100%',
                  '& .MuiInputBase-input': {
                    padding: '8px 8px 8px 40px',
                  },
                }}
              />
            </Box>
          </Stack>
          <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
            <Tooltip title="Notifications">
              <Badge badgeContent={4} color="error" variant="dot">
                <IconButton>
                  <BellIcon />
                </IconButton>
              </Badge>
            </Tooltip>
            <Box
              onClick={userPopover.handleOpen}
              ref={userPopover.anchorRef}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                cursor: 'pointer',
                p: 1,
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: 'var(--mui-palette-action-hover)',
                },
              }}
            >
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>A</Avatar>
              <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Admin
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  admin@system.com
                </Typography>
              </Box>
              <CaretDownIcon />
            </Box>
          </Stack>
        </Stack>
   
      </Box>
      <UserPopover anchorEl={userPopover.anchorRef.current} onClose={userPopover.handleClose} open={userPopover.open} />
      <MobileNav
        onClose={() => {
          setOpenNav(false);
        }}
        open={openNav}
      />
    </React.Fragment>
  );
}
