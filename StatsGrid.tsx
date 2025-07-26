import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Leaf, Trophy, Map, Star } from 'lucide-react';
import { UserStats } from './constants';
import { getCompletedProvinces } from './helpers';

interface StatsGridProps {
  userStats: UserStats;
  questProgress: { [key: string]: number };
}

export function StatsGrid({ userStats, questProgress }: StatsGridProps) {
  const completedProvinces = getCompletedProvinces(questProgress);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="border-[#D7E4C0] bg-white/60 text-center">
        <CardContent className="pt-4">
          <Leaf className="h-8 w-8 text-[#4A773C] mx-auto mb-2" />
          <div className="text-xl font-bold text-[#4A773C]">{userStats.tokens}</div>
          <div className="text-sm text-[#5A3E36]/70">Kalikhasan Tokens</div>
        </CardContent>
      </Card>

      <Card className="border-[#D7E4C0] bg-white/60 text-center">
        <CardContent className="pt-4">
          <Trophy className="h-8 w-8 text-[#C45A00] mx-auto mb-2" />
          <div className="text-xl font-bold text-[#4A773C]">{userStats.badges.length}</div>
          <div className="text-sm text-[#5A3E36]/70">Badges Earned</div>
        </CardContent>
      </Card>

      <Card className="border-[#D7E4C0] bg-white/60 text-center">
        <CardContent className="pt-4">
          <Map className="h-8 w-8 text-[#7A9D54] mx-auto mb-2" />
          <div className="text-xl font-bold text-[#4A773C]">{completedProvinces}</div>
          <div className="text-sm text-[#5A3E36]/70">Provinces Completed</div>
        </CardContent>
      </Card>

      <Card className="border-[#D7E4C0] bg-white/60 text-center">
        <CardContent className="pt-4">
          <Star className="h-8 w-8 text-[#F9C74F] mx-auto mb-2" />
          <div className="text-xl font-bold text-[#4A773C]">{userStats.treesPlanted}</div>
          <div className="text-sm text-[#5A3E36]/70">Trees Planted</div>
        </CardContent>
      </Card>
    </div>
  );
}
