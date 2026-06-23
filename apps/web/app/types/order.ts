export interface OrderPayloadContract {
  id: string;
  userId: string;
  user: {
    id: string;
    username: string;
    email: string;
    phoneNumber?: string;
  };
  driverId: string | null;
  driver: {
    id: string;
    name: string;
  } | null;
  restaurantId: string;
  restaurant: {
    id: string;
    name: string;
    branchLocation: string;
  };
  status: 'PENDING' | 'PREPARING' | 'IN_TRANSIT' | 'DELIVERED';
  shippingAddress: string;
  notes: string;
  totalPrice: number;
  items: Array<{
    id: string;
    itemName: string;
    itemCountAmount: number;
    itemTotalCost: number;
  }>;
  proofOfDelivery: string | null;
  createdAt: string;
  updatedAt: string;
}