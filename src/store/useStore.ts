import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { storage } from '@/utils/storage';
import {
  Activity,
  Game,
  Achievement,
  DailyChallenge,
  Task,
  Reminder,
  Notification,
  ChatMessage,
  UserProgress,
  Resource,
} from '@/types';
import {
  mockActivities,
  mockGames,
  mockAchievements,
  mockDailyChallenges,
  mockResources,
  mockNotifications,
} from '@/data/mockData';

interface AppState {
  // Theme
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;

  // User
  user: { name: string; email: string } | null;
  setUser: (user: { name: string; email: string } | null) => void;

  // Activities
  activities: Activity[];
  setActivities: (activities: Activity[]) => void;
  updateActivityProgress: (id: string, progress: number) => void;
  completeActivity: (id: string) => void;

  // Games
  games: Game[];
  setGames: (games: Game[]) => void;
  updateGameScore: (id: string, score: number, accuracy: number, timeSpent: number) => void;
  completeGame: (id: string) => void;

  // Achievements
  achievements: Achievement[];
  setAchievements: (achievements: Achievement[]) => void;
  unlockAchievement: (id: string) => void;
  updateAchievementProgress: (id: string, progress: number) => void;

  // Daily Challenge
  dailyChallenge: DailyChallenge | null;
  setDailyChallenge: (challenge: DailyChallenge | null) => void;
  completeDailyChallenge: () => void;
  updateChallengeStreak: () => void;

  // Tasks
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  removeTask: (id: string) => void;
  toggleTask: (id: string) => void;
  updateTaskPriority: (id: string, priority: 'low' | 'medium' | 'high') => void;

  // Reminders
  reminders: Reminder[];
  setReminders: (reminders: Reminder[]) => void;
  addReminder: (reminder: Reminder) => void;
  removeReminder: (id: string) => void;
  toggleReminder: (id: string) => void;

  // Notifications
  notifications: Notification[];
  setNotifications: (notifications: Notification[]) => void;
  addNotification: (notification: Notification) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  deleteNotification: (id: string) => void;
  getUnreadCount: () => number;

  // Chat
  chatMessages: ChatMessage[];
  setChatMessages: (messages: ChatMessage[]) => void;
  addChatMessage: (message: ChatMessage) => void;
  clearChat: () => void;

  // Resources
  resources: Resource[];
  setResources: (resources: Resource[]) => void;
  toggleBookmark: (id: string) => void;
  updateResourceViewed: (id: string) => void;

