import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Store, Recycle } from "lucide-react";

interface UserTypeSelectorProps {
  onSelect: (type: 'customer' | 'vendor') => void;
}

export const UserTypeSelector = ({ onSelect }: UserTypeSelectorProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-light/20 to-accent/30 flex items-center justify-center p-6 relative">
      {/* Get Started Button - Top Right */}
      <div className="absolute top-6 right-6 z-10">
        <Button 
          onClick={() => onSelect('customer')}
          variant="eco" 
          size="lg"
          className="font-semibold"
        >
          Get Started
        </Button>
      </div>
      
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Recycle className="h-12 w-12 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">EcoScan</h1>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Welcome to EcoScan! 
          </h2>
          <p className="text-xl text-muted-foreground mb-4 max-w-2xl mx-auto">
            The smartest way to recycle. Turn your plastic waste into cash and connect with local buyers.
          </p>
          <p className="text-lg text-primary/80 max-w-xl mx-auto">
            Ready to see what your plastic is worth? Let's unlock its hidden value! 🌱
          </p>
        </div>

        {/* User Type Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-gradient-card shadow-card border-border/50 hover:shadow-eco transition-bounce hover:scale-105 cursor-pointer group">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-smooth">
                <Camera className="h-12 w-12 text-primary" />
              </div>
              <CardTitle className="text-2xl text-foreground">I'm a Customer</CardTitle>
              <CardDescription className="text-base">
                I have plastic items to recycle and want to earn money
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  📱 Snap a photo of your plastic
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  💰 See its cash value instantly
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  🤝 Sell to the best bidder
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  🌱 Make money while saving the planet
                </li>
              </ul>
              <Button 
                onClick={() => onSelect('customer')}
                variant="eco" 
                className="w-full mt-6"
                size="lg"
              >
                Start as Customer
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card border-border/50 hover:shadow-eco transition-bounce hover:scale-105 cursor-pointer group">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto mb-4 p-4 bg-success/10 rounded-full group-hover:bg-success/20 transition-smooth">
                <Store className="h-12 w-12 text-success" />
              </div>
              <CardTitle className="text-2xl text-foreground">I'm a Vendor</CardTitle>
              <CardDescription className="text-base">
                I buy recyclable plastics from customers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  Browse available materials
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  View quality assessments
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  Set competitive prices
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  Manage your inventory
                </li>
              </ul>
              <Button 
                onClick={() => onSelect('vendor')}
                variant="success" 
                className="w-full mt-6"
                size="lg"
              >
                Start as Vendor
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            Making recycling profitable for everyone 🌱
          </p>
        </div>
      </div>
    </div>
  );
};