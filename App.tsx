import React, { useState } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { MuseumRoom } from './components/MuseumRoom';
import { AdoptFlow } from './components/AdoptFlow';
import { UserDashboard } from './components/UserDashboard';
import { AITourGuide } from './components/AITourGuide';
import { RWADashboard } from './components/RWADashboard';
import { MuseumPassbook } from './components/MuseumPassbook';
import { ShareJourney } from './components/ShareJourney';
import { TransparencyModal } from './components/TransparencyModal';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { Languages } from 'lucide-react';

interface UserStats {
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

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'museum'>('home');
  const [selectedCrop, setSelectedCrop] = useState<any>(null);
  const [hoveredCrop, setHoveredCrop] = useState<any>(null);
  const [adoptFlowOpen, setAdoptFlowOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [passbookOpen, setPassbookOpen] = useState(false);
  const [shareJourneyOpen, setShareJourneyOpen] = useState(false);
  const [transparencyModalOpen, setTransparencyModalOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'fil'>('fil');
  const [recentTransaction, setRecentTransaction] = useState<any>(null);
  
  // User stats and progress
  const [userStats, setUserStats] = useState<UserStats>({
    nftsOwned: 2,
    totalDonated: 25800,
    treesPlanted: 3,
    badges: ['First Supporter', 'Rice Terraces Explorer', 'Cultural Guardian'],
    tokens: 5,
    consecutiveDonations: 2,
    level: 3,
    experience: 275,
    experienceToNext: 100
  });

  const [questProgress, setQuestProgress] = useState<{ [key: string]: number }>({
    ifugao: 2,
    batangas: 1,
    bohol: 0
  });

  // Mock owned NFTs for demonstration
  const ownedNFTs = [
    {
      id: 1,
      name: 'Tinawon Rice',
      rarity: 'alamat',
      adoptedDate: '2024-11-15',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=300&fit=crop',
      location: 'Ifugao Province'
    },
    {
      id: 2,
      name: 'Siling Labuyo',
      rarity: 'mahalagang',
      adoptedDate: '2024-11-20',
      image: 'https://images.unsplash.com/photo-1583119023804-d7cce73b02d9?w=300&h=300&fit=crop',
      location: 'Nationwide'
    }
  ];

  const handleAdoptCrop = (crop: any) => {
    setSelectedCrop(crop);
    setAdoptFlowOpen(true);
  };

  const handleAdoptComplete = () => {
    setAdoptFlowOpen(false);
    
    // Create transaction record
    const transaction = {
      txHash: '0x' + Math.random().toString(16).substr(2, 64),
      crop: selectedCrop,
      amount: parseFloat(selectedCrop?.preservationValue?.replace('₱', '').replace(',', '') || '0'),
      walletAddress: '0x742F35Cc4C4f354F87c20A1c34a45B23E5CE5E4e',
      timestamp: new Date(),
      blockNumber: Math.floor(Math.random() * 1000000) + 18000000,
      gasUsed: 21000,
      confirmations: 1
    };
    
    setRecentTransaction(transaction);
    setTransparencyModalOpen(true);
    
    // Update user stats when NFT is adopted
    const cropValue = parseFloat(selectedCrop?.preservationValue?.replace('₱', '').replace(',', '') || '0');
    setUserStats(prev => ({
      ...prev,
      nftsOwned: prev.nftsOwned + 1,
      totalDonated: prev.totalDonated + cropValue,
      tokens: prev.tokens + 1,
      treesPlanted: prev.treesPlanted + 1,
      consecutiveDonations: prev.consecutiveDonations + 1,
      experience: prev.experience + 100
    }));

    setSelectedCrop(null);
  };

  const handleStatsUpdate = (newStats: UserStats) => {
    setUserStats(newStats);
  };

  const handleQuestProgressUpdate = (provinceId: string, progress: number) => {
    setQuestProgress(prev => ({
      ...prev,
      [provinceId]: progress
    }));
    
    // Award experience and tokens for quest progress
    setUserStats(prev => ({
      ...prev,
      tokens: prev.tokens + 1,
      experience: prev.experience + 25
    }));
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'fil' ? 'en' : 'fil');
  };

  const handleShareJourney = () => {
    setShareJourneyOpen(true);
  };

  const handleOpenPassbook = () => {
    setPassbookOpen(true);
  };

  return (
    <div className="min-h-screen bg-filipino-heritage relative">
      {/* Language Toggle - Fixed Position */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={toggleLanguage}
          variant="outline"
          size="sm"
          className="bg-[#FFF8E1]/90 backdrop-blur-sm border-[#4A773C] text-[#4A773C] hover:bg-[#4A773C] hover:text-white transition-all duration-300 shadow-lg"
        >
          <Languages className="h-4 w-4 mr-2" />
          <Badge variant="secondary" className="ml-1 bg-[#4A773C] text-white">
            {language === 'fil' ? 'FIL' : 'EN'}
          </Badge>
        </Button>
      </div>

      {/* AI Personal Tour Guide - Always Available */}
      <AITourGuide 
        language={language}
        currentScreen={currentScreen}
        hoveredCrop={hoveredCrop}
      />

      {/* Main Content */}
      {currentScreen === 'home' && (
        <HomeScreen 
          onEnterMuseum={() => setCurrentScreen('museum')}
          onOpenDashboard={() => setDashboardOpen(true)}
          userStats={userStats}
          language={language}
        />
      )}
      
      {currentScreen === 'museum' && (
        <MuseumRoom 
          onBackToHome={() => setCurrentScreen('home')}
          onAdoptCrop={handleAdoptCrop}
          onOpenDashboard={() => setDashboardOpen(true)}
          userStats={userStats}
          language={language}
        />
      )}

      {/* Enhanced Adopt Flow */}
      <AdoptFlow
        isOpen={adoptFlowOpen}
        crop={selectedCrop}
        onClose={() => setAdoptFlowOpen(false)}
        onComplete={handleAdoptComplete}
        language={language}
      />

      {/* Enhanced User Dashboard */}
      <UserDashboard
        isOpen={dashboardOpen}
        onClose={() => setDashboardOpen(false)}
        userStats={userStats}
        onStatsUpdate={handleStatsUpdate}
        questProgress={questProgress}
        onQuestProgressUpdate={handleQuestProgressUpdate}
        language={language}
        onOpenPassbook={handleOpenPassbook}
        onShareJourney={handleShareJourney}
      />

      {/* Museum Passbook */}
      <MuseumPassbook
        isOpen={passbookOpen}
        onClose={() => setPassbookOpen(false)}
        userStats={userStats}
        ownedNFTs={ownedNFTs}
        visitedSections={['tahanan', 'galeri', 'quest']}
        earnedBadges={userStats.badges}
        language={language}
        onShare={handleShareJourney}
      />

      {/* Share Journey Modal */}
      <ShareJourney
        isOpen={shareJourneyOpen}
        onClose={() => setShareJourneyOpen(false)}
        userStats={userStats}
        recentNFT={ownedNFTs[ownedNFTs.length - 1]}
        walletAddress="0x742F35Cc4C4f354F87c20A1c34a45B23E5CE5E4e"
        language={language}
      />

      {/* Donation/Transaction Transparency Modal */}
      {recentTransaction && (
        <TransparencyModal
          isOpen={transparencyModalOpen}
          onClose={() => setTransparencyModalOpen(false)}
          transaction={recentTransaction}
          language={language}
        />
      )}
    </div>
  );
}