  // Progress
  progress: UserProgress;
  setProgress: (progress: UserProgress) => void;
  updateProgress: (updates: Partial<UserProgress>) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Theme
      theme: 'light',
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),

      // User
      user: null,
      setUser: (user) => set({ user }),

      // Activities
      activities: mockActivities,
      setActivities: (activities) => set({ activities }),
      updateActivityProgress: (id, progress) =>
        set((state) => ({
          activities: state.activities.map((a) =>
            a.id === id ? { ...a, progress, completed: progress >= 100 } : a
          ),
        })),
      completeActivity: (id) =>
        set((state) => ({
          activities: state.activities.map((a) =>
            a.id === id ? { ...a, completed: true, progress: 100, lastPlayed: new Date() } : a
          ),
          progress: {
            ...state.progress,
            activitiesCompleted: state.progress.activitiesCompleted + 1,
          },
        })),

      // Games
      games: mockGames,
      setGames: (games) => set({ games }),
      updateGameScore: (id, score, accuracy, timeSpent) =>
        set((state) => ({
          games: state.games.map((g) =>
            g.id === id ? { ...g, score, accuracy, timeSpent } : g
          ),
        })),
      completeGame: (id) =>
        set((state) => ({
          games: state.games.map((g) =>
            g.id === id ? { ...g, completed: true, lastPlayed: new Date() } : g
          ),
          progress: {
            ...state.progress,
            gamesCompleted: state.progress.gamesCompleted + 1,
          },
        })),

      // Achievements
      achievements: mockAchievements,
      setAchievements: (achievements) => set({ achievements }),
      unlockAchievement: (id) =>
        set((state) => ({
          achievements: state.achievements.map((a) =>
            a.id === id ? { ...a, unlocked: true, unlockedAt: new Date(), progress: a.maxProgress } : a
          ),
          notifications: [
            {
              id: Date.now().toString(),
              type: 'achievement',
              title: 'Achievement Unlocked!',
              message: state.achievements.find((a) => a.id === id)?.title || 'New achievement',
              read: false,
              createdAt: new Date(),
            },
            ...state.notifications,
          ],
        })),
      updateAchievementProgress: (id, progress) =>
        set((state) => ({
          achievements: state.achievements.map((a) =>
            a.id === id ? { ...a, progress } : a
          ),
        })),

      // Daily Challenge
      dailyChallenge: mockDailyChallenges[0] || null,
      setDailyChallenge: (challenge) => set({ dailyChallenge: challenge }),
      completeDailyChallenge: () =>
        set((state) => {
          if (!state.dailyChallenge) return state;
          return {
            dailyChallenge: {
              ...state.dailyChallenge,
              completed: true,
              completedAt: new Date(),
            },
            progress: {
              ...state.progress,
              currentStreak: state.progress.currentStreak + 1,
            },
            notifications: [
              {
                id: Date.now().toString(),
                type: 'daily-challenge',
                title: 'Daily Challenge Completed!',
                message: `You earned ${state.dailyChallenge.reward} points`,
                read: false,
                createdAt: new Date(),
              },
              ...state.notifications,
            ],
          };
        }),
      updateChallengeStreak: () =>
        set((state) => ({
          dailyChallenge: state.dailyChallenge
            ? { ...state.dailyChallenge, streak: state.dailyChallenge.streak + 1 }
            : null,
        })),

      // Tasks
      tasks: [],
      setTasks: (tasks) => set({ tasks }),
      addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
      removeTask: (id) =>
        set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) })),
      toggleTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
        })),
      updateTaskPriority: (id, priority) =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === id ? { ...t, priority } : t)),
        })),

      // Reminders
      reminders: [],
      setReminders: (reminders) => set({ reminders }),
      addReminder: (reminder) => set((state) => ({ reminders: [...state.reminders, reminder] })),
      removeReminder: (id) =>
        set((state) => ({ reminders: state.reminders.filter((r) => r.id !== id) })),
      toggleReminder: (id) =>
        set((state) => ({
          reminders: state.reminders.map((r) => (r.id === id ? { ...r, completed: !r.completed } : r)),
        })),

      // Notifications
      notifications: mockNotifications,
      setNotifications: (notifications) => set({ notifications }),
      addNotification: (notification) =>
        set((state) => ({ notifications: [notification, ...state.notifications] })),
      markNotificationRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
        })),
      markAllNotificationsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
        })),
      deleteNotification: (id) =>
        set((state) => ({ notifications: state.notifications.filter((n) => n.id !== id) })),
      getUnreadCount: () => get().notifications.filter((n) => !n.read).length,

      // Chat
      chatMessages: [],
      setChatMessages: (messages) => set({ chatMessages: messages }),
      addChatMessage: (message) =>
        set((state) => ({ chatMessages: [...state.chatMessages, message] })),
      clearChat: () => set({ chatMessages: [] }),

      // Resources
      resources: mockResources,
      setResources: (resources) => set({ resources }),
      toggleBookmark: (id) =>
        set((state) => ({
          resources: state.resources.map((r) =>
            r.id === id ? { ...r, bookmarked: !r.bookmarked } : r
          ),
        })),
      updateResourceViewed: (id) =>
        set((state) => ({
          resources: state.resources.map((r) =>
            r.id === id ? { ...r, lastViewed: new Date() } : r
          ),
        })),

      // Progress
      progress: {
        overallScore: 0,
        gamesCompleted: 0,
        activitiesCompleted: 0,
        accuracy: 0,
        timeSpent: 0,
        currentStreak: 0,
        improvementPercentage: 0,
        weeklyPerformance: [65, 70, 75, 80, 72, 85, 90],
        monthlyPerformance: [70, 72, 75, 78, 80, 82, 85, 88, 90, 87, 85, 89],
        gamePerformance: {},
        activityPerformance: {},
      },
      setProgress: (progress) => set({ progress }),
      updateProgress: (updates) =>
        set((state) => ({
          progress: { ...state.progress, ...updates },
        })),
    }),
    {
      name: 'manasmitra-storage',
      storage: {
        getItem: (name) => storage.get(name, null),
        setItem: (name, value) => storage.set(name, value),
        removeItem: (name) => storage.remove(name),
      },
    }
  )
);
