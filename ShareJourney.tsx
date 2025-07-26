import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Share2, Download, Copy, Twitter, Facebook, Instagram, Check, Palette, Sparkles, Crown } from 'lucide-react';
import logoImage from 'figma:asset/be21c898a0bcff3aced7a322f4f72fb902444127.png';

interface ShareJourneyProps {
  isOpen: boolean;
  onClose: () => void;
  userStats: any;
  recentNFT?: any;
  walletAddress?: string;
  language?: 'en' | 'fil';
}

export function ShareJourney({ 
  isOpen, 
  onClose, 
  userStats, 
  recentNFT, 
  walletAddress = '0x742F...5E4e',
  language = 'fil' 
}: ShareJourneyProps) {
  const [cardStyle, setCardStyle] = useState<'heritage' | 'modern' | 'minimal'>('heritage');
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Language texts
  const texts = {
    fil: {
      title: 'Ibahagi ang Inyong Heritage Journey',
      description: 'Lumikha ng magandang social media card para sa inyong mga tagumpay',
      cardStyles: 'Card Styles',
      heritage: 'Heritage',
      modern: 'Modern',
      minimal: 'Minimal',
      generateCard: 'Generate Card',
      downloadCard: 'I-download ang Card',
      copyLink: 'Copy Link',
      shareOn: 'Ibahagi sa',
      linkCopied: 'Link Copied!',
      myJourney: 'Ang Aking Heritage Journey',
      level: 'Level',
      nftsOwned: 'NFTs na pag-aari',
      tokensEarned: 'Tokens na nakuha',
      latestAdoption: 'Pinakabagong Adoption',
      walletId: 'Wallet ID',
      joinMe: 'Sumama sa akin sa pagpapanatili ng Filipino agricultural heritage!',
      powered: 'Powered by Binhi Heritage Museum',
      shareText: {
        twitter: '🌾 Proud to be part of preserving Filipino agricultural heritage! Just adopted {nft} and earned {tokens} Kalikhasan Tokens. Join me at Binhi Heritage Museum! #FilipinoHeritage #NFT #Conservation',
        facebook: '🌱 I\'m on a mission to preserve Filipino agricultural heritage through the Binhi Heritage Museum! Just reached Level {level} and adopted {nft}. Every NFT adoption supports real farmers and seed conservation. Join the movement!',
        instagram: '🏛️ My heritage journey at Binhi Heritage Museum 🇵🇭\n\n🌾 Level {level} Heritage Explorer\n🎯 {nfts} NFTs adopted\n🪙 {tokens} Kalikhasan Tokens\n🌱 Supporting real conservation efforts\n\n#BinhiHeritage #FilipinoAgriculture #NFT #Conservation'
      }
    },
    en: {
      title: 'Share Your Heritage Journey',
      description: 'Create a beautiful social media card showcasing your achievements',
      cardStyles: 'Card Styles',
      heritage: 'Heritage',
      modern: 'Modern',
      minimal: 'Minimal',
      generateCard: 'Generate Card',
      downloadCard: 'Download Card',
      copyLink: 'Copy Link',
      shareOn: 'Share on',
      linkCopied: 'Link Copied!',
      myJourney: 'My Heritage Journey',
      level: 'Level',
      nftsOwned: 'NFTs Owned',
      tokensEarned: 'Tokens Earned',
      latestAdoption: 'Latest Adoption',
      walletId: 'Wallet ID',
      joinMe: 'Join me in preserving Filipino agricultural heritage!',
      powered: 'Powered by Binhi Heritage Museum',
      shareText: {
        twitter: '🌾 Proud to be part of preserving Filipino agricultural heritage! Just adopted {nft} and earned {tokens} Kalikhasan Tokens. Join me at Binhi Heritage Museum! #FilipinoHeritage #NFT #Conservation',
        facebook: '🌱 I\'m on a mission to preserve Filipino agricultural heritage through the Binhi Heritage Museum! Just reached Level {level} and adopted {nft}. Every NFT adoption supports real farmers and seed conservation. Join the movement!',
        instagram: '🏛️ My heritage journey at Binhi Heritage Museum 🇵🇭\n\n🌾 Level {level} Heritage Explorer\n🎯 {nfts} NFTs adopted\n🪙 {tokens} Kalikhasan Tokens\n🌱 Supporting real conservation efforts\n\n#BinhiHeritage #FilipinoAgriculture #NFT #Conservation'
      }
    }
  };

  const t = texts[language];

  const handleCopyLink = () => {
    const shareUrl = `https://binhiheritage.museum/journey/${walletAddress}`;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSocialShare = (platform: 'twitter' | 'facebook' | 'instagram') => {
    const shareTexts = t.shareText;
    let text = shareTexts[platform];
    
    if (recentNFT) {
      text = text.replace('{nft}', recentNFT.name);
    }
    text = text.replace('{level}', userStats.level.toString());
    text = text.replace('{tokens}', userStats.tokens.toString());
    text = text.replace('{nfts}', userStats.nftsOwned.toString());

    const encodedText = encodeURIComponent(text);
    const shareUrl = encodeURIComponent(`https://binhiheritage.museum/journey/${walletAddress}`);

    let url = '';
    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodedText}&url=${shareUrl}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${encodedText}`;
        break;
      case 'instagram':
        // Instagram doesn't support direct text sharing, so copy to clipboard
        navigator.clipboard.writeText(text);
        alert('Text copied to clipboard! Open Instagram and paste in your story or post.');
        return;
    }
    
    window.open(url, '_blank', 'width=600,height=400');
  };

  const downloadCard = () => {
    // This would implement actual image generation and download
    // For demo purposes, we'll just show an alert
    alert('Card download feature would be implemented here with canvas/html2canvas');
  };

  const getCardBackground = () => {
    switch (cardStyle) {
      case 'heritage':
        return 'bg-gradient-to-br from-[#F2EAD3] via-[#D7E4C0] to-[#8FBC8F]/30 bg-filipino-woven';
      case 'modern':
        return 'bg-gradient-to-br from-[#4A773C] to-[#7A9D54]';
      case 'minimal':
        return 'bg-white border-2 border-[#4A773C]';
      default:
        return 'bg-gradient-to-br from-[#F2EAD3] to-[#D7E4C0]';
    }
  };

  const getTextColor = () => {
    switch (cardStyle) {
      case 'heritage':
        return 'text-[#5A3E36]';
      case 'modern':
        return 'text-white';
      case 'minimal':
        return 'text-[#5A3E36]';
      default:
        return 'text-[#5A3E36]';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto border-2 border-[#4A773C] bg-[#F2EAD3]">
        <DialogHeader>
          <DialogTitle className="text-[#4A773C] flex items-center space-x-2">
            <Share2 className="h-5 w-5" />
            <span>{t.title}</span>
          </DialogTitle>
          <DialogDescription className="text-[#5A3E36]/80">
            {t.description}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card Preview */}
          <div className="space-y-4">
            <h3 className="font-bold text-[#4A773C]">Card Preview</h3>
            
            <div 
              ref={cardRef}
              className={`aspect-[4/5] p-6 rounded-2xl shadow-2xl ${getCardBackground()} relative overflow-hidden`}
            >
              {/* Background Pattern for Heritage Style */}
              {cardStyle === 'heritage' && (
                <div className="absolute inset-0 opacity-10">
                  <div className="bg-filipino-rice-pattern w-full h-full"></div>
                </div>
              )}

              {/* Header */}
              <div className="relative z-10 flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <img 
                    src={logoImage} 
                    alt="Binhi Heritage" 
                    className={`h-8 w-8 object-contain ${cardStyle === 'modern' ? 'filter brightness-0 invert' : ''}`}
                  />
                  <div>
                    <h2 className={`font-bold ${getTextColor()}`}>Binhi Heritage</h2>
                    <p className={`text-xs ${getTextColor()} opacity-80`}>Museum</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Crown className={`h-5 w-5 ${cardStyle === 'modern' ? 'text-[#F9C74F]' : 'text-[#C45A00]'}`} />
                  <span className={`font-bold ${getTextColor()}`}>Level {userStats.level}</span>
                </div>
              </div>

              {/* Main Content */}
              <div className="relative z-10 space-y-4">
                <h1 className={`text-2xl font-bold ${getTextColor()}`}>{t.myJourney}</h1>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className={`p-3 rounded-lg ${
                    cardStyle === 'modern' 
                      ? 'bg-white/20 backdrop-blur-sm' 
                      : cardStyle === 'minimal'
                      ? 'bg-[#F2EAD3]/50'
                      : 'bg-white/60'
                  }`}>
                    <div className={`text-2xl font-bold ${getTextColor()}`}>{userStats.nftsOwned}</div>
                    <p className={`text-sm ${getTextColor()} opacity-80`}>{t.nftsOwned}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${
                    cardStyle === 'modern' 
                      ? 'bg-white/20 backdrop-blur-sm' 
                      : cardStyle === 'minimal'
                      ? 'bg-[#F2EAD3]/50'
                      : 'bg-white/60'
                  }`}>
                    <div className={`text-2xl font-bold ${getTextColor()}`}>{userStats.tokens}</div>
                    <p className={`text-sm ${getTextColor()} opacity-80`}>{t.tokensEarned}</p>
                  </div>
                </div>

                {/* Latest Adoption */}
                {recentNFT && (
                  <div className={`p-4 rounded-lg ${
                    cardStyle === 'modern' 
                      ? 'bg-white/20 backdrop-blur-sm' 
                      : cardStyle === 'minimal'
                      ? 'bg-[#F2EAD3]/50 border border-[#4A773C]/30'
                      : 'bg-white/70'
                  }`}>
                    <p className={`text-sm ${getTextColor()} opacity-80 mb-2`}>{t.latestAdoption}</p>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden">
                        <ImageWithFallback
                          src={recentNFT.image}
                          alt={recentNFT.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className={`font-bold ${getTextColor()}`}>{recentNFT.name}</h4>
                        <p className={`text-xs ${getTextColor()} opacity-70`}>{recentNFT.location}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Call to Action */}
                <div className="text-center space-y-2">
                  <p className={`text-sm ${getTextColor()} opacity-90`}>{t.joinMe}</p>
                  <div className={`text-xs ${getTextColor()} opacity-70 font-mono`}>
                    {t.walletId}: {walletAddress}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="absolute bottom-4 left-6 right-6">
                <div className="flex items-center justify-center space-x-2">
                  <Sparkles className={`h-4 w-4 ${cardStyle === 'modern' ? 'text-[#F9C74F]' : 'text-[#C45A00]'}`} />
                  <p className={`text-xs ${getTextColor()} opacity-70`}>{t.powered}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-6">
            {/* Style Selection */}
            <div>
              <h3 className="font-bold text-[#4A773C] mb-3">{t.cardStyles}</h3>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setCardStyle('heritage')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    cardStyle === 'heritage'
                      ? 'border-[#4A773C] bg-[#D7E4C0]/50'
                      : 'border-[#D7E4C0] hover:border-[#4A773C]/50'
                  }`}
                >
                  <Palette className="h-5 w-5 text-[#4A773C] mx-auto mb-1" />
                  <span className="text-sm font-medium text-[#5A3E36]">{t.heritage}</span>
                </button>
                <button
                  onClick={() => setCardStyle('modern')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    cardStyle === 'modern'
                      ? 'border-[#4A773C] bg-[#D7E4C0]/50'
                      : 'border-[#D7E4C0] hover:border-[#4A773C]/50'
                  }`}
                >
                  <div className="w-5 h-5 bg-gradient-to-r from-[#4A773C] to-[#7A9D54] rounded mx-auto mb-1"></div>
                  <span className="text-sm font-medium text-[#5A3E36]">{t.modern}</span>
                </button>
                <button
                  onClick={() => setCardStyle('minimal')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    cardStyle === 'minimal'
                      ? 'border-[#4A773C] bg-[#D7E4C0]/50'
                      : 'border-[#D7E4C0] hover:border-[#4A773C]/50'
                  }`}
                >
                  <div className="w-5 h-5 border-2 border-[#4A773C] rounded mx-auto mb-1"></div>
                  <span className="text-sm font-medium text-[#5A3E36]">{t.minimal}</span>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                onClick={downloadCard}
                className="w-full bg-[#4A773C] hover:bg-[#355E3B] text-white"
              >
                <Download className="h-4 w-4 mr-2" />
                {t.downloadCard}
              </Button>

              <Button 
                onClick={handleCopyLink}
                variant="outline"
                className="w-full border-[#4A773C] text-[#4A773C] hover:bg-[#4A773C] hover:text-white"
              >
                {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                {copied ? t.linkCopied : t.copyLink}
              </Button>
            </div>

            {/* Social Sharing */}
            <div>
              <h3 className="font-bold text-[#4A773C] mb-3">{t.shareOn}</h3>
              <div className="grid grid-cols-3 gap-3">
                <Button
                  onClick={() => handleSocialShare('twitter')}
                  className="bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white"
                >
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => handleSocialShare('facebook')}
                  className="bg-[#4267B2] hover:bg-[#365899] text-white"
                >
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => handleSocialShare('instagram')}
                  className="bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-90 text-white"
                >
                  <Instagram className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Stats Summary */}
            <Card className="border-[#D7E4C0] bg-white/60">
              <CardContent className="p-4 space-y-2">
                <h4 className="font-bold text-[#5A3E36]">Journey Summary</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-[#5A3E36]/70">Level:</span>
                    <span className="font-semibold text-[#4A773C] ml-2">{userStats.level}</span>
                  </div>
                  <div>
                    <span className="text-[#5A3E36]/70">NFTs:</span>
                    <span className="font-semibold text-[#4A773C] ml-2">{userStats.nftsOwned}</span>
                  </div>
                  <div>
                    <span className="text-[#5A3E36]/70">Tokens:</span>
                    <span className="font-semibold text-[#4A773C] ml-2">{userStats.tokens}</span>
                  </div>
                  <div>
                    <span className="text-[#5A3E36]/70">Trees:</span>
                    <span className="font-semibold text-[#4A773C] ml-2">{userStats.treesPlanted}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
