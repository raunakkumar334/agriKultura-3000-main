import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Heart, CheckCircle } from 'lucide-react';

interface CropNFTProps {
  crop: {
    id: number;
    name: string;
    type: string;
    rarity: string;
    preservationValue: string;
    adopted: boolean;
    image: string;
    location: string;
    conservation_status: string;
    description: string;
  };
  onAdopt: () => void;
  language?: 'en' | 'fil';
}

export function CropNFT({ crop, onAdopt, language = 'fil' }: CropNFTProps) {
  // Language texts
  const texts = {
    fil: {
      adoptThis: 'Alagaan Ito',
      adopted: 'Naalagaan Na',
      preservationValue: 'Preservation Value'
    },
    en: {
      adoptThis: 'Adopt This',
      adopted: 'Already Adopted',
      preservationValue: 'Preservation Value'
    }
  };

  const t = texts[language];

  const getRarityColor = (rarity: string) => {
    switch (rarity.toLowerCase()) {
      case 'karaniwan': return 'bg-[#8FBC8F] text-white';
      case 'bihira': return 'bg-[#4A773C] text-white';
      case 'mahalagang': return 'bg-[#5A3E36] text-white';
      case 'alamat': return 'bg-[#F9C74F] text-[#5A3E36]';
      default: return 'bg-[#8FBC8F] text-white';
    }
  };

  const getConservationStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'stable': return 'bg-green-100 text-green-800';
      case 'vulnerable': return 'bg-yellow-100 text-yellow-800';
      case 'endangered': return 'bg-orange-100 text-orange-800';
      case 'critically endangered': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="overflow-hidden border-2 border-[#D7E4C0] hover:border-[#4A773C] transition-all duration-300 hover:shadow-xl group bg-[#F2EAD3]/80 backdrop-blur-sm">
      <div className="aspect-square overflow-hidden relative">
        <ImageWithFallback
          src={crop.image}
          alt={crop.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          <Badge className={`${getRarityColor(crop.rarity)} text-xs font-semibold shadow-lg`}>
            {crop.rarity}
          </Badge>
          <Badge className={`${getConservationStatusColor(crop.conservation_status)} text-xs font-medium shadow-sm`}>
            {crop.conservation_status}
          </Badge>
        </div>

        {/* Adopted indicator */}
        {crop.adopted && (
          <div className="absolute top-3 right-3">
            <div className="bg-green-500 rounded-full p-1 shadow-lg">
              <CheckCircle className="h-4 w-4 text-white" />
            </div>
          </div>
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Title and Type */}
          <div>
            <h3 className="font-bold text-lg text-[#5A3E36] mb-1 group-hover:text-[#4A773C] transition-colors">
              {crop.name}
            </h3>
            <p className="text-sm text-[#4A773C] font-semibold">{crop.type}</p>
            <p className="text-xs text-[#5A3E36]/70 mb-2">{crop.location}</p>
          </div>

          {/* Description */}
          <p className="text-sm text-[#5A3E36]/80 leading-relaxed line-clamp-2">
            {crop.description}
          </p>

          {/* Price and Action */}
          <div className="flex items-center justify-between pt-2 border-t border-[#D7E4C0]">
            <div>
              <p className="text-xs text-[#5A3E36]/70 uppercase tracking-wide">
                {t.preservationValue}
              </p>
              <p className="font-bold text-[#4A773C]">{crop.preservationValue}</p>
            </div>
            
            <Button
              onClick={onAdopt}
              disabled={crop.adopted}
              size="sm"
              className={`
                ${crop.adopted 
                  ? 'bg-gray-400 text-gray-700 cursor-not-allowed' 
                  : 'bg-[#C45A00] hover:bg-[#C45A00]/90 text-white hover:scale-105'
                } 
                transition-all duration-300 shadow-md rounded-lg px-4 py-2
              `}
            >
              {crop.adopted ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-1" />
                  {t.adopted}
                </>
              ) : (
                <>
                  <Heart className="h-4 w-4 mr-1" />
                  {t.adoptThis}
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
