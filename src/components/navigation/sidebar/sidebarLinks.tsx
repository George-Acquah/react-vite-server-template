import { NavLink, NavLinkProps } from "react-router-dom";
import { cn, useConfigurator } from "../../../utils";
import { Typography } from "../..";

export const SidebarLink = ({
  link,
  className,
  ...props
}: {
  link: _ILinks;
  className?: string;
  props?: NavLinkProps;
}) => {
  const {
    state: { openSidenav },
  } = useConfigurator();

  return (
    <NavLink
      to={link.href}
      aria-label={link.label}
      className={({isActive, isPending, isTransitioning}) =>
        cn("flex items-center justify-start gap-2 group/sidebar py-2", isPending ? '' : isActive ? '' : isTransitioning ? '' : '')
      }
      {...props}
    >
      {link.icon}
      <Typography
        variant="span"
        className={cn(
          "text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0 overflow-hidden",
          openSidenav ? "opacity-100 w-auto" : "opacity-0 w-0"
        )}
      >
        {link.label}
      </Typography>
    </NavLink>
  );
};
