import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { UserStats, DashboardTexts } from './constants';
import { formatCurrency, calculateTotalQuests } from './helpers';

interface LifetimeStatsProps {
  userStats: UserStats;
  questProgress: { [key: string]: number };
  texts: DashboardTexts;
}

export function LifetimeStats({ userStats, questProgress, texts }: LifetimeStatsProps) {
  const totalQuestions = calculateTotalQuests(questProgress);

  return (
    <Card className="border-2 border-[#4A773C] bg-gradient-to-br from-[#F2EAD3] to-[#D7E4C0]">
      <CardHeader>
        <CardTitle className="text-[#4A773C]">{texts.lifetimeAchievements}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-[#C45A00] mb-1">{userStats.nftsOwned}</div>
            <p className="text-sm text-[#5A3E36]/70">Heritage NFTs Adopted</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#C45A00] mb-1">{formatCurrency(userStats.totalDonated)}</div>
            <p className="text-sm text-[#5A3E36]/70">Total Contributed</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#C45A00] mb-1">{userStats.treesPlanted}</div>
            <p className="text-sm text-[#5A3E36]/70">Trees Planted</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#C45A00] mb-1">{totalQuestions}</div>
            <p className="text-sm text-[#5A3E36]/70">Questions Answered</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#C45A00] mb-1">{userStats.consecutiveDonations}</div>
            <p className="text-sm text-[#5A3E36]/70">Consecutive Donations</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#C45A00] mb-1">{userStats.badges.length}</div>
            <p className="text-sm text-[#5A3E36]/70">Unique Badges</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
