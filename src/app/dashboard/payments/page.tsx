import { config } from "@/config";
import PaymentsManagementPage from "./PaymentsManagementPage";

export const metadata = {
  title: `Quản lý Thanh toán | ${config.site.name}`,
};

export default function Page() {
  return <PaymentsManagementPage />;
}
