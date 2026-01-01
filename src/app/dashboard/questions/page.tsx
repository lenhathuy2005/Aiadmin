import { config } from "@/config";
import QuestionsManagementPage from "./QuestionsManagementPage";

export const metadata = {
  title: `Quản lý Câu hỏi | ${config.site.name}`,
};

export default function Page() {
  return <QuestionsManagementPage />;
}
