import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

import { isAdmin } from "@/lib/admin";

const App = dynamic(() => import("./app"), { ssr: false });

export default async function AdminPage() {
  if (!isAdmin()) redirect("/");

  return <App />;
}
