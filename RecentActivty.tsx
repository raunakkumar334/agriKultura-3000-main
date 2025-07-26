import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Trophy, Leaf, Map, Zap } from 'lucide-react';
import { DashboardTexts, mockRecentActivities } from './constants';

interface RecentActivityProps {
  texts: DashboardTexts;
  language: 'en' | 'fil';
}

export function RecentActivity({ texts, language }: RecentActivityProps) {
  const activities = mockRecentActivities[language];

  const getActivityIcon = (index: number) => {
    const icons = [Trophy, Leaf, Map, Zap, Trophy];
    const IconComponent = icons[index % icons.length];
    return <IconComponent className="h-5 w-5 text-[#FFD700]" />;
  };

  return (
    <Card className="border-[#D7E4C0] bg-white/60">
      <CardHeader>
        <CardTitle className="text-[#4A773C]">{texts.recentActivity}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {activities.slice(0, 3).map((activity, index) => (
            <div key={index} className="flex items-center space-x-3 p-2 bg-[#F2EAD3]/50 rounded-lg">
              {getActivityIcon(index)}
              <div className="flex-1">
                <p className="font-medium text-[#5A3E36]">
                  {index === 0 ? 'Badge Earned' : index === 1 ? 'Token Earned' : 'Quest Progress'}
                </p>
                <p className="text-sm text-[#5A3E36]/70">{activity}</p>
              </div>
              <Badge variant="outline" className="border-[#4A773C] text-[#4A773C]">
                {index === 0 ? 'Just now' : index === 1 ? '2 hours ago' : 'Yesterday'}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
