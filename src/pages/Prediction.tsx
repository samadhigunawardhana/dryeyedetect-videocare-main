import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Upload, AlertCircle, CheckCircle, AlertTriangle, Home } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Prediction() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { videoBlob } = location.state || {};

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{
    risk: "low" | "medium" | "high";
    confidence: number;
  } | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("video/")) {
        toast({
          variant: "destructive",
          title: "Invalid File",
          description: "Please upload a video file.",
        });
        return;
      }
      setUploadedFile(file);
    }
  };

  const analyzeVideo = async () => {
    const fileToAnalyze = uploadedFile || (videoBlob ? new File([videoBlob], "recording.webm") : null);

    if (!fileToAnalyze) {
      toast({
        variant: "destructive",
        title: "No Video",
        description: "Please upload a video file first.",
      });
      return;
    }

    setIsAnalyzing(true);

    // Simulate analysis (replace with actual API call to Python service)
    setTimeout(() => {
      const mockRisk = ["low", "medium", "high"][Math.floor(Math.random() * 3)] as "low" | "medium" | "high";
      const mockConfidence = 0.75 + Math.random() * 0.2;

      setResult({
        risk: mockRisk,
        confidence: mockConfidence,
      });
      setIsAnalyzing(false);

      toast({
        title: "Analysis Complete",
        description: "Your dry eye risk assessment is ready.",
      });
    }, 3000);
  };

  const getRiskInfo = (risk: "low" | "medium" | "high") => {
    switch (risk) {
      case "low":
        return {
          icon: CheckCircle,
          color: "text-success",
          bgColor: "bg-success/10",
          title: "Low Risk",
          message: "Your Dry Eye Risk is Low. Great! Keep it up!",
          tips: [
            "Blink regularly, especially during screen time",
            "Stay hydrated throughout the day",
            "Take regular breaks from digital devices (20-20-20 rule)",
            "Use a humidifier in dry environments",
            "Maintain a balanced diet rich in omega-3 fatty acids",
          ],
        };
      case "medium":
        return {
          icon: AlertTriangle,
          color: "text-warning",
          bgColor: "bg-warning/10",
          title: "Moderate Risk",
          message: "Your Dry Eye Risk is Moderate.",
          tips: [
            "Blink more frequently, especially when using screens",
            "Reduce screen time and take frequent breaks",
            "Use preservative-free artificial tears",
            "Avoid air conditioning and fans blowing directly on your face",
            "Consider an eye exam with an optometrist",
            "Wear sunglasses outdoors to protect from wind and sun",
          ],
        };
      case "high":
        return {
          icon: AlertCircle,
          color: "text-destructive",
          bgColor: "bg-destructive/10",
          title: "High Risk",
          message: "Your Dry Eye Risk is High. Please consult an eye doctor.",
          tips: [
            "Schedule an appointment with an ophthalmologist immediately",
            "Use prescribed eye drops or medications as recommended",
            "Avoid environments that worsen symptoms (smoke, wind, AC)",
            "Apply warm compresses to your eyes regularly",
            "Consider punctal plugs or other medical interventions",
            "Follow a comprehensive treatment plan with your eye care professional",
          ],
        };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <header className="border-b bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center gap-2">
          <Eye className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">Dry Eye Risk Assessment</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {!result ? (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Upload Your Video</CardTitle>
              <CardDescription>
                Upload the recorded video for dry eye risk analysis using AI-powered feature extraction
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="video-upload">Video File</Label>
                <Input
                  id="video-upload"
                  type="file"
                  accept="video/*"
                  onChange={handleFileUpload}
                />
                {uploadedFile && (
                  <p className="text-sm text-muted-foreground">
                    Selected: {uploadedFile.name} ({(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB)
                  </p>
                )}
              </div>

              {videoBlob && !uploadedFile && (
                <div className="p-4 border rounded-lg bg-muted/30">
                  <p className="text-sm">
                    Using recorded video from previous step. You can also upload a different video file above.
                  </p>
                </div>
              )}

              <Button
                onClick={analyzeVideo}
                disabled={isAnalyzing || (!uploadedFile && !videoBlob)}
                className="w-full"
                size="lg"
              >
                {isAnalyzing ? (
                  <>
                    <Upload className="mr-2 h-5 w-5 animate-pulse" />
                    Analyzing Video...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-5 w-5" />
                    Test Dry Eye Risk
                  </>
                )}
              </Button>

              <div className="text-sm text-muted-foreground bg-muted/30 p-4 rounded-lg">
                <p className="font-medium mb-2">How it works:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Video features are extracted using computer vision</li>
                  <li>Combined with your OSDI score for comprehensive analysis</li>
                  <li>AI model predicts dry eye disease risk level</li>
                  <li>Results include personalized recommendations</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <Card className={`shadow-lg ${getRiskInfo(result.risk).bgColor}`}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  {(() => {
                    const Icon = getRiskInfo(result.risk).icon;
                    return <Icon className={`h-12 w-12 ${getRiskInfo(result.risk).color}`} />;
                  })()}
                  <div>
                    <CardTitle className="text-3xl">{getRiskInfo(result.risk).title}</CardTitle>
                    <CardDescription className="text-base mt-1">
                      Confidence: {(result.confidence * 100).toFixed(1)}%
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium mb-4">{getRiskInfo(result.risk).message}</p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Recommendations & Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {getRiskInfo(result.risk).tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="mt-1 h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-primary">{index + 1}</span>
                      </div>
                      <p className="text-sm">{tip}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Button onClick={() => navigate("/dashboard")} variant="outline" className="w-full">
              <Home className="mr-2 h-4 w-4" />
              Return to Dashboard
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
