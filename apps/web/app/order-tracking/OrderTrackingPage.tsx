import FryLevelTracker from './FryLevelTracker/FryLevelTracker';

export default function OrderTrackingPage() {
  // Setup local state to easily toggle between steps 0, 1, 2, and 3
  return (
    <FryLevelTracker currentStep={1}/>
  );
}