import { create } from 'zustand';

interface ResumeStore {
  refreshKey: number;

  triggerRefresh: () => void;
}

export const useResumeStore =
  create<ResumeStore>((set) => ({
    refreshKey: 0,

    triggerRefresh: () =>
      set((state) => ({
        refreshKey:
          state.refreshKey + 1,
      })),
  }));
