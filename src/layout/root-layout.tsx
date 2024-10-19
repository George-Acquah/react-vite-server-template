import { FC, useState, useEffect } from "react";
import { cn, THEME } from "../utils";
import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/navigation";

const Layout: FC = () => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700",
        "h-screen overflow-hidden"
      )}
    >
      <div className="flex-none">
        <Sidebar />
      </div>
      <div className="overflow-y-auto flex-1">
        <div
          className={`p-2 md:px-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 ${THEME.mainBg} min-h-full flex flex-col gap-2`}
        >
          <div className="md:mb-4 flex flex-row justify-between items-center">
            
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
