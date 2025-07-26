import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Leaf, Trophy, Heart, Zap, Crown, Shield, Star, TreePine } from 'lucide-react';

interface UserStats {
  nftsOwned: number;
  totalDonated: number;
  treesPlanted: number;
  badges: string[];
  tokens: number;
  consecutiveDonations: number;
}

interface BadgeDefinition {
  id: string;
  name: string;
  description: string;
  icon: any;
  requirement: string;
  color: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  checkUnlocked: (stats: UserStats) => boolean;
}

const badgeDefinitions: BadgeDefinition[] = [
  {
    id: 'binhi-warrior',
    name: 'Binhi Warrior',
    description: 'Protector of heritage seeds',
    icon: Shield,
    requirement: '5 NFTs owned',
    color: '#4A773C',
    rarity: 'rare',
    checkUnlocked: (stats) => stats.nftsOwned >= 5
  },
  {
    id: 'patubig-patron',
    name: 'Patubig Patron',
    description: 'Generous supporter of conservation',
    icon: Heart,
    requirement: '₱500+ donation',
    color: '#C45A00',
    rarity: 'rare',
    checkUnlocked: (stats) => stats.totalDonated >= 500
  },
  {
    id: 'bantay-bukid',
    name: 'Bantay Bukid',
    description: 'Guardian of the fields',
    icon: Trophy,
    requirement: 'Repeat donor (3+ donations)',
    color: '#FFD700',
    rarity: 'epic',
    checkUnlocked: (stats) => stats.consecutiveDonations >= 3
  },
  {
    id: 'tahanan-hero',
    name: 'Tahanan Hero',
    description: 'Champion of heritage preservation',
    icon: Crown,
    requirement: '10 NFTs owned',
    color: '#9B59B6',
    rarity: 'legendary',
    checkUnlocked: (stats) => stats.nftsOwned >= 10
  },
  {
    id: 'tree-planter',
    name: 'Tanim Kalinga',
    description: 'Forest restoration champion',
    icon: TreePine,
    requirement: '25 trees planted',
    color: '#27AE60',
    rarity: 'epic',
    checkUnlocked: (stats) => stats.treesPlanted >= 25
  },
  {
    id: 'first-supporter',
    name: 'Unang Suporta',
    description: 'Welcome to the community!',
    icon: Star,
    requirement: 'First NFT or donation',
    color: '#F9C74F',
    rarity: 'common',
    checkUnlocked: (stats) => stats.nftsOwned >= 1 || stats.totalDonated > 0
  }
];

interface KalikhasanTokensProps {
  userStats: UserStats;
  onStatsUpdate: (stats: UserStats) => void;
}

