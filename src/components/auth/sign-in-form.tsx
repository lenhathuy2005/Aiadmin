'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { EyeSlashIcon } from '@phosphor-icons/react/dist/ssr/EyeSlash';
import { EnvelopeIcon } from '@phosphor-icons/react/dist/ssr/Envelope';
import { LockIcon } from '@phosphor-icons/react/dist/ssr/Lock';
import { GridNineIcon } from '@phosphor-icons/react/dist/ssr/GridNine';
import { InfoIcon } from '@phosphor-icons/react/dist/ssr/Info';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import { paths } from '@/paths';
import { authClient } from '@/lib/auth/client';
import { useUser } from '@/hooks/use-user';

const schema = zod.object({
  email: zod.string().min(1, { message: 'Email là bắt buộc' }).email({ message: 'Email không hợp lệ' }),
  password: zod.string().min(1, { message: 'Mật khẩu là bắt buộc' }),
  remember: zod.boolean().optional(),
});

type Values = zod.infer<typeof schema>;

const defaultValues = { email: 'admin@example.com', password: 'admin123', remember: false } satisfies Values;

export function SignInForm(): React.JSX.Element {
  const router = useRouter();

  const { checkSession } = useUser();

  const [showPassword, setShowPassword] = React.useState<boolean>();

  const [isPending, setIsPending] = React.useState<boolean>(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      setIsPending(true);

      const { error } = await authClient.signInWithPassword(values);

      if (error) {
        setError('root', { type: 'server', message: error });
        setIsPending(false);
        return;
      }

      // Refresh the auth state
      await checkSession?.();

      // UserProvider, for this case, will not refresh the router
      // After refresh, GuestGuard will handle the redirect
      router.refresh();
    },
    [checkSession, router, setError]
  );

  return (
    <Stack spacing={4} sx={{ width: '100%' }}>
      {/* Logo Icon */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: '#10b981',
            borderRadius: 1,
          }}
        >
          <GridNineIcon fontSize="24px" color="#fff" weight="fill" />
        </Box>
      </Box>

      {/* Title and Subtitle */}
      <Stack spacing={1}>
        <Typography variant="h3" sx={{ fontWeight: 700, color: 'text.primary' }}>
          Chào mừng trở lại
        </Typography>
        <Typography color="text.secondary" variant="body1">
          Đăng nhập để truy cập dashboard quản trị
        </Typography>
      </Stack>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <FormControl error={Boolean(errors.email)} fullWidth>
                <InputLabel>Email</InputLabel>
                <OutlinedInput
                  {...field}
                  label="Email"
                  type="email"
                  startAdornment={
                    <InputAdornment position="start">
                      <EnvelopeIcon fontSize="var(--icon-fontSize-md)" color="var(--mui-palette-text-secondary)" />
                    </InputAdornment>
                  }
                />
                {errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <FormControl error={Boolean(errors.password)} fullWidth>
                <InputLabel>Mật khẩu</InputLabel>
                <OutlinedInput
                  {...field}
                  label="Mật khẩu"
                  type={showPassword ? 'text' : 'password'}
                  startAdornment={
                    <InputAdornment position="start">
                      <LockIcon fontSize="var(--icon-fontSize-md)" color="var(--mui-palette-text-secondary)" />
                    </InputAdornment>
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={(): void => {
                          setShowPassword(!showPassword);
                        }}
                        edge="end"
                      >
                        {showPassword ? (
                          <EyeSlashIcon fontSize="var(--icon-fontSize-md)" />
                        ) : (
                          <EyeIcon fontSize="var(--icon-fontSize-md)" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <Controller
              control={control}
              name="remember"
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} checked={field.value || false} />}
                  label="Ghi nhớ đăng nhập"
                />
              )}
            />
            <Link
              component={RouterLink}
              href={paths.auth.resetPassword}
              sx={{ color: '#10b981', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
              variant="body2"
            >
              Quên mật khẩu?
            </Link>
          </Stack>
          {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
          <Button
            disabled={isPending}
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              bgcolor: '#10b981',
              py: 1.5,
              fontSize: '16px',
              fontWeight: 600,
              '&:hover': {
                bgcolor: '#059669',
              },
            }}
          >
            Đăng nhập
          </Button>
        </Stack>
      </form>

      {/* Demo Info Box */}
      <Box
        sx={{
          bgcolor: '#e0f2fe',
          borderRadius: 1,
          p: 2,
          border: '1px solid #bae6fd',
        }}
      >
        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
          <InfoIcon fontSize="var(--icon-fontSize-md)" color="#0284c7" />
          <Typography variant="body2" sx={{ fontWeight: 600, color: '#0284c7' }}>
            Thông tin đăng nhập demo:
          </Typography>
        </Stack>
        <Stack spacing={0.5}>
          <Typography variant="body2" sx={{ color: '#0284c7' }}>
            Email:{' '}
            <Typography component="span" sx={{ fontWeight: 700 }} variant="body2">
              admin@example.com
            </Typography>
          </Typography>
          <Typography variant="body2" sx={{ color: '#0284c7' }}>
            Mật khẩu:{' '}
            <Typography component="span" sx={{ fontWeight: 700 }} variant="body2">
              admin123
            </Typography>
          </Typography>
        </Stack>
      </Box>

      {/* Sign Up Link */}
      <Typography align="center" variant="body2" sx={{ color: 'text.secondary' }}>
        Chưa có tài khoản?{' '}
        <Link
          component={RouterLink}
          href={paths.auth.signUp}
          sx={{ color: '#10b981', textDecoration: 'none', fontWeight: 600, '&:hover': { textDecoration: 'underline' } }}
        >
          Đăng ký ngay
        </Link>
      </Typography>

      {/* Footer */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mt: 4 }}>
        <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
          Designed by
        </Typography>
        <Box
          sx={{
            width: 12,
            height: 12,
            borderRadius: '2px',
            bgcolor: '#a855f7',
            transform: 'rotate(45deg)',
          }}
        />
        <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
          Readdy
        </Typography>
      </Box>
    </Stack>
  );
}
