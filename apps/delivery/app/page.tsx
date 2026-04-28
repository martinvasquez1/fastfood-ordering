import { Button } from "@repo/ui/button";

import { Heart } from 'lucide-react';

export default function Home() {
  return (
    <div>
      <h1>This is apps/delivery</h1>

      <Button>Button from UI package</Button>
      <Button disabled>Button from UI package</Button>

      <Button variant="secondary">Button from UI package</Button>
      <Button variant="destructive">Button from UI package</Button>

      <Button variant="icon"><Heart size={24} color="red" /></Button>
    </div>
  );
}
