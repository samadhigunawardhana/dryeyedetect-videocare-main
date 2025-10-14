import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Video, StopCircle, Download, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

export default function Reading() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const { categoryId, story } = location.state || {};

  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [hasStarted, setHasStarted] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!story) {
      navigate("/stories");
    }
  }, [story, navigate]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (mediaRecorderRef.current?.state === "recording") {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "video/webm;codecs=vp8",
      });

      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "video/webm" });
        setRecordedBlob(blob);
        stream.getTracks().forEach((track) => track.stop());
        if (videoRef.current) {
          videoRef.current.srcObject = null;
        }
      };

      mediaRecorder.start(1000);
      mediaRecorderRef.current = mediaRecorder;
      setIsRecording(true);
      setHasStarted(true);

      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            stopRecording();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      toast({
        title: "Recording Started",
        description: "Please read the story naturally for 5 minutes.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Camera Error",
        description: error.message || "Failed to access camera.",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      toast({
        title: "Recording Stopped",
        description: "Your video has been recorded successfully.",
      });
    }
  };

  const downloadVideo = () => {
    if (!recordedBlob) return;
    const url = URL.createObjectURL(recordedBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `recording_${Date.now()}.webm`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleContinue = async () => {
    if (!recordedBlob) {
      toast({
        variant: "destructive",
        title: "No Recording",
        description: "Please record your video first.",
      });
      return;
    }

    try {
      const { error } = await supabase.from("video_recordings").insert({
        user_id: user?.id,
        story_category: categoryId,
        duration: 300 - timeLeft,
      });

      if (error) throw error;

      navigate("/prediction", { state: { videoBlob: recordedBlob } });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (!story) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <header className="border-b bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center gap-2">
          <Eye className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">Read & Record</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">{story.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <p className="text-base leading-relaxed whitespace-pre-wrap">{story.content}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Video Recording</span>
                {hasStarted && (
                  <span className="text-lg font-mono text-primary">{formatTime(timeLeft)}</span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
              </div>

              {!hasStarted && (
                <Button onClick={startRecording} className="w-full" size="lg">
                  <Video className="mr-2 h-5 w-5" />
                  Start Recording
                </Button>
              )}

              {isRecording && (
                <Button onClick={stopRecording} variant="destructive" className="w-full" size="lg">
                  <StopCircle className="mr-2 h-5 w-5" />
                  Stop Recording
                </Button>
              )}

              {recordedBlob && (
                <div className="space-y-2">
                  <Button onClick={downloadVideo} variant="outline" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download Video
                  </Button>
                  <Button onClick={handleContinue} className="w-full" size="lg">
                    Continue to Prediction
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}

              <p className="text-sm text-muted-foreground text-center">
                {!hasStarted && "Click 'Start Recording' to begin the 5-minute recording session."}
                {isRecording && "Reading in progress... The recording will automatically stop after 5 minutes."}
                {recordedBlob && !isRecording && "Recording complete! Download your video or continue to prediction."}
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
