import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, Leaf, Recycle, AlertTriangle, TreePine, Droplets, Heart, Package, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
interface DashboardProps {
  onStartScanning: () => void;
  onViewStorage: () => void;
}
export const Dashboard = ({
  onStartScanning,
  onViewStorage
}: DashboardProps) => {
  const [currentTip, setCurrentTip] = useState(0);
  const { signOut } = useAuth();
  const pollutionFacts = ["Every minute, 1 million plastic bottles are purchased worldwide", "Only 9% of all plastic ever made has been recycled", "Plastic takes 400-1000 years to decompose in landfills", "8 million tons of plastic waste enters oceans annually", "Microplastics are found in 90% of table salt brands"];
  const ecoTips = ["Use reusable bags when shopping", "Choose products with minimal packaging", "Recycle properly according to local guidelines", "Support businesses that use eco-friendly packaging", "Reduce single-use plastics in daily life"];
  return <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="px-6 py-4 border-b border-border/50 bg-card/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-eco rounded-lg">
              <Leaf className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">EcoScan Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="eco" onClick={onViewStorage} className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Your Storage
            </Button>
            <Button variant="camera" onClick={onStartScanning} className="flex items-center gap-2">
              <Camera className="h-4 w-4" />
              Start Scanning
            </Button>
            <Button variant="outline" onClick={signOut} className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section - Pollution Awareness */}
        <div className="mb-12">
          <Card className="bg-gradient-card shadow-card border-border/50 overflow-hidden">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Content */}
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="h-6 w-6 text-warning" />
                    <span className="text-warning font-semibold">Environmental Crisis</span>
                  </div>
                  <h2 className="text-3xl font-bold text-foreground mb-4">
                    The Plastic Pollution Emergency
                  </h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Our planet is drowning in plastic waste. Every piece of plastic you recycle 
                    through EcoScan makes a real difference in fighting this crisis. Together, 
                    we can turn waste into value and protect our environment.
                  </p>
                  <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-6">
                    <p className="text-destructive text-sm font-medium animate-pulse">
                      📊 {pollutionFacts[currentTip]}
                    </p>
                  </div>
                  <Button variant="outline" onClick={() => setCurrentTip(prev => (prev + 1) % pollutionFacts.length)} className="w-fit">
                    Next Fact
                  </Button>
                </div>

                {/* Image */}
                <div className="relative h-80 lg:h-full bg-gradient-to-br from-destructive/20 to-warning/20 flex items-center justify-center">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="relative z-10 text-center text-foreground">
                    <Droplets className="h-24 w-24 mx-auto mb-4 text-primary" />
                    <p className="text-xl font-semibold">Plastic in Our Oceans</p>
                    <p className="text-sm opacity-80">Help us clean the planet, one scan at a time</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Impact Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-gradient-card shadow-card border-border/50 text-center">
            <CardHeader>
              <div className="mx-auto bg-success/20 p-3 rounded-full w-fit">
                <Recycle className="h-8 w-8 text-success" />
              </div>
              <CardTitle className="text-2xl text-success">2,847 kg</CardTitle>
              <CardDescription>Plastic Recycled This Month</CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-gradient-card shadow-card border-border/50 text-center">
            <CardHeader>
              <div className="mx-auto bg-primary/20 p-3 rounded-full w-fit">
                <TreePine className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl text-primary">156</CardTitle>
              <CardDescription>Trees Equivalent Saved</CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-gradient-card shadow-card border-border/50 text-center">
            <CardHeader>
              <div className="mx-auto bg-warning/20 p-3 rounded-full w-fit">
                <Heart className="h-8 w-8 text-warning" />
              </div>
              <CardTitle className="text-2xl text-warning">₹1,24,580</CardTitle>
              <CardDescription>Total Earned by Community</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Eco Tips Section */}
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="bg-gradient-card shadow-card border-border/50">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Leaf className="h-5 w-5 text-success" />
                Daily Eco Tips
              </CardTitle>
              <CardDescription>Simple actions for a greener tomorrow</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {ecoTips.map((tip, index) => <div key={index} className="flex items-center gap-3 p-3 bg-success/10 rounded-lg border border-success/20">
                    <div className="bg-success p-1 rounded-full">
                      <Leaf className="h-3 w-3 text-success-foreground" />
                    </div>
                    <p className="text-sm text-foreground">{tip}</p>
                  </div>)}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card border-border/50">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                Plastic Impact
              </CardTitle>
              <CardDescription>Understanding the environmental cost</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                  <h4 className="font-semibold text-destructive mb-2">Ocean Pollution</h4>
                  <p className="text-sm text-muted-foreground">
                    Plastic debris harms marine life, with over 1 million seabirds and 
                    100,000 marine mammals dying annually from plastic pollution.
                  </p>
                </div>
                
                <div className="p-4 bg-warning/10 rounded-lg border border-warning/20">
                  <h4 className="font-semibold text-warning mb-2">Landfill Crisis</h4>
                  <p className="text-sm text-muted-foreground">
                    Landfills are overflowing with plastic waste that releases harmful 
                    chemicals into soil and groundwater systems.
                  </p>
                </div>

                <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                  <h4 className="font-semibold text-success mb-2">Your Solution</h4>
                  <p className="text-sm text-muted-foreground">
                    Every plastic item you recycle through EcoScan prevents it from 
                    harming the environment while earning you money!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-eco shadow-eco border-primary/20 inline-block">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-primary-foreground mb-4">
                Ready to Make a Difference?
              </h3>
              <p className="text-primary-foreground/90 mb-6 max-w-md">
                Start scanning your plastic waste today and join thousands of others 
                in the fight against plastic pollution!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" onClick={onStartScanning} className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                  <Camera className="h-5 w-5 mr-2" />
                  Scan Your First Item
                </Button>
                <Button variant="outline" size="lg" onClick={onViewStorage} className="border-primary-foreground hover:bg-primary-foreground/10 text-emerald-100">
                  <Package className="h-5 w-5 mr-2" />
                  View Your Storage
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>;
};