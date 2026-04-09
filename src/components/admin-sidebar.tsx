"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  IconUsers,
  IconFileText,
  IconPhoto,
  IconBuildingCommunity,
  IconHelp,
  IconChartBar,
  IconBulb,
  IconHandStop,
  IconHeart,
  IconPhone,
  IconExternalLink,
  IconStar,
  IconLogout,
  IconChevronDown,
} from "@tabler/icons-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSupabase } from "@/hooks/use-supabase"
import { signOut } from "@/app/admin/actions"
import type { User } from "@supabase/supabase-js"

const navItems = [
  {
    group: "Website Content",
    items: [
      { title: "Hero Section",  url: "/admin/hero",    icon: IconStar },
      { title: "Sectors",       url: "/admin/sectors", icon: IconBuildingCommunity },
      { title: "Team Members",  url: "/admin/team",    icon: IconUsers },
      { title: "Blog Posts",    url: "/admin/blog",    icon: IconFileText },
      { title: "Gallery",       url: "/admin/gallery", icon: IconPhoto },
    ],
  },
  {
    group: "Site Details",
    items: [
      { title: "Impact Stats",           url: "/admin/stats",      icon: IconChartBar },
      { title: "Core Values",            url: "/admin/values",     icon: IconBulb },
      { title: "FAQs",                   url: "/admin/faq",        icon: IconHelp },
      { title: "Partners",               url: "/admin/partners",   icon: IconHandStop },
      { title: "Volunteers",             url: "/admin/volunteers", icon: IconHeart },
      { title: "Contact Info",           url: "/admin/contact",    icon: IconPhone },
    ],
  },
]

function UserButton({ user }: { user: User | null }) {
  const router = useRouter()

  const initials = user?.email
    ? user.email.slice(0, 2).toUpperCase()
    : "AD"

  const displayName = user?.user_metadata?.full_name
    ?? user?.email?.split("@")[0]
    ?? "Admin"

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors group">
          <Avatar className="size-8 shrink-0 border border-border">
            <AvatarFallback className="bg-[#d67653]/15 text-[#d67653] font-semibold text-xs">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0 text-left">
            <p className="font-medium text-sm truncate leading-tight">{displayName}</p>
            <p className="text-xs text-muted-foreground truncate leading-tight">{user?.email ?? "Not signed in"}</p>
          </div>
          <IconChevronDown className="size-3.5 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="top" className="w-56 mb-1">
        <div className="px-3 py-2">
          <p className="text-xs font-medium">{displayName}</p>
          <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <a href="https://www.itsprobono.org" target="_blank" rel="noopener noreferrer" className="cursor-pointer">
            <IconExternalLink className="size-4 mr-2" />
            View Website
          </a>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleSignOut}
          className="text-destructive focus:text-destructive cursor-pointer"
        >
          <IconLogout className="size-4 mr-2" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function AdminSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const { supabase } = useSupabase()
  const [user, setUser] = React.useState<User | null>(null)

  React.useEffect(() => {
    if (!supabase) return
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user))

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [supabase])

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      {/* ── Header ── */}
      <SidebarHeader className="border-b border-border/50 pb-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="h-auto py-2">
              <Link href="/admin/hero">
                <div className="flex size-8 items-center justify-center rounded-lg bg-[#d67653] text-white font-bold text-sm shrink-0">
                  PB
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="font-semibold text-sm">Pro Bono</span>
                  <span className="text-xs text-muted-foreground">Admin Dashboard</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* ── Content ── */}
      <SidebarContent className="gap-0 pt-2">
        {navItems.map((group, idx) => (
          <React.Fragment key={group.group}>
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-medium text-muted-foreground/70 uppercase tracking-wider px-2">
                {group.group}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => {
                    const isActive = pathname.startsWith(item.url)
                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          tooltip={item.title}
                          isActive={isActive}
                          className="gap-3"
                        >
                          <Link href={item.url}>
                            <item.icon className="size-4 shrink-0" />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            {idx < navItems.length - 1 && <SidebarSeparator className="my-1" />}
          </React.Fragment>
        ))}
      </SidebarContent>

      {/* ── Footer — user info + logout ── */}
      <SidebarFooter className="border-t border-border/50 pt-2">
        <UserButton user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
