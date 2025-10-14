import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Activity, FileText, Video } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: FileText,
      title: "OSDI Assessment",
      description: "Complete the standardized Ocular Surface Disease Index questionnaire",
    },
    {
      icon: Video,
      title: "Facial Recording",
      description: "Record your face while reading to capture blink patterns and eye movements",
    },
    {
      icon: Activity,
      title: "AI Analysis",
      description: "Advanced machine learning analyzes your data for dry eye disease risk",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-3">
          <Eye className="h-10 w-10 text-primary" />
          <h1 className="text-3xl font-bold">Dry Eye Detection System</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          <section className="text-center space-y-4">
            <h2 className="text-5xl font-bold tracking-tight">
              Assess Your Dry Eye Risk
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A comprehensive web-based application combining OSDI scoring and facial video analysis
              to predict dry eye disease risk using advanced AI technology
            </p>
            <div className="flex gap-4 justify-center pt-6">
              <Button size="lg" onClick={() => navigate("/auth")}>
                Get Started
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/auth")}>
                Learn More
              </Button>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center shadow-lg">
                  <CardHeader>
                    <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </section>

          <section className="bg-card rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-center">How It Works</h3>
            <ol className="space-y-4 max-w-2xl mx-auto">
              <li className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <p className="font-medium">Create an account and log in</p>
                  <p className="text-sm text-muted-foreground">Secure authentication to protect your health data</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <p className="font-medium">Complete the OSDI questionnaire</p>
                  <p className="text-sm text-muted-foreground">Answer 12 questions about your eye symptoms</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <p className="font-medium">Select a story and record your face</p>
                  <p className="text-sm text-muted-foreground">Read for 5 minutes while we capture facial features</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <p className="font-medium">Get your risk assessment</p>
                  <p className="text-sm text-muted-foreground">AI analyzes your data and provides personalized recommendations</p>
                </div>
              </li>
            </ol>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Index;
