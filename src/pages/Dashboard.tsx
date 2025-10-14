import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Eye, LogOut } from "lucide-react";

const osdiQuestions = [
  { id: 1, text: "Do your eyes feel dry or gritty after screen use?" },
  { id: 2, text: "Do you experience blurred vision during or after laptop work?" },
  { id: 3, text: "Do you get headaches after extended laptop use?" },
  { id: 4, text: "Do your eyes feel tired or heavy after screen time?" },
  { id: 5, text: "Do you feel the need to rub your eyes while using your laptop?" },
  { id: 6, text: "Do your eyes become red while using your laptop?" },
  { id: 7, text: "Do you feel burning or stinging sensations in your eyes during laptop use?" },
];

const options = [
  { value: "0", label: "None of the time" },
  { value: "1", label: "Some of the time" },
  { value: "2", label: "Half of the time" },
  { value: "3", label: "Most of the time" },
  { value: "4", label: "All of the time" },
];

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showScore, setShowScore] = useState(false);
  const [osdiScore, setOsdiScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const calculateScore = async () => {
    const answeredCount = Object.keys(answers).length;
    if (answeredCount === 0) {
      toast({
        variant: "destructive",
        title: "No Answers",
        description: "Please answer at least one question.",
      });
      return;
    }

    const sum = Object.values(answers).reduce((acc, val) => acc + parseInt(val), 0);
    const score = (sum * 25) / answeredCount;
    setOsdiScore(parseFloat(score.toFixed(2)));
    setShowScore(true);

    setLoading(true);
    try {
      const { error } = await supabase.from("osdi_scores").insert({
        user_id: user?.id,
        score: parseFloat(score.toFixed(2)),
        answers: answers,
      });

      if (error) throw error;

      toast({
        title: "Score Saved",
        description: "Your OSDI score has been recorded.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    navigate("/stories");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <header className="border-b bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Eye className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Dry Eye Assessment</h1>
          </div>
          <Button variant="ghost" onClick={signOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">OSDI Questionnaire</CardTitle>
            <CardDescription>
              Have you experienced any of the following during the last week?
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {osdiQuestions.map((question) => (
              <div key={question.id} className="space-y-3 p-4 border rounded-lg bg-muted/30">
                <Label className="text-base font-medium">{question.text}</Label>
                <RadioGroup
                  value={answers[question.id] || ""}
                  onValueChange={(value) => handleAnswerChange(question.id, value)}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                    {options.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={option.value} id={`q${question.id}-${option.value}`} />
                        <Label
                          htmlFor={`q${question.id}-${option.value}`}
                          className="text-sm cursor-pointer"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            ))}

            {!showScore ? (
              <Button onClick={calculateScore} className="w-full" size="lg" disabled={loading}>
                Calculate OSDI Score
              </Button>
            ) : (
              <div className="space-y-4">
                <Card className="bg-primary/10 border-primary">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-2">Your OSDI Score</p>
                      <p className="text-4xl font-bold text-primary">{osdiScore}</p>
                      <p className="text-sm mt-2 text-muted-foreground">
                        {osdiScore! < 13
                          ? "Normal"
                          : osdiScore! < 23
                          ? "Mild Dry Eye"
                          : osdiScore! < 33
                          ? "Moderate Dry Eye"
                          : "Severe Dry Eye"}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Button onClick={handleContinue} className="w-full" size="lg">
                  Continue to Story Selection
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
