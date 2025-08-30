import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Star, Phone, MessageCircle, DollarSign } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface VendorMarketplaceProps {
  onBack: () => void;
  plasticInfo: {
    plasticType: string;
    quality: string;
    estimatedValue: number;
  } | null;
}

// Mock vendor data
const mockVendors = [
  {
    id: 1,
    name: "GreenRecycle Co.",
    rating: 4.8,
    distance: "0.8 mi",
    offer: 52,
    verified: true,
    specialties: ["PET", "HDPE", "PP"],
    phone: "+1 (555) 123-4567",
    description: "Leading plastic recycler with 15+ years experience"
  },
  {
    id: 2,
    name: "EcoVendor Plus",
    rating: 4.6,
    distance: "1.2 mi",
    offer: 48,
    verified: true,
    specialties: ["PET", "PS", "LDPE"],
    phone: "+1 (555) 987-6543",
    description: "Fast pickup service and competitive rates"
  },
  {
    id: 3,
    name: "Sustainable Materials Inc.",
    rating: 4.9,
    distance: "2.1 mi",
    offer: 55,
    verified: true,
    specialties: ["All Types"],
    phone: "+1 (555) 456-7890",
    description: "Premium prices for high-quality recyclables"
  },
  {
    id: 4,
    name: "Local Recycling Hub",
    rating: 4.3,
    distance: "2.8 mi",
    offer: 45,
    verified: false,
    specialties: ["PET", "HDPE"],
    phone: "+1 (555) 234-5678",
    description: "Community-focused recycling center"
  }
];

export const VendorMarketplace = ({ onBack, plasticInfo }: VendorMarketplaceProps) => {
  const [selectedVendor, setSelectedVendor] = useState<number | null>(null);
  const { toast } = useToast();

  const handleContactVendor = (vendor: typeof mockVendors[0]) => {
    toast({
      title: "Contact Request Sent!",
      description: `${vendor.name} will contact you within 24 hours.`,
    });
  };

  const sortedVendors = [...mockVendors].sort((a, b) => b.offer - a.offer);

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="px-6 py-4 border-b border-border/50 bg-card/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Results
          </Button>
          <h1 className="text-xl font-semibold text-foreground">Top Offers for Your Plastic! 💰</h1>
          <div></div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Summary Card */}
        {plasticInfo && (
          <Card className="bg-gradient-success/10 shadow-card border-success/20 mb-8">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-success" />
                Your Item Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <span className="text-muted-foreground text-sm">Plastic Type</span>
                  <p className="font-medium text-foreground">{plasticInfo.plasticType}</p>
                </div>
                <div>
                  <span className="text-muted-foreground text-sm">Quality</span>
                  <p className="font-medium text-foreground">{plasticInfo.quality}</p>
                </div>
                <div>
                  <span className="text-muted-foreground text-sm">Estimated Value</span>
                  <p className="font-bold text-success text-lg">₹{plasticInfo.estimatedValue.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Vendors List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">
              These buyers want your plastic! ({sortedVendors.length} offers)
            </h2>
            <div className="text-sm text-success font-medium">
              🔥 Sorted by best price - Top offers first!
            </div>
          </div>

          <div className="grid gap-6">
            {sortedVendors.map((vendor) => (
              <Card
                key={vendor.id}
                className={`bg-gradient-card shadow-card border-border/50 hover:shadow-eco transition-smooth cursor-pointer ${
                  selectedVendor === vendor.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedVendor(vendor.id)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-foreground">{vendor.name}</CardTitle>
                        {vendor.verified && (
                          <Badge className="bg-success/10 text-success border-success/20">
                            Verified
                          </Badge>
                        )}
                      </div>
                      <CardDescription>{vendor.description}</CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="bg-success/10 p-3 rounded-lg border border-success/20">
                        <div className="text-2xl font-bold text-success mb-1">
                          ₹{vendor.offer}
                        </div>
                        <div className="text-xs text-success font-medium">Their Offer</div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{vendor.distance} away</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Star className="h-4 w-4 fill-warning text-warning" />
                        <span>{vendor.rating} rating</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <span>{vendor.phone}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-muted-foreground">Specialties:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {vendor.specialties.map((specialty, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleContactVendor(vendor);
                          }}
                          variant="eco"
                          size="sm"
                          className="flex-1"
                        >
                          <MessageCircle className="h-4 w-4" />
                          Contact
                        </Button>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            toast({
                              title: "Call initiated",
                              description: `Calling ${vendor.name}...`,
                            });
                          }}
                          variant="outline"
                          size="sm"
                        >
                          <Phone className="h-4 w-4" />
                          Call
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Action Section */}
        <Card className="bg-gradient-eco/10 shadow-card border-border/50 mt-12">
          <CardHeader>
            <CardTitle className="text-foreground text-center">Want to get the absolute best price? 🎯</CardTitle>
            <CardDescription className="text-center">
              Start a bidding war and let vendors compete for your plastic!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="eco" size="lg" className="flex-1 animate-pulse">
                🔥 Contact All Vendors & Start Bidding War!
              </Button>
              <Button variant="outline" size="lg" className="flex-1">
                💾 Save for Later
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};