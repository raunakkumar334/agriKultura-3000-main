import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { TrendingUp, Users, MapPin, Sprout, Heart, Globe, Award, Zap } from 'lucide-react';

interface RWADashboardProps {
  language?: 'en' | 'fil';
}

interface RealTimeStats {
  totalAdoptions: number;
  provincesReached: number;
  activePartners: number;
  fundsRaised: number;
  treesPlanted: number;
  communitiesSupported: number;
  conservationGoal: number;
  monthlyGrowth: number;
}

export function RWADashboard({ language = 'fil' }: RWADashboardProps) {
  const [stats, setStats] = useState<RealTimeStats>({
    totalAdoptions: 2847,
    provincesReached: 14,
    activePartners: 23,
    fundsRaised: 2500000,
    treesPlanted: 1250,
    communitiesSupported: 67,
    conservationGoal: 5000000,
    monthlyGrowth: 18.5
  });

  const [isLive, setIsLive] = useState(true);

  // Language texts
  const texts = {
    fil: {
      title: 'Real-World Asset Dashboard',
      subtitle: 'Live na datos mula sa aming conservation partners',
      totalAdoptions: 'Kabuuang Pag-adopt',
      provincesReached: 'Narating na Lalawigan',
      activePartners: 'Aktibong Partners',
      fundsRaised: 'Naipon na Pondo',
      treesPlanted: 'Naitanim na Puno',
      communitiesSupported: 'Natutulugang Komunidad',
      conservationGoal: 'Conservation Goal',
      monthlyGrowth: 'Paglago ngayong Buwan',
      liveStatus: 'LIVE',
      offlineStatus: 'OFFLINE',
      impact: 'Impact',
      growth: 'Paglago',
      network: 'Network',
      recentActivity: 'Kamakailang Aktibidad',
      activities: [
        '5 NFT na-adopt sa Ifugao',
        'Bagong partnership sa Benguet',
        '₱15,000 na-donate para sa Barako',
        '12 farmers na-support sa Bohol',
        'Quest completed: Rice Terraces'
      ],
      provinces: [
        { name: 'Ifugao', adopts: 340, color: '#4A773C' },
        { name: 'Batangas', adopts: 287, color: '#C45A00' },
        { name: 'Bohol', adopts: 234, color: '#7A9D54' },
        { name: 'Benguet', adopts: 198, color: '#F9C74F' },
        { name: 'Palawan', adopts: 156, color: '#5A3E36' }
      ]
    },
    en: {
      title: 'Real-World Asset Dashboard',
      subtitle: 'Live data from our conservation partners',
      totalAdoptions: 'Total Adoptions',
      provincesReached: 'Provinces Reached',
      activePartners: 'Active Partners',
      fundsRaised: 'Funds Raised',
      treesPlanted: 'Trees Planted',
      communitiesSupported: 'Communities Supported',
      conservationGoal: 'Conservation Goal',
      monthlyGrowth: 'Monthly Growth',
      liveStatus: 'LIVE',
      offlineStatus: 'OFFLINE',
      impact: 'Impact',
      growth: 'Growth',
      network: 'Network',
      recentActivity: 'Recent Activity',
      activities: [
        '5 NFTs adopted in Ifugao',
        'New partnership in Benguet',
        '₱15,000 donated for Barako',
        '12 farmers supported in Bohol',
        'Quest completed: Rice Terraces'
      ],
      provinces: [
        { name: 'Ifugao', adopts: 340, color: '#4A773C' },
        { name: 'Batangas', adopts: 287, color: '#C45A00' },
        { name: 'Bohol', adopts: 234, color: '#7A9D54' },
        { name: 'Benguet', adopts: 198, color: '#F9C74F' },
        { name: 'Palawan', adopts: 156, color: '#5A3E36' }
      ]
    }
  };

  const t = texts[language];

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        totalAdoptions: prev.totalAdoptions + Math.floor(Math.random() * 3),
        treesPlanted: prev.treesPlanted + Math.floor(Math.random() * 2),
        fundsRaised: prev.fundsRaised + Math.floor(Math.random() * 1000)
      }));
    }, 5000);

    // Toggle live status occasionally
    const statusInterval = setInterval(() => {
      setIsLive(prev => !prev);
      setTimeout(() => setIsLive(true), 2000);
    }, 30000);

    return () => {
      clearInterval(interval);
      clearInterval(statusInterval);
    };
  }, []);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `₱${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const conservationProgress = (stats.fundsRaised / stats.conservationGoal) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#4A773C] mb-2">{t.title}</h2>
          <p className="text-[#5A3E36]/80">{t.subtitle}</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
          <Badge variant={isLive ? 'default' : 'destructive'} className="font-semibold">
            {isLive ? t.liveStatus : t.offlineStatus}
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="impact" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-[#D7E4C0]">
          <TabsTrigger value="impact" className="data-[state=active]:bg-[#4A773C] data-[state=active]:text-white">
            {t.impact}
          </TabsTrigger>
          <TabsTrigger value="growth" className="data-[state=active]:bg-[#4A773C] data-[state=active]:text-white">
            {t.growth}
          </TabsTrigger>
          <TabsTrigger value="network" className="data-[state=active]:bg-[#4A773C] data-[state=active]:text-white">
            {t.network}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="impact" className="space-y-4">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-2 border-[#4A773C] bg-gradient-to-br from-[#F2EAD3] to-[#D7E4C0]">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-[#4A773C] p-2 rounded-lg">
                    <Sprout className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-[#5A3E36]/70">{t.totalAdoptions}</p>
                    <p className="text-2xl font-bold text-[#4A773C]">{stats.totalAdoptions.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-[#C45A00] bg-gradient-to-br from-[#F2EAD3] to-[#E6D08A]">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-[#C45A00] p-2 rounded-lg">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-[#5A3E36]/70">{t.provincesReached}</p>
                    <p className="text-2xl font-bold text-[#C45A00]">{stats.provincesReached}/17</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-[#7A9D54] bg-gradient-to-br from-[#D7E4C0] to-[#8FBC8F]/20">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-[#7A9D54] p-2 rounded-lg">
                    <Heart className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-[#5A3E36]/70">{t.fundsRaised}</p>
                    <p className="text-2xl font-bold text-[#7A9D54]">{formatNumber(stats.fundsRaised)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-[#F9C74F] bg-gradient-to-br from-[#F9C74F]/20 to-[#F2EAD3]">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-[#F9C74F] p-2 rounded-lg">
                    <Users className="h-5 w-5 text-[#5A3E36]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#5A3E36]/70">{t.communitiesSupported}</p>
                    <p className="text-2xl font-bold text-[#5A3E36]">{stats.communitiesSupported}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Conservation Goal Progress */}
          <Card className="border-2 border-[#4A773C] bg-[#F2EAD3]/80">
            <CardHeader>
              <CardTitle className="text-[#4A773C] flex items-center space-x-2">
                <Award className="h-5 w-5" />
                <span>{t.conservationGoal}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[#5A3E36]">Progress:</span>
                  <span className="text-[#4A773C] font-bold">
                    {formatNumber(stats.fundsRaised)} / {formatNumber(stats.conservationGoal)}
                  </span>
                </div>
                <Progress value={conservationProgress} className="h-3" />
                <p className="text-sm text-[#5A3E36]/80">
                  {conservationProgress.toFixed(1)}% of our goal reached
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="growth" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Growth Metrics */}
            <Card className="border-2 border-[#4A773C] bg-[#F2EAD3]/80">
              <CardHeader>
                <CardTitle className="text-[#4A773C] flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>{t.monthlyGrowth}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[#4A773C] mb-2">
                  +{stats.monthlyGrowth}%
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-[#5A3E36]">New Adoptions</span>
                    <span className="text-sm font-semibold text-[#4A773C]">+234</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-[#5A3E36]">Trees Planted</span>
                    <span className="text-sm font-semibold text-[#4A773C]">+{stats.treesPlanted}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-[#5A3E36]">Partner Growth</span>
                    <span className="text-sm font-semibold text-[#4A773C]">+3</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-2 border-[#7A9D54] bg-[#D7E4C0]/50">
              <CardHeader>
                <CardTitle className="text-[#7A9D54] flex items-center space-x-2">
                  <Zap className="h-5 w-5" />
                  <span>{t.recentActivity}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {t.activities.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3 p-2 bg-white/50 rounded-lg">
                      <div className="w-2 h-2 bg-[#4A773C] rounded-full animate-pulse"></div>
                      <span className="text-sm text-[#5A3E36]">{activity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="network" className="space-y-4">
          {/* Mini Map with Province Data */}
          <Card className="border-2 border-[#4A773C] bg-[#F2EAD3]/80">
            <CardHeader>
              <CardTitle className="text-[#4A773C] flex items-center space-x-2">
                <Globe className="h-5 w-5" />
                <span>Provincial Impact Map</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Simplified Map Visualization */}
                <div className="relative h-64 bg-gradient-to-br from-[#D7E4C0] to-[#8FBC8F]/20 rounded-lg border-2 border-[#4A773C]/30 quest-map">
                  <div className="absolute inset-4">
                    {t.provinces.map((province, index) => (
                      <div
                        key={province.name}
                        className="absolute w-4 h-4 rounded-full border-2 border-white shadow-lg animate-pulse-slow"
                        style={{
                          backgroundColor: province.color,
                          left: `${20 + index * 15}%`,
                          top: `${30 + (index % 2) * 20}%`
                        }}
                        title={`${province.name}: ${province.adopts} adoptions`}
                      />
                    ))}
                  </div>
                  <div className="absolute bottom-2 left-2 bg-white/90 p-2 rounded text-xs">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-[#4A773C] rounded-full"></div>
                      <span>Active Provinces</span>
                    </div>
                  </div>
                </div>

                {/* Province Rankings */}
                <div className="space-y-3">
                  <h4 className="font-bold text-[#5A3E36] mb-3">Top Provinces by Impact</h4>
                  {t.provinces.map((province, index) => (
                    <div key={province.name} className="flex items-center justify-between p-3 bg-white/60 rounded-lg border border-[#D7E4C0]">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#4A773C] text-white text-xs font-bold">
                          {index + 1}
                        </div>
                        <span className="font-medium text-[#5A3E36]">{province.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-[#4A773C]">{province.adopts}</div>
                        <div className="text-xs text-[#5A3E36]/70">adoptions</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Partner Network */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-[#D7E4C0] bg-white/60">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-[#4A773C] mb-1">{stats.activePartners}</div>
                <p className="text-sm text-[#5A3E36]/70">{t.activePartners}</p>
              </CardContent>
            </Card>
            <Card className="border-[#D7E4C0] bg-white/60">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-[#7A9D54] mb-1">{stats.treesPlanted}</div>
                <p className="text-sm text-[#5A3E36]/70">{t.treesPlanted}</p>
              </CardContent>
            </Card>
            <Card className="border-[#D7E4C0] bg-white/60">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-[#C45A00] mb-1">{stats.communitiesSupported}</div>
                <p className="text-sm text-[#5A3E36]/70">{t.communitiesSupported}</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
