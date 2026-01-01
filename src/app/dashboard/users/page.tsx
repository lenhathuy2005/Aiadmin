import { config } from "@/config";
import UsersManagementPage from "./UsersManagementPage";

export const metadata = {
  title: `Quản lý Users | ${config.site.name}`,
};

export default function Page() {
  return <UsersManagementPage />;
}
