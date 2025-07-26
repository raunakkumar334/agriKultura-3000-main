import React, { useState } from 'react';
import { Button } from './ui/button';
import { CropNFT } from './CropNFT';
import { ArrowLeft, Filter, Search, Sprout, Heart } from 'lucide-react';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import newLogoImage from 'figma:asset/be21c898a0bcff3aced7a322f4f72fb902444127.png';
import pekingCornImage from 'figma:asset/92e990eddd9820b951511a8b17d263687ec0f2d8.png';
import tinawonRiceImage from 'figma:asset/32637e0de312c5517971011d563af4745aff71f2.png';
import silingLabuyoImage from 'figma:asset/79124988b4e5a91b299375ba6f31f04fe76ba4ee.png';
import baguioBeansImage from 'figma:asset/a2d285170338911319ee1688bbb67c61f9262bc9.png';

interface MuseumRoomProps {
  onBackToHome: () => void;
  onAdoptCrop: (crop: any) => void;
  onOpenDashboard?: () => void;
  userStats?: any;
  language?: 'en' | 'fil';
}

// Filipino Indigenous Crop Data
const filipinoCrops = [
  {
    id: 1,
    name: "Tinawon Rice",
    type: "Bigas",
    rarity: "Alamat", // Legendary
    preservationValue: "₱12,500",
    adopted: false,
    image: tinawonRiceImage,
    traits: {
      growth_cycle: "9 buwan",
      yield_potential: "Mataas",
      climate_adaptation: "Highland Cool",
      cultural_significance: "Ifugao Sacred"
    },
    description: "Heirloom na bigas mula sa mga rice terraces ng Ifugao. Itinatanim lamang isang beses sa isang taon at ginagamit sa mga seremonya.",
    location: "Ifugao Province, Cordillera",
    conservation_status: "Endangered"
  },
  {
    id: 2,
    name: "Peking Corn (Mais Peking)",
    type: "Mais",
    rarity: "Mahalagang", // Epic
    preservationValue: "₱8,800",
    adopted: false,
    image: pekingCornImage,
    traits: {
      growth_cycle: "4 buwan",
      yield_potential: "Mataas",
      climate_adaptation: "Tropical Lowland",
      cultural_significance: "Visayan Traditional"
    },
    description: "Tradisyonal na mais na ginagamit sa mga kakanin at seremonya sa Visayas. Kilala sa matamis na lasa.",
    location: "Visayas Islands",
    conservation_status: "Vulnerable"
  },
  {
    id: 3,
    name: "Kapeng Barako",
    type: "Kape",
    rarity: "Bihira", // Rare
    preservationValue: "₱15,000",
    adopted: true,
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=400&fit=crop&auto=format",
    traits: {
      growth_cycle: "3-5 taon",
      yield_potential: "Katamtaman",
      climate_adaptation: "Highland Volcanic",
      cultural_significance: "Batangas Pride"
    },
    description: "Katutubo na uri ng kape sa Batangas na kilala sa malakas na amoy at lasa. Nanganganib nang maubos.",
    location: "Batangas Province, Luzon",
    conservation_status: "Critically Endangered"
  },
  {
    id: 4,
    name: "Baguio Beans (Sitaw na Baguio)",
    type: "Gulay",
    rarity: "Karaniwan", // Common
    preservationValue: "₱3,200",
    adopted: false,
    image: baguioBeansImage,
    traits: {
      growth_cycle: "2-3 buwan",
      yield_potential: "Mataas",
      climate_adaptation: "Cool Highland",
      cultural_significance: "Igorot Staple"
    },
    description: "Matamis na sitaw na tumutubo sa malamig na klima ng Cordillera. Ginagamit sa maraming lutuin.",
    location: "Benguet Province, Cordillera",
    conservation_status: "Stable"
  },
  {
    id: 5,
    name: "Siling Labuyo",
    type: "Pampalasa",
    rarity: "Mahalagang", // Epic
    preservationValue: "₱6,500",
    adopted: false,
    image: silingLabuyoImage,
    traits: {
      growth_cycle: "3-4 buwan",
      yield_potential: "Mababang-Katamtaman",
      climate_adaptation: "Tropical Humid",
      cultural_significance: "National Spice"
    },
    description: "Napakatalas na sili na ginagamit sa buong Pilipinas. Natural na pesticide at antimicrobial.",
    location: "Nationwide Distribution",
    conservation_status: "Stable"
  },
  {
    id: 6,
    name: "Ubi Kinampay",
    type: "Ugat",
    rarity: "Bihira", // Rare
    preservationValue: "₱4,800",
    adopted: false,
    image: "https://images.unsplash.com/photo-1628773435700-db9a10d2b961?w=400&h=400&fit=crop&auto=format",
    traits: {
      growth_cycle: "8-10 buwan",
      yield_potential: "Katamtaman",
      climate_adaptation: "Tropical Lowland",
      cultural_significance: "Bohol Heritage"
    },
    description: "Lila na ube na may matatamis na lasa. Ginagamit sa mga kakanin at dessert sa Bohol.",
    location: "Bohol Province, Visayas",
    conservation_status: "Vulnerable"
  }
];

export function MuseumRoom({ onBackToHome, onAdoptCrop, onOpenDashboard, userStats, language = 'fil' }: MuseumRoomProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterRarity, setFilterRarity] = useState('all');

  // Language texts
  const texts = {
    fil: {
      backToHome: 'Bumalik sa Tahanan',
      searchPlaceholder: 'Maghanap ng mga binhi...',
      allTypes: 'Lahat ng Uri',
      all: 'Lahat',
      heritageNotice: 'Ang mga binhing ito ay kumakatawan sa aming matagumpay na kasaysayan sa agrikultura. Sa pag-adopt, tumutulong kayo sa pagpapanatili ng mga endangered na uri para sa susunod na henerasyon.',
      noResults: 'Walang nahanap na binhi na tumugma sa inyong paghahanap.',
      tahanan: 'Tahanan',
      galeri: 'Galeri',
      tungkol: 'Tungkol',
      makipagUgnayan: 'Makipag-ugnayan'
    },
    en: {
      backToHome: 'Back to Home',
      searchPlaceholder: 'Search for seeds...',
      allTypes: 'All Types',
      all: 'All',
      heritageNotice: 'These seeds represent our rich agricultural history. By adopting, you help preserve endangered varieties for future generations.',
      noResults: 'No seeds found matching your search.',
      tahanan: 'Home',
      galeri: 'Gallery',
      tungkol: 'About',
      makipagUgnayan: 'Contact'
    }
  };

  const t = texts[language];

  const filteredCrops = filipinoCrops.filter(crop => {
    const matchesSearch = crop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         crop.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || crop.type.toLowerCase() === filterType.toLowerCase();
    const matchesRarity = filterRarity === 'all' || crop.rarity.toLowerCase() === filterRarity.toLowerCase();
    
    return matchesSearch && matchesType && matchesRarity;
  });

  const scrollToSection = (sectionId: string) => {
    // If we're in museum view, go back to home first
    onBackToHome();
    // Then scroll to section after a brief delay
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen">
      {/* Enhanced Header with Sticky Navigation */}
      <header className="bg-[#4A773C]/95 backdrop-blur-md border-b border-[#5A3E36]/20 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-6">
              <Button 
                variant="ghost" 
                onClick={onBackToHome}
                className="flex items-center space-x-2 text-[#F2EAD3] hover:text-[#F9C74F] hover:bg-[#355E3B]/20 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>{t.backToHome}</span>
              </Button>

              {/* Enhanced Logo Section */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img 
                    src={newLogoImage} 
                    alt="Binhi Heritage Museum" 
                    className="h-14 w-14 object-contain filter drop-shadow-xl"
                  />
                  {/* Logo glow effect */}
                  <div className="absolute inset-0 h-14 w-14 bg-[#F9C74F]/20 rounded-full blur-md"></div>
                </div>
                <div className="text-left">
                  <h1 className="text-2xl font-bold text-[#F2EAD3] tracking-wide drop-shadow-lg">
                    Heritage Museum
                  </h1>
                  <p className="text-sm text-[#D7E4C0] font-medium drop-shadow-sm">
                    Digital Filipino Agricultural Heritage
                  </p>
                </div>
              </div>
            </div>

            {/* Enhanced Navigation Menu */}
            <nav className="hidden lg:flex space-x-2 bg-[#355E3B]/30 rounded-xl p-2 backdrop-blur-sm border border-[#D7E4C0]/20">
              <button 
                onClick={() => scrollToSection('tahanan')}
                className="text-[#F2EAD3] hover:text-[#F9C74F] transition-all duration-300 font-medium px-4 py-2 rounded-lg hover:bg-[#F9C74F]/20 hover:shadow-md"
              >
                {t.tahanan}
              </button>
              <span className="text-[#F9C74F] font-bold px-4 py-2 rounded-lg bg-[#F9C74F]/20 shadow-inner border border-[#F9C74F]/30">
                {t.galeri}
              </span>
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
      </header>

      {/* Museum Interior */}
      <div className="relative">
        {/* Museum Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F2EAD3] via-[#D7E4C0] to-[#E6D08A] opacity-70 bg-filipino-rice-pattern"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search and Filters */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between bg-white/90 backdrop-blur-sm rounded-xl p-5 border-2 border-[#D7E4C0] shadow-xl">
            <div className="flex items-center space-x-3 flex-1">
              <Search className="h-5 w-5 text-[#4A773C]" />
              <Input
                placeholder={t.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-md border-[#D7E4C0] focus:border-[#4A773C] bg-white/70"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-[#4A773C]" />
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-32 border-[#D7E4C0] bg-white/70">
                    <SelectValue placeholder="Uri" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t.allTypes}</SelectItem>
                    <SelectItem value="bigas">Bigas</SelectItem>
                    <SelectItem value="mais">Mais</SelectItem>
                    <SelectItem value="kape">Kape</SelectItem>
                    <SelectItem value="gulay">Gulay</SelectItem>
                    <SelectItem value="pampalasa">Pampalasa</SelectItem>
                    <SelectItem value="ugat">Ugat</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Select value={filterRarity} onValueChange={setFilterRarity}>
                <SelectTrigger className="w-40 border-[#D7E4C0] bg-white/70">
                  <SelectValue placeholder="Kahalagan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.all}</SelectItem>
                  <SelectItem value="karaniwan">Karaniwan</SelectItem>
                  <SelectItem value="bihira">Bihira</SelectItem>
                  <SelectItem value="mahalagang">Mahalagang</SelectItem>
                  <SelectItem value="alamat">Alamat</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Cultural Heritage Notice */}
          <div className="mb-6 bg-[#D7E4C0]/70 border-2 border-[#4A773C]/30 rounded-xl p-5 backdrop-blur-sm shadow-lg">
            <p className="text-[#5A3E36] text-center leading-relaxed">
              <strong className="text-[#4A773C]">
                {language === 'fil' ? 'Mahalagang Paalala:' : 'Important Notice:'}
              </strong> {t.heritageNotice}
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCrops.map((crop) => (
              <CropNFT
                key={crop.id}
                crop={crop}
                onAdopt={() => onAdoptCrop(crop)}
                language={language}
              />
            ))}
          </div>

          {filteredCrops.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#5A3E36] text-lg">{t.noResults}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
