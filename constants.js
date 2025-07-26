export interface UserStats {
  nftsOwned: number;
  totalDonated: number;
  treesPlanted: number;
  badges: string[];
  tokens: number;
  consecutiveDonations: number;
  level: number;
  experience: number;
  experienceToNext: number;
}

export interface DashboardTexts {
  title: string;
  description: string;
  overview: string;
  tokensAndBadges: string;
  culturalQuests: string;
  rwaDashboard: string;
  achievements: string;
  level: string;
  experience: string;
  xpNeeded: string;
  recentActivity: string;
  lifetimeAchievements: string;
  quickActions: string;
  openPassbook: string;
  shareJourney: string;
  exploreQuests: string;
  viewRWAStats: string;
}

export const dashboardTexts = {
  fil: {
    title: 'Heritage Explorer Dashboard',
    description: 'Tingnan ang inyong mga progress, tokens, badges, at cultural quest achievements.',
    overview: 'Overview',
    tokensAndBadges: 'Tokens & Badges',
    culturalQuests: 'Cultural Quests',
    rwaDashboard: 'RWA Stats',
    achievements: 'Achievements',
    level: 'Heritage Explorer Level',
    experience: 'Experience',
    xpNeeded: 'XP needed for Level',
    recentActivity: 'Recent Activity',
    lifetimeAchievements: 'Lifetime Achievements',
    quickActions: 'Quick Actions',
    openPassbook: 'Buksan ang Passbook',
    shareJourney: 'Ibahagi ang Journey',
    exploreQuests: 'Explore Quests',
    viewRWAStats: 'View RWA Stats'
  },
  en: {
    title: 'Heritage Explorer Dashboard',
    description: 'View your progress, tokens, badges, and cultural quest achievements.',
    overview: 'Overview',
    tokensAndBadges: 'Tokens & Badges',
    culturalQuests: 'Cultural Quests',
    rwaDashboard: 'RWA Stats',
    achievements: 'Achievements',
    level: 'Heritage Explorer Level',
    experience: 'Experience',
    xpNeeded: 'XP needed for Level',
    recentActivity: 'Recent Activity',
    lifetimeAchievements: 'Lifetime Achievements',
    quickActions: 'Quick Actions',
    openPassbook: 'Open Passbook',
    shareJourney: 'Share Journey',
    exploreQuests: 'Explore Quests',
    viewRWAStats: 'View RWA Stats'
  }
} as const;

export const mockRecentActivities = {
  fil: [
    '5 NFT na-adopt sa Ifugao',
    'Bagong partnership sa Benguet',
    '₱15,000 na-donate para sa Barako',
    '12 farmers na-support sa Bohol',
    'Quest completed: Rice Terraces'
  ],
  en: [
    '5 NFTs adopted in Ifugao',
    'New partnership in Benguet',
    '₱15,000 donated for Barako',
    '12 farmers supported in Bohol',
    'Quest completed: Rice Terraces'
  ]
};
