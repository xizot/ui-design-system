import { EMPTY_STRING } from '@/constants/common';

type ApiProp = {
  name: string;
  type: string;
  defaultValue: string;
};

type CardApiReferenceItem = {
  id: string;
  name: string;
  description: string;
  props: ApiProp[];
};

const classNameProp: ApiProp = {
  name: 'className',
  type: 'string',
  defaultValue: EMPTY_STRING,
};

const cardApiReferences: CardApiReferenceItem[] = [
  {
    id: 'api-card',
    name: 'Card',
    description: 'is the root container for card content.',
    props: [{ name: 'size', type: "'default' | 'sm'", defaultValue: "'default'" }, classNameProp],
  },
  {
    id: 'api-card-header',
    name: 'CardHeader',
    description: 'groups the title, description, and optional action.',
    props: [classNameProp],
  },
  {
    id: 'api-card-title',
    name: 'CardTitle',
    description: "displays the card's primary title.",
    props: [classNameProp],
  },
  {
    id: 'api-card-description',
    name: 'CardDescription',
    description: 'provides supporting text for the card title.',
    props: [classNameProp],
  },
  {
    id: 'api-card-action',
    name: 'CardAction',
    description: 'places supplementary content in the top-right of the header.',
    props: [classNameProp],
  },
  {
    id: 'api-card-content',
    name: 'CardContent',
    description: 'contains the primary content of the card.',
    props: [classNameProp],
  },
  {
    id: 'api-card-footer',
    name: 'CardFooter',
    description: 'contains actions or supporting content at the bottom of the card.',
    props: [classNameProp],
  },
];

const cardApiReferenceLinks = cardApiReferences.map(({ id, name }) => ({ id, label: name }));

type ApiPropsTableProps = {
  props: ApiProp[];
};

function ApiPropsTable({ props }: ApiPropsTableProps) {
  return (
    <div className="border-border/70 overflow-x-auto rounded-xl border">
      <table className="w-full min-w-120 text-left text-sm">
        <thead className="bg-muted/40 text-muted-foreground">
          <tr>
            <th className="px-4 py-3 font-medium">Prop</th>
            <th className="px-4 py-3 font-medium">Type</th>
            <th className="px-4 py-3 font-medium">Default</th>
          </tr>
        </thead>
        <tbody className="divide-border/70 divide-y">
          {props.map((prop) => (
            <tr key={prop.name}>
              <td className="px-4 py-3">
                <code className="bg-muted rounded px-1.5 py-0.5 font-mono text-xs">
                  {prop.name}
                </code>
              </td>
              <td className="px-4 py-3">
                <code className="bg-muted rounded px-1.5 py-0.5 font-mono text-xs">
                  {prop.type}
                </code>
              </td>
              <td className="px-4 py-3">
                {prop.defaultValue === EMPTY_STRING ? (
                  <span className="text-muted-foreground">{EMPTY_STRING}</span>
                ) : (
                  <code className="bg-muted rounded px-1.5 py-0.5 font-mono text-xs">
                    {prop.defaultValue}
                  </code>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CardApiReferenceContent() {
  return (
    <>
      {cardApiReferences.map((component) => (
        <section key={component.id} id={component.id} className="scroll-mt-20 space-y-4">
          <div className="space-y-2">
            <h3 className="text-base font-semibold">{component.name}</h3>
            <p className="text-muted-foreground leading-6">
              The{' '}
              <code className="bg-muted text-foreground rounded px-1.5 py-0.5 font-mono text-xs">
                {component.name}
              </code>{' '}
              component {component.description}
            </p>
          </div>
          <ApiPropsTable props={component.props} />
        </section>
      ))}
    </>
  );
}

export { CardApiReferenceContent, cardApiReferenceLinks };
