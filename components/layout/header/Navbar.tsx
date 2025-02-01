"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {  navbarStructur } from "./navbar-data-items";

export function Navbar({
  classNameNavigationTriger,
}: {
  classNameNavigationTriger?: string;
}) {
  return (
    <NavigationMenu className="py-1">
      <NavigationMenuList className="divide-x divide-zinc-300">
        {navbarStructur?.map((nav, index) => (
          <NavigationMenuItem key={index} className="">
              <NavigationMenuLink
                className={cn(
                  classNameNavigationTriger,
                  navigationMenuTriggerStyle(),
                  "hover:!bg-zinc-100/50 px-2"
                )}
                href={nav.items[0]?.href}
              >
                {nav?.title}
              </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
        
      </NavigationMenuList>
    </NavigationMenu>
  );
}


const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
