import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div>
      <h1>This is apps/web</h1>
      <Button>Button from UI package</Button>
      <Card title="Title">Button from UI package</Card>
    </div>
  );
}
