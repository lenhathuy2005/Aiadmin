import { config } from "@/config";
import RecruitersManagementPage from "./RecruitersManagementPage";

export const metadata = {
  title: `Quản lý Recruiters | ${config.site.name}`,
};

export default function Page() {
  return <RecruitersManagementPage />;
}
