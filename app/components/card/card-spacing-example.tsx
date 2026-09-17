'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from 'cn';
import { useState } from 'react';

const spacingOptions = [
  { className: '[--card-spacing:--spacing(4)]', label: '16px', value: '4' },
  { className: '[--card-spacing:--spacing(5)]', label: '20px', value: '5' },
  { className: '[--card-spacing:--spacing(6)]', label: '24px', value: '6' },
  { className: '[--card-spacing:--spacing(8)]', label: '32px', value: '8' },
];

function CardSpacingExample() {
  const [spacing, setSpacing] = useState('4');
  const selectedSpacing = spacingOptions.find((option) => option.value === spacing);

  return (
    <div className="mx-auto grid w-full max-w-sm gap-4">
      <ToggleGroup
        aria-label="Card spacing"
        value={[spacing]}
        onValueChange={(value) => {
          if (value[0]) {
            setSpacing(value[0]);
          }
        }}
        variant="outline"
        size="sm"
        className="justify-self-start"
      >
        {spacingOptions.map((option) => (
          <ToggleGroupItem key={option.value} value={option.value}>
            {option.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <Card className={cn('w-87.5 justify-self-start', selectedSpacing?.className)}>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description goes here.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card content goes here.</p>
        </CardContent>
        <CardFooter>
          <Button>Confirm</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

const cardSpacingCode = `"use client";

import * as React from "react";

import { Button } from "@/design-system/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/design-system/components/ui/card";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/design-system/components/ui/toggle-group";

const spacingOptions = [
  { className: "[--card-spacing:--spacing(4)]", label: "16px", value: "4" },
  { className: "[--card-spacing:--spacing(5)]", label: "20px", value: "5" },
  { className: "[--card-spacing:--spacing(6)]", label: "24px", value: "6" },
  { className: "[--card-spacing:--spacing(8)]", label: "32px", value: "8" },
];

export function CardSpacing() {
  const [spacing, setSpacing] = React.useState("4");
  const selectedSpacing = spacingOptions.find(
    (option) => option.value === spacing
  );

  return (
    <div className="mx-auto grid w-full max-w-sm gap-4">
      <ToggleGroup
        aria-label="Card spacing"
        value={[spacing]}
        onValueChange={(value) => {
          if (value[0]) {
            setSpacing(value[0]);
          }
        }}
        variant="outline"
        size="sm"
        className="justify-self-start"
      >
        {spacingOptions.map((option) => (
          <ToggleGroupItem key={option.value} value={option.value}>
            {option.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <Card
        className={["w-87.5 justify-self-start", selectedSpacing?.className]
          .filter(Boolean)
          .join(" ")}
      >
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description goes here.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card content goes here.</p>
        </CardContent>
        <CardFooter>
          <Button>Confirm</Button>
        </CardFooter>
      </Card>
    </div>
  );
}`;

export { CardSpacingExample, cardSpacingCode };
