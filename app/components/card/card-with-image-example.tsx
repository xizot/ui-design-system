import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';

type CardWithImageExampleProps = {
  imageSrc?: string;
};

function CardWithImageExample({ imageSrc }: CardWithImageExampleProps) {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="bg-muted relative aspect-video w-full overflow-hidden">
        {imageSrc ? (
          <>
            <div className="pointer-events-none absolute inset-0 z-10 bg-black/35" />
            <Image
              src={imageSrc}
              alt="Workspace navigation update cover"
              fill
              sizes="(max-width: 640px) 100vw, 384px"
              className="object-cover brightness-60 grayscale dark:brightness-40"
            />
          </>
        ) : (
          <div aria-hidden="true" className="bg-muted size-full" />
        )}
      </div>
      <CardHeader>
        <CardAction>
          <Badge variant="secondary">Update</Badge>
        </CardAction>
        <CardTitle>Workspace navigation refresh</CardTitle>
        <CardDescription>
          A closer look at the structure, usability findings, and decisions behind the latest
          navigation update.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full">View Details</Button>
      </CardFooter>
    </Card>
  );
}

const cardWithImageCode = `import { Badge } from "@/design-system/components/ui/badge";
import { Button } from "@/design-system/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/design-system/components/ui/card";
import Image from "next/image";

type CardImageProps = {
  imageSrc?: string;
};

export function CardImage({ imageSrc }: CardImageProps) {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="bg-muted relative aspect-video w-full overflow-hidden">
        {imageSrc ? (
          <>
            <div className="pointer-events-none absolute inset-0 z-10 bg-black/35" />
            <Image
              src={imageSrc}
              alt="Workspace navigation update cover"
              fill
              sizes="(max-width: 640px) 100vw, 384px"
              className="object-cover brightness-60 grayscale dark:brightness-40"
            />
          </>
        ) : (
          <div aria-hidden="true" className="bg-muted size-full" />
        )}
      </div>
      <CardHeader>
        <CardAction>
          <Badge variant="secondary">Update</Badge>
        </CardAction>
        <CardTitle>Workspace navigation refresh</CardTitle>
        <CardDescription>
          A closer look at the structure, usability findings, and decisions
          behind the latest navigation update.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full">View Details</Button>
      </CardFooter>
    </Card>
  );
}`;

export { cardWithImageCode, CardWithImageExample };
