import { create } from "zustand";

const useTimerStore = create((set) => ({
  task: "Select Task", // Changed default task
  color: "red", // Added default color
  duration: 500, // 30 minutes default
  setTask: (task) => set({ task }),
  setColor: (color) => set({ color }),
  setDuration: (duration) => set({ duration }),
}));

export default useTimerStore;
