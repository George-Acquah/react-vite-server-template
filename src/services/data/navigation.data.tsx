import {
  BriefcaseIcon,
  CodeBracketIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

export const sidebarLinks: _ILinks[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: (
      <CodeBracketIcon className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Inventory",
    href: "/dashboard/inventory",
    parent: "Tables",
    icon: (
      <BriefcaseIcon className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Transactions",
    href: "/dashboard/transactions",
    icon: (
      <UsersIcon className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
];
