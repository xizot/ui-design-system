type ComponentGuide = {
  slug: string;
  name: string;
  importPath: string;
  group: "ui" | "rhf";
};

const componentGuides: ComponentGuide[] = [
  {
    slug: "button",
    name: "Button",
    importPath: "@/design-system/components/ui/button",
    group: "ui",
  },
];

function getAllComponentGuides() {
  return componentGuides;
}

function getComponentGuide(slug: string) {
  return componentGuides.find((guide) => guide.slug === slug) ?? null;
}

export type { ComponentGuide };
export { getAllComponentGuides, getComponentGuide };
