"use client"

import { useEffect, useState } from "react"
import { Bell, X } from "lucide-react"
import { useNotifications } from "@/hooks/use-notifications"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function FloatingNotification() {
  const { notifications } = useNotifications()
  const [visible, setVisible] = useState(false)
  const [currentNotification, setCurrentNotification] = useState<any>(null)
  const [lastNotificationId, setLastNotificationId] = useState<string | null>(null)

  useEffect(() => {
    // Check if there's a new notification
    if (notifications.length > 0) {
      const latestNotification = notifications[0]

      // Only show if it's a new notification (not the same as last time)
      if (latestNotification.id !== lastNotificationId) {
        setCurrentNotification(latestNotification)
        setLastNotificationId(latestNotification.id)
        setVisible(true)

        // Auto-hide after 5 seconds
        const timer = setTimeout(() => {
          setVisible(false)
        }, 5000)

        return () => clearTimeout(timer)
      }
    }
  }, [notifications, lastNotificationId])

  if (!visible || !currentNotification) return null

  return (
    <div className="fixed top-16 right-4 z-50 max-w-sm w-full animate-in slide-in-from-top-5 duration-300">
      <div className="bg-white rounded-lg shadow-lg border p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            <div
              className={cn(
                "h-8 w-8 rounded-full flex items-center justify-center",
                currentNotification.type === "success" && "bg-green-100",
                currentNotification.type === "warning" && "bg-yellow-100",
                currentNotification.type === "error" && "bg-red-100",
                currentNotification.type === "info" && "bg-blue-100",
              )}
            >
              <Bell
                className={cn(
                  "h-4 w-4",
                  currentNotification.type === "success" && "text-green-600",
                  currentNotification.type === "warning" && "text-yellow-600",
                  currentNotification.type === "error" && "text-red-600",
                  currentNotification.type === "info" && "text-blue-600",
                )}
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h4 className="font-medium text-gray-900">{currentNotification.title}</h4>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 rounded-full -mt-1 -mr-1"
                onClick={() => setVisible(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-gray-600 mt-1">{currentNotification.message}</p>
            <p className="text-xs text-gray-400 mt-1">{currentNotification.time}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
