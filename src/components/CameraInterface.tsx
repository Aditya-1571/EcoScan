import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Upload, ArrowLeft, Zap, FileImage } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface CameraInterfaceProps {
  onBack: () => void;
  onImageCaptured: (image: string, analysis: any) => void;
}

export const CameraInterface = ({ onBack, onImageCaptured }: CameraInterfaceProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const analyzeImage = async (imageData: string) => {
    setIsAnalyzing(true);
    
    console.log('Starting image analysis...', { imageSize: imageData.length });

    try {
      console.log('Calling analyze-plastic-image function...');
      
      const { data, error } = await supabase.functions.invoke('analyze-plastic-image', {
        body: { image: imageData }
      });

      console.log('Function response:', { data, error });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      console.log('Analysis result:', data);

      if (!data.isPlastic) {
        toast({
          title: "No Plastic Detected",
          description: data.description || "The image doesn't appear to contain recyclable plastic materials. Please try with a clearer image of plastic items.",
          variant: "destructive",
        });
        setIsAnalyzing(false);
        return;
      }

      // Validate the analysis result has required fields
      if (!data.plasticType || data.estimatedValue === undefined) {
        console.error('Invalid analysis result:', data);
        throw new Error('Invalid analysis result received');
      }

      toast({
        title: "Analysis Complete!",
        description: `Detected: ${data.plasticType} worth ₹${data.estimatedValue.toFixed(2)}`,
      });

      onImageCaptured(imageData, data);
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Analysis Failed",
        description: "Unable to analyze the image. Please try again with a clearer photo of plastic items.",
        variant: "destructive",
      });
      setIsAnalyzing(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      analyzeImage(result);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        processFile(file);
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="px-6 py-4 border-b border-border/50 bg-card/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-xl font-semibold text-foreground">Scan Your Plastic</h1>
          <div></div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {isAnalyzing ? (
          <div className="text-center space-y-6">
            <Card className="bg-gradient-card shadow-card border-border/50 inline-block">
              <CardContent className="p-12">
                <div className="animate-spin h-16 w-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-6"></div>
                <h2 className="text-2xl font-bold text-foreground mb-4">🔬 AI Magic in Progress!</h2>
                <div className="space-y-2 text-muted-foreground">
                  <p className="animate-pulse">🧪 Scanning polymer chains...</p>
                  <p className="animate-pulse">💰 Calculating market value...</p>
                  <p className="animate-pulse">🎯 Finding the best offers for you...</p>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Hero Message */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Got plastic? Let's discover its cash value! 💰
              </h2>
              <p className="text-muted-foreground text-lg">
                Snap a photo or upload an image to see what your plastic is worth
              </p>
            </div>

            {/* Camera Section */}
            <Card className="bg-gradient-card shadow-card border-border/50">
              <CardHeader>
                <CardTitle className="text-foreground text-center">Capture or Upload</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Camera Preview Placeholder */}
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                  <div className="text-center">
                    <Camera className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Camera preview will appear here</p>
                  </div>
                </div>

                {/* Drag and Drop Zone */}
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
                    isDragOver 
                      ? 'border-primary bg-primary/10' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={triggerFileInput}
                >
                  <FileImage className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-foreground mb-2">
                    Drag & Drop Your Image Here
                  </h4>
                  <p className="text-muted-foreground mb-4">
                    Or click to browse and upload from your device
                  </p>
                  <Button variant="outline" onClick={triggerFileInput}>
                    <Upload className="h-4 w-4 mr-2" />
                    Choose File
                  </Button>
                </div>

                {/* Hidden File Input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />

                {/* Action Buttons */}
                <div className="grid md:grid-cols-2 gap-4">
                  <Button
                    variant="camera"
                    size="lg"
                    className="w-full"
                    onClick={triggerFileInput}
                  >
                    <Camera className="h-5 w-5 mr-2" />
                    Take Photo
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full"
                    onClick={triggerFileInput}
                  >
                    <Upload className="h-5 w-5 mr-2" />
                    Upload Photo
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="bg-gradient-success/10 shadow-card border-success/20">
              <CardContent className="p-6">
                <h4 className="font-semibold text-success mb-4 flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Pro Tips for Best Results
                </h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Ensure good lighting for clear photos</li>
                  <li>• Include any recycling codes or labels visible</li>
                  <li>• Clean items work best for accurate analysis</li>
                  <li>• Multiple angles can improve accuracy</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};