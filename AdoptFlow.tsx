import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Separator } from './ui/separator';
import { DonationBreakdown } from './DonationBreakdown';
import { CheckCircle, Wallet, CreditCard, ArrowRight, Heart, Leaf, Smartphone, Check } from 'lucide-react';

interface AdoptFlowProps {
  isOpen: boolean;
  crop: any;
  onClose: () => void;
  onComplete: () => void;
  language?: 'en' | 'fil';
}

export function AdoptFlow({ isOpen, crop, onClose, onComplete, language = 'fil' }: AdoptFlowProps) {
  const [step, setStep] = useState<'details' | 'payment' | 'confirmation' | 'success'>('details');
  const [paymentMethod, setPaymentMethod] = useState<'crypto' | 'card' | 'gcash'>('crypto');
  const [isProcessing, setIsProcessing] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState<string>('');
  const [walletAddress, setWalletAddress] = useState('');
  const [showWalletOptions, setShowWalletOptions] = useState(false);

  if (!crop) return null;

  // Language texts
  const texts = {
    fil: {
      title: 'Alagaan ang binhing ito at suportahan ang tunay na pagpapanatili ng mga binhi ng Pilipinas',
      description: 'Suriin ang mga detalye ng inyong bagong binhi bago ito alagaan.',
      paymentTitle: 'Paraan ng Pagbabayad',
      paymentDescription: 'Piliin kung paano ninyo gusto magbayad para sa',
      confirmTitle: 'Kumpirmahin ang Pag-adopt',
      confirmDescription: 'Pakisuri ang inyong order bago tapusin ang pag-adopt.',
      successTitle: 'Matagumpay na Naging Tagapangalaga!',
      successDescription: 'Binabati namin kayo! Kayo na ang nagmamay-ari ng',
      connectWallet: 'Kumonekta sa Wallet',
      walletConnected: 'Wallet Connected',
      ethConversion: '~0.0045 ETH',
      nftNote: 'Ang inyong NFT ay ipapadala sa Ethereum address na ito pagkatapos ng kumpirmasyon.',
      continuePayment: 'Magpatuloy sa Bayad',
      reviewOrder: 'Suriin ang Order',
      confirmAdopt: 'Kumpirmahin ang Pag-adopt',
      processing: 'Pinoproseso...',
      continueExploring: 'Magpatuloy sa Paggalugad',
      totalAmount: 'Kabuuan:',
      preservationValue: 'Preservation Token Value:'
    },
    en: {
      title: 'Adopt this seed and support real Filipino seed preservation',
      description: 'Review the details of your new seed before adopting.',
      paymentTitle: 'Payment Method',
      paymentDescription: 'Choose how you want to pay for',
      confirmTitle: 'Confirm Adoption',
      confirmDescription: 'Please review your order before completing the adoption.',
      successTitle: 'Successfully Became a Guardian!',
      successDescription: 'Congratulations! You now own',
      connectWallet: 'Connect Wallet',
      walletConnected: 'Wallet Connected',
      ethConversion: '~0.0045 ETH',
      nftNote: 'Your NFT will be sent to this Ethereum address after confirmation.',
      continuePayment: 'Continue to Payment',
      reviewOrder: 'Review Order',
      confirmAdopt: 'Confirm Adoption',
      processing: 'Processing...',
      continueExploring: 'Continue Exploring',
      totalAmount: 'Total Amount:',
      preservationValue: 'Preservation Token Value:'
    }
  };

  const t = texts[language];

  const handleNextStep = () => {
    if (step === 'details') {
      setStep('payment');
    } else if (step === 'payment') {
      setStep('confirmation');
    } else if (step === 'confirmation') {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setStep('success');
      }, 3000);
    }
  };

  const handleComplete = () => {
    setStep('details');
    onComplete();
  };

  const handleWalletConnect = (walletType: string) => {
    setConnectedWallet(walletType);
    // Simulate wallet connection with sample addresses
    const sampleAddresses = {
      MetaMask: '0x742F35Cc4C4f354F87c20A1c34a45B23E5CE5E4e',
      WalletConnect: '0x8b0D8C7F1B3f9E2b4c8D1F2A3b4C5D6E7F8G9H0I',
      Phantom: '0x1A2B3C4D5E6F7890ABCDEF1234567890ABCDEF12'
    };
    setWalletAddress(sampleAddresses[walletType as keyof typeof sampleAddresses] || '');
    setWalletConnected(true);
    setShowWalletOptions(false);
  };

  const convertToETH = (peso: string) => {
    // Simulate conversion rate: 1 ETH = ~₱1,500,000 (rough estimate)
    const pesoAmount = parseFloat(peso.replace('₱', '').replace(',', ''));
    const ethAmount = pesoAmount / 1500000;
    return ethAmount.toFixed(6);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity.toLowerCase()) {
      case 'karaniwan': return 'bg-[#8FBC8F]';
      case 'bihira': return 'bg-[#4A773C]';
      case 'mahalagang': return 'bg-[#5A3E36]';
      case 'alamat': return 'bg-[#F9C74F]';
      default: return 'bg-[#8FBC8F]';
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto border-2 border-[#4A773C] bg-[#F2EAD3]">
        {step === 'details' && (
          <>
            <DialogHeader>
              <DialogTitle className="text-[#4A773C]">{t.title}</DialogTitle>
              <DialogDescription className="text-[#5A3E36]/80">
                {t.description}
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Crop Details */}
              <div className="space-y-4">
                <div className="relative">
                  <div className="aspect-square rounded-lg overflow-hidden border-2 border-[#D7E4C0]">
                    <ImageWithFallback
                      src={crop.image}
                      alt={crop.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    <Badge className={`${getRarityColor(crop.rarity)} text-white text-xs font-semibold shadow-lg`}>
                      {crop.rarity}
                    </Badge>
                    <Badge className={`${getConservationStatusColor(crop.conservation_status)} text-xs font-medium shadow-sm`}>
                      {crop.conservation_status}
                    </Badge>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-[#5A3E36] mb-1">{crop.name}</h3>
                  <p className="text-sm text-[#4A773C] font-semibold mb-1">{crop.type}</p>
                  <p className="text-sm text-[#5A3E36]/70 mb-2">{crop.location}</p>
                  <p className="text-sm text-[#5A3E36]/80 mb-3 leading-relaxed">{crop.description}</p>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(crop.traits).map(([key, value]) => (
                      <div key={key} className="bg-[#D7E4C0]/50 rounded p-2 border border-[#D7E4C0]">
                        <div className="text-xs text-[#4A773C] capitalize font-medium">
                          {key === 'growth_cycle' ? 'Panahon ng Paglaki' :
                           key === 'yield_potential' ? 'Kapasidad ng Ani' :
                           key === 'climate_adaptation' ? 'Klima' :
                           key === 'cultural_significance' ? 'Kahalagahan' : key}
                        </div>
                        <div className="text-sm font-semibold text-[#4A773C]">{value as string}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center bg-[#D7E4C0]/30 rounded-lg p-3">
                  <span className="font-semibold text-[#5A3E36]">{t.preservationValue}</span>
                  <span className="text-lg font-bold text-[#4A773C]">{crop.preservationValue}</span>
                </div>
              </div>

              {/* Donation Breakdown */}
              <div>
                <DonationBreakdown totalAmount={crop.preservationValue} showInline={true} />
                
                <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <Leaf className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-semibold text-green-800">Conservation Impact</span>
                  </div>
                  <p className="text-xs text-green-700 leading-relaxed">
                    {language === 'fil' 
                      ? `Ang inyong pag-adopt ay magtutulak sa mga tunay na conservation program para sa ${crop.name} sa ${crop.location}.`
                      : `Your adoption will support real conservation programs for ${crop.name} in ${crop.location}.`
                    }
                  </p>
                </div>
              </div>
            </div>

            <Button onClick={handleNextStep} className="w-full bg-[#C45A00] hover:bg-[#C45A00]/90 text-white py-3 font-semibold rounded-xl shadow-lg mt-4">
              {t.continuePayment}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </>
        )}

        {step === 'payment' && (
          <>
            <DialogHeader>
              <DialogTitle className="text-[#4A773C]">{t.paymentTitle}</DialogTitle>
              <DialogDescription className="text-[#5A3E36]/80">
                {t.paymentDescription} {crop.name}.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setPaymentMethod('gcash')}
                  className={`p-4 border-2 rounded-lg flex flex-col items-center space-y-2 transition-colors ${
                    paymentMethod === 'gcash' 
                      ? 'border-[#4A773C] bg-[#D7E4C0]/50' 
                      : 'border-[#D7E4C0] hover:border-[#4A773C]/50'
                  }`}
                >
                  <Smartphone className="h-6 w-6 text-[#4A773C]" />
                  <span className="text-sm font-medium text-[#5A3E36]">GCash</span>
                  <div className="text-xs text-[#5A3E36]/70">Filipino Digital Wallet</div>
                </button>

                <button
                  onClick={() => setPaymentMethod('crypto')}
                  className={`p-4 border-2 rounded-lg flex flex-col items-center space-y-2 transition-colors ${
                    paymentMethod === 'crypto' 
                      ? 'border-[#4A773C] bg-[#D7E4C0]/50' 
                      : 'border-[#D7E4C0] hover:border-[#4A773C]/50'
                  }`}
                >
                  <div className="w-6 h-6 bg-[#4A773C] rounded text-white flex items-center justify-center text-xs font-bold">Ξ</div>
                  <span className="text-sm font-medium text-[#5A3E36]">Ethereum</span>
                  <div className="text-xs text-[#5A3E36]/70">Web3 Wallet</div>
                </button>

                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 border-2 rounded-lg flex flex-col items-center space-y-2 transition-colors ${
                    paymentMethod === 'card' 
                      ? 'border-[#4A773C] bg-[#D7E4C0]/50' 
                      : 'border-[#D7E4C0] hover:border-[#4A773C]/50'
                  }`}
                >
                  <CreditCard className="h-6 w-6 text-[#4A773C]" />
                  <span className="text-sm font-medium text-[#5A3E36]">Credit Card</span>
                  <div className="text-xs text-[#5A3E36]/70">Visa, Mastercard</div>
                </button>
              </div>

              {paymentMethod === 'gcash' && (
                <div className="space-y-3">
                  <Label htmlFor="gcash" className="text-[#5A3E36] font-semibold">GCash Mobile Number</Label>
                  <Input
                    id="gcash"
                    placeholder="09XX XXX XXXX"
                    className="bg-[#D7E4C0]/30 border-[#D7E4C0] text-[#5A3E36]"
                  />
                  <p className="text-xs text-[#5A3E36]/70">
                    Secure payment through GCash. You'll receive a payment request notification.
                  </p>
                </div>
              )}

              {paymentMethod === 'crypto' && (
                <div className="space-y-3">
                  {/* Fixed Connect Wallet Button */}
                  {!walletConnected ? (
                    <div className="relative">
                      <Button 
                        variant="outline" 
                        onClick={() => setShowWalletOptions(!showWalletOptions)}
                        className="w-full border-[#4A773C] text-[#4A773C] hover:bg-[#4A773C] hover:text-white mb-3"
                      >
                        <Wallet className="h-4 w-4 mr-2" />
                        {t.connectWallet}
                      </Button>
                      
                      {/* Custom Dropdown */}
                      {showWalletOptions && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-[#F2EAD3] border-2 border-[#4A773C] rounded-lg shadow-lg z-50">
                          <button 
                            onClick={() => handleWalletConnect('MetaMask')}
                            className="w-full px-4 py-3 text-left hover:bg-[#D7E4C0] transition-colors flex items-center space-x-3"
                          >
                            <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center">
                              <span className="text-white text-xs font-bold">M</span>
                            </div>
                            <span className="text-[#5A3E36]">MetaMask</span>
                          </button>
                          <button 
                            onClick={() => handleWalletConnect('WalletConnect')}
                            className="w-full px-4 py-3 text-left hover:bg-[#D7E4C0] transition-colors flex items-center space-x-3"
                          >
                            <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
                              <span className="text-white text-xs font-bold">W</span>
                            </div>
                            <span className="text-[#5A3E36]">WalletConnect</span>
                          </button>
                          <button 
                            onClick={() => handleWalletConnect('Phantom')}
                            className="w-full px-4 py-3 text-left hover:bg-[#D7E4C0] transition-colors flex items-center space-x-3 rounded-b-lg"
                          >
                            <div className="w-6 h-6 bg-purple-500 rounded flex items-center justify-center">
                              <span className="text-white text-xs font-bold">P</span>
                            </div>
                            <span className="text-[#5A3E36]">Phantom</span>
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg mb-3">
                      <div className="flex items-center space-x-2">
                        <Check className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium text-green-800">{t.walletConnected}</span>
                      </div>
                      <Badge variant="outline" className="border-green-400 text-green-600">
                        {connectedWallet}
                      </Badge>
                    </div>
                  )}

                  <Label htmlFor="wallet" className="text-[#5A3E36] font-semibold">Ethereum Wallet Address</Label>
                  <Input
                    id="wallet"
                    placeholder="0x1234...abcd"
                    value={walletAddress}
                    readOnly={walletConnected}
                    onChange={(e) => !walletConnected && setWalletAddress(e.target.value)}
                    className="bg-[#D7E4C0]/30 border-[#D7E4C0] text-[#5A3E36] font-mono text-sm"
                  />
                  <p className="text-xs text-[#5A3E36]/70 italic">
                    {t.nftNote}
                  </p>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="card" className="text-[#5A3E36] font-semibold">Card Number</Label>
                    <Input id="card" placeholder="1234 5678 9012 3456" className="border-[#D7E4C0]" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="expiry" className="text-[#5A3E36] font-semibold">Expiry</Label>
                      <Input id="expiry" placeholder="MM/YY" className="border-[#D7E4C0]" />
                    </div>
                    <div>
                      <Label htmlFor="cvv" className="text-[#5A3E36] font-semibold">CVV</Label>
                      <Input id="cvv" placeholder="123" className="border-[#D7E4C0]" />
                    </div>
                  </div>
                </div>
              )}

              <Separator className="bg-[#D7E4C0]" />

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-[#5A3E36]">{t.totalAmount}</span>
                  <div className="text-right">
                    <div className="text-lg font-bold text-[#4A773C]">{crop.preservationValue}</div>
                    {paymentMethod === 'crypto' && (
                      <div className="text-sm text-gray-500">~{convertToETH(crop.preservationValue)} ETH</div>
                    )}
                  </div>
                </div>
              </div>

              <Button onClick={handleNextStep} className="w-full bg-[#4A773C] hover:bg-[#355E3B] text-white py-3 font-semibold rounded-xl shadow-lg">
                {t.reviewOrder}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </>
        )}

        {step === 'confirmation' && (
          <>
            <DialogHeader>
              <DialogTitle className="text-[#4A773C]">{t.confirmTitle}</DialogTitle>
              <DialogDescription className="text-[#5A3E36]/80">
                {t.confirmDescription}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="bg-[#D7E4C0]/50 rounded-lg p-4 border-2 border-[#D7E4C0]">
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-16 rounded-lg overflow-hidden border border-[#4A773C]">
                    <ImageWithFallback
                      src={crop.image}
                      alt={crop.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-[#5A3E36]">{crop.name}</h4>
                    <p className="text-sm text-[#4A773C] font-semibold">{crop.type}</p>
                    <Badge className={`${getRarityColor(crop.rarity)} text-white text-xs mt-1 font-semibold`}>
                      {crop.rarity}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-[#4A773C]">{crop.preservationValue}</div>
                    {paymentMethod === 'crypto' && (
                      <div className="text-sm text-gray-500">~{convertToETH(crop.preservationValue)} ETH</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#5A3E36]">{t.preservationValue}</span>
                  <span className="text-[#4A773C] font-semibold">{crop.preservationValue}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5A3E36]">Transaction Fee:</span>
                  <span className="text-[#4A773C] font-semibold">₱200</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5A3E36]">Conservation Fund:</span>
                  <span className="text-[#4A773C] font-semibold">₱500</span>
                </div>
                <Separator className="bg-[#D7E4C0]" />
                <div className="flex justify-between font-bold">
                  <span className="text-[#5A3E36]">{t.totalAmount}</span>
                  <div className="text-right">
                    <div className="text-[#4A773C]">
                      ₱{(parseFloat(crop.preservationValue.replace('₱', '').replace(',', '')) + 700).toLocaleString()}
                    </div>
                    {paymentMethod === 'crypto' && (
                      <div className="text-sm text-gray-500">
                        ~{((parseFloat(crop.preservationValue.replace('₱', '').replace(',', '')) + 700) / 1500000).toFixed(6)} ETH
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleNextStep} 
                disabled={isProcessing}
                className="w-full bg-[#C45A00] hover:bg-[#B85000] text-white py-3 font-semibold rounded-xl shadow-lg"
              >
                {isProcessing ? t.processing : t.confirmAdopt}
                {!isProcessing && <Heart className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </>
        )}

        {step === 'success' && (
          <>
            <DialogHeader>
              <DialogTitle className="text-center text-[#4A773C]">{t.successTitle}</DialogTitle>
              <DialogDescription className="text-center text-[#5A3E36]">
                {t.successDescription} {crop.name}.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
              
              <div className="space-y-2">
                <h3 className="font-bold text-[#5A3E36]">
                  {language === 'fil' 
                    ? 'Maligayang pagdating sa inyong bagong binhi!' 
                    : 'Welcome to your new seed!'
                  }
                </h3>
                <p className="text-sm text-[#5A3E36]/80 leading-relaxed">
                  {language === 'fil' 
                    ? `Ang inyong ${crop.name} NFT ay naipasa na sa inyong wallet. Maaari na ninyong alagaan at bantayan itong lumaki!`
                    : `Your ${crop.name} NFT has been transferred to your wallet. You can now care for and watch it grow!`
                  }
                </p>
              </div>

              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <p className="text-sm text-green-800 leading-relaxed">
                  <strong>Conservation Impact:</strong><br />
                  {language === 'fil' 
                    ? `Salamat sa inyong suporta sa pagpapanatili ng ${crop.name}! Ang inyong kontribusyon ay makakatulong sa mga lokal na magsasaka sa ${crop.location}.`
                    : `Thank you for supporting the preservation of ${crop.name}! Your contribution will help local farmers in ${crop.location}.`
                  }
                </p>
              </div>

              <Button onClick={handleComplete} className="w-full bg-[#4A773C] hover:bg-[#355E3B] text-white py-3 font-semibold rounded-xl shadow-lg">
                {t.continueExploring}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
