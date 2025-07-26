import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Calendar, MapPin, Award, Leaf, Camera, Share2, Download, Star, Crown, Trophy } from 'lucide-react';

interface MuseumPassbookProps {
  isOpen: boolean;
  onClose: () => void;
  userStats: any;
  ownedNFTs?: any[];
  visitedSections?: string[];
  earnedBadges?: string[];
  language?: 'en' | 'fil';
  onShare?: () => void;
}

export function MuseumPassbook({ 
  isOpen,
  onClose,
  userStats, 
  ownedNFTs = [], 
  visitedSections = [], 
  earnedBadges = [],
  language = 'fil',
  onShare 
}: MuseumPassbookProps) {
  const [selectedNFT, setSelectedNFT] = useState<any>(null);

  // Language texts
  const texts = {
    fil: {
      title: 'Museum Passbook',
      subtitle: 'Inyong Digital Heritage Journey',
      overview: 'Buod',
      collection: 'Koleksyon',
      journey: 'Paglalakbay',
      achievements: 'Tagumpay',
      memberSince: 'Miyembro simula',
      totalVisits: 'Kabuuang Pagbisita',
      favoriteSection: 'Paboritong Seksyon',
      nextGoal: 'Susunod na Target',
      myNFTs: 'Aking mga NFT',
      myBadges: 'Aking mga Badge',
      visitHistory: 'Kasaysayan ng Pagbisita',
      conservationImpact: 'Conservation Impact',
      shareJourney: 'Ibahagi ang Paglalakbay',
      downloadPassbook: 'I-download ang Passbook',
      empty: 'Wala pang laman - simulan ang inyong heritage journey!',
      rarity: {
        karaniwan: 'Karaniwan',
        bihira: 'Bihira',
        mahalagang: 'Mahalagang',
        alamat: 'Alamat'
      },
      sections: {
        tahanan: 'Tahanan',
        galeri: 'Galeri',
        quest: 'Cultural Quest',
        dashboard: 'Dashboard'
      },
      milestones: [
        { id: 1, title: 'First Adoption', description: 'Nag-adopt ng unang binhi', completed: true },
        { id: 2, title: 'Cultural Explorer', description: 'Natapos ang 3 quest', completed: false },
        { id: 3, title: 'Seed Guardian', description: 'May-ari ng 5 NFT', completed: false },
        { id: 4, title: 'Heritage Master', description: 'Natapos ang lahat ng quest', completed: false }
      ]
    },
    en: {
      title: 'Museum Passbook',
      subtitle: 'Your Digital Heritage Journey',
      overview: 'Overview',
      collection: 'Collection',
      journey: 'Journey',
      achievements: 'Achievements',
      memberSince: 'Member since',
      totalVisits: 'Total Visits',
      favoriteSection: 'Favorite Section',
      nextGoal: 'Next Goal',
      myNFTs: 'My NFTs',
      myBadges: 'My Badges',
      visitHistory: 'Visit History',
      conservationImpact: 'Conservation Impact',
      shareJourney: 'Share Journey',
      downloadPassbook: 'Download Passbook',
      empty: 'Nothing here yet - start your heritage journey!',
      rarity: {
        karaniwan: 'Common',
        bihira: 'Rare',
        mahalagang: 'Epic',
        alamat: 'Legendary'
      },
      sections: {
        tahanan: 'Home',
        galeri: 'Gallery',
        quest: 'Cultural Quest',
        dashboard: 'Dashboard'
      },
      milestones: [
        { id: 1, title: 'First Adoption', description: 'Adopted first seed', completed: true },
        { id: 2, title: 'Cultural Explorer', description: 'Completed 3 quests', completed: false },
        { id: 3, title: 'Seed Guardian', description: 'Own 5 NFTs', completed: false },
        { id: 4, title: 'Heritage Master', description: 'Completed all quests', completed: false }
      ]
    }
  };

  const t = texts[language];

  const getRarityColor = (rarity: string) => {
    switch (rarity.toLowerCase()) {
      case 'karaniwan': return 'bg-[#8FBC8F] text-white';
      case 'bihira': return 'bg-[#4A773C] text-white';
      case 'mahalagang': return 'bg-[#5A3E36] text-white';
      case 'alamat': return 'bg-[#F9C74F] text-[#5A3E36]';
      default: return 'bg-gray-500 text-white';
    }
  };

  const completedMilestones = t.milestones.filter(m => m.completed).length;
  const totalMilestones = t.milestones.length;
  const progressPercentage = (completedMilestones / totalMilestones) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto border-2 border-[#4A773C] bg-[#F2EAD3]">
        <DialogHeader className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-16 h-16 bg-[#4A773C] rounded-full flex items-center justify-center">
              <Crown className="h-8 w-8 text-[#F9C74F]" />
            </div>
          </div>
          <DialogTitle className="text-2xl text-[#4A773C]">{t.title}</DialogTitle>
          <DialogDescription className="text-[#5A3E36]/80">
            {t.subtitle}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Quick Stats */}
          <Card className="border-2 border-[#4A773C] bg-gradient-to-r from-[#F2EAD3] to-[#D7E4C0] shadow-xl">
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-[#4A773C]">{userStats.level}</div>
                  <p className="text-sm text-[#5A3E36]/70">Level</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#C45A00]">{userStats.nftsOwned}</div>
                  <p className="text-sm text-[#5A3E36]/70">NFTs</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#7A9D54]">{userStats.badges.length}</div>
                  <p className="text-sm text-[#5A3E36]/70">Badges</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#F9C74F] text-shadow">{userStats.tokens}</div>
                  <p className="text-sm text-[#5A3E36]/70">Tokens</p>
                </div>
              </div>

              <div className="flex justify-center space-x-3 mt-6">
                <Button 
                  onClick={onShare}
                  className="bg-[#4A773C] hover:bg-[#355E3B] text-white"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  {t.shareJourney}
                </Button>
                <Button 
                  variant="outline"
                  className="border-[#4A773C] text-[#4A773C] hover:bg-[#4A773C] hover:text-white"
                >
                  <Download className="h-4 w-4 mr-2" />
                  {t.downloadPassbook}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-[#D7E4C0]">
              <TabsTrigger value="overview" className="data-[state=active]:bg-[#4A773C] data-[state=active]:text-white">
                {t.overview}
              </TabsTrigger>
              <TabsTrigger value="collection" className="data-[state=active]:bg-[#4A773C] data-[state=active]:text-white">
                {t.collection}
              </TabsTrigger>
              <TabsTrigger value="journey" className="data-[state=active]:bg-[#4A773C] data-[state=active]:text-white">
                {t.journey}
              </TabsTrigger>
              <TabsTrigger value="achievements" className="data-[state=active]:bg-[#4A773C] data-[state=active]:text-white">
                {t.achievements}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4 mt-4">
              {/* Profile Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-[#D7E4C0] bg-white/60">
                  <CardHeader>
                    <CardTitle className="text-[#4A773C] text-lg">Heritage Explorer Profile</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-[#5A3E36]">{t.memberSince}</span>
                      <span className="text-[#4A773C] font-semibold">Nov 2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#5A3E36]">{t.totalVisits}</span>
                      <span className="text-[#4A773C] font-semibold">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#5A3E36]">{t.favoriteSection}</span>
                      <span className="text-[#4A773C] font-semibold">Cultural Quest</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#5A3E36]">{t.nextGoal}</span>
                      <span className="text-[#C45A00] font-semibold">Seed Guardian</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-[#D7E4C0] bg-white/60">
                  <CardHeader>
                    <CardTitle className="text-[#4A773C] text-lg flex items-center space-x-2">
                      <Leaf className="h-5 w-5" />
                      <span>{t.conservationImpact}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-[#5A3E36]">Trees Planted</span>
                      <span className="text-[#4A773C] font-semibold">{userStats.treesPlanted}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#5A3E36]">Total Donated</span>
                      <span className="text-[#4A773C] font-semibold">₱{userStats.totalDonated.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#5A3E36]">Farmers Supported</span>
                      <span className="text-[#4A773C] font-semibold">3</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#5A3E36]">Provinces Reached</span>
                      <span className="text-[#4A773C] font-semibold">2</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Progress toward next milestone */}
              <Card className="border-2 border-[#4A773C] bg-[#F2EAD3]/80">
                <CardHeader>
                  <CardTitle className="text-[#4A773C]">Heritage Journey Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[#5A3E36]">Overall Progress:</span>
                      <span className="text-[#4A773C] font-bold">{completedMilestones}/{totalMilestones} milestones</span>
                    </div>
                    <Progress value={progressPercentage} className="h-3" />
                    <p className="text-sm text-[#5A3E36]/80">
                      Complete more cultural quests and adopt seeds to unlock new achievements!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="collection" className="space-y-4 mt-4">
              {/* NFT Collection */}
              <Card className="border-2 border-[#4A773C] bg-[#F2EAD3]/80">
                <CardHeader>
                  <CardTitle className="text-[#4A773C] flex items-center space-x-2">
                    <Camera className="h-5 w-5" />
                    <span>{t.myNFTs}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {ownedNFTs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {ownedNFTs.map((nft) => (
                        <Card 
                          key={nft.id} 
                          className="cursor-pointer hover:shadow-lg transition-shadow border-[#D7E4C0] bg-white/80"
                          onClick={() => setSelectedNFT(nft)}
                        >
                          <div className="aspect-square overflow-hidden rounded-t-lg">
                            <ImageWithFallback
                              src={nft.image}
                              alt={nft.name}
                              className="w-full h-full object-cover hover:scale-105 transition-transform"
                            />
                          </div>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-bold text-[#5A3E36]">{nft.name}</h4>
                              <Badge className={getRarityColor(nft.rarity)}>
                                {t.rarity[nft.rarity as keyof typeof t.rarity]}
                              </Badge>
                            </div>
                            <p className="text-sm text-[#5A3E36]/70 mb-1">{nft.location}</p>
                            <p className="text-xs text-[#5A3E36]/60">
                              Adopted: {new Date(nft.adoptedDate).toLocaleDateString()}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-[#5A3E36]/70">
                      <Leaf className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>{t.empty}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="journey" className="space-y-4 mt-4">
              {/* Visit History */}
              <Card className="border-2 border-[#7A9D54] bg-[#D7E4C0]/50">
                <CardHeader>
                  <CardTitle className="text-[#7A9D54] flex items-center space-x-2">
                    <MapPin className="h-5 w-5" />
                    <span>{t.visitHistory}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {visitedSections.map((section, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white/60 rounded-lg border border-[#D7E4C0]">
                        <div className="flex items-center space-x-3">
                          <Calendar className="h-4 w-4 text-[#7A9D54]" />
                          <div>
                            <span className="font-medium text-[#5A3E36]">{t.sections[section as keyof typeof t.sections]}</span>
                            <p className="text-sm text-[#5A3E36]/70">Today</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="border-[#7A9D54] text-[#7A9D54]">
                          Visited
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-4 mt-4">
              {/* Milestone Progress */}
              <Card className="border-2 border-[#4A773C] bg-[#F2EAD3]/80">
                <CardHeader>
                  <CardTitle className="text-[#4A773C] flex items-center space-x-2">
                    <Trophy className="h-5 w-5" />
                    <span>Heritage Milestones</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {t.milestones.map((milestone) => (
                      <div key={milestone.id} className={`flex items-center space-x-4 p-4 rounded-lg border-2 ${
                        milestone.completed 
                          ? 'bg-green-50 border-green-200' 
                          : 'bg-white/60 border-[#D7E4C0]'
                      }`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          milestone.completed 
                            ? 'bg-green-500 text-white' 
                            : 'bg-gray-300 text-gray-600'
                        }`}>
                          {milestone.completed ? '✓' : milestone.id}
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-bold ${milestone.completed ? 'text-green-800' : 'text-[#5A3E36]'}`}>
                            {milestone.title}
                          </h4>
                          <p className={`text-sm ${milestone.completed ? 'text-green-600' : 'text-[#5A3E36]/70'}`}>
                            {milestone.description}
                          </p>
                        </div>
                        {milestone.completed && (
                          <Badge className="bg-green-500 text-white">Completed</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
