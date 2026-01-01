import { config } from "@/config";
import SystemSettingsPage from "../system-settings/SystemSettingsPage";

export const metadata = {
  title: `Cài đặt hệ thống | ${config.site.name}`,
};

export default function Page() {
  return <SystemSettingsPage />;
}
