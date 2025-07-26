import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { HeritageCarousel } from './HeritageCarousel';
import { Sprout, Users, Trophy, Shield, Leaf, Mountain, Sun, Wheat, Heart, Phone, Facebook, User, Map } from 'lucide-react';
import logoImage from 'figma:asset/be21c898a0bcff3aced7a322f4f72fb902444127.png';
import pekingCornImage from 'figma:asset/92e990eddd9820b951511a8b17d263687ec0f2d8.png';
import tinawonRiceImage from 'figma:asset/32637e0de312c5517971011d563af4745aff71f2.png';
import silingLabuyoImage from 'figma:asset/79124988b4e5a91b299375ba6f31f04fe76ba4ee.png';

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

interface HomeScreenProps {
  onEnterMuseum: () => void;
  onOpenDashboard: () => void;
  userStats: UserStats;
  language?: 'en' | 'fil';
}

export function HomeScreen({ onEnterMuseum, onOpenDashboard, userStats, language = 'fil' }: HomeScreenProps) {
  
  // Language texts (keeping existing implementation)
  const texts = {
    fil: {
      tagline: 'A Living Digital Museum for Filipino Farming Heritage',
      dashboard: 'Dashboard',
      tahanan: 'Tahanan',
      galeri: 'Galeri',
      culturalQuest: 'Cultural Quest',
      tungkol: 'Tungkol',
      makipagUgnayan: 'Makipag-ugnayan',
      preservingCrops: '✨ Preserving 1,000+ Indigenous Filipino Crops ✨',
      welcome: 'Maligayang Pagdating sa',
      museumName: 'Binhi Heritage Museum',
      welcomeText: 'Tuklasin, alagaan, at pangalagaan ang mga pambihirang uri ng mga tanim na Pilipino.',
      welcomeSubtext: 'Bawat binhi ay kumakatawan sa aming mayamang kasaysayan sa agrikultura at tradisyon.',
      enterMuseum: 'Pumasok sa Museo',
      learnMore: 'Alamin Pa',
      endangeredVarieties: 'Endangered Varieties',
      communityMembers: 'Community Members',
      provincesCovered: 'Provinces Covered',
      raisedConservation: 'Raised for Conservation',
      questFeature: '🎯 New Feature: Cultural Heritage Quest',
      exploreHeritage: 'Explore Filipino Agricultural Heritage',
      interactiveLearning: 'Through Interactive Learning',
      questSystem: 'Cultural Quest System',
      interactiveMap: 'Interactive Province Map',
      exploreRegions: 'Explore Luzon, Visayas, and Mindanao regions',
      culturalTrivia: 'Cultural Trivia Questions',
      learnCrops: 'Learn about indigenous crops and farming traditions',
      earnTokens: 'Earn Kalikhasan Tokens',
      tokenTree: '1 Token = 1 Tree Planted through conservation partners',
      unlockBadges: 'Unlock Heritage Badges',
      collectAchievements: 'Collect unique achievements and seed badges',
      startJourney: 'Start Your Cultural Journey',
      whyChoose: 'Bakit Piliin ang Binhi Heritage?',
      joinMission: 'Samahan Namin sa Pagpapahalaga sa',
      ourWealth: 'Aming Agrikultural na Yaman',
      nativeVarieties: 'Katutubo na Uri',
      nativeDescription: 'Bawat binhi ay may natatanging katangian at matatagal nang kasaysayan sa Filipino culture',
      secureOwnership: 'Ligtas na Pag-aari',
      secureDescription: 'Blockchain-verified na pagkakakilanlan at secured digital ownership',
      community: 'Komunidad',
      communityDescription: 'Makipag-ugnayan sa mga passionate conservationists at farmers',
      conservation: 'Konserbasyon',
      conservationDescription: 'Direct contribution sa preservation ng endangered Filipino varieties',
      featuredCrops: 'Featured Heritage Crops',
      featuredDescription: 'Discover some of our most precious and endangered Filipino agricultural varieties',
      exploreAll: 'Explore All Varieties',
      readyToStart: 'Handa Ka Na Bang Simulan ang Inyong Paglalakbay?',
      journeyText: 'Pumasok sa aming virtual na museo at tuklasin ang mga binhing naghihintay na inyong pangalagaan.',
      missionText: 'Maging bahagi ng misyon namin na mapanatili ang Filipino agricultural heritage.',
      exploreMuseum: 'Galugarin ang Museo',
      preservingHeritage: 'Preserving Filipino agricultural heritage through digital innovation and community action.',
      quickLinks: 'Quick Links',
      contact: 'Contact',
      conservationImpact: 'Conservation Impact',
      varietiesDocumented: '🌾 1,000+ varieties documented',
      provincesStats: '🏔️ 17 provinces covered',
      communityStats: '👥 50,000+ community members',
      raisedStats: '💚 ₱2.5M raised for conservation',
      copyright: '© 2025 Binhi Heritage Museum. Preserving our agricultural legacy for future generations.'
    },
    en: {
      tagline: 'A Living Digital Museum for Filipino Farming Heritage',
      dashboard: 'Dashboard',
      tahanan: 'Home',
      galeri: 'Gallery',
      culturalQuest: 'Cultural Quest',
      tungkol: 'About',
      makipagUgnayan: 'Contact',
      preservingCrops: '✨ Preserving 1,000+ Indigenous Filipino Crops ✨',
      welcome: 'Welcome to',
      museumName: 'Binhi Heritage Museum',
      welcomeText: 'Discover, care for, and preserve the remarkable varieties of Filipino plants.',
      welcomeSubtext: 'Each seed represents our rich history in agriculture and tradition.',
      enterMuseum: 'Enter Museum',
      learnMore: 'Learn More',
      endangeredVarieties: 'Endangered Varieties',
      communityMembers: 'Community Members',
      provincesCovered: 'Provinces Covered',
      raisedConservation: 'Raised for Conservation',
      questFeature: '🎯 New Feature: Cultural Heritage Quest',
      exploreHeritage: 'Explore Filipino Agricultural Heritage',
      interactiveLearning: 'Through Interactive Learning',
      questSystem: 'Cultural Quest System',
      interactiveMap: 'Interactive Province Map',
      exploreRegions: 'Explore Luzon, Visayas, and Mindanao regions',
      culturalTrivia: 'Cultural Trivia Questions',
      learnCrops: 'Learn about indigenous crops and farming traditions',
      earnTokens: 'Earn Kalikhasan Tokens',
      tokenTree: '1 Token = 1 Tree Planted through conservation partners',
      unlockBadges: 'Unlock Heritage Badges',
      collectAchievements: 'Collect unique achievements and seed badges',
      startJourney: 'Start Your Cultural Journey',
      whyChoose: 'Why Choose Binhi Heritage?',
      joinMission: 'Join Us in Appreciating Our',
      ourWealth: 'Agricultural Heritage',
      nativeVarieties: 'Native Varieties',
      nativeDescription: 'Each seed has unique characteristics and a long history in Filipino culture',
      secureOwnership: 'Secure Ownership',
      secureDescription: 'Blockchain-verified identity and secured digital ownership',
      community: 'Community',
      communityDescription: 'Connect with passionate conservationists and farmers',
      conservation: 'Conservation',
      conservationDescription: 'Direct contribution to the preservation of endangered Filipino varieties',
      featuredCrops: 'Featured Heritage Crops',
      featuredDescription: 'Discover some of our most precious and endangered Filipino agricultural varieties',
      exploreAll: 'Explore All Varieties',
      readyToStart: 'Ready to Start Your Journey?',
      journeyText: 'Enter our virtual museum and discover the seeds waiting for your care.',
      missionText: 'Be part of our mission to preserve Filipino agricultural heritage.',
      exploreMuseum: 'Explore the Museum',
      preservingHeritage: 'Preserving Filipino agricultural heritage through digital innovation and community action.',
      quickLinks: 'Quick Links',
      contact: 'Contact',
      conservationImpact: 'Conservation Impact',
      varietiesDocumented: '🌾 1,000+ varieties documented',
      provincesStats: '🏔️ 17 provinces covered',
      communityStats: '👥 50,000+ community members',
      raisedStats: '💚 ₱2.5M raised for conservation',
      copyright: '© 2025 Binhi Heritage Museum. Preserving our agricultural legacy for future generations.'
    }
  };

  const t = texts[language];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const featuredCrops = [
    {
      name: 'Tinawon Rice',
      subtitle: 'Ifugao Sacred Heirloom',
      description: 'Ancient rice variety from the UNESCO World Heritage rice terraces',
      image: tinawonRiceImage,
      rarity: 'Alamat',
      status: 'Endangered'
    },
    {
      name: 'Peking Corn',
      subtitle: 'Visayan Traditional',  
      description: 'Sweet corn variety used in traditional Filipino desserts and ceremonies',
      image: pekingCornImage,
      rarity: 'Mahalagang',
      status: 'Vulnerable'
    },
    {
      name: 'Siling Labuyo',
      subtitle: 'National Spice',
      description: 'Fiery small chili pepper used throughout Filipino cuisine',
      image: silingLabuyoImage,
      rarity: 'Mahalagang', 
      status: 'Stable'
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Organic Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#4A773C]/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-32 w-64 h-64 bg-[#7A9D54]/10 organic-leaf blur-2xl"></div>
        <div className="absolute bottom-20 right-1/4 w-48 h-48 bg-[#C45A00]/10 rounded-full blur-2xl"></div>
      </div>

      {/* Enhanced Header with Sticky Navigation */}
      <header className="relative z-20 bg-[#4A773C]/95 backdrop-blur-md border-b border-[#5A3E36]/20 shadow-lg sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              {/* Enhanced Logo Section */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img 
                    src={logoImage} 
                    alt="Binhi Heritage Museum Logo" 
                    className="h-16 w-16 object-contain filter drop-shadow-xl"
                  />
                  {/* Logo glow effect */}
                  <div className="absolute inset-0 h-16 w-16 bg-[#F9C74F]/30 rounded-full blur-lg"></div>
                </div>
                <div className="text-left">
                  <h1 className="text-2xl font-bold text-[#F2EAD3] tracking-wide drop-shadow-lg">
                    Binhi Heritage
                  </h1>
                  <p className="text-sm text-[#D7E4C0] font-medium drop-shadow-sm">
                    {t.tagline}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* User Dashboard Button */}
              <Button
                variant="ghost"
                onClick={onOpenDashboard}
                className="text-[#F2EAD3] hover:text-[#F9C74F] hover:bg-[#355E3B]/20 transition-colors relative"
              >
                <User className="h-5 w-5 mr-2" />
                <span className="hidden sm:inline">{t.dashboard}</span>
                {userStats.tokens > 0 && (
                  <Badge className="ml-2 bg-[#F9C74F] text-[#5A3E36] px-2 py-0.5 text-xs">
                    {userStats.tokens}
                  </Badge>
                )}
              </Button>

              {/* Enhanced Navigation Menu */}
              <nav className="hidden lg:flex space-x-2 bg-[#355E3B]/30 rounded-xl p-2 backdrop-blur-sm border border-[#D7E4C0]/20">
                <button 
                  onClick={() => scrollToSection('tahanan')}
                  className="text-[#F2EAD3] hover:text-[#F9C74F] transition-all duration-300 font-medium px-4 py-2 rounded-lg hover:bg-[#F9C74F]/20 hover:shadow-md"
                >
                  {t.tahanan}
                </button>
                <button 
                  onClick={() => scrollToSection('galeri')}
                  className="text-[#F2EAD3] hover:text-[#F9C74F] transition-all duration-300 font-medium px-4 py-2 rounded-lg hover:bg-[#F9C74F]/20 hover:shadow-md"
                >
                  {t.galeri}
                </button>
                <button 
                  onClick={() => scrollToSection('quest')}
                  className="text-[#F2EAD3] hover:text-[#F9C74F] transition-all duration-300 font-medium px-4 py-2 rounded-lg hover:bg-[#F9C74F]/20 hover:shadow-md flex items-center space-x-1"
                >
                  <Map className="h-4 w-4" />
                  <span>{t.culturalQuest}</span>
                </button>
                <button 
                  onClick={() => scrollToSection('tungkol')}
                  className="text-[#F2EAD3] hover:text-[#F9C74F] transition-all duration-300 font-medium px-4 py-2 rounded-lg hover:bg-[#F9C74F]/20 hover:shadow-md"
                >
                  {t.tungkol}
                </button>
                <button 
                  onClick={() => scrollToSection('makipag-ugnayan')}
                  className="text-[#F2EAD3] hover:text-[#F9C74F] transition-all duration-300 font-medium px-4 py-2 rounded-lg hover:bg-[#F9C74F]/20 hover:shadow-md"
                >
                  {t.makipagUgnayan}
                </button>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8" id="tahanan">
        <div className="max-w-7xl mx-auto">
          {/* Hero Badge */}
          <div className="text-center mb-6">
            <Badge className="bg-[#F9C74F] text-[#5A3E36] font-semibold px-4 py-2 text-sm border border-[#5A3E36]/20">
              {t.preservingCrops}
            </Badge>
          </div>

          <div className="text-center relative">
            {/* Decorative Elements */}
            <div className="absolute -top-8 left-1/4 w-16 h-16 bg-[#4A773C]/10 organic-leaf hidden lg:block"></div>
            <div className="absolute -top-4 right-1/3 w-12 h-12 bg-[#F9C74F]/20 rounded-full hidden lg:block"></div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#5A3E36] mb-8 leading-tight">
              <span className="block">{t.welcome}</span>
              <span className="block bg-gradient-to-r from-[#4A773C] to-[#7A9D54] bg-clip-text text-transparent">
                {t.museumName}
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-[#5A3E36]/80 mb-10 max-w-4xl mx-auto leading-relaxed">
              {t.welcomeText}
              <span className="block mt-2 font-semibold text-[#4A773C]">
                {t.welcomeSubtext}
              </span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                onClick={onEnterMuseum}
                size="lg"
                className="bg-[#C45A00] hover:bg-[#C45A00]/90 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 border-[#C45A00] relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center">
                  <Leaf className="mr-2 h-5 w-5" />
                  {t.enterMuseum}
                </span>
                <div className="absolute inset-0 bg-[#B85000] translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => scrollToSection('tungkol')}
                className="border-2 border-[#4A773C] text-[#4A773C] hover:bg-[#4A773C] hover:text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
              >
                <Mountain className="mr-2 h-5 w-5" />
                {t.learnMore}
              </Button>
            </div>
          </div>

          {/* Featured Image with Heritage Carousel - Reduced Height */}
          <div className="relative">
            <div className="aspect-[2/1] sm:aspect-[5/2] lg:aspect-[3/1] rounded-2xl overflow-hidden shadow-2xl border-4 border-[#4A773C]/30 relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=1200&h=600&fit=crop&auto=format"
                alt="Banaue Rice Terraces - UNESCO World Heritage Site"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              {/* Heritage Carousel Overlay */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                <HeritageCarousel />
              </div>
            </div>
            
            {/* Floating decorative elements */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-[#F9C74F] rounded-full shadow-lg hidden sm:block"></div>
            <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-[#4A773C]/20 organic-leaf shadow-lg hidden sm:block"></div>
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="relative z-10 py-12 bg-filipino-rice-paper" id="stats">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-[#F9C74F] w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                <Sprout className="h-7 w-7 text-[#5A3E36]" />
              </div>
              <p className="text-2xl font-bold text-[#4A773C] mb-1">1,000+</p>
              <p className="text-[#5A3E36] font-medium text-sm">{t.endangeredVarieties}</p>
            </div>
            
            <div className="text-center">
              <div className="bg-[#4A773C] w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                <Users className="h-7 w-7 text-white" />
              </div>
              <p className="text-2xl font-bold text-[#4A773C] mb-1">50,000+</p>
              <p className="text-[#5A3E36] font-medium text-sm">{t.communityMembers}</p>
            </div>
            
            <div className="text-center">
              <div className="bg-[#7A9D54] w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                <Mountain className="h-7 w-7 text-white" />
              </div>
              <p className="text-2xl font-bold text-[#4A773C] mb-1">17</p>
              <p className="text-[#5A3E36] font-medium text-sm">{t.provincesCovered}</p>
            </div>
            
            <div className="text-center">
              <div className="bg-[#C45A00] w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                <Heart className="h-7 w-7 text-white" />
              </div>
              <p className="text-2xl font-bold text-[#4A773C] mb-1">₱2.5M</p>
              <p className="text-[#5A3E36] font-medium text-sm">{t.raisedConservation}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cultural Quest Preview Section */}
      <section className="relative z-10 py-16 bg-filipino-banig" id="quest">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="bg-[#4A773C] text-white px-4 py-2 mb-6 font-semibold">
              {t.questFeature}
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#5A3E36] mb-6">
              {t.exploreHeritage}
              <span className="block text-[#4A773C]">{t.interactiveLearning}</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#C45A00] to-[#4A773C] rounded-full mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <Card className="border-2 border-[#4A773C] bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Map className="h-8 w-8 text-[#4A773C]" />
                    <h3 className="text-xl font-bold text-[#5A3E36]">{t.questSystem}</h3>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-[#4A773C] rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium text-[#5A3E36]">{t.interactiveMap}</p>
                        <p className="text-sm text-[#5A3E36]/70">{t.exploreRegions}</p>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-[#C45A00] rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium text-[#5A3E36]">{t.culturalTrivia}</p>
                        <p className="text-sm text-[#5A3E36]/70">{t.learnCrops}</p>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-[#F9C74F] rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium text-[#5A3E36]">{t.earnTokens}</p>
                        <p className="text-sm text-[#5A3E36]/70">{t.tokenTree}</p>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-[#7A9D54] rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium text-[#5A3E36]">{t.unlockBadges}</p>
                        <p className="text-sm text-[#5A3E36]/70">{t.collectAchievements}</p>
                      </div>
                    </li>
                  </ul>

                  <Button 
                    onClick={onOpenDashboard}
                    className="w-full bg-[#C45A00] hover:bg-[#C45A00]/90 text-white font-semibold rounded-xl"
                  >
                    <Map className="mr-2 h-5 w-5" />
                    {t.startJourney}
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card className="border-[#D7E4C0] bg-white/60 p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-[#4A773C] flex items-center justify-center">
                    <Trophy className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#5A3E36]">Rice Terraces Guardian</h4>
                    <p className="text-sm text-[#5A3E36]/70">Complete Ifugao province quest</p>
                  </div>
                  <Badge variant="outline" className="border-[#C45A00] text-[#C45A00]">
                    Epic
                  </Badge>
                </div>
              </Card>

              <Card className="border-[#D7E4C0] bg-white/60 p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-[#7A9D54] flex items-center justify-center">
                    <Trophy className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#5A3E36]">Barako Coffee Master</h4>
                    <p className="text-sm text-[#5A3E36]/70">Complete Batangas province quest</p>
                  </div>
                  <Badge variant="outline" className="border-[#C45A00] text-[#C45A00]">
                    Rare
                  </Badge>
                </div>
              </Card>

              <Card className="border-[#D7E4C0] bg-white/60 p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-[#F9C74F] flex items-center justify-center">
                    <Trophy className="h-6 w-6 text-[#5A3E36]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#5A3E36]">Purple Ube Keeper</h4>
                    <p className="text-sm text-[#5A3E36]/70">Complete Bohol province quest</p>
                  </div>
                  <Badge variant="outline" className="border-[#C45A00] text-[#C45A00]">
                    Legendary
                  </Badge>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-16 bg-filipino-woven-soft" id="tungkol">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="bg-[#4A773C] text-white px-4 py-2 mb-6 font-semibold">
              {t.whyChoose}
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#5A3E36] mb-6">
              {t.joinMission}
              <span className="block text-[#4A773C]">{t.ourWealth}</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#C45A00] to-[#4A773C] rounded-full mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center p-6 border-2 border-[#D7E4C0] hover:border-[#4A773C] transition-all duration-300 hover:shadow-xl hover:scale-105 bg-white/80 backdrop-blur-sm group">
              <CardContent className="pt-4">
                <div className="bg-[#4A773C] w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:bg-[#355E3B] transition-colors duration-300">
                  <Sprout className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-[#5A3E36]">{t.nativeVarieties}</h3>
                <p className="text-[#5A3E36]/80 text-sm leading-relaxed">
                  {t.nativeDescription}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-2 border-[#D7E4C0] hover:border-[#4A773C] transition-all duration-300 hover:shadow-xl hover:scale-105 bg-white/80 backdrop-blur-sm group">
              <CardContent className="pt-4">
                <div className="bg-[#4A773C] w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:bg-[#355E3B] transition-colors duration-300">
                  <Shield className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-[#5A3E36]">{t.secureOwnership}</h3>
                <p className="text-[#5A3E36]/80 text-sm leading-relaxed">
                  {t.secureDescription}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-2 border-[#D7E4C0] hover:border-[#4A773C] transition-all duration-300 hover:shadow-xl hover:scale-105 bg-white/80 backdrop-blur-sm group">
              <CardContent className="pt-4">
                <div className="bg-[#4A773C] w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:bg-[#355E3B] transition-colors duration-300">
                  <Users className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-[#5A3E36]">{t.community}</h3>
                <p className="text-[#5A3E36]/80 text-sm leading-relaxed">
                  {t.communityDescription}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-2 border-[#D7E4C0] hover:border-[#4A773C] transition-all duration-300 hover:shadow-xl hover:scale-105 bg-white/80 backdrop-blur-sm group">
              <CardContent className="pt-4">
                <div className="bg-[#4A773C] w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:bg-[#355E3B] transition-colors duration-300">
                  <Trophy className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-[#5A3E36]">{t.conservation}</h3>
                <p className="text-[#5A3E36]/80 text-sm leading-relaxed">
                  {t.conservationDescription}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Gallery Preview Section */}
      <section className="relative z-10 py-16 bg-filipino-warm-gradient" id="galeri">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#5A3E36] mb-6">
              {t.featuredCrops}
            </h2>
            <p className="text-lg text-[#5A3E36]/80 max-w-3xl mx-auto">
              {t.featuredDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {featuredCrops.map((crop) => (
              <Card key={crop.name} className="overflow-hidden border-2 border-[#D7E4C0] hover:border-[#4A773C] transition-all duration-300 hover:shadow-xl group bg-white/80 backdrop-blur-sm crop-card">
                <div className="aspect-square overflow-hidden relative">
                  <img
                    src={crop.image}
                    alt={crop.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={`${crop.rarity === 'Alamat' ? 'bg-[#F9C74F] text-[#5A3E36]' : 'bg-purple-600 text-white'} font-semibold`}>
                      {crop.rarity}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className={`${crop.status === 'Endangered' ? 'bg-red-100 text-red-800' : crop.status === 'Vulnerable' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'} text-xs`}>
                      {crop.status}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-5">
                  <h3 className="font-bold text-lg text-[#5A3E36] mb-2">{crop.name}</h3>
                  <p className="text-[#4A773C] font-medium mb-2">{crop.subtitle}</p>
                  <p className="text-[#5A3E36]/80 text-sm">{crop.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button 
              onClick={onEnterMuseum}
              className="bg-[#4A773C] hover:bg-[#355E3B] text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              <Wheat className="mr-2 h-5 w-5" />
              {t.exploreAll}
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative z-10 py-20 bg-gradient-to-r from-[#4A773C] to-[#355E3B] overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-baybayin-pattern opacity-10"></div>
        
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Sun className="h-16 w-16 text-[#F9C74F] mx-auto mb-6" />
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              {t.readyToStart}
            </h2>
            <p className="text-lg lg:text-xl text-[#D7E4C0] mb-8 leading-relaxed">
              {t.journeyText}
              <span className="block mt-2 font-semibold">
                {t.missionText}
              </span>
            </p>
          </div>
          
          <Button 
            onClick={onEnterMuseum}
            size="lg"
            className="bg-[#C45A00] hover:bg-[#B85000] text-white px-12 py-6 text-xl font-bold rounded-xl shadow-2xl transition-all duration-300 hover:shadow-3xl hover:scale-105 border-2 border-[#C45A00]"
          >
            <Leaf className="mr-3 h-6 w-6" />
            {t.exploreMuseum}
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-[#5A3E36] text-[#D7E4C0] py-12" id="makipag-ugnayan">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  src={logoImage} 
                  alt="Binhi Heritage Museum" 
                  className="h-12 w-12 object-contain filter brightness-0 invert"
                />
                <span className="text-xl font-bold text-white">Binhi Heritage</span>
              </div>
              <p className="text-[#D7E4C0]/80 leading-relaxed mb-4">
                {t.preservingHeritage}
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">{t.quickLinks}</h4>
              <div className="space-y-2">
                <button onClick={() => scrollToSection('tahanan')} className="block text-[#D7E4C0]/80 hover:text-[#F9C74F] transition-colors text-left">{t.tahanan}</button>
                <button onClick={() => scrollToSection('galeri')} className="block text-[#D7E4C0]/80 hover:text-[#F9C74F] transition-colors text-left">{t.galeri}</button>
                <button onClick={() => scrollToSection('quest')} className="block text-[#D7E4C0]/80 hover:text-[#F9C74F] transition-colors text-left">{t.culturalQuest}</button>
                <button onClick={() => scrollToSection('tungkol')} className="block text-[#D7E4C0]/80 hover:text-[#F9C74F] transition-colors text-left">{t.tungkol}</button>
                <button onClick={() => scrollToSection('makipag-ugnayan')} className="block text-[#D7E4C0]/80 hover:text-[#F9C74F] transition-colors text-left">{t.contact}</button>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">{t.makipagUgnayan}</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="bg-[#4A773C] p-2 rounded-full">
                    <Facebook className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-[#D7E4C0]/80">Facebook</p>
                    <p className="text-white font-medium">Denric Mendoza</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-[#4A773C] p-2 rounded-full">
                    <Phone className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-[#D7E4C0]/80">Phone Number</p>
                    <p className="text-white font-medium">0985 268 3785</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-[#4A773C] mt-8 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-bold text-white mb-2">{t.conservationImpact}</h5>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p className="text-[#D7E4C0]/80">{t.varietiesDocumented}</p>
                  <p className="text-[#D7E4C0]/80">{t.provincesStats}</p>
                  <p className="text-[#D7E4C0]/80">{t.communityStats}</p>
                  <p className="text-[#D7E4C0]/80">{t.raisedStats}</p>
                </div>
              </div>
              <div className="text-center md:text-right">
                <p className="text-[#D7E4C0]/80 text-sm">
                  {t.copyright}
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
