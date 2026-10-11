import type { Store } from "./types";
export const STORAGE_KEY = "studycraft.v1";
export const emptyStore: Store = {
  version: 1,
  custom: [],
  hidden: [],
  subjects: [],
  attempts: [],
  presets: [],
  flags: [],
  goals: [],
  dark: false,
  dailyTarget: 20,
};
// Replace this adapter with a cloud repository without changing quiz or grading logic.
export const repository = {
  load(): Store {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(emptyStore);
    const s = JSON.parse(raw);
    if (
      s.version !== 1 ||
      !Array.isArray(s.attempts) ||
      !Array.isArray(s.custom)
    )
      throw new Error(
        "Saved data has an unsupported format. Export your browser data before resetting.",
      );
    return { ...structuredClone(emptyStore), ...s };
  },
  save(data: Store) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },
};
