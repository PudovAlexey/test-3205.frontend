import { create } from 'zustand';

/**
 * Client-only UI state: which job is currently selected.
 *
 * All *server* state (the jobs list, the active job's detail, loading/error
 * flags) lives in React Query. This store holds nothing but the selection, so
 * switching jobs is a single source of truth that the list widget, the detail
 * widget and the create/cancel features all read from.
 */
interface ActiveJobState {
  activeJobId: string | null;
  setActiveJob: (id: string | null) => void;
}

export const useActiveJobStore = create<ActiveJobState>((set) => ({
  activeJobId: null,
  setActiveJob: (id) => set({ activeJobId: id }),
}));
