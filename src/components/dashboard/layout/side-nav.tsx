'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import type { NavItemConfig } from '@/types/nav';
import { isNavItemActive } from '@/lib/is-nav-item-active';
import { navItems } from './config';
import { navIcons } from './nav-icons';
import { authClient } from '@/lib/auth/client';
import { logger } from '@/lib/default-logger';
import { useUser } from '@/hooks/use-user';

export function SideNav(): React.JSX.Element {
  const pathname = usePathname();
  const { checkSession } = useUser();
  const router = useRouter();

  const handleSignOut = React.useCallback(async (): Promise<void> => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        logger.error('Sign out error', error);
        return;
      }

      await checkSession?.();
      router.refresh();
    } catch (error) {
      logger.error('Sign out error', error);
    }
  }, [checkSession, router]);

  const ArrowLeftIcon = navIcons['arrow-left'];
  const SignOutIcon = navIcons['sign-out'];

  return (
    <Box
      sx={{
        '--SideNav-background': '#10b981',
        '--SideNav-color': 'var(--mui-palette-common-white)',
        '--NavItem-color': 'rgba(255, 255, 255, 0.9)',
        '--NavItem-hover-background': 'rgba(255, 255, 255, 0.1)',
        '--NavItem-active-background': 'rgba(255, 255, 255, 0.2)',
        '--NavItem-active-color': 'var(--mui-palette-common-white)',
        '--NavItem-disabled-color': 'rgba(255, 255, 255, 0.5)',
        '--NavItem-icon-color': 'rgba(255, 255, 255, 0.9)',
        '--NavItem-icon-active-color': 'var(--mui-palette-common-white)',
        '--NavItem-icon-disabled-color': 'rgba(255, 255, 255, 0.5)',
        bgcolor: 'var(--SideNav-background)',
        color: 'var(--SideNav-color)',
        display: { xs: 'none', lg: 'flex' },
        flexDirection: 'column',
        height: '100%',
        left: 0,
        maxWidth: '100%',
        position: 'fixed',
        scrollbarWidth: 'none',
        top: 0,
        width: 'var(--SideNav-width)',
        zIndex: 'var(--SideNav-zIndex)',
        '&::-webkit-scrollbar': { display: 'none' },
      }}
    >
      {/* Header với logo và collapse icon */}
      <Stack
        direction="row"
        spacing={2}
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flex: 1 }}>
          <Avatar
            sx={{
              bgcolor: '#10b981',
              width: 40,
              height: 40,
              fontSize: '16px',
              fontWeight: 700,
            }}
          >
            AI
          </Avatar>
          <Typography
            sx={{
              color: '#fff',
              fontSize: '18px',
              fontWeight: 700,
              letterSpacing: '0.5px',
            }}
          >
            AIQuestTalk
          </Typography>
        </Stack>
        {ArrowLeftIcon && (
          <IconButton
            sx={{
              color: 'rgba(255, 255, 255, 0.9)',
              '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' },
            }}
          >
            <ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />
          </IconButton>
        )}
      </Stack>

      {/* Navigation Items */}
      <Box component="nav" sx={{ flex: '1 1 auto', p: '12px', overflowY: 'auto' }}>
        {renderNavItems({ pathname, items: navItems })}
      </Box>

      {/* Footer */}
      <Box sx={{ p: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
    
        <Button
          component="button"
          startIcon={SignOutIcon ? <SignOutIcon fontSize="var(--icon-fontSize-md)" /> : null}
          fullWidth
          onClick={handleSignOut}
          sx={{
            color: 'rgba(255, 255, 255, 0.9)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
          variant="text"
        >
          Đăng xuất
        </Button>
      </Box>
    </Box>
  );
}

function renderNavItems({ items = [], pathname }: { items?: NavItemConfig[]; pathname: string }): React.JSX.Element {
  const children = items.reduce((acc: React.ReactNode[], curr: NavItemConfig): React.ReactNode[] => {
    const { key, ...item } = curr;

    acc.push(<NavItem key={key} pathname={pathname} {...item} />);

    return acc;
  }, []);

  return (
    <Stack component="ul" spacing={1} sx={{ listStyle: 'none', m: 0, p: 0 }}>
      {children}
    </Stack>
  );
}

interface NavItemProps extends Omit<NavItemConfig, 'items'> {
  pathname: string;
}

function NavItem({ disabled, external, href, icon, matcher, pathname, title }: NavItemProps): React.JSX.Element {
  const active = isNavItemActive({ disabled, external, href, matcher, pathname });
  const Icon = icon ? navIcons[icon] : null;

  return (
    <li>
      <Box
        {...(href
          ? {
              component: external ? 'a' : RouterLink,
              href,
              target: external ? '_blank' : undefined,
              rel: external ? 'noreferrer' : undefined,
            }
          : { role: 'button' })}
        sx={{
          alignItems: 'center',
          borderRadius: '8px',
          color: 'var(--NavItem-color)',
          cursor: 'pointer',
          display: 'flex',
          flex: '0 0 auto',
          gap: 1.5,
          p: '10px 16px',
          position: 'relative',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          transition: 'all 0.2s',
          ...(disabled && {
            bgcolor: 'var(--NavItem-disabled-background)',
            color: 'var(--NavItem-disabled-color)',
            cursor: 'not-allowed',
          }),
          ...(active && {
            bgcolor: 'var(--NavItem-active-background)',
            color: 'var(--NavItem-active-color)',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }),
          '&:hover': {
            bgcolor: active ? 'var(--NavItem-active-background)' : 'var(--NavItem-hover-background)',
          },
        }}
      >
        <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', flex: '0 0 auto' }}>
          {Icon ? (
            <Icon
              fill={active ? 'var(--NavItem-icon-active-color)' : 'var(--NavItem-icon-color)'}
              fontSize="var(--icon-fontSize-md)"
              weight={active ? 'fill' : undefined}
            />
          ) : null}
        </Box>
        <Box sx={{ flex: '1 1 auto' }}>
          <Typography
            component="span"
            sx={{ color: 'inherit', fontSize: '0.875rem', fontWeight: 500, lineHeight: '28px' }}
          >
            {title}
          </Typography>
        </Box>
      </Box>
    </li>
  );
}
