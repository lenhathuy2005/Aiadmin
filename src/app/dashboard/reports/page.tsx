import { config } from "@/config";
import ReportsManagementPage from "./ReportsManagementPage";

export const metadata = {
  title: `Báo cáo | ${config.site.name}`,
};

export default function Page() {
  return <ReportsManagementPage />;
}
