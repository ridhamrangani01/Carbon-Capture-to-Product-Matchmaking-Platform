"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardRoleRouter() {
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("c2p_user");
    if (stored) {
      try {
        const u = JSON.parse(stored);
        if (u.role === "ADMIN") router.push("/dashboard/admin");
        else if (u.role === "UTILIZER") router.push("/dashboard/utilizer");
        else if (u.role === "RESEARCHER") router.push("/dashboard/researcher");
        else router.push("/dashboard/emitter");
        return;
      } catch (e) {}
    }
    router.push("/dashboard/emitter");
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 text-sm">
      Routing to your role dashboard...
    </div>
  );
}
