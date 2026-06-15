// app/order-tracking/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import styles from './OrderTrackingPage.module.css';
import { OrderCheckCard } from './OrderCheckCard/OrderCheckCard';
import FryLevelTracker from './FryLevelTracker/FryLevelTracker';
import { OrderDeliveryCard } from './OrderDeliveryCard/OrderDeliveryCard';
import { TitleSection } from './TitleSection/TitleSection';
import ConfettyConeIcon from '../common/svgs/ConfettyConeIcon';

interface OrderTrackingPayload {
  currentStep: number;
  trackingTitle: string;
  invoice: {
    items: Array<{ id: string; itemName: string; itemCountAmount: number; itemTotalCost: number }>;
    orderTotalCost: number;
  };
  delivery: {
    addressLabel: string;      // e.g., "Home", "Work"
    streetAddress: string;     // e.g., "123 Fry Street, Gourmet Valley"
    apartmentDetails: string;  // e.g., "Apartment 4B"
  };
}

// 1. PLACEHOLDER MOCK DATA (Matches your inventory pile-up contract blueprint)
const PLACEHOLDER_TRACKING_DATA: OrderTrackingPayload = {
  currentStep: 2, // e.g., Stage 2: Cooking/Preparing
  trackingTitle: "Tu pedido está siendo preparado",
  invoice: {
    items: [
      { id: 'mock-1', itemName: 'Gourmet Fries XL', itemCountAmount: 2, itemTotalCost: 12.50 },
      { id: 'mock-2', itemName: 'Artisanal Lime Beverage', itemCountAmount: 1, itemTotalCost: 3.75 },
      { id: 'mock-3', itemName: 'Extra Garlic Dipping Sauce', itemCountAmount: 3, itemTotalCost: 1.50 }
    ],
    orderTotalCost: 17.75
  },
  delivery: {
    addressLabel: "Casa",
    streetAddress: "123 Fry Street, Gourmet Valley",
    apartmentDetails: "Apartamento 4B"
  }
};

export default function OrderTrackingPage() {
  const [trackingData, setTrackingData] = useState<OrderTrackingPayload | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    fetch('/api/orders/tracking-dashboard')
      .then((res) => {
        if (!res.ok) throw new Error('Could not sync tracker metrics');
        return res.json();
      })
      .then((data: OrderTrackingPayload) => {
        setTrackingData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn('⚠️ API offline. Booting placeholder data configuration:', err.message);
        
        // 2. SAFE FALLBACK: Inject mock placeholder data instead of crashing out an error panel
        setTrackingData(PLACEHOLDER_TRACKING_DATA);
        setLoading(false);
      });
  }, []);

  // 1. Unified Page-Level Loading Screen (Using your layout placeholders)
  if (loading) {
    return (
      <main className={styles.pageViewport}>
        <div className={styles.dashboardGrid}>
          <div className={styles.trackerPlaceholder} />
          <div className={styles.cardPlaceholder} />
        </div>
      </main>
    );
  }

  // 2. FIX: Changed condition from "loading" to "error" so the application handles crashes properly
  if (error || !trackingData) {
    return (
      <main className={styles.centeredFeedbackScreen}>
        <div className={styles.errorCardFrame}>
          <p className={styles.errorMessage}>
            No se pudo cargar la información de seguimiento del pedido actual.
          </p>
        </div>
      </main>
    );
  }

  // 3. Main Production Dashboard View
  return (
    <main className={styles.pageViewport}>
      <div className={styles.dashboardGrid}>
        <TitleSection 
          title={trackingData!.trackingTitle}
          subtitle="Tu orden está en camino a tu mesa"
          IconComponent={ConfettyConeIcon} // Pass your pre-existing icon here
        />
        {/* FIX: FryLevelTracker is now explicitly placed on TOP of the layout tree stack */}
        <FryLevelTracker
          title={trackingData.trackingTitle} // Added title back to your tracker
          currentStep={trackingData.currentStep} 
        />

        <div className={styles.cardsRowLayout}>
          <OrderCheckCard 
            items={trackingData.invoice.items} 
            orderTotalCost={trackingData.invoice.orderTotalCost}
          />
          <OrderDeliveryCard 
            addressLabel={trackingData!.delivery.addressLabel}
            streetAddress={trackingData!.delivery.streetAddress}
            apartmentDetails={trackingData!.delivery.apartmentDetails}
          />
        </div>
      </div>
    </main>
  );
}