"use client"

import * as React from "react"
import {
  AudioWaveform,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Instagram,
  Facebook,
  Home,
  Sparkles
} from "lucide-react"

import Link from "next/link"
import { Whatsapp, Snapchat } from "@/sections/uni/icons"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/sidebarHeader"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

import { ModeToggle } from "@/components/themeChanger"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  brand: [
    {
      name: "SSgen",
      logo: Sparkles,
    }
  ],
  navMain: [
    {
      title: "Instagram",
      url: "#",
      icon: Instagram,
    },
    {
      title: "Whatsapp",
      url: "#",
      icon: Whatsapp,
    },
    {
      title: "Facebook",
      url: "#",
      icon: Facebook,
    },
    {
      title: "Snapchat",
      url: "#",
      icon: Snapchat,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({
  ...props
}) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center rounded-md hover:bg-muted">
          <TeamSwitcher brand={data.brand} />
          <div className="group-data-[collapsible=icon]:hidden mr-2">
            <ModeToggle />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuButton tooltip="Home" className="h-[48px]">
              <Link className="group/collapsible flex gap-2 items-center justify-center" href="/home">
                <Home size={28} className="group-data-[collapsible=icon]:h-[16px] group-data-[collapsible=icon]:w-[16px]" /> <span className="text-[18px] font-semibold">Home</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenu >
        </SidebarGroup>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