export function KalikhasanTokens({ userStats, onStatsUpdate }: KalikhasanTokensProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [newlyUnlockedBadges, setNewlyUnlockedBadges] = useState<string[]>([]);

  // Check for newly unlocked badges
  useEffect(() => {
    const unlockedBadges = badgeDefinitions.filter(badge => 
      badge.checkUnlocked(userStats) && !userStats.badges.includes(badge.id)
    );

    if (unlockedBadges.length > 0) {
      const newBadgeIds = unlockedBadges.map(badge => badge.id);
      setNewlyUnlockedBadges(newBadgeIds);
      setShowConfetti(true);
      
      // Update user stats with new badges
      onStatsUpdate({
        ...userStats,
        badges: [...userStats.badges, ...newBadgeIds]
      });

      // Hide confetti after 3 seconds
      setTimeout(() => {
        setShowConfetti(false);
        setNewlyUnlockedBadges([]);
      }, 3000);
    }
  }, [userStats.nftsOwned, userStats.totalDonated, userStats.consecutiveDonations]);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-400 bg-gray-50';
      case 'rare': return 'border-blue-400 bg-blue-50';
      case 'epic': return 'border-purple-400 bg-purple-50';
      case 'legendary': return 'border-yellow-400 bg-yellow-50';
      default: return 'border-gray-400 bg-gray-50';
    }
  };

  const getRarityGlow = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'shadow-gray-300';
      case 'rare': return 'shadow-blue-300';
      case 'epic': return 'shadow-purple-300';
      case 'legendary': return 'shadow-yellow-300';
      default: return 'shadow-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Token Overview */}
      <Card className="border-2 border-[#4A773C] bg-gradient-to-br from-[#F2EAD3] to-[#D7E4C0] badge-shelf">
        <CardHeader className="text-center pb-3">
          <CardTitle className="flex items-center justify-center space-x-2 text-[#4A773C]">
            <Leaf className="h-6 w-6" />
            <span>Kalikhasan Tokens</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="mb-4">
            <div className="text-4xl font-bold text-[#4A773C] mb-2">{userStats.tokens}</div>
            <p className="text-[#5A3E36]/80">Tokens Earned</p>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="text-xl font-bold text-[#C45A00]">{userStats.treesPlanted}</div>
              <p className="text-xs text-[#5A3E36]/70">Trees Planted</p>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-[#C45A00]">{userStats.nftsOwned}</div>
              <p className="text-xs text-[#5A3E36]/70">NFTs Owned</p>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-[#C45A00]">₱{userStats.totalDonated.toLocaleString()}</div>
              <p className="text-xs text-[#5A3E36]/70">Total Donated</p>
            </div>
          </div>

          <div className="bg-[#4A773C]/10 rounded-lg p-3 border border-[#4A773C]/20">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <TreePine className="h-4 w-4 text-[#4A773C]" />
              <span className="text-sm font-semibold text-[#4A773C]">Tree Planting Progress</span>
            </div>
            <p className="text-xs text-[#5A3E36]/80 mb-2">
              1 Token = 1 Tree Planted through our conservation partners
            </p>
            <div className="text-center">
              <Badge variant="outline" className="border-[#4A773C] text-[#4A773C]">
                Next milestone: {Math.ceil(userStats.treesPlanted / 5) * 5} trees
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Badge Collection */}
      <Card className="border-2 border-[#4A773C] bg-[#F2EAD3]/60 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-[#4A773C] flex items-center space-x-2">
            <Trophy className="h-5 w-5" />
            <span>Badge Collection</span>
            <Badge variant="outline" className="border-[#C45A00] text-[#C45A00]">
              {userStats.badges.length}/{badgeDefinitions.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <TooltipProvider>
              {badgeDefinitions.map((badge, index) => {
                const isUnlocked = userStats.badges.includes(badge.id);
                const isNewlyUnlocked = newlyUnlockedBadges.includes(badge.id);
                const Icon = badge.icon;
                
                return (
                  <Tooltip key={badge.id}>
                    <TooltipTrigger asChild>
                      <div
                        className={`
                          relative aspect-square rounded-xl border-2 p-3 transition-all duration-300 cursor-pointer
                          ${isUnlocked 
                            ? `${getRarityColor(badge.rarity)} ${getRarityGlow(badge.rarity)} shadow-lg transform hover:scale-105` 
                            : 'badge-slot opacity-50'
                          }
                          ${isNewlyUnlocked ? 'animate-pulse-slow' : ''}
                        `}
                        style={{
                          backgroundColor: isUnlocked ? `${badge.color}15` : undefined,
                          borderColor: isUnlocked ? badge.color : undefined
                        }}
                      >
                        {isUnlocked && (
                          <>
                            <Icon 
                              className="w-full h-full"
                              style={{ color: badge.color }}
                            />
                            <div className="absolute -top-1 -right-1">
                              {badge.rarity === 'legendary' && <Crown className="h-4 w-4 text-yellow-500" />}
                              {badge.rarity === 'epic' && <Zap className="h-4 w-4 text-purple-500" />}
                              {badge.rarity === 'rare' && <Star className="h-4 w-4 text-blue-500" />}
                            </div>
                          </>
                        )}
                        
                        {isNewlyUnlocked && (
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-400/20 to-orange-400/20 animate-pulse" />
                        )}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <div className="text-center">
                        <h4 className="font-bold text-[#4A773C] mb-1">{badge.name}</h4>
                        <p className="text-sm text-[#5A3E36] mb-2">{badge.description}</p>
                        <p className="text-xs text-[#5A3E36]/70 mb-1">Requirement: {badge.requirement}</p>
                        <Badge 
                          variant="outline" 
                          className={`text-xs capitalize ${
                            badge.rarity === 'legendary' ? 'border-yellow-400 text-yellow-600' :
                            badge.rarity === 'epic' ? 'border-purple-400 text-purple-600' :
                            badge.rarity === 'rare' ? 'border-blue-400 text-blue-600' :
                            'border-gray-400 text-gray-600'
                          }`}
                        >
                          {badge.rarity}
                        </Badge>
                        {isUnlocked ? (
                          <div className="mt-2 text-green-600 font-semibold text-xs">✓ Unlocked!</div>
                        ) : (
                          <div className="mt-2 text-gray-500 text-xs">Locked</div>
                        )}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </TooltipProvider>
          </div>

          {/* Progress to next badge */}
          <div className="mt-6 space-y-3">
            <h4 className="font-semibold text-[#4A773C]">Next Achievements</h4>
            {badgeDefinitions
              .filter(badge => !userStats.badges.includes(badge.id))
              .slice(0, 2)
              .map((badge, index) => {
                const Icon = badge.icon;
                let progress = 0;
                let progressText = '';

                // Calculate progress based on badge type
                if (badge.id === 'binhi-warrior') {
                  progress = (userStats.nftsOwned / 5) * 100;
                  progressText = `${userStats.nftsOwned}/5 NFTs`;
                } else if (badge.id === 'patubig-patron') {
                  progress = (userStats.totalDonated / 500) * 100;
                  progressText = `₱${userStats.totalDonated}/₱500`;
                } else if (badge.id === 'bantay-bukid') {
                  progress = (userStats.consecutiveDonations / 3) * 100;
                  progressText = `${userStats.consecutiveDonations}/3 donations`;
                }

                return (
                  <div key={badge.id} className="bg-white/60 rounded-lg p-3 border border-[#D7E4C0]">
                    <div className="flex items-center space-x-3 mb-2">
                      <Icon className="h-5 w-5" style={{ color: badge.color }} />
                      <div className="flex-1">
                        <h5 className="font-medium text-[#5A3E36]">{badge.name}</h5>
                        <p className="text-xs text-[#5A3E36]/70">{progressText}</p>
                      </div>
                    </div>
                    <Progress 
                      value={Math.min(progress, 100)} 
                      className="h-2"
                      style={{
                        '--progress-foreground': badge.color
                      } as React.CSSProperties}
                    />
                  </div>
                );
              })
            }
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
