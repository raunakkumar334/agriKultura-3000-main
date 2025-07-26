import { UserStats } from './constants';

export const getLevelProgress = (userStats: UserStats): number => {
  return (userStats.experience / userStats.experienceToNext) * 100;
};

export const getNextLevelRequirement = (userStats: UserStats): number => {
  return userStats.experienceToNext - userStats.experience;
};

export const calculateTotalQuests = (questProgress: { [key: string]: number }): number => {
  return Object.values(questProgress).reduce((sum, progress) => sum + progress, 0);
};

export const getCompletedProvinces = (questProgress: { [key: string]: number }): number => {
  return Object.values(questProgress).filter(progress => progress >= 3).length;
};

export const formatCurrency = (amount: number): string => {
  return `₱${amount.toLocaleString()}`;
};

export const calculateExperienceProgress = (experience: number, experienceToNext: number): {
  percentage: number;
  remaining: number;
} => {
  return {
    percentage: (experience / experienceToNext) * 100,
    remaining: experienceToNext - experience
  };
};
