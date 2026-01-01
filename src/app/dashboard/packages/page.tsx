import { config } from "@/config";
import PackagesManagementPage from "./PackagesManagementPage";

export const metadata = {
  title: `Quản lý Gói | ${config.site.name}`,
};

export default function Page() {
  return <PackagesManagementPage />;
}
