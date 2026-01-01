import { config } from "@/config";
import CompanyManagementPage from "./CompanyManagementPage";

export const metadata = {
  title: `Quản lý Công ty | ${config.site.name}`,
};

export default function Page() {
  return <CompanyManagementPage />;
}
