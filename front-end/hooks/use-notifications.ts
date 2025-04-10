"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export type NotificationType = "success" | "warning" | "error" | "info"

export interface Notification {
  id: string
  title: string
  message: string
  type: NotificationType
  time: string
  read: boolean
}

interface NotificationStore {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, "id" | "time" | "read">) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  removeNotification: (id: string) => void
  clearAll: () => void
}

export const useNotifications = create<NotificationStore>()(
  persist(
    (set) => ({
      notifications: [],
      addNotification: (notification) =>
        set((state) => ({
          notifications: [
            {
              id: Math.random().toString(36).substring(2, 9),
              time: new Date().toLocaleString("pt-BR"),
              read: false,
              ...notification,
            },
            ...state.notifications,
          ].slice(0, 50), // Keep only the last 50 notifications
        })),
      markAsRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
        })),
      markAllAsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
        })),
      removeNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),
      clearAll: () => set({ notifications: [] }),
    }),
    {
      name: "notifications-storage",
    },
  ),
)
