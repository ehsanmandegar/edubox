import lessonsData from '../data/lessons.json';
import { Platform } from 'react-native';

export type MediaType = 'text' | 'image' | 'audio' | 'video';
export type LessonContent = { type: MediaType; value: string };
export type Lesson = { id: string; title: string; order: number; content: LessonContent[] };
export type Course = { courseId: string; title: string; lessons: Lesson[] };

export const course: Course = lessonsData as unknown as Course;

export function getLessonById(id: string): Lesson | undefined {
  return course.lessons.find(l => l.id === id);
}

export function getLessonByOrder(order: number): Lesson | undefined {
  return course.lessons.find(l => l.order === order);
}

export function getPrevNext(order: number): { prev?: Lesson; next?: Lesson } {
  return { prev: getLessonByOrder(order - 1), next: getLessonByOrder(order + 1) };
}

export function resolveAssetPath(value: string): any {
  // Local asset path relative to project root's assets folder
  if (/^(assets\//).test(value)) {
    // Dynamic require is not supported; for demo, return uri for web, else use asset path
    if (Platform.OS === 'web') return { uri: '/' + value };
    return { uri: '/' + value };
  }
  // Remote URL
  if (/^https?:\/\//.test(value)) return { uri: value };
  return { uri: value };
}


