import { Lesson } from "@/lib/types";
import { fiAlAsalShifa } from "./fi-al-asal-shifa";

// To add a future lesson: create a new file in this folder exporting a
// `Lesson` object (see fi-al-asal-shifa.ts as a template), then add it here.
export const lessons: Record<string, Lesson> = {
  [fiAlAsalShifa.id]: fiAlAsalShifa,
};

export function getLesson(id: string): Lesson | undefined {
  return lessons[id];
}

export function getAllLessons(): Lesson[] {
  return Object.values(lessons);
}
