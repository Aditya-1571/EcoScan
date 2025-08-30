import { useState } from "react";
import { UserTypeSelector } from "@/components/UserTypeSelector";
import { CameraInterface } from "@/components/CameraInterface";
import { PlasticAnalysisResult } from "@/components/PlasticAnalysisResult";
import { VendorMarketplace } from "@/components/VendorMarketplace";
import { Dashboard } from "@/components/Dashboard";
import { PlasticStorage } from "@/components/PlasticStorage";

type AppState = 'userSelection' | 'dashboard' | 'camera' | 'analysis' | 'marketplace' | 'storage';

export default function Index() {
  const [appState, setAppState] = useState<AppState>('userSelection');
  const [capturedImage, setCapturedImage] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleUserTypeSelect = (userType: string) => {
    console.log('Selected user type:', userType);
    setAppState('dashboard');
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

  switch (appState) {
    case 'userSelection':
      return <UserTypeSelector onSelect={handleUserTypeSelect} />;
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