"use client"

import { useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useNotifications } from "@/hooks/use-notifications"
import { cn } from "@/lib/utils"

export function NotificationBell() {
  const { notifications, markAllAsRead, markAsRead } = useNotifications()
  const [open, setOpen] = useState(false)

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button className="relative text-white hover:bg-gray-800 bg-transparent h-9 w-9 p-0 rounded-full">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[10px] text-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between border-b p-3">
          <h4 className="font-medium">Notificações</h4>
          {unreadCount > 0 && (
            <Button
              className="h-auto p-1 text-xs bg-transparent hover:bg-gray-100"
              onClick={() => {
                markAllAsRead()
                setOpen(false)
              }}
            >
              Marcar todas como lidas
            </Button>
          )}
        </div>
        <div className="max-h-80 overflow-auto">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-sm text-gray-500">Nenhuma notificação</div>
          ) : (
            <ul>
              {notifications.map((notification) => (
                <li
                  key={notification.id}
                  className={cn(
                    "border-b last:border-0 p-3 text-sm cursor-pointer hover:bg-gray-50 transition-colors",
                    !notification.read && "bg-gray-50",
                  )}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-2">
                    <div
                      className={cn(
                        "mt-0.5 h-2 w-2 rounded-full",
                        notification.type === "success" && "bg-green-500",
                        notification.type === "warning" && "bg-yellow-500",
                        notification.type === "error" && "bg-red-500",
                        notification.type === "info" && "bg-blue-500",
                      )}
                    />
                    <div className="flex-1">
                      <p className="font-medium">{notification.title}</p>
                      <p className="text-gray-500">{notification.message}</p>
                      <p className="mt-1 text-xs text-gray-400">{notification.time}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
