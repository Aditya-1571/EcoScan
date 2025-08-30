import { useState } from "react";
import { UserTypeSelector } from "@/components/UserTypeSelector";
import { CameraInterface } from "@/components/CameraInterface";
import { PlasticAnalysisResult } from "@/components/PlasticAnalysisResult";
import { VendorMarketplace } from "@/components/VendorMarketplace";
import { Dashboard } from "@/components/Dashboard";
import { PlasticStorage } from "@/components/PlasticStorage";
import Auth from "./Auth";
import { useAuth } from "@/hooks/useAuth";

type AppState = 'userSelection' | 'auth' | 'dashboard' | 'camera' | 'analysis' | 'marketplace' | 'storage';

export default function Index() {
  const [appState, setAppState] = useState<AppState>('userSelection');
  const [capturedImage, setCapturedImage] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [selectedUserType, setSelectedUserType] = useState<string>('');
  const { user, loading } = useAuth();

  const handleUserTypeSelect = (userType: string) => {
    console.log('Selected user type:', userType);
    setSelectedUserType(userType);
    if (user) {
      setAppState('dashboard');
    } else {
      setAppState('auth');
    }
  };

  const handleImageCaptured = (image: string) => {
    setCapturedImage(image);
    setAnalysisResult({
        plasticType: "PET (Polyethylene Terephthalate)",
        quality: "High",
        recyclingCode: "1",
        estimatedValue: 45.50,
        description: "PET is highly recyclable and in high demand for making new bottles and containers.",
        properties: ["Food-safe", "Lightweight", "Durable", "Crystal clear"],
        marketDemand: "High",
        nearbyVendors: 8
    });
    setAppState('analysis');
  };

  // Redirect authenticated users to dashboard
  if (user && appState === 'userSelection') {
    setAppState('dashboard');
  }

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  switch (appState) {
    case 'userSelection':
      return <UserTypeSelector onSelect={handleUserTypeSelect} />;
    case 'auth':
      return (
        <Auth 
          onBack={() => setAppState('userSelection')} 
          selectedUserType={selectedUserType}
        />
      );
    case 'dashboard':
      return (
        <Dashboard
          onStartScanning={() => setAppState('camera')}
          onViewStorage={() => setAppState('storage')}
        />
      );
    case 'camera':
      return (
        <CameraInterface
          onBack={() => setAppState('dashboard')}
          onImageCaptured={handleImageCaptured}
        />
      );
    case 'analysis':
      return (
        <PlasticAnalysisResult
          result={analysisResult}
          image={capturedImage}
          onBack={() => setAppState('camera')}
          onFindVendors={() => setAppState('marketplace')}
        />
      );
    case 'marketplace':
      return (
        <VendorMarketplace
          plasticInfo={analysisResult}
          onBack={() => setAppState('analysis')}
        />
      );
    case 'storage':
      return (
        <PlasticStorage
          onBack={() => setAppState('dashboard')}
          onSellItems={() => setAppState('marketplace')}
        />
      );
    default:
      return <UserTypeSelector onSelect={handleUserTypeSelect} />;
  }
}