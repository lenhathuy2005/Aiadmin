import { config } from "@/config";
import AIMonitoringPage from "./AIMonitoringPage";

export const metadata = {
  title: `Giám sát AI | ${config.site.name}`,
};

export default function Page() {
  return <AIMonitoringPage />;
}
