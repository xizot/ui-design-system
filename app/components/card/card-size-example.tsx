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
import { useState } from 'react';

const cardSizes = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const;

function CardSizeExample() {
  const [size, setSize] = useState<(typeof cardSizes)[number]>('md');

  return (
    <div className="mx-auto grid w-full max-w-sm gap-4">
      <ToggleGroup
        aria-label="Card size"
        value={[size]}
        onValueChange={(value) => {
          const nextSize = cardSizes.find((option) => option === value[0]);
          if (nextSize) setSize(nextSize);
        }}
        variant="outline"
        size="sm"
        className="flex-wrap justify-self-start"
      >
        {cardSizes.map((option) => (
          <ToggleGroupItem key={option} value={option}>
            {option}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <Card size={size} className="w-87.5 justify-self-start">
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

const cardSizeCode = `"use client";

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

const cardSizes = ["xxs", "xs", "sm", "md", "lg", "xl", "xxl"] as const;

export function CardSizes() {
  const [size, setSize] = React.useState<(typeof cardSizes)[number]>("md");

  return (
    <div className="grid gap-4">
      <ToggleGroup
        aria-label="Card size"
        value={[size]}
        onValueChange={(value) => {
          const nextSize = cardSizes.find((option) => option === value[0]);
          if (nextSize) setSize(nextSize);
        }}
        variant="outline"
        size="sm"
        className="flex-wrap justify-self-start"
      >
        {cardSizes.map((option) => (
          <ToggleGroupItem key={option} value={option}>
            {option}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <Card size={size}>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description goes here.</CardDescription>
        </CardHeader>
        <CardContent>Card content goes here.</CardContent>
        <CardFooter><Button>Confirm</Button></CardFooter>
      </Card>
    </div>
  );
}`;

export { CardSizeExample, cardSizeCode };
