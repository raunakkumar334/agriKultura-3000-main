import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Map, Trophy, Star, CheckCircle, Lock, Leaf } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface Province {
  id: string;
  name: string;
  region: 'Luzon' | 'Visayas' | 'Mindanao';
  position: { x: number; y: number };
  questions: Question[];
  completed: boolean;
  progress: number;
  seedBadge?: string;
}

const questData: Province[] = [
  {
    id: 'ifugao',
    name: 'Ifugao',
    region: 'Luzon',
    position: { x: 45, y: 25 },
    completed: false,
    progress: 0,
    seedBadge: 'Rice Terraces Guardian',
    questions: [
      {
        id: 'ifugao-1',
        question: 'What rice grain grows in the terraces of Ifugao?',
        options: ['Jasmine Rice', 'Tinawon Rice', 'Basmati Rice', 'Brown Rice'],
        correctAnswer: 1,
        explanation: 'Tinawon Rice is an heirloom variety grown in the ancient rice terraces of Ifugao for over 2,000 years.'
      },
      {
        id: 'ifugao-2',
        question: 'How many times per year is Tinawon Rice typically planted?',
        options: ['Once', 'Twice', 'Three times', 'Four times'],
        correctAnswer: 0,
        explanation: 'Tinawon Rice is planted only once per year, following traditional farming cycles.'
      },
      {
        id: 'ifugao-3',
        question: 'What makes the Banaue Rice Terraces special?',
        options: ['Modern irrigation', 'UNESCO World Heritage status', 'Machine harvesting', 'Hybrid seeds'],
        correctAnswer: 1,
        explanation: 'The Banaue Rice Terraces are a UNESCO World Heritage site, representing ancient agricultural engineering.'
      }
    ]
  },
  {
    id: 'batangas',
    name: 'Batangas',
    region: 'Luzon',
    position: { x: 40, y: 45 },
    completed: false,
    progress: 0,
    seedBadge: 'Barako Coffee Master',
    questions: [
      {
        id: 'batangas-1',
        question: 'What coffee variety is Batangas famous for?',
        options: ['Arabica', 'Robusta', 'Barako', 'Liberica'],
        correctAnswer: 2,
        explanation: 'Kapeng Barako is a strong, bold coffee variety native to Batangas with volcanic soil origins.'
      },
      {
        id: 'batangas-2',
        question: 'What soil type helps Barako coffee grow?',
        options: ['Clay soil', 'Sandy soil', 'Volcanic soil', 'Rocky soil'],
        correctAnswer: 2,
        explanation: 'The volcanic soil of Batangas provides ideal conditions for Barako coffee cultivation.'
      },
      {
        id: 'batangas-3',
        question: 'What is the conservation status of Kapeng Barako?',
        options: ['Stable', 'Vulnerable', 'Critically Endangered', 'Extinct'],
        correctAnswer: 2,
        explanation: 'Kapeng Barako is critically endangered due to urbanization and changing farming practices.'
      }
    ]
  },
  {
    id: 'bohol',
    name: 'Bohol',
    region: 'Visayas',
    position: { x: 65, y: 55 },
    completed: false,
    progress: 0,
    seedBadge: 'Purple Ube Keeper',
    questions: [
      {
        id: 'bohol-1',
        question: 'What makes Ubi Kinampay special?',
        options: ['Yellow color', 'Purple color', 'White color', 'Red color'],
        correctAnswer: 1,
        explanation: 'Ubi Kinampay is known for its distinctive purple color and sweet taste, used in Filipino desserts.'
      },
      {
        id: 'bohol-2',
        question: 'How long does Ubi Kinampay take to grow?',
        options: ['3-4 months', '5-6 months', '8-10 months', '12 months'],
        correctAnswer: 2,
        explanation: 'Ubi Kinampay requires 8-10 months to fully mature and develop its characteristic purple color.'
      },
      {
        id: 'bohol-3',
        question: 'What dishes commonly use Ubi Kinampay?',
        options: ['Main courses', 'Soups', 'Kakanin and desserts', 'Beverages'],
        correctAnswer: 2,
        explanation: 'Ubi Kinampay is primarily used in traditional Filipino desserts and kakanin (rice cakes).'
      }
    ]
  }
];

interface CulturalQuestProps {
  userProgress: { [key: string]: number };
  onProgressUpdate: (provinceId: string, progress: number) => void;
  onBadgeEarned: (badge: string) => void;
}

