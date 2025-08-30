import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, DollarSign, Users, Recycle } from "lucide-react";

interface PlasticAnalysisResultProps {
  result: {
    plasticType: string;
    quality: string;
    recyclingCode: string;
    estimatedValue: number;
    description: string;
    properties: string[];
    marketDemand: string;
    nearbyVendors: number;
  };
  image: string;
  onBack: () => void;
  onFindVendors: () => void;
}

export const PlasticAnalysisResult = ({ result, image, onBack, onFindVendors }: PlasticAnalysisResultProps) => {
  const getQualityColor = (quality: string) => {
    switch (quality.toLowerCase()) {
      case 'high': return 'text-success bg-success/10 border-success/20';
      case 'medium': return 'text-warning bg-warning/10 border-warning/20';
      case 'low': return 'text-destructive bg-destructive/10 border-destructive/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getDemandColor = (demand: string) => {
    switch (demand.toLowerCase()) {
      case 'high': return 'text-success bg-success/10 border-success/20';
      case 'medium': return 'text-warning bg-warning/10 border-warning/20';
      case 'low': return 'text-destructive bg-destructive/10 border-destructive/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
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
          <h1 className="text-xl font-semibold text-foreground">Analysis Results</h1>
          <div></div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image */}
          <div>
            <Card className="bg-gradient-card shadow-card border-border/50">
              <CardHeader>
                <CardTitle className="text-foreground">Scanned Item</CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  src={image}
                  alt="Analyzed plastic item"
                  className="w-full rounded-lg shadow-lg"
                />
              </CardContent>
            </Card>
          </div>

          {/* Analysis Results */}
          <div className="space-y-6">
            {/* Main Results */}
            <Card className="bg-gradient-card shadow-card border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-foreground text-2xl">It's {result.plasticType}! 🎉</CardTitle>
                  <Badge className={`${getQualityColor(result.quality)} border`}>
                    {result.quality} Quality
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Type</h4>
                  <p className="text-muted-foreground">{result.plasticType}</p>
                  <Badge variant="outline" className="mt-2">
                    Code #{result.recyclingCode}
                  </Badge>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">Why It's Valuable</h4>
                  <p className="text-muted-foreground text-sm">{result.description}</p>
                  <p className="text-success text-sm font-medium mt-2">
                    This is one of the most in-demand plastics! 🌟
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">Properties</h4>
                  <div className="flex flex-wrap gap-2">
                    {result.properties.map((property, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        {property}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Market Information */}
            <Card className="bg-gradient-card shadow-card border-border/50">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-success" />
                  Market Value
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-success/10 p-4 rounded-lg border border-success/20">
                  <div className="text-center">
                    <span className="text-muted-foreground text-sm block mb-1">Current Market Rate</span>
                    <span className="text-3xl font-bold text-success animate-pulse">
                      ₹{(result.estimatedValue * 0.9).toFixed(2)} - ₹{(result.estimatedValue * 1.1).toFixed(2)}
                    </span>
                    <p className="text-success text-sm mt-2">
                      Based on your photo: Worth ₹{result.estimatedValue.toFixed(2)}! 💵
                    </p>
                  </div>
                </div>

                {/* Price Adjustment */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Adjust Your Selling Price</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">Price per gram (₹)</label>
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <span className="text-lg font-semibold text-foreground">₹0.18</span>
                        <p className="text-xs text-muted-foreground mt-1">15-20 paise range</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">Estimated weight</label>
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <span className="text-lg font-semibold text-foreground">250g</span>
                        <p className="text-xs text-muted-foreground mt-1">From image analysis</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Market Demand</span>
                  <Badge className={`${getDemandColor(result.marketDemand)} border`}>
                    {result.marketDemand}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Nearby Vendors</span>
                  <span className="flex items-center gap-1 text-foreground font-medium">
                    <Users className="h-4 w-4" />
                    {result.nearbyVendors}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Green Impact */}
            <Card className="bg-gradient-success/10 shadow-card border-success/20">
              <CardContent className="p-4 text-center">
                <h4 className="font-semibold text-success mb-2">🌱 Your Green Impact</h4>
                <p className="text-muted-foreground text-sm">
                  You've saved enough energy to power a lightbulb for 2 days!
                </p>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={onFindVendors}
                variant="eco"
                size="lg"
                className="w-full animate-pulse"
              >
                <Users className="h-5 w-5" />
                See Who Wants to Buy This! 🎯
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full"
              >
                <Recycle className="h-5 w-5" />
                Store in My Collection
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};