import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Crown, Trophy } from 'lucide-react';
import { UserStats } from './constants';

interface LeaderboardPreviewProps {
  userStats: UserStats;
}

export function LeaderboardPreview({ userStats }: LeaderboardPreviewProps) {
  return (
    <Card className="border-[#D7E4C0] bg-white/60">
      <CardHeader>
        <CardTitle className="text-[#4A773C] flex items-center space-x-2">
          <Trophy className="h-5 w-5" />
          <span>Community Leaderboard</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-[#FFD700]/20 rounded-lg border-2 border-[#FFD700]">
            <div className="flex items-center space-x-3">
              <Crown className="h-6 w-6 text-[#FFD700]" />
              <div>
                <p className="font-bold text-[#5A3E36]">You</p>
                <p className="text-sm text-[#5A3E36]/70">Heritage Explorer</p>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-[#4A773C]">Rank #1</div>
              <div className="text-sm text-[#5A3E36]/70">{userStats.tokens} tokens</div>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-[#F2EAD3]/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-[#C45A00] flex items-center justify-center text-white font-bold">
                2
              </div>
              <div>
                <p className="font-medium text-[#5A3E36]">Maria Santos</p>
                <p className="text-sm text-[#5A3E36]/70">Seed Guardian</p>
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-[#4A773C]">45 tokens</div>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-[#F2EAD3]/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-[#7A9D54] flex items-center justify-center text-white font-bold">
                3
              </div>
              <div>
                <p className="font-medium text-[#5A3E36]">Juan dela Cruz</p>
                <p className="text-sm text-[#5A3E36]/70">Crop Collector</p>
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-[#4A773C]">38 tokens</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
