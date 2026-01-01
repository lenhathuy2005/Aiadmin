import { config } from "@/config";
import SystemSettingsPage from "./SystemSettingsPage";

export const metadata = {
  title: `Cài đặt hệ thống | ${config.site.name}`,
};

export default function Page() {
  return <SystemSettingsPage />;
}
