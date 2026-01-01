import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'overview', title: 'Dashboard', href: paths.dashboard.overview, icon: 'grid-nine' },
  { key: 'users', title: 'Quản lý Users', href: paths.dashboard.users, icon: 'users' },
  { key: 'recruiters', title: 'Quản lý Recruiters', href: paths.dashboard.recruiters, icon: 'briefcase' },
  { key: 'questions', title: 'Quản lý Câu hỏi', href: paths.dashboard.questions, icon: 'question' },
  { key: 'company', title: 'Quản lý Công ty', href: paths.dashboard.company, icon: 'building' },
  { key: 'packages', title: 'Quản lý Gói', href: paths.dashboard.packages, icon: 'package' },
  { key: 'payments', title: 'Quản lý Thanh toán', href: paths.dashboard.payments, icon: 'currency-circle-dollar' },
  { key: 'aiMonitoring', title: 'Giám sát AI', href: paths.dashboard.aiMonitoring, icon: 'eye' },
  { key: 'reports', title: 'Báo cáo', href: paths.dashboard.reports, icon: 'file-text' },
  { key: 'systemSettings', title: 'Cài đặt hệ thống', href: paths.dashboard.systemSettings, icon: 'gear-six' },
] satisfies NavItemConfig[];
