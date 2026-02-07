/**
 * ═══════════════════════════════════════════════════════════════════════════
 * LESSON PROGRESS UTILITY
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Manages lesson progress using AsyncStorage.
 * Tracks completed lessons and calculates overall progress.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const PROGRESS_KEY = 'mf_sip_lesson_progress';
const TOTAL_LESSONS = 20;

export interface LessonProgress {
    completedLessons: string[];  // Array of lesson IDs that are completed
    lastUpdated: string;         // ISO timestamp of last update
}

/**
 * Get the current lesson progress from AsyncStorage
 */
export const getLessonProgress = async (): Promise<LessonProgress> => {
    try {
        const data = await AsyncStorage.getItem(PROGRESS_KEY);
        if (data) {
            return JSON.parse(data);
        }
    } catch (error) {
        console.error('Error reading lesson progress:', error);
    }
    return {
        completedLessons: [],
        lastUpdated: new Date().toISOString()
    };
};

/**
 * Mark a lesson as completed
 */
export const markLessonComplete = async (lessonId: string): Promise<void> => {
    try {
        const progress = await getLessonProgress();
        if (!progress.completedLessons.includes(lessonId)) {
            progress.completedLessons.push(lessonId);
            progress.lastUpdated = new Date().toISOString();
            await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
        }
    } catch (error) {
        console.error('Error marking lesson complete:', error);
    }
};

/**
 * Check if a lesson is completed
 */
export const isLessonComplete = async (lessonId: string): Promise<boolean> => {
    const progress = await getLessonProgress();
    return progress.completedLessons.includes(lessonId);
};

/**
 * Get overall progress percentage (0-100)
 */
export const getOverallProgress = async (): Promise<number> => {
    const progress = await getLessonProgress();
    return Math.round((progress.completedLessons.length / TOTAL_LESSONS) * 100);
};

/**
 * Get count of completed lessons
 */
export const getCompletedLessonsCount = async (): Promise<number> => {
    const progress = await getLessonProgress();
    return progress.completedLessons.length;
};

/**
 * Reset all progress (for testing or user choice)
 */
export const resetProgress = async (): Promise<void> => {
    try {
        await AsyncStorage.removeItem(PROGRESS_KEY);
    } catch (error) {
        console.error('Error resetting progress:', error);
    }
};
