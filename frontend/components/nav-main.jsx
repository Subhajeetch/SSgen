"use client"
import Link from "next/link";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation";

export function NavMain({
  items
}) {
  const currentPath = usePathname();

  // check if the url is same as the url on the nav manu so we can highlight it
  const isActive = path => currentPath === path;



  return (
    <SidebarGroup>
      <SidebarGroupLabel>Generate</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuButton tooltip={item.title} key={item.title} className={`h-[40px] ${isActive(`/generate/${item.title.toLowerCase()}`) ? "bg-muted" : ""
            }`}>
            < Link className="group/collapsible flex gap-2 items-center w-full h-full group-data-[collapsible=icon]:w-fit" href={item.url} key={item.title} >
              {item.icon && <item.icon size={22} className="group-data-[collapsible=icon]:h-[16px] group-data-[collapsible=icon]:w-[16px]" />}
              < span className="text-[16px] font-semibold" > {item.title}</span>
            </Link>
          </SidebarMenuButton >
        ))
        }
      </SidebarMenu >
    </SidebarGroup >
  );
}
