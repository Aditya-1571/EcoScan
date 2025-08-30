import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Package, Trash2, ShoppingCart, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface StoredItem {
  id: string;
  plasticType: string;
  quality: string;
  weight: number;
  pricePerGram: number;
  totalValue: number;
  dateScanned: string;
  image: string;
}

interface PlasticStorageProps {
  onBack: () => void;
  onSellItems: (items: StoredItem[]) => void;
}

export const PlasticStorage = ({ onBack, onSellItems }: PlasticStorageProps) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock stored items
  const storedItems: StoredItem[] = [
    {
      id: "1",
      plasticType: "PET (Polyethylene Terephthalate)",
      quality: "High",
      weight: 250,
      pricePerGram: 0.18,
      totalValue: 45,
      dateScanned: "2024-01-15",
      image: "/placeholder.svg"
    },
    {
      id: "2",
      plasticType: "HDPE (High-Density Polyethylene)",
      quality: "Medium",
      weight: 180,
      pricePerGram: 0.15,
      totalValue: 27,
      dateScanned: "2024-01-14",
      image: "/placeholder.svg"
    },
    {
      id: "3",
      plasticType: "PP (Polypropylene)",
      quality: "High",
      weight: 320,
      pricePerGram: 0.20,
      totalValue: 64,
      dateScanned: "2024-01-13",
      image: "/placeholder.svg"
    }
  ];

  const filteredItems = storedItems.filter(item =>
    item.plasticType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const selectAllItems = () => {
    setSelectedItems(filteredItems.map(item => item.id));
  };

  const clearSelection = () => {
    setSelectedItems([]);
  };

  const getSelectedItemsValue = () => {
    return filteredItems
      .filter(item => selectedItems.includes(item.id))
      .reduce((total, item) => total + item.totalValue, 0);
  };

  const getSelectedItemsWeight = () => {
    return filteredItems
      .filter(item => selectedItems.includes(item.id))
      .reduce((total, item) => total + item.weight, 0);
  };

  const getQualityColor = (quality: string) => {
    switch (quality.toLowerCase()) {
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
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Package className="h-5 w-5" />
            Your Plastic Storage
          </h1>
          <div></div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Storage Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-card shadow-card border-border/50">
            <CardHeader>
              <CardTitle className="text-primary">Total Items</CardTitle>
              <CardDescription>Items in your storage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{storedItems.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card border-border/50">
            <CardHeader>
              <CardTitle className="text-success">Total Weight</CardTitle>
              <CardDescription>Combined weight of all items</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {storedItems.reduce((total, item) => total + item.weight, 0)}g
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card border-border/50">
            <CardHeader>
              <CardTitle className="text-warning">Total Value</CardTitle>
              <CardDescription>Estimated earnings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                ₹{storedItems.reduce((total, item) => total + item.totalValue, 0)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search plastic types..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={selectAllItems}>
              Select All
            </Button>
            <Button variant="outline" onClick={clearSelection}>
              Clear Selection
            </Button>
          </div>
        </div>

        {/* Selection Summary */}
        {selectedItems.length > 0 && (
          <Card className="bg-primary/10 border-primary/20 mb-6">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-primary font-medium">
                    {selectedItems.length} items selected
                  </span>
                  <span className="text-muted-foreground">
                    Weight: {getSelectedItemsWeight()}g
                  </span>
                  <span className="text-success font-semibold">
                    Value: ₹{getSelectedItemsValue()}
                  </span>
                </div>
                <Button 
                  variant="eco" 
                  onClick={() => onSellItems(filteredItems.filter(item => selectedItems.includes(item.id)))}
                  className="animate-pulse"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Sell Selected Items
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card 
              key={item.id} 
              className={`bg-gradient-card shadow-card border-border/50 cursor-pointer transition-all hover:shadow-eco ${
                selectedItems.includes(item.id) ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => toggleItemSelection(item.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-sm font-medium text-foreground line-clamp-2">
                      {item.plasticType}
                    </CardTitle>
                    <Badge className={`${getQualityColor(item.quality)} border mt-2`}>
                      {item.quality} Quality
                    </Badge>
                  </div>
                  <div className={`w-4 h-4 rounded border-2 flex-shrink-0 ${
                    selectedItems.includes(item.id) 
                      ? 'bg-primary border-primary' 
                      : 'border-muted-foreground'
                  }`}>
                    {selectedItems.includes(item.id) && (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-primary-foreground rounded-full"></div>
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Weight:</span>
                    <div className="font-medium text-foreground">{item.weight}g</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Rate:</span>
                    <div className="font-medium text-foreground">₹{item.pricePerGram}/g</div>
                  </div>
                </div>
                
                <div className="bg-success/10 p-3 rounded-lg border border-success/20">
                  <div className="text-center">
                    <span className="text-muted-foreground text-xs block">Estimated Value</span>
                    <span className="text-xl font-bold text-success">
                      ₹{item.totalValue}
                    </span>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground">
                  Scanned on {new Date(item.dateScanned).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <Card className="bg-gradient-card shadow-card border-border/50 text-center py-12">
            <CardContent>
              <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No Items Found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ? "No items match your search criteria." : "Your storage is empty. Start scanning to add items!"}
              </p>
              {!searchTerm && (
                <Button variant="eco" onClick={onBack}>
                  Start Scanning
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* Bottom Action */}
        {storedItems.length > 0 && selectedItems.length === 0 && (
          <div className="mt-8 text-center">
            <Button 
              variant="eco" 
              size="lg" 
              onClick={selectAllItems}
              className="animate-pulse"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Sell All Items (₹{storedItems.reduce((total, item) => total + item.totalValue, 0)})
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};