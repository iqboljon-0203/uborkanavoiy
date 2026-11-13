import { adminConfigured, isAdmin } from "@/lib/auth";
import { getContent } from "@/lib/content";
import { storageMode } from "@/lib/storage";
import AdminApp from "./AdminApp";
import Login from "./Login";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!adminConfigured()) {
    return (
      <main className="adm-center">
        <div className="adm-card">
          <h1>Admin panel sozlanmagan</h1>
          <p>
            Hosting sozlamalarida <code>ADMIN_PASSWORD</code> (kamida 8 belgi) va <code>ADMIN_SECRET</code> qiymatlarini kiriting,
            so‘ng saytni qayta ishga tushiring.
          </p>
        </div>
      </main>
    );
  }
  if (!(await isAdmin())) return <Login />;
  const content = await getContent();
  return <AdminApp initial={content} storage={storageMode()} />;
}
