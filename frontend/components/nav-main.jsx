"use client"
import Link from "next/link";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

export function NavMain({
  items
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Generate</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuButton tooltip={item.title} key={item.title} className="h-[40px]">
            < Link className="group/collapsible flex gap-2 items-center justify-center" href={item.url} key={item.title} >
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
