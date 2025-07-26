import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { CheckCircle, ExternalLink, Copy, Share2, MapPin, Calendar, Hash, Wallet, Leaf, Users, Check } from 'lucide-react';

interface TransparencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: {
    txHash: string;
    crop: any;
    amount: number;
    walletAddress: string;
    timestamp: Date;
    blockNumber?: number;
    gasUsed?: number;
    confirmations?: number;
  };
  language?: 'en' | 'fil';
}

export function TransparencyModal({ 
  isOpen, 
  onClose, 
  transaction,
  language = 'fil' 
}: TransparencyModalProps) {
  const [copied, setCopied] = useState<{ [key: string]: boolean }>({});
  const [confirmations, setConfirmations] = useState(transaction.confirmations || 1);

  // Language texts
  const texts = {
    fil: {
      title: 'Transaction Confirmation',
      subtitle: 'Salamat sa inyong suporta sa pagpapanatili ng Filipino agricultural heritage!',
      transactionDetails: 'Mga Detalye ng Transaksyon',
      blockchainInfo: 'Blockchain Information',
      conservationImpact: 'Conservation Impact',
      shareTransaction: 'Ibahagi ang Transaction',
      viewOnExplorer: 'Tingnan sa Blockchain Explorer',
      copyHash: 'Copy Transaction Hash',
      copyWallet: 'Copy Wallet Address',
      copied: 'Copied!',
      txHash: 'Transaction Hash',
      blockNumber: 'Block Number',
      confirmations: 'Confirmations',
      gasUsed: 'Gas Used',
      timestamp: 'Timestamp',
      amount: 'Amount',
      crop: 'Crop Supported',
      location: 'Location',
      wallet: 'Your Wallet',
      impact: {
        title: 'Real-World Impact',
        farmers: 'Farmers Supported',
        seedBank: 'Seed Bank Contribution',
        research: 'Research Funding',
        community: 'Community Programs'
      },
      fundAllocation: 'Fund Allocation',
      allocation: {
        farmers: '40% - Direct farmer support',
        seedBank: '20% - Seed bank storage',
        digital: '15% - Digital preservation',
        cultural: '10% - Cultural partnerships',
        platform: '15% - Platform maintenance'
      },
      nextSteps: 'Susunod na Hakbang',
      steps: [
        'Ang inyong NFT ay maipapadala sa wallet sa loob ng 5-10 minuto',
        'Makakakuha kayo ng email confirmation',
        'Ang funds ay direktang mapadala sa conservation partners',
        'Makakatanggap kayo ng monthly update tungkol sa impact'
      ],
      shareText: 'Bagong na-adopt ko ang {crop} sa Binhi Heritage Museum! Sumusuporta ako sa pagpapanatili ng Filipino agricultural heritage. Transaction: {hash}'
    },
    en: {
      title: 'Transaction Confirmation',
      subtitle: 'Thank you for supporting Filipino agricultural heritage preservation!',
      transactionDetails: 'Transaction Details',
      blockchainInfo: 'Blockchain Information',
      conservationImpact: 'Conservation Impact',
      shareTransaction: 'Share Transaction',
      viewOnExplorer: 'View on Blockchain Explorer',
      copyHash: 'Copy Transaction Hash',
      copyWallet: 'Copy Wallet Address',
      copied: 'Copied!',
      txHash: 'Transaction Hash',
      blockNumber: 'Block Number',
      confirmations: 'Confirmations',
      gasUsed: 'Gas Used',
      timestamp: 'Timestamp',
      amount: 'Amount',
      crop: 'Crop Supported',
      location: 'Location',
      wallet: 'Your Wallet',
      impact: {
        title: 'Real-World Impact',
        farmers: 'Farmers Supported',
        seedBank: 'Seed Bank Contribution',
        research: 'Research Funding',
        community: 'Community Programs'
      },
      fundAllocation: 'Fund Allocation',
      allocation: {
        farmers: '40% - Direct farmer support',
        seedBank: '20% - Seed bank storage',
        digital: '15% - Digital preservation',
        cultural: '10% - Cultural partnerships',
        platform: '15% - Platform maintenance'
      },
      nextSteps: 'Next Steps',
      steps: [
        'Your NFT will be sent to your wallet within 5-10 minutes',
        'You will receive an email confirmation',
        'Funds will be directly sent to conservation partners',
        'You will receive monthly impact updates'
      ],
      shareText: 'Just adopted {crop} at Binhi Heritage Museum! Supporting Filipino agricultural heritage preservation. Transaction: {hash}'
    }
  };

  const t = texts[language];

  // Simulate confirmation updates
  useEffect(() => {
    const interval = setInterval(() => {
      setConfirmations(prev => Math.min(prev + 1, 12));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied({ ...copied, [key]: true });
    setTimeout(() => {
      setCopied({ ...copied, [key]: false });
    }, 2000);
  };

  const handleShare = () => {
    const shareText = t.shareText
      .replace('{crop}', transaction.crop.name)
      .replace('{hash}', transaction.txHash.substring(0, 10) + '...');
    
    if (navigator.share) {
      navigator.share({
        title: 'Binhi Heritage Museum - Conservation Support',
        text: shareText,
        url: `https://binhiheritage.museum/tx/${transaction.txHash}`
      });
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Share text copied to clipboard!');
    }
  };

  const formatAmount = (amount: number) => {
    return `₱${amount.toLocaleString()}`;
  };

  const formatHash = (hash: string) => {
    return `${hash.substring(0, 6)}...${hash.substring(hash.length - 4)}`;
  };

  const getConfirmationStatus = () => {
    if (confirmations >= 12) return { color: 'bg-green-500', text: 'Confirmed' };
    if (confirmations >= 6) return { color: 'bg-yellow-500', text: 'Confirming' };
    return { color: 'bg-orange-500', text: 'Pending' };
  };

  const status = getConfirmationStatus();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto border-2 border-[#4A773C] bg-[#F2EAD3]">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </div>
          <DialogTitle className="text-[#4A773C] text-2xl">{t.title}</DialogTitle>
          <DialogDescription className="text-[#5A3E36]/80 text-center max-w-2xl mx-auto">
            {t.subtitle}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Transaction & Crop Details */}
          <div className="space-y-4">
            {/* Crop Information */}
            <Card className="border-2 border-[#4A773C] bg-[#F2EAD3]/80">
              <CardHeader>
                <CardTitle className="text-[#4A773C] flex items-center space-x-2">
                  <Leaf className="h-5 w-5" />
                  <span>{t.crop}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-[#D7E4C0]">
                    <ImageWithFallback
                      src={transaction.crop.image}
                      alt={transaction.crop.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-[#5A3E36] mb-1">{transaction.crop.name}</h3>
                    <p className="text-sm text-[#4A773C] font-semibold mb-1">{transaction.crop.type}</p>
                    <div className="flex items-center space-x-2 mb-2">
                      <MapPin className="h-4 w-4 text-[#5A3E36]/70" />
                      <span className="text-sm text-[#5A3E36]/70">{transaction.crop.location}</span>
                    </div>
                    <Badge className="bg-[#F9C74F] text-[#5A3E36]">
                      {transaction.crop.rarity}
                    </Badge>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-[#D7E4C0]/50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-[#5A3E36] font-medium">{t.amount}:</span>
                    <span className="text-[#4A773C] font-bold text-lg">{formatAmount(transaction.amount)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Transaction Details */}
            <Card className="border-[#D7E4C0] bg-white/60">
              <CardHeader>
                <CardTitle className="text-[#4A773C] flex items-center space-x-2">
                  <Hash className="h-5 w-5" />
                  <span>{t.transactionDetails}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[#5A3E36]">{t.txHash}:</span>
                  <div className="flex items-center space-x-2">
                    <code className="text-sm font-mono text-[#4A773C] bg-[#F2EAD3] px-2 py-1 rounded">
                      {formatHash(transaction.txHash)}
                    </code>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleCopy(transaction.txHash, 'hash')}
                      className="h-8 w-8 p-0"
                    >
                      {copied.hash ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[#5A3E36]">{t.blockNumber}:</span>
                  <span className="font-mono text-[#4A773C]">{transaction.blockNumber || '18,234,567'}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[#5A3E36]">{t.confirmations}:</span>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${status.color} animate-pulse`}></div>
                    <span className="font-semibold text-[#4A773C]">{confirmations}/12</span>
                    <Badge variant="outline" className={confirmations >= 12 ? 'border-green-500 text-green-600' : 'border-orange-500 text-orange-600'}>
                      {status.text}
                    </Badge>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[#5A3E36]">{t.gasUsed}:</span>
                  <span className="font-mono text-[#4A773C]">{transaction.gasUsed || '21,000'} wei</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[#5A3E36]">{t.timestamp}:</span>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-[#5A3E36]/70" />
                    <span className="text-[#4A773C]">{transaction.timestamp.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[#5A3E36]">{t.wallet}:</span>
                  <div className="flex items-center space-x-2">
                    <code className="text-sm font-mono text-[#4A773C] bg-[#F2EAD3] px-2 py-1 rounded">
                      {formatHash(transaction.walletAddress)}
                    </code>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleCopy(transaction.walletAddress, 'wallet')}
                      className="h-8 w-8 p-0"
                    >
                      {copied.wallet ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Impact & Next Steps */}
          <div className="space-y-4">
            {/* Conservation Impact */}
            <Card className="border-2 border-[#7A9D54] bg-[#D7E4C0]/50">
              <CardHeader>
                <CardTitle className="text-[#7A9D54] flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>{t.conservationImpact}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h4 className="font-bold text-[#5A3E36]">{t.impact.title}</h4>
                
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex justify-between items-center p-3 bg-white/60 rounded-lg">
                    <span className="text-[#5A3E36] text-sm">{t.impact.farmers}</span>
                    <span className="font-bold text-[#4A773C]">2 families</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-white/60 rounded-lg">
                    <span className="text-[#5A3E36] text-sm">{t.impact.seedBank}</span>
                    <span className="font-bold text-[#4A773C]">₱{(transaction.amount * 0.2).toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-white/60 rounded-lg">
                    <span className="text-[#5A3E36] text-sm">{t.impact.research}</span>
                    <span className="font-bold text-[#4A773C]">₱{(transaction.amount * 0.15).toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-white/60 rounded-lg">
                    <span className="text-[#5A3E36] text-sm">{t.impact.community}</span>
                    <span className="font-bold text-[#4A773C]">₱{(transaction.amount * 0.1).toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Fund Allocation */}
            <Card className="border-[#D7E4C0] bg-white/60">
              <CardHeader>
                <CardTitle className="text-[#4A773C]">{t.fundAllocation}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-[#4A773C] rounded-full"></div>
                    <span className="text-[#5A3E36]">{t.allocation.farmers}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-[#7A9D54] rounded-full"></div>
                    <span className="text-[#5A3E36]">{t.allocation.seedBank}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-[#F9C74F] rounded-full"></div>
                    <span className="text-[#5A3E36]">{t.allocation.digital}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-[#C45A00] rounded-full"></div>
                    <span className="text-[#5A3E36]">{t.allocation.cultural}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-[#5A3E36] rounded-full"></div>
                    <span className="text-[#5A3E36]">{t.allocation.platform}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card className="border-[#D7E4C0] bg-white/60">
              <CardHeader>
                <CardTitle className="text-[#4A773C]">{t.nextSteps}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {t.steps.map((step, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-[#4A773C] text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                        {index + 1}
                      </div>
                      <p className="text-sm text-[#5A3E36] leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Button
            onClick={() => window.open(`https://etherscan.io/tx/${transaction.txHash}`, '_blank')}
            className="flex-1 bg-[#4A773C] hover:bg-[#355E3B] text-white"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            {t.viewOnExplorer}
          </Button>
          
          <Button
            onClick={handleShare}
            variant="outline"
            className="flex-1 border-[#4A773C] text-[#4A773C] hover:bg-[#4A773C] hover:text-white"
          >
            <Share2 className="h-4 w-4 mr-2" />
            {t.shareTransaction}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