export function CulturalQuest({ userProgress, onProgressUpdate, onBadgeEarned }: CulturalQuestProps) {
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [questDialogOpen, setQuestDialogOpen] = useState(false);
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);

  // Update province progress based on user progress
  const provincesWithProgress = questData.map(province => ({
    ...province,
    progress: userProgress[province.id] || 0,
    completed: (userProgress[province.id] || 0) >= province.questions.length
  }));

  const handleProvinceClick = (province: Province) => {
    setSelectedProvince(province);
    setCurrentQuestionIndex(userProgress[province.id] || 0);
    setSelectedAnswer('');
    setShowResult(false);
    setQuestDialogOpen(true);
  };

  const handleAnswerSubmit = () => {
    if (!selectedProvince || selectedAnswer === '') return;

    const currentQuestion = selectedProvince.questions[currentQuestionIndex];
    const correct = parseInt(selectedAnswer) === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      const newProgress = currentQuestionIndex + 1;
      onProgressUpdate(selectedProvince.id, newProgress);

      // Check if province is completed
      if (newProgress >= selectedProvince.questions.length) {
        setTimeout(() => {
          setShowCompletionDialog(true);
          onBadgeEarned(selectedProvince.seedBadge || 'Cultural Explorer');
        }, 2000);
      }
    }
  };

  const handleNextQuestion = () => {
    if (!selectedProvince) return;

    if (currentQuestionIndex + 1 < selectedProvince.questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer('');
      setShowResult(false);
    } else {
      setQuestDialogOpen(false);
    }
  };

  const totalCompleted = provincesWithProgress.filter(p => p.completed).length;
  const totalProvinces = provincesWithProgress.length;

  return (
    <div className="space-y-6">
      {/* Quest Overview */}
      <Card className="border-2 border-[#4A773C] bg-[#F2EAD3]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-[#4A773C] flex items-center space-x-2">
            <Map className="h-5 w-5" />
            <span>Cultural Heritage Quest</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#C45A00]">{totalCompleted}</div>
              <p className="text-sm text-[#5A3E36]/70">Provinces Completed</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#C45A00]">
                {Object.values(userProgress).reduce((sum, progress) => sum + progress, 0)}
              </div>
              <p className="text-sm text-[#5A3E36]/70">Questions Answered</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#C45A00]">{totalCompleted}</div>
              <p className="text-sm text-[#5A3E36]/70">Badges Earned</p>
            </div>
          </div>
          
          <Progress 
            value={(totalCompleted / totalProvinces) * 100} 
            className="h-3 mb-2"
          />
          <p className="text-center text-sm text-[#5A3E36]/80">
            Overall Progress: {totalCompleted}/{totalProvinces} regions completed
          </p>
        </CardContent>
      </Card>

      {/* Philippines Map */}
      <Card className="border-2 border-[#4A773C] quest-map overflow-hidden">
        <CardHeader>
          <CardTitle className="text-[#4A773C]">Explore the Philippines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full h-96 bg-baybayin-pattern rounded-lg border-2 border-[#D7E4C0] overflow-hidden">
            {/* Region Labels */}
            <div className="absolute top-4 left-4 bg-[#F2EAD3]/90 rounded-lg p-2 border border-[#4A773C]">
              <h3 className="font-bold text-[#4A773C] text-sm">Luzon</h3>
            </div>
            <div className="absolute top-1/2 right-8 bg-[#F2EAD3]/90 rounded-lg p-2 border border-[#4A773C]">
              <h3 className="font-bold text-[#4A773C] text-sm">Visayas</h3>
            </div>
            <div className="absolute bottom-8 right-4 bg-[#F2EAD3]/90 rounded-lg p-2 border border-[#4A773C]">
              <h3 className="font-bold text-[#4A773C] text-sm">Mindanao</h3>
            </div>

            {/* Province Markers */}
            {provincesWithProgress.map((province) => (
              <button
                key={province.id}
                onClick={() => handleProvinceClick(province)}
                className={`
                  absolute w-12 h-12 province-marker transition-all duration-300
                  ${province.completed ? 'completed' : ''}
                  hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#C45A00] focus:ring-offset-2
                `}
                style={{
                  left: `${province.position.x}%`,
                  top: `${province.position.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                title={`${province.name} - ${province.progress}/${province.questions.length} completed`}
              >
                <div className="w-full h-full flex items-center justify-center">
                  {province.completed ? (
                    <CheckCircle className="h-6 w-6 text-white" />
                  ) : province.progress > 0 ? (
                    <Star className="h-6 w-6 text-white" />
                  ) : (
                    <Lock className="h-6 w-6 text-white" />
                  )}
                </div>
                
                {/* Progress Ring */}
                <div className="absolute inset-0 rounded-full border-4 border-transparent">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 32 32">
                    <circle
                      cx="16"
                      cy="16"
                      r="14"
                      fill="none"
                      stroke="rgba(255,255,255,0.3)"
                      strokeWidth="2"
                    />
                    <circle
                      cx="16"
                      cy="16"
                      r="14"
                      fill="none"
                      stroke="#F9C74F"
                      strokeWidth="2"
                      strokeDasharray={`${(province.progress / province.questions.length) * 87.96} 87.96`}
                      className="transition-all duration-500"
                    />
                  </svg>
                </div>
              </button>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-[#4A773C] border-2 border-[#F2EAD3]"></div>
              <span className="text-[#5A3E36]">Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-[#FFD700] border-2 border-[#C45A00]"></div>
              <span className="text-[#5A3E36]">Completed</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-[#F9C74F]" />
              <span className="text-[#5A3E36]">In Progress</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quest Dialog */}
      <Dialog open={questDialogOpen} onOpenChange={setQuestDialogOpen}>
        <DialogContent className="max-w-lg border-2 border-[#4A773C] bg-[#F2EAD3]">
          {selectedProvince && (
            <>
              <DialogHeader>
                <DialogTitle className="text-[#4A773C] text-center">
                  {selectedProvince.name} Cultural Quest
                </DialogTitle>
                <DialogDescription className="text-[#5A3E36]/80 text-center">
                  Learn about the agricultural heritage of {selectedProvince.name} by answering questions about traditional farming and indigenous crops.
                </DialogDescription>
                <div className="text-center">
                  <Badge variant="outline" className="border-[#C45A00] text-[#C45A00]">
                    Question {currentQuestionIndex + 1} of {selectedProvince.questions.length}
                  </Badge>
                </div>
              </DialogHeader>

              <div className="space-y-4">
                <Progress 
                  value={((currentQuestionIndex + (showResult && isCorrect ? 1 : 0)) / selectedProvince.questions.length) * 100}
                  className="h-2"
                />

                {currentQuestionIndex < selectedProvince.questions.length && (
                  <Card className="border-[#D7E4C0] bg-white/60">
                    <CardContent className="pt-4">
                      <h3 className="font-semibold text-[#5A3E36] mb-4">
                        {selectedProvince.questions[currentQuestionIndex].question}
                      </h3>

                      {!showResult ? (
                        <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
                          <div className="space-y-3">
                            {selectedProvince.questions[currentQuestionIndex].options.map((option, index) => (
                              <div key={index} className="flex items-center space-x-2">
                                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                                  {option}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </RadioGroup>
                      ) : (
                        <div className="space-y-3">
                          <div className={`p-3 rounded-lg border ${
                            isCorrect 
                              ? 'bg-green-50 border-green-200 text-green-800' 
                              : 'bg-red-50 border-red-200 text-red-800'
                          }`}>
                            <div className="flex items-center space-x-2 mb-2">
                              {isCorrect ? (
                                <CheckCircle className="h-5 w-5" />
                              ) : (
                                <Lock className="h-5 w-5" />
                              )}
                              <span className="font-semibold">
                                {isCorrect ? 'Correct!' : 'Incorrect'}
                              </span>
                            </div>
                            <p className="text-sm">
                              {selectedProvince.questions[currentQuestionIndex].explanation}
                            </p>
                          </div>
                          
                          {isCorrect && (
                            <div className="text-center">
                              <Leaf className="h-8 w-8 text-[#4A773C] mx-auto mb-2 animate-bounce-slow" />
                              <p className="text-[#4A773C] font-semibold">You earned 1 Kalikhasan Token!</p>
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setQuestDialogOpen(false)}
                    className="border-[#4A773C] text-[#4A773C]"
                  >
                    Close
                  </Button>
                  
                  {!showResult ? (
                    <Button
                      onClick={handleAnswerSubmit}
                      disabled={selectedAnswer === ''}
                      className="bg-[#C45A00] hover:bg-[#C45A00]/90 text-white"
                    >
                      Submit Answer
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNextQuestion}
                      className="bg-[#4A773C] hover:bg-[#4A773C]/90 text-white"
                    >
                      {currentQuestionIndex + 1 < selectedProvince.questions.length ? 'Next Question' : 'Complete'}
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Completion Dialog */}
      <Dialog open={showCompletionDialog} onOpenChange={setShowCompletionDialog}>
        <DialogContent className="max-w-md border-2 border-[#4A773C] bg-[#F2EAD3] text-center">
          <DialogHeader>
            <DialogTitle className="text-[#4A773C]">Province Completed!</DialogTitle>
            <DialogDescription className="text-[#5A3E36]/80">
              Congratulations! You have successfully completed all cultural heritage questions for {selectedProvince?.name} and earned a special badge.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <Trophy className="h-16 w-16 text-[#FFD700] mx-auto animate-bounce-slow" />
            <h3 className="text-xl font-bold text-[#4A773C]">
              Congratulations!
            </h3>
            <p className="text-[#5A3E36]">
              You've completed all questions for {selectedProvince?.name}!
            </p>
            <Badge className="bg-[#4A773C] text-white">
              Badge Earned: {selectedProvince?.seedBadge}
            </Badge>
            <Button 
              onClick={() => setShowCompletionDialog(false)}
              className="bg-[#C45A00] hover:bg-[#C45A00]/90 text-white w-full"
            >
              Continue Exploring
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
