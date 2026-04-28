import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";

import { Heart } from 'lucide-react';

export default function Home() {
  return (
    <div>
      <h1>This is apps/web</h1>

      <Button>Button from UI package</Button>
      <Button disabled>Button from UI package</Button>

      <Button variant="secondary">Button from UI package</Button>
      <Button variant="destructive">Button from UI package</Button>

      <Button variant="icon"><Heart size={24} color="red" /></Button>

      <Card title="Title">Lorem</Card>
    </div>
  );
}
