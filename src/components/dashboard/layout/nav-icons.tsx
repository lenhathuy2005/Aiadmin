import type { Icon } from '@phosphor-icons/react/dist/lib/types';
import { ChartPieIcon } from '@phosphor-icons/react/dist/ssr/ChartPie';
import { GearSixIcon } from '@phosphor-icons/react/dist/ssr/GearSix';
import { PlugsConnectedIcon } from '@phosphor-icons/react/dist/ssr/PlugsConnected';
import { UserIcon } from '@phosphor-icons/react/dist/ssr/User';
import { UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';
import { XSquare } from '@phosphor-icons/react/dist/ssr/XSquare';
import { BriefcaseIcon } from '@phosphor-icons/react/dist/ssr/Briefcase';
import { CalendarIcon } from '@phosphor-icons/react/dist/ssr/Calendar';
import { QuestionIcon } from '@phosphor-icons/react/dist/ssr/Question';
import { BuildingIcon } from '@phosphor-icons/react/dist/ssr/Building';
import { PackageIcon } from '@phosphor-icons/react/dist/ssr/Package';
import { CreditCardIcon } from '@phosphor-icons/react/dist/ssr/CreditCard';
import { MonitorIcon } from '@phosphor-icons/react/dist/ssr/Monitor';
import { FileTextIcon } from '@phosphor-icons/react/dist/ssr/FileText';
import { SignOutIcon } from '@phosphor-icons/react/dist/ssr/SignOut';
import { ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';
import { GridNineIcon } from '@phosphor-icons/react/dist/ssr/GridNine';
import { CurrencyCircleDollarIcon } from '@phosphor-icons/react/dist/ssr/CurrencyCircleDollar';
import { EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';

export const navIcons = {
  'chart-pie': ChartPieIcon,
  'gear-six': GearSixIcon,
  'plugs-connected': PlugsConnectedIcon,
  'x-square': XSquare,
  user: UserIcon,
  users: UsersIcon,
  briefcase: BriefcaseIcon,
  calendar: CalendarIcon,
  question: QuestionIcon,
  building: BuildingIcon,
  package: PackageIcon,
  'credit-card': CreditCardIcon,
  monitor: MonitorIcon,
  'file-text': FileTextIcon,
  'sign-out': SignOutIcon,
  'arrow-left': ArrowLeftIcon,
  'grid-nine': GridNineIcon,
  'currency-circle-dollar': CurrencyCircleDollarIcon,
  eye: EyeIcon,
} as Record<string, Icon>;
