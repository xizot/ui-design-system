import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

function DefaultCardExample() {
  return (
    <Card className="w-87.5">
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
  );
}

const defaultCardCode = `import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/design-system/components/ui/card";
import { Button } from "@/design-system/components/ui/button";

export function Example() {
  return (
    <Card className="w-87.5">
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
  );
}`;

export { defaultCardCode, DefaultCardExample };
