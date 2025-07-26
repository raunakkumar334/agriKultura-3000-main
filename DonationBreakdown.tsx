import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Info, Users, Database, Monitor, Palette, Settings } from 'lucide-react';

interface DonationBreakdownProps {
  totalAmount: string;
  showInline?: boolean;
}

const donationData = [
  {
    name: 'Farming Family',
    value: 40,
    amount: 0,
    color: '#4A773C',
    icon: Users,
    description: 'Direct support to farming families and seed preservation communities'
  },
  {
    name: 'Seed Bank Storage',
    value: 20,
    amount: 0,
    color: '#7A9D54',
    icon: Database,
    description: 'Climate-controlled storage facilities and seed conservation infrastructure'
  },
  {
    name: 'Digital Preservation',
    value: 15,
    amount: 0,
    color: '#D7E4C0',
    icon: Monitor,
    description: 'Digitization, documentation, and virtual museum development'
  },
  {
    name: 'Cultural Partners',
    value: 10,
    amount: 0,
    color: '#F9C74F',
    icon: Palette,
    description: 'Collaborations with indigenous communities and cultural institutions'
  },
  {
    name: 'Platform Maintenance',
    value: 15,
    amount: 0,
    color: '#C45A00',
    icon: Settings,
    description: 'Technical infrastructure, security, and platform operations'
  }
];

export function DonationBreakdown({ totalAmount, showInline = false }: DonationBreakdownProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Calculate actual amounts based on total
  const numericTotal = parseFloat(totalAmount.replace('₱', '').replace(',', ''));
  const dataWithAmounts = donationData.map(item => ({
    ...item,
    amount: Math.round((numericTotal * item.value) / 100)
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#F2EAD3] border border-[#4A773C] rounded-lg p-3 shadow-lg">
          <p className="font-semibold text-[#5A3E36]">{data.name}</p>
          <p className="text-[#4A773C]">₱{data.amount.toLocaleString()} ({data.value}%)</p>
          <p className="text-xs text-[#5A3E36]/80 mt-1">{data.description}</p>
        </div>
      );
    }
    return null;
  };

  const InlineBreakdown = () => (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-[#4A773C]">Donation Breakdown</h4>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsDialogOpen(true)}
          className="text-[#C45A00] hover:bg-[#F2EAD3] text-sm"
        >
          <Info className="h-4 w-4 mr-1" />
          Details
        </Button>
      </div>
      
      <div className="grid grid-cols-1 gap-2">
        {dataWithAmounts.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="flex items-center justify-between p-2 bg-[#F2EAD3]/50 rounded-lg border border-[#D7E4C0]">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <Icon className="h-4 w-4 text-[#4A773C]" />
                <span className="text-sm font-medium text-[#5A3E36]">{item.name}</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-[#4A773C]">
                  ₱{item.amount.toLocaleString()}
                </div>
                <div className="text-xs text-[#5A3E36]/70">{item.value}%</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  if (showInline) {
    return (
      <>
        <InlineBreakdown />
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl border-2 border-[#4A773C] bg-[#F2EAD3]">
            <DialogHeader>
              <DialogTitle className="text-[#4A773C] text-center">Where Your Support Goes</DialogTitle>
              <DialogDescription className="text-[#5A3E36]/80 text-center">
                Detailed breakdown of how your {totalAmount} donation will be allocated to support Filipino agricultural heritage preservation.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dataWithAmounts}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {dataWithAmounts.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-3">
                <div className="text-center mb-4">
                  <h3 className="font-bold text-[#4A773C] mb-2">Total Donation</h3>
                  <div className="text-2xl font-bold text-[#C45A00]">{totalAmount}</div>
                </div>
                
                {dataWithAmounts.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Card key={index} className="border-[#D7E4C0] bg-white/60">
                      <CardContent className="p-3">
                        <div className="flex items-start space-x-3">
                          <div 
                            className="w-4 h-4 rounded-full mt-1"
                            style={{ backgroundColor: item.color }}
                          />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <Icon className="h-4 w-4 text-[#4A773C]" />
                              <h4 className="font-semibold text-[#5A3E36]">{item.name}</h4>
                              <span className="text-sm font-bold text-[#4A773C]">
                                ₱{item.amount.toLocaleString()}
                              </span>
                            </div>
                            <p className="text-xs text-[#5A3E36]/80 leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <Card className="border-2 border-[#4A773C] bg-[#F2EAD3]/80 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-[#4A773C] text-center flex items-center justify-center space-x-2">
          <Info className="h-5 w-5" />
          <span>Where Your Support Goes</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <InlineBreakdown />
      </CardContent>
    </Card>
  );
}
