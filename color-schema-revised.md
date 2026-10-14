# Config Colors — Tailwind CSS v4 + shadcn/ui

A collection of **25 light palettes + 25 dark palettes**, revised for stronger text contrast, clearer surface hierarchy, and accessible button labels. Use matching palette numbers to pair the light and dark modes.

# Light Mode Color Schemes

These 25 light palettes are designed for **Tailwind CSS v4 + shadcn/ui** and use the same token names as the dark palettes below. Pick one `:root` block and one `.dark` block to create a paired theme.

## How to use

1. Keep your existing `@theme inline` mapping.
2. Replace the current `:root` block with one light palette from this section.
3. Replace the current `.dark` block with the matching dark palette in the next section (same palette number).
4. Toggle the `.dark` class on `<html>` or your theme root.

Use one light block and one dark block at a time. All values are HEX colors. Verify contrast in your actual UI, especially muted text, focus rings, charts, and semantic statuses.

## Light palette index

| # | Scheme | Character |
|---:|---|---|
| 01 | GitHub Light | Familiar developer-tool neutral |
| 02 | GitHub Soft Light (custom) | Cool gray adaptation; not an official Primer theme |
| 03 | GitHub High Contrast Light | Stronger borders and text |
| 04 | Zinc + Coral | Neutral with coral primary |
| 05 | Zinc + Red | Classic red primary |
| 06 | Slate + Emerald | Operations / logistics |
| 07 | Neutral + Violet | SaaS / AI |
| 08 | Midnight Blue | Cool enterprise blue |
| 09 | Nord | Muted arctic blue-gray |
| 10 | Dracula | Purple-tinted |
| 11 | Tokyo Night | Cool lavender and indigo |
| 12 | Catppuccin Latte | Soft pastel surfaces |
| 13 | One Dark Light | Editor-inspired neutral |
| 14 | Solarized Light | Warm parchment |
| 15 | Monokai Light | Warm muted palette |
| 16 | Rosé Pine Dawn | Dusty mauve and rose |
| 17 | AMOLED Light | Crisp white with vivid accent |
| 18 | Warm Graphite Light | Warm premium neutral |
| 19 | Forest Light | Calm green |
| 20 | Amber Terminal Light | Warm amber |
| 21 | Cyberpunk Light | Lavender with cyan accents |
| 22 | Ocean Teal Light | Fresh teal |
| 23 | Burgundy Light | Wine-red accent |
| 24 | Indigo Light | Indigo and periwinkle |
| 25 | Copper Light | Earthy copper |

---

## GitHub Light

```css
:root {
  --background: #ffffff;
  --foreground: #1f2328;
  --card: #f6f8fa;
  --card-foreground: #1f2328;
  --popover: #f6f8fa;
  --popover-foreground: #1f2328;
  --primary: #0969da;
  --primary-foreground: #ffffff;
  --secondary: #f6f8fa;
  --secondary-foreground: #1f2328;
  --muted: #f6f8fa;
  --muted-foreground: #59636e;
  --accent: #ddf4ff;
  --accent-foreground: #1f2328;
  --destructive: #d1242f;
  --border: #d1d9e0;
  --input: #d1d9e0;
  --ring: #0969da;
  --chart-1: #0969da;
  --chart-2: #1a7f37;
  --chart-3: #bf8700;
  --chart-4: #8250df;
  --chart-5: #bf3989;
  --sidebar: #f6f8fa;
  --sidebar-foreground: #1f2328;
  --sidebar-primary: #0969da;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: #eaeef2;
  --sidebar-accent-foreground: #1f2328;
  --sidebar-border: #d1d9e0;
  --sidebar-ring: #0969da;
}
```

## GitHub Soft Light (custom adaptation)

```css
:root {
  --background: #f6f8fa;
  --foreground: #1f2328;
  --card: #ffffff;
  --card-foreground: #1f2328;
  --popover: #ffffff;
  --popover-foreground: #1f2328;
  --primary: #0969da;
  --primary-foreground: #ffffff;
  --secondary: #ffffff;
  --secondary-foreground: #24292f;
  --muted: #ffffff;
  --muted-foreground: #59636e;
  --accent: #ddf4ff;
  --accent-foreground: #24292f;
  --destructive: #cf222e;
  --border: #d1d9e0;
  --input: #d1d9e0;
  --ring: #0969da;
  --chart-1: #0969da;
  --chart-2: #1a7f37;
  --chart-3: #9a6700;
  --chart-4: #8250df;
  --chart-5: #bf3989;
  --sidebar: #ffffff;
  --sidebar-foreground: #1f2328;
  --sidebar-primary: #0969da;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: #eaeef2;
  --sidebar-accent-foreground: #24292f;
  --sidebar-border: #d1d9e0;
  --sidebar-ring: #0969da;
}
```

## GitHub High Contrast Light

```css
:root {
  --background: #ffffff;
  --foreground: #0e1116;
  --card: #f0f3f6;
  --card-foreground: #0e1116;
  --popover: #f0f3f6;
  --popover-foreground: #0e1116;
  --primary: #0550ae;
  --primary-foreground: #ffffff;
  --secondary: #f0f3f6;
  --secondary-foreground: #0e1116;
  --muted: #f0f3f6;
  --muted-foreground: #424a53;
  --accent: #ddf4ff;
  --accent-foreground: #0e1116;
  --destructive: #a40e26;
  --border: #8c959f;
  --input: #8c959f;
  --ring: #0550ae;
  --chart-1: #0550ae;
  --chart-2: #116329;
  --chart-3: #7d4e00;
  --chart-4: #6639ba;
  --chart-5: #a40e78;
  --sidebar: #f0f3f6;
  --sidebar-foreground: #0e1116;
  --sidebar-primary: #0550ae;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: #eaeef2;
  --sidebar-accent-foreground: #0e1116;
  --sidebar-border: #8c959f;
  --sidebar-ring: #0550ae;
}
```

## Zinc + Coral

```css
:root {
  --background: #fafafa;
  --foreground: #18181b;
  --card: #ffffff;
  --card-foreground: #18181b;
  --popover: #ffffff;
  --popover-foreground: #18181b;
  --primary: #e85d4a;
  --primary-foreground: #000000;
  --secondary: #f4f4f5;
  --secondary-foreground: #18181b;
  --muted: #f4f4f5;
  --muted-foreground: #6d6d77;
  --accent: #ffe7e1;
  --accent-foreground: #18181b;
  --destructive: #dc2626;
  --border: #c9c9ce;
  --input: #c9c9ce;
  --ring: #e85d4a;
  --chart-1: #e85d4a;
  --chart-2: #0d9488;
  --chart-3: #ca8a04;
  --chart-4: #7c3aed;
  --chart-5: #2563eb;
  --sidebar: #f4f4f5;
  --sidebar-foreground: #18181b;
  --sidebar-primary: #e85d4a;
  --sidebar-primary-foreground: #000000;
  --sidebar-accent: #f4f4f5;
  --sidebar-accent-foreground: #18181b;
  --sidebar-border: #c9c9ce;
  --sidebar-ring: #e85d4a;
}
```

## Zinc + Red

```css
:root {
  --background: #fafafa;
  --foreground: #18181b;
  --card: #ffffff;
  --card-foreground: #18181b;
  --popover: #ffffff;
  --popover-foreground: #18181b;
  --primary: #dc2626;
  --primary-foreground: #ffffff;
  --secondary: #f4f4f5;
  --secondary-foreground: #18181b;
  --muted: #f4f4f5;
  --muted-foreground: #6d6d77;
  --accent: #fee2e2;
  --accent-foreground: #18181b;
  --destructive: #b91c1c;
  --border: #c9c9ce;
  --input: #c9c9ce;
  --ring: #dc2626;
  --chart-1: #dc2626;
  --chart-2: #059669;
  --chart-3: #d97706;
  --chart-4: #7c3aed;
  --chart-5: #2563eb;
  --sidebar: #f4f4f5;
  --sidebar-foreground: #18181b;
  --sidebar-primary: #dc2626;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: #f4f4f5;
  --sidebar-accent-foreground: #18181b;
  --sidebar-border: #c9c9ce;
  --sidebar-ring: #dc2626;
}
```

## Slate + Emerald

```css
:root {
  --background: #f8fafc;
  --foreground: #0f172a;
  --card: #ffffff;
  --card-foreground: #0f172a;
  --popover: #ffffff;
  --popover-foreground: #0f172a;
  --primary: #047857;
  --primary-foreground: #ffffff;
  --secondary: #e2e8f0;
  --secondary-foreground: #0f172a;
  --muted: #f1f5f9;
  --muted-foreground: #606f86;
  --accent: #d1fae5;
  --accent-foreground: #0f172a;
  --destructive: #dc2626;
  --border: #c2ccd8;
  --input: #c2ccd8;
  --ring: #059669;
  --chart-1: #059669;
  --chart-2: #2563eb;
  --chart-3: #d97706;
  --chart-4: #7c3aed;
  --chart-5: #db2777;
  --sidebar: #f1f5f9;
  --sidebar-foreground: #0f172a;
  --sidebar-primary: #047857;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: #e2e8f0;
  --sidebar-accent-foreground: #0f172a;
  --sidebar-border: #c2ccd8;
  --sidebar-ring: #059669;
}
```

## Neutral + Violet

```css
:root {
  --background: #fafafa;
  --foreground: #171717;
  --card: #ffffff;
  --card-foreground: #171717;
  --popover: #ffffff;
  --popover-foreground: #171717;
  --primary: #7c3aed;
  --primary-foreground: #ffffff;
  --secondary: #f5f5f5;
  --secondary-foreground: #171717;
  --muted: #f5f5f5;
  --muted-foreground: #6f6f70;
  --accent: #ede9fe;
  --accent-foreground: #171717;
  --destructive: #dc2626;
  --border: #c9cacc;
  --input: #c9cacc;
  --ring: #8b5cf6;
  --chart-1: #8b5cf6;
  --chart-2: #0d9488;
  --chart-3: #d97706;
  --chart-4: #2563eb;
  --chart-5: #db2777;
  --sidebar: #f5f5f5;
  --sidebar-foreground: #171717;
  --sidebar-primary: #7c3aed;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: #f5f5f5;
  --sidebar-accent-foreground: #171717;
  --sidebar-border: #c9cacc;
  --sidebar-ring: #8b5cf6;
}
```

## Midnight Blue

```css
:root {
  --background: #f7f9fc;
  --foreground: #172033;
  --card: #ffffff;
  --card-foreground: #172033;
  --popover: #ffffff;
  --popover-foreground: #172033;
  --primary: #3157c8;
  --primary-foreground: #ffffff;
  --secondary: #e8edf7;
  --secondary-foreground: #172033;
  --muted: #edf1f8;
  --muted-foreground: #606c84;
  --accent: #e0e8ff;
  --accent-foreground: #172033;
  --destructive: #d92d45;
  --border: #c1c9d8;
  --input: #c1c9d8;
  --ring: #4568d4;
  --chart-1: #4568d4;
  --chart-2: #0f9d8a;
  --chart-3: #d98b18;
  --chart-4: #8b5cf6;
  --chart-5: #d9468f;
  --sidebar: #edf1f8;
  --sidebar-foreground: #172033;
  --sidebar-primary: #3157c8;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: #e8edf7;
  --sidebar-accent-foreground: #172033;
  --sidebar-border: #c1c9d8;
  --sidebar-ring: #4568d4;
}
```

## Nord

```css
:root {
  --background: #f4f7fa;
  --foreground: #2e3440;
  --card: #ffffff;
  --card-foreground: #2e3440;
  --popover: #ffffff;
  --popover-foreground: #2e3440;
  --primary: #5e81ac;
  --primary-foreground: #000000;
  --secondary: #e5e9f0;
  --secondary-foreground: #2e3440;
  --muted: #eceff4;
  --muted-foreground: #616c7d;
  --accent: #e5edf5;
  --accent-foreground: #2e3440;
  --destructive: #bf616a;
  --border: #c2c8d4;
  --input: #c2c8d4;
  --ring: #5e81ac;
  --chart-1: #5e81ac;
  --chart-2: #8fbcbb;
  --chart-3: #ebcb8b;
  --chart-4: #b48ead;
  --chart-5: #a3be8c;
  --sidebar: #eceff4;
  --sidebar-foreground: #2e3440;
  --sidebar-primary: #5e81ac;
  --sidebar-primary-foreground: #000000;
  --sidebar-accent: #e5e9f0;
  --sidebar-accent-foreground: #2e3440;
  --sidebar-border: #c2c8d4;
  --sidebar-ring: #5e81ac;
}
```

## Dracula

```css
:root {
  --background: #f8f7fb;
  --foreground: #282a36;
  --card: #ffffff;
  --card-foreground: #282a36;
  --popover: #ffffff;
  --popover-foreground: #282a36;
  --primary: #6c5ce7;
  --primary-foreground: #ffffff;
  --secondary: #eeedf5;
  --secondary-foreground: #282a36;
  --muted: #eeedf5;
  --muted-foreground: #696779;
  --accent: #e8e3ff;
  --accent-foreground: #282a36;
  --destructive: #d83a52;
  --border: #c7c6d5;
  --input: #c7c6d5;
  --ring: #8b7cf6;
  --chart-1: #6c5ce7;
  --chart-2: #168f78;
  --chart-3: #c28b18;
  --chart-4: #d34f8c;
  --chart-5: #2d8ac7;
  --sidebar: #eeedf5;
  --sidebar-foreground: #282a36;
  --sidebar-primary: #6c5ce7;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: #eeedf5;
  --sidebar-accent-foreground: #282a36;
  --sidebar-border: #c7c6d5;
  --sidebar-ring: #8b7cf6;
}
```

## Tokyo Night

```css
:root {
  --background: #f7f7fc;
  --foreground: #343b58;
  --card: #ffffff;
  --card-foreground: #343b58;
  --popover: #ffffff;
  --popover-foreground: #343b58;
  --primary: #5a55d6;
  --primary-foreground: #ffffff;
  --secondary: #e9eaf7;
  --secondary-foreground: #343b58;
  --muted: #ededf8;
  --muted-foreground: #62698a;
  --accent: #e3e5ff;
  --accent-foreground: #343b58;
  --destructive: #d83a64;
  --border: #c5c8dc;
  --input: #c5c8dc;
  --ring: #6b63df;
  --chart-1: #5a55d6;
  --chart-2: #168b8b;
  --chart-3: #b7791f;
  --chart-4: #a855c7;
  --chart-5: #d94680;
  --sidebar: #ededf8;
  --sidebar-foreground: #343b58;
  --sidebar-primary: #5a55d6;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: #e9eaf7;
  --sidebar-accent-foreground: #343b58;
  --sidebar-border: #c5c8dc;
  --sidebar-ring: #6b63df;
}
```

## Catppuccin Latte / Mocha Accent

```css
:root {
  --background: #eff1f5;
  --foreground: #4c4f69;
  --card: #ffffff;
  --card-foreground: #4c4f69;
  --popover: #ffffff;
  --popover-foreground: #4c4f69;
  --primary: #8839ef;
  --primary-foreground: #ffffff;
  --secondary: #e6e9ef;
  --secondary-foreground: #484b64;
  --muted: #e6e9ef;
  --muted-foreground: #63667c;
  --accent: #e6e0ff;
  --accent-foreground: #4c4f69;
  --destructive: #d20f39;
  --border: #bfc3cd;
  --input: #bfc3cd;
  --ring: #8839ef;
  --chart-1: #8839ef;
  --chart-2: #179299;
  --chart-3: #df8e1d;
  --chart-4: #1e66f5;
  --chart-5: #ea76cb;
  --sidebar: #e6e9ef;
  --sidebar-foreground: #484b64;
  --sidebar-primary: #8839ef;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: #e6e9ef;
  --sidebar-accent-foreground: #4c4f69;
  --sidebar-border: #bfc3cd;
  --sidebar-ring: #8839ef;
}
```

## One Dark Light

```css
:root {
  --background: #fafafa;
  --foreground: #383a42;
  --card: #ffffff;
  --card-foreground: #383a42;
  --popover: #ffffff;
  --popover-foreground: #383a42;
  --primary: #4078f2;
  --primary-foreground: #000000;
  --secondary: #f0f0f1;
  --secondary-foreground: #383a42;
  --muted: #f0f0f1;
  --muted-foreground: #686b76;
  --accent: #e7edff;
  --accent-foreground: #383a42;
  --destructive: #e45649;
  --border: #c8cbd1;
  --input: #c8cbd1;
  --ring: #4078f2;
  --chart-1: #4078f2;
  --chart-2: #50a14f;
  --chart-3: #c18401;
  --chart-4: #a626a4;
  --chart-5: #0184bc;
  --sidebar: #f0f0f1;
  --sidebar-foreground: #383a42;
  --sidebar-primary: #4078f2;
  --sidebar-primary-foreground: #000000;
  --sidebar-accent: #f0f0f1;
  --sidebar-accent-foreground: #383a42;
  --sidebar-border: #c8cbd1;
  --sidebar-ring: #4078f2;
}
```

## Solarized Light

```css
:root {
  --background: #fdf6e3;
  --foreground: #44565f;
  --card: #fffbef;
  --card-foreground: #475962;
  --popover: #fffbef;
  --popover-foreground: #475962;
  --primary: #268bd2;
  --primary-foreground: #000000;
  --secondary: #eee8d5;
  --secondary-foreground: #3e4e58;
  --muted: #eee8d5;
  --muted-foreground: #576a73;
  --accent: #e4f1f8;
  --accent-foreground: #586e75;
  --destructive: #dc322f;
  --border: #cec8b5;
  --input: #cec8b5;
  --ring: #268bd2;
  --chart-1: #268bd2;
  --chart-2: #859900;
  --chart-3: #b58900;
  --chart-4: #6c71c4;
  --chart-5: #d33682;
  --sidebar: #eee8d5;
  --sidebar-foreground: #3e4e58;
  --sidebar-primary: #268bd2;
  --sidebar-primary-foreground: #000000;
  --sidebar-accent: #eee8d5;
  --sidebar-accent-foreground: #546a71;
  --sidebar-border: #cec8b5;
  --sidebar-ring: #268bd2;
}
```

## Monokai Light

```css
:root {
  --background: #fbf8f1;
  --foreground: #383830;
  --card: #ffffff;
  --card-foreground: #383830;
  --popover: #ffffff;
  --popover-foreground: #383830;
  --primary: #8a6d00;
  --primary-foreground: #ffffff;
  --secondary: #f1eee4;
  --secondary-foreground: #383830;
  --muted: #f1eee4;
  --muted-foreground: #6d6b61;
  --accent: #f5edc9;
  --accent-foreground: #383830;
  --destructive: #c92a2a;
  --border: #ccc9be;
  --input: #ccc9be;
  --ring: #a67c00;
  --chart-1: #a67c00;
  --chart-2: #16804a;
  --chart-3: #c2410c;
  --chart-4: #7c3aed;
  --chart-5: #c026d3;
  --sidebar: #f1eee4;
  --sidebar-foreground: #383830;
  --sidebar-primary: #8a6d00;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: #f1eee4;
  --sidebar-accent-foreground: #383830;
  --sidebar-border: #ccc9be;
  --sidebar-ring: #a67c00;
}
```

## Rosé Pine Dawn

```css
:root {
  --background: #faf4ed;
  --foreground: #534f75;
  --card: #fffaf3;
  --card-foreground: #575279;
  --popover: #fffaf3;
  --popover-foreground: #575279;
  --primary: #907aa9;
  --primary-foreground: #000000;
  --secondary: #f2e9e1;
  --secondary-foreground: #4c496d;
  --muted: #f2e9e1;
  --muted-foreground: #676581;
  --accent: #f2e9e1;
  --accent-foreground: #575279;
  --destructive: #b4637a;
  --border: #c8c5c5;
  --input: #c8c5c5;
  --ring: #907aa9;
  --chart-1: #907aa9;
  --chart-2: #56949f;
  --chart-3: #ea9d34;
  --chart-4: #d7827e;
  --chart-5: #286983;
  --sidebar: #f2e9e1;
  --sidebar-foreground: #4c496d;
  --sidebar-primary: #907aa9;
  --sidebar-primary-foreground: #000000;
  --sidebar-accent: #f2e9e1;
  --sidebar-accent-foreground: #575279;
  --sidebar-border: #c8c5c5;
  --sidebar-ring: #907aa9;
}
```

## AMOLED Light

```css
:root {
  --background: #ffffff;
  --foreground: #111111;
  --card: #ffffff;
  --card-foreground: #111111;
  --popover: #ffffff;
  --popover-foreground: #111111;
  --primary: #d91f4c;
  --primary-foreground: #ffffff;
  --secondary: #f4f4f5;
  --secondary-foreground: #111111;
  --muted: #f4f4f5;
  --muted-foreground: #666666;
  --accent: #ffe4eb;
  --accent-foreground: #111111;
  --destructive: #b91c1c;
  --border: #cfcfd0;
  --input: #cfcfd0;
  --ring: #d91f4c;
  --chart-1: #d91f4c;
  --chart-2: #047857;
  --chart-3: #b45309;
  --chart-4: #6d28d9;
  --chart-5: #0369a1;
  --sidebar: #f4f4f5;
  --sidebar-foreground: #111111;
  --sidebar-primary: #d91f4c;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: #f4f4f5;
  --sidebar-accent-foreground: #111111;
  --sidebar-border: #cfcfd0;
  --sidebar-ring: #d91f4c;
}
```

## Warm Graphite Light

```css
:root {
  --background: #f7f5f2;
  --foreground: #292524;
  --card: #fffefd;
  --card-foreground: #292524;
  --popover: #fffefd;
  --popover-foreground: #292524;
  --primary: #b45309;
  --primary-foreground: #ffffff;
  --secondary: #eeeae5;
  --secondary-foreground: #292524;
  --muted: #eeeae5;
  --muted-foreground: #6d6764;
  --accent: #f5e7d8;
  --accent-foreground: #292524;
  --destructive: #b91c1c;
  --border: #cac5c0;
  --input: #cac5c0;
  --ring: #c16b27;
  --chart-1: #c16b27;
  --chart-2: #0f766e;
  --chart-3: #a16207;
  --chart-4: #7c3aed;
  --chart-5: #be185d;
  --sidebar: #eeeae5;
  --sidebar-foreground: #292524;
  --sidebar-primary: #b45309;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: #eeeae5;
  --sidebar-accent-foreground: #292524;
  --sidebar-border: #cac5c0;
  --sidebar-ring: #c16b27;
}
```

## Forest Light

```css
:root {
  --background: #f4f8f4;
  --foreground: #1f3327;
  --card: #ffffff;
  --card-foreground: #1f3327;
  --popover: #ffffff;
  --popover-foreground: #1f3327;
  --primary: #247447;
  --primary-foreground: #ffffff;
  --secondary: #e3eee5;
  --secondary-foreground: #1f3327;
  --muted: #e3eee5;
  --muted-foreground: #5c6d62;
  --accent: #dcefe0;
  --accent-foreground: #1f3327;
  --destructive: #c53030;
  --border: #bcccc2;
  --input: #bcccc2;
  --ring: #2f855a;
  --chart-1: #2f855a;
  --chart-2: #2563eb;
  --chart-3: #b7791f;
  --chart-4: #805ad5;
  --chart-5: #c05678;
  --sidebar: #e3eee5;
  --sidebar-foreground: #1f3327;
  --sidebar-primary: #247447;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: #e3eee5;
  --sidebar-accent-foreground: #1f3327;
  --sidebar-border: #bcccc2;
  --sidebar-ring: #2f855a;
}
```

## Amber Terminal Light

```css
:root {
  --background: #fffaf0;
  --foreground: #3b3020;
  --card: #ffffff;
  --card-foreground: #3b3020;
  --popover: #ffffff;
  --popover-foreground: #3b3020;
  --primary: #a16207;
  --primary-foreground: #ffffff;
  --secondary: #f5ebd5;
  --secondary-foreground: #3b3020;
  --muted: #f5ebd5;
  --muted-foreground: #77674f;
  --accent: #ffedb5;
  --accent-foreground: #3b3020;
  --destructive: #c53030;
  --border: #d6caae;
  --input: #d6caae;
  --ring: #c38505;
  --chart-1: #a16207;
  --chart-2: #0f766e;
  --chart-3: #2563eb;
  --chart-4: #7c3aed;
  --chart-5: #c2410c;
  --sidebar: #f5ebd5;
  --sidebar-foreground: #3b3020;
  --sidebar-primary: #a16207;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: #f5ebd5;
  --sidebar-accent-foreground: #3b3020;
  --sidebar-border: #d6caae;
  --sidebar-ring: #ca8a04;
}
```

## Cyberpunk Light

```css
:root {
  --background: #f8f7ff;
  --foreground: #201c3b;
  --card: #ffffff;
  --card-foreground: #201c3b;
  --popover: #ffffff;
  --popover-foreground: #201c3b;
  --primary: #7c3aed;
  --primary-foreground: #ffffff;
  --secondary: #eeeafd;
  --secondary-foreground: #201c3b;
  --muted: #eeeafd;
  --muted-foreground: #6c658a;
  --accent: #d9fbff;
  --accent-foreground: #201c3b;
  --destructive: #d61f69;
  --border: #c9c5e0;
  --input: #c9c5e0;
  --ring: #0891b2;
  --chart-1: #7c3aed;
  --chart-2: #0891b2;
  --chart-3: #db2777;
  --chart-4: #ca8a04;
  --chart-5: #2563eb;
  --sidebar: #eeeafd;
  --sidebar-foreground: #201c3b;
  --sidebar-primary: #7c3aed;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: #eeeafd;
  --sidebar-accent-foreground: #201c3b;
  --sidebar-border: #c9c5e0;
  --sidebar-ring: #0891b2;
}
```

## Ocean Teal Light

```css
:root {
  --background: #f2fafa;
  --foreground: #173b3b;
  --card: #ffffff;
  --card-foreground: #173b3b;
  --popover: #ffffff;
  --popover-foreground: #173b3b;
  --primary: #0f766e;
  --primary-foreground: #ffffff;
  --secondary: #dff1ef;
  --secondary-foreground: #173b3b;
  --muted: #dff1ef;
  --muted-foreground: #566e6f;
  --accent: #d1f5f0;
  --accent-foreground: #173b3b;
  --destructive: #c53030;
  --border: #b7cdcd;
  --input: #b7cdcd;
  --ring: #0d9488;
  --chart-1: #0f766e;
  --chart-2: #2563eb;
  --chart-3: #b7791f;
  --chart-4: #7c3aed;
  --chart-5: #db2777;
  --sidebar: #dff1ef;
  --sidebar-foreground: #173b3b;
  --sidebar-primary: #0f766e;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: #dff1ef;
  --sidebar-accent-foreground: #173b3b;
  --sidebar-border: #b7cdcd;
  --sidebar-ring: #0d9488;
}
```

## Burgundy Light

```css
:root {
  --background: #fcf7f8;
  --foreground: #3b1f2b;
  --card: #ffffff;
  --card-foreground: #3b1f2b;
  --popover: #ffffff;
  --popover-foreground: #3b1f2b;
  --primary: #9f2348;
  --primary-foreground: #ffffff;
  --secondary: #f3e5e9;
  --secondary-foreground: #3b1f2b;
  --muted: #f3e5e9;
  --muted-foreground: #76616c;
  --accent: #f8dfe7;
  --accent-foreground: #3b1f2b;
  --destructive: #b42318;
  --border: #d5c4cc;
  --input: #d5c4cc;
  --ring: #b42348;
  --chart-1: #b42348;
  --chart-2: #0f766e;
  --chart-3: #b7791f;
  --chart-4: #7c3aed;
  --chart-5: #2563eb;
  --sidebar: #f3e5e9;
  --sidebar-foreground: #3b1f2b;
  --sidebar-primary: #9f2348;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: #f3e5e9;
  --sidebar-accent-foreground: #3b1f2b;
  --sidebar-border: #d5c4cc;
  --sidebar-ring: #b42348;
}
```

## Indigo Light

```css
:root {
  --background: #f6f7ff;
  --foreground: #252b4a;
  --card: #ffffff;
  --card-foreground: #252b4a;
  --popover: #ffffff;
  --popover-foreground: #252b4a;
  --primary: #4f46e5;
  --primary-foreground: #ffffff;
  --secondary: #e8eaff;
  --secondary-foreground: #252b4a;
  --muted: #e8eaff;
  --muted-foreground: #60678e;
  --accent: #e0e7ff;
  --accent-foreground: #252b4a;
  --destructive: #dc2626;
  --border: #c2c7e1;
  --input: #c2c7e1;
  --ring: #6366f1;
  --chart-1: #4f46e5;
  --chart-2: #0d9488;
  --chart-3: #d97706;
  --chart-4: #9333ea;
  --chart-5: #db2777;
  --sidebar: #e8eaff;
  --sidebar-foreground: #252b4a;
  --sidebar-primary: #4f46e5;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: #e8eaff;
  --sidebar-accent-foreground: #252b4a;
  --sidebar-border: #c2c7e1;
  --sidebar-ring: #6366f1;
}
```

## Copper Light

```css
:root {
  --background: #faf6f2;
  --foreground: #382a23;
  --card: #ffffff;
  --card-foreground: #382a23;
  --popover: #ffffff;
  --popover-foreground: #382a23;
  --primary: #9a4f2f;
  --primary-foreground: #ffffff;
  --secondary: #eee4dc;
  --secondary-foreground: #382a23;
  --muted: #eee4dc;
  --muted-foreground: #72625a;
  --accent: #f3e1d4;
  --accent-foreground: #382a23;
  --destructive: #b91c1c;
  --border: #d2c5bc;
  --input: #d2c5bc;
  --ring: #b7653b;
  --chart-1: #9a4f2f;
  --chart-2: #0f766e;
  --chart-3: #b7791f;
  --chart-4: #7c3aed;
  --chart-5: #2563eb;
  --sidebar: #eee4dc;
  --sidebar-foreground: #382a23;
  --sidebar-primary: #9a4f2f;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: #eee4dc;
  --sidebar-accent-foreground: #382a23;
  --sidebar-border: #d2c5bc;
  --sidebar-ring: #b7653b;
}
```

---

## Dark Mode Color Schemes

Collection of 25 dark-mode palettes for **Tailwind CSS v4 + shadcn/ui** using CSS variables.

## How to use

1. Keep your existing `@theme inline` block.
2. Keep your existing light-mode `:root` block.
3. Replace your current `.dark` block with **one** scheme from this file.
4. Set the `.dark` class on `<html>` or the element that owns the theme.

These schemes use the same shadcn token names, so existing components using classes such as `bg-background`, `text-foreground`, `bg-card`, `border-border`, `bg-primary`, `ring-ring`, and `bg-sidebar` continue to work.

> Color values are starting points, not a guarantee of WCAG contrast compliance. Check text, focus rings, disabled states, charts, and semantic statuses in your actual UI.

## Palette index

| # | Scheme | Character |
|---:|---|---|
| 01 | GitHub Dark | Developer-tool classic, deep blue-black |
| 02 | GitHub Dimmed | Softer charcoal, lower contrast |
| 03 | GitHub Dark High Contrast | Stronger borders and text |
| 04 | Zinc + Coral | Neutral surfaces with red-coral primary |
| 05 | Zinc + Red | Classic red brand |
| 06 | Slate + Emerald | Operations and logistics |
| 07 | Neutral + Violet | SaaS / AI |
| 08 | Midnight Blue | Cool enterprise blue |
| 09 | Nord | Muted arctic blue-gray |
| 10 | Dracula | Purple-tinted developer theme |
| 11 | Tokyo Night | Deep navy with vivid accents |
| 12 | Catppuccin Mocha | Soft, colorful dark theme |
| 13 | One Dark | Balanced editor-inspired gray |
| 14 | Solarized Dark | Warm, low-glare dark |
| 15 | Monokai | Warm dark with vivid accents |
| 16 | Rose Pine | Muted mauve and rose |
| 17 | AMOLED | Near-black, high energy efficiency on OLED |
| 18 | Warm Graphite | Warm premium neutral |
| 19 | Forest | Deep green, calm |
| 20 | Amber Terminal | Graphite with amber accent |
| 21 | Cyberpunk | Dark navy with cyan |
| 22 | Ocean Teal | Deep ocean with teal |
| 23 | Burgundy | Dark red wine |
| 24 | Indigo | Deep indigo with periwinkle |
| 25 | Copper | Earthy brown and copper |

---

## 01. GitHub Dark

```css
.dark {
  color-scheme: dark;
  --background: #0d1117;
  --foreground: #e6edf3;
  --card: #161b22;
  --card-foreground: #e6edf3;
  --popover: #161b22;
  --popover-foreground: #e6edf3;
  --primary: #2f81f7;
  --primary-foreground: #ffffff;
  --secondary: #161b22;
  --secondary-foreground: #e6edf3;
  --muted: #161b22;
  --muted-foreground: #9198a1;
  --accent: #1c2d41;
  --accent-foreground: #ffffff;
  --destructive: #f85149;
  --border: #30363d;
  --input: #30363d;
  --ring: #2f81f7;
  --chart-1: #58a6ff;
  --chart-2: #3fb950;
  --chart-3: #d29922;
  --chart-4: #bc8cff;
  --chart-5: #f778ba;
  --sidebar: #161b22;
  --sidebar-foreground: #e6edf3;
  --sidebar-primary: #2f81f7;
  --sidebar-primary-foreground: #000000;
  --sidebar-accent: #30363d;
  --sidebar-accent-foreground: #e6edf3;
  --sidebar-border: #30363d;
  --sidebar-ring: #2f81f7;
}
```

## 02. GitHub Dark Dimmed

```css
.dark {
  color-scheme: dark;
  --background: #1c2128;
  --foreground: #adbac7;
  --card: #262c34;
  --card-foreground: #b6c2cd;
  --popover: #262c34;
  --popover-foreground: #b6c2cd;
  --primary: #539bf5;
  --primary-foreground: #000000;
  --secondary: #262c34;
  --secondary-foreground: #b6c2cd;
  --muted: #262c34;
  --muted-foreground: #adbac7;
  --accent: #1c2d41;
  --accent-foreground: #ffffff;
  --destructive: #e5534b;
  --border: #3b444e;
  --input: #3b444e;
  --ring: #539bf5;
  --chart-1: #539bf5;
  --chart-2: #57ab5a;
  --chart-3: #c69026;
  --chart-4: #986ee2;
  --chart-5: #e5534b;
  --sidebar: #262c34;
  --sidebar-foreground: #b6c2cd;
  --sidebar-primary: #539bf5;
  --sidebar-primary-foreground: #000000;
  --sidebar-accent: #2b323b;
  --sidebar-accent-foreground: #adbac7;
  --sidebar-border: #3b444e;
  --sidebar-ring: #539bf5;
}
```

## 03. GitHub Dark High Contrast

```css
.dark {
  color-scheme: dark;
  --background: #010409;
  --foreground: #f0f6fc;
  --card: #0d1117;
  --card-foreground: #f0f6fc;
  --popover: #0d1117;
  --popover-foreground: #f0f6fc;
  --primary: #58a6ff;
  --primary-foreground: #000000;
  --secondary: #0d1117;
  --secondary-foreground: #f0f6fc;
  --muted: #0d1117;
  --muted-foreground: #b1bac4;
  --accent: #1c2d41;
  --accent-foreground: #ffffff;
  --destructive: #ff7b72;
  --border: #6e7681;
  --input: #6e7681;
  --ring: #58a6ff;
  --chart-1: #58a6ff;
  --chart-2: #3fb950;
  --chart-3: #e3b341;
  --chart-4: #d2a8ff;
  --chart-5: #ff7b72;
  --sidebar: #0d1117;
  --sidebar-foreground: #f0f6fc;
  --sidebar-primary: #58a6ff;
  --sidebar-primary-foreground: #000000;
  --sidebar-accent: #30363d;
  --sidebar-accent-foreground: #f0f6fc;
  --sidebar-border: #6e7681;
  --sidebar-ring: #58a6ff;
}
```

## 04. Zinc + Coral

```css
.dark {
  color-scheme: dark;
  --background: #17181c;
  --foreground: #f4f4f5;
  --card: #222329;
  --card-foreground: #f4f4f5;
  --popover: #27282f;
  --popover-foreground: #f4f4f5;
  --primary: #e65b64;
  --primary-foreground: #000000;
  --secondary: #2c2d34;
  --secondary-foreground: #f4f4f5;
  --muted: #27282f;
  --muted-foreground: #a1a1aa;
  --accent: #48262d;
  --accent-foreground: #ffdadd;
  --destructive: #f87171;
  --border: #383941;
  --input: #383941;
  --ring: #f07880;
  --chart-1: #f07880;
  --chart-2: #4ade80;
  --chart-3: #fbbf24;
  --chart-4: #60a5fa;
  --chart-5: #c084fc;
  --sidebar: #141519;
  --sidebar-foreground: #f4f4f5;
  --sidebar-primary: #e65b64;
  --sidebar-primary-foreground: #000000;
  --sidebar-accent: #48262d;
  --sidebar-accent-foreground: #ffdadd;
  --sidebar-border: #383941;
  --sidebar-ring: #f07880;
}
```

## 05. Zinc + Red

```css
.dark {
  color-scheme: dark;
  --background: #18181b;
  --foreground: #fafafa;
  --card: #202024;
  --card-foreground: #fafafa;
  --popover: #27272a;
  --popover-foreground: #fafafa;
  --primary: #ef4444;
  --primary-foreground: #000000;
  --secondary: #27272a;
  --secondary-foreground: #fafafa;
  --muted: #27272a;
  --muted-foreground: #a1a1aa;
  --accent: #3f1d22;
  --accent-foreground: #fecaca;
  --destructive: #f87171;
  --border: #3f3f46;
  --input: #3f3f46;
  --ring: #ef4444;
  --chart-1: #f87171;
  --chart-2: #4ade80;
  --chart-3: #facc15;
  --chart-4: #60a5fa;
  --chart-5: #c084fc;
  --sidebar: #141416;
  --sidebar-foreground: #fafafa;
  --sidebar-primary: #ef4444;
  --sidebar-primary-foreground: #000000;
  --sidebar-accent: #3f1d22;
  --sidebar-accent-foreground: #fecaca;
  --sidebar-border: #3f3f46;
  --sidebar-ring: #ef4444;
}
```

## 06. Slate + Emerald

```css
.dark {
  color-scheme: dark;
  --background: #111827;
  --foreground: #f3f4f6;
  --card: #1f2937;
  --card-foreground: #f3f4f6;
  --popover: #273548;
  --popover-foreground: #f3f4f6;
  --primary: #10b981;
  --primary-foreground: #000000;
  --secondary: #293548;
  --secondary-foreground: #f3f4f6;
  --muted: #293548;
  --muted-foreground: #9ca3af;
  --accent: #174b3d;
  --accent-foreground: #d1fae5;
  --destructive: #f87171;
  --border: #374151;
  --input: #374151;
  --ring: #34d399;
  --chart-1: #34d399;
  --chart-2: #60a5fa;
  --chart-3: #fbbf24;
  --chart-4: #c084fc;
  --chart-5: #fb7185;
  --sidebar: #0d1422;
  --sidebar-foreground: #f3f4f6;
  --sidebar-primary: #10b981;
  --sidebar-primary-foreground: #000000;
  --sidebar-accent: #174b3d;
  --sidebar-accent-foreground: #d1fae5;
  --sidebar-border: #374151;
  --sidebar-ring: #34d399;
}
```

## 07. Neutral + Violet

```css
.dark {
  color-scheme: dark;
  --background: #17151f;
  --foreground: #f5f3ff;
  --card: #24212f;
  --card-foreground: #f5f3ff;
  --popover: #302b3d;
  --popover-foreground: #f5f3ff;
  --primary: #a78bfa;
  --primary-foreground: #000000;
  --secondary: #302b3d;
  --secondary-foreground: #f5f3ff;
  --muted: #292536;
  --muted-foreground: #a5a0b5;
  --accent: #3b2d57;
  --accent-foreground: #ede9fe;
  --destructive: #fb7185;
  --border: #3d374b;
  --input: #3d374b;
  --ring: #a78bfa;
  --chart-1: #a78bfa;
  --chart-2: #5eead4;
  --chart-3: #fbbf24;
  --chart-4: #60a5fa;
  --chart-5: #fb7185;
  --sidebar: #14121b;
  --sidebar-foreground: #f5f3ff;
  --sidebar-primary: #a78bfa;
  --sidebar-primary-foreground: #000000;
  --sidebar-accent: #3b2d57;
  --sidebar-accent-foreground: #ede9fe;
  --sidebar-border: #3d374b;
  --sidebar-ring: #a78bfa;
}
```

## 08. Midnight Blue

```css
.dark {
  color-scheme: dark;
  --background: #0b1220;
  --foreground: #e5edf9;
  --card: #111c2e;
  --card-foreground: #e5edf9;
  --popover: #17243a;
  --popover-foreground: #e5edf9;
  --primary: #60a5fa;
  --primary-foreground: #000000;
  --secondary: #1b2a41;
  --secondary-foreground: #e5edf9;
  --muted: #17243a;
  --muted-foreground: #94a8c7;
  --accent: #1e3a5f;
  --accent-foreground: #dbeafe;
  --destructive: #fb7185;
  --border: #26364d;
  --input: #26364d;
  --ring: #60a5fa;
  --chart-1: #60a5fa;
  --chart-2: #34d399;
  --chart-3: #fbbf24;
  --chart-4: #c084fc;
  --chart-5: #fb7185;
  --sidebar: #080f1b;
  --sidebar-foreground: #e5edf9;
  --sidebar-primary: #60a5fa;
  --sidebar-primary-foreground: #000000;
  --sidebar-accent: #1e3a5f;
  --sidebar-accent-foreground: #dbeafe;
  --sidebar-border: #26364d;
  --sidebar-ring: #60a5fa;
}
```

## 09. Nord

```css
.dark {
  color-scheme: dark;
  --background: #252b35;
  --foreground: #d7dce5;
  --card: #323947;
  --card-foreground: #d7dce5;
  --popover: #3a4353;
  --popover-foreground: #d7dce5;
  --primary: #88c0d0;
  --primary-foreground: #000000;
  --secondary: #3a4353;
  --secondary-foreground: #d7dce5;
  --muted: #323947;
  --muted-foreground: #b0bac9;
  --accent: #3a4353;
  --accent-foreground: #d7dce5;
  --destructive: #bf616a;
  --border: #465063;
  --input: #465063;
  --ring: #88c0d0;
  --chart-1: #88c0d0;
  --chart-2: #a3be8c;
  --chart-3: #ebcb8b;
  --chart-4: #b48ead;
  --chart-5: #81a1c1;
  --sidebar: #212630;
  --sidebar-foreground: #d7dce5;
  --sidebar-primary: #88c0d0;
  --sidebar-primary-foreground: #000000;
  --sidebar-accent: #323947;
  --sidebar-accent-foreground: #d7dce5;
  --sidebar-border: #465063;
  --sidebar-ring: #88c0d0;
}
```

## 10. Dracula

```css
.dark {
  color-scheme: dark;
  --background: #1b1c25;
  --foreground: #cdd0d8;
  --card: #252733;
  --card-foreground: #cdd0d8;
  --popover: #2c2f3d;
  --popover-foreground: #cdd0d8;
  --primary: #bd93f9;
  --primary-foreground: #000000;
  --secondary: #2c2f3d;
  --secondary-foreground: #cdd0d8;
  --muted: #292b38;
  --muted-foreground: #b6b6c9;
  --accent: #3b3e50;
  --accent-foreground: #dedce6;
  --destructive: #ff5555;
  --border: #3b3e50;
  --input: #3b3e50;
  --ring: #bd93f9;
  --chart-1: #bd93f9;
  --chart-2: #50fa7b;
  --chart-3: #f1fa8c;
  --chart-4: #8be9fd;
  --chart-5: #ff79c6;
  --sidebar: #171820;
  --sidebar-foreground: #cdd0d8;
  --sidebar-primary: #bd93f9;
  --sidebar-primary-foreground: #000000;
  --sidebar-accent: #2c2f3d;
  --sidebar-accent-foreground: #dedce6;
  --sidebar-border: #3b3e50;
  --sidebar-ring: #bd93f9;
}
```

## 11. Tokyo Night

```css
.dark {
  color-scheme: dark;
  --background: #1a1b26;
  --foreground: #c0caf5;
  --card: #24283b;
  --card-foreground: #c0caf5;
  --popover: #292e42;
  --popover-foreground: #c0caf5;
  --primary: #7aa2f7;
  --primary-foreground: #000000;
  --secondary: #292e42;
  --secondary-foreground: #c0caf5;
  --muted: #24283b;
  --muted-foreground: #9aa5ce;
  --accent: #343a55;
  --accent-foreground: #c0caf5;
  --destructive: #f7768e;
  --border: #3b4261;
  --input: #3b4261;
  --ring: #7aa2f7;
  --chart-1: #7aa2f7;
  --chart-2: #9ece6a;
  --chart-3: #e0af68;
  --chart-4: #bb9af7;
  --chart-5: #f7768e;
  --sidebar: #16161e;
  --sidebar-foreground: #c0caf5;
  --sidebar-primary: #7aa2f7;
  --sidebar-primary-foreground: #000000;
  --sidebar-accent: #292e42;
  --sidebar-accent-foreground: #c0caf5;
  --sidebar-border: #3b4261;
  --sidebar-ring: #7aa2f7;
}
```

## 12. Catppuccin Mocha

```css
.dark {
  color-scheme: dark;
  --background: #1e1e2e;
  --foreground: #cdd6f4;
  --card: #242438;
  --card-foreground: #cdd6f4;
  --popover: #313244;
  --popover-foreground: #cdd6f4;
  --primary: #cba6f7;
  --primary-foreground: #000000;
  --secondary: #313244;
  --secondary-foreground: #cdd6f4;
  --muted: #29293d;
  --muted-foreground: #a6adc8;
  --accent: #45475a;
  --accent-foreground: #cdd6f4;
  --destructive: #f38ba8;
  --border: #45475a;
  --input: #45475a;
  --ring: #cba6f7;
  --chart-1: #89b4fa;
  --chart-2: #a6e3a1;
  --chart-3: #f9e2af;
  --chart-4: #cba6f7;
  --chart-5: #f38ba8;
  --sidebar: #181825;
  --sidebar-foreground: #cdd6f4;
  --sidebar-primary: #cba6f7;
  --sidebar-primary-foreground: #000000;
  --sidebar-accent: #313244;
  --sidebar-accent-foreground: #cdd6f4;
  --sidebar-border: #45475a;
  --sidebar-ring: #cba6f7;
}
```

## 13. One Dark

```css
.dark {
  color-scheme: dark;
  --background: #21252b;
  --foreground: #abb2bf;
  --card: #282c34;
  --card-foreground: #b2b8c4;
  --popover: #2c313a;
  --popover-foreground: #b9bfca;
  --primary: #61afef;
  --primary-foreground: #000000;
  --secondary: #2c313a;
  --secondary-foreground: #b9bfca;
  --muted: #282c34;
  --muted-foreground: #8f94a0;
  --accent: #343b45;
  --accent-foreground: #d7dae0;
  --destructive: #e06c75;
  --border: #3e4451;
  --input: #3e4451;
  --ring: #61afef;
  --chart-1: #61afef;
  --chart-2: #98c379;
  --chart-3: #e5c07b;
  --chart-4: #c678dd;
  --chart-5: #e06c75;
  --sidebar: #1b1f24;
  --sidebar-foreground: #abb2bf;
  --sidebar-primary: #61afef;
  --sidebar-primary-foreground: #000000;
  --sidebar-accent: #2c313a;
  --sidebar-accent-foreground: #d7dae0;
  --sidebar-border: #3e4451;
  --sidebar-ring: #61afef;
}
```

## 14. Solarized Dark

```css
.dark {
  color-scheme: dark;
  --background: #082630;
  --foreground: #d8d2bd;
  --card: #10303a;
  --card-foreground: #d8d2bd;
  --popover: #143540;
  --popover-foreground: #d8d2bd;
  --primary: #268bd2;
  --primary-foreground: #000000;
  --secondary: #10303a;
  --secondary-foreground: #d8d2bd;
  --muted: #10303a;
  --muted-foreground: #93a1a1;
  --accent: #17404d;
  --accent-foreground: #d8d2bd;
  --destructive: #dc322f;
  --border: #24505b;
  --input: #24505b;
  --ring: #268bd2;
  --chart-1: #268bd2;
  --chart-2: #859900;
  --chart-3: #b58900;
  --chart-4: #6c71c4;
  --chart-5: #d33682;
  --sidebar: #071f27;
  --sidebar-foreground: #d8d2bd;
  --sidebar-primary: #268bd2;
  --sidebar-primary-foreground: #000000;
  --sidebar-accent: #10303a;
  --sidebar-accent-foreground: #d8d2bd;
  --sidebar-border: #24505b;
  --sidebar-ring: #268bd2;
}
```

## 15. Monokai

```css
.dark {
  color-scheme: dark;
  --background: #20211d;
  --foreground: #d8d8cf;
  --card: #292a24;
  --card-foreground: #d8d8cf;
  --popover: #32332b;
  --popover-foreground: #d8d8cf;
  --primary: #a6e22e;
  --primary-foreground: #000000;
  --secondary: #32332b;
  --secondary-foreground: #d8d8cf;
  --muted: #2c2d26;
  --muted-foreground: #b8b8a8;
  --accent: #3a3b31;
  --accent-foreground: #d8d8cf;
  --destructive: #f92672;
  --border: #414238;
  --input: #414238;
  --ring: #a6e22e;
  --chart-1: #a6e22e;
  --chart-2: #66d9ef;
  --chart-3: #e6db74;
  --chart-4: #ae81ff;
  --chart-5: #f92672;
  --sidebar: #1b1c18;
  --sidebar-foreground: #d8d8cf;
  --sidebar-primary: #a6e22e;
  --sidebar-primary-foreground: #000000;
  --sidebar-accent: #32332b;
  --sidebar-accent-foreground: #d8d8cf;
  --sidebar-border: #414238;
  --sidebar-ring: #a6e22e;
}
```

## 16. Rose Pine

```css
.dark {
  color-scheme: dark;
  --background: #191724;
  --foreground: #e0def4;
  --card: #1f1d2e;
  --card-foreground: #e0def4;
  --popover: #26233a;
  --popover-foreground: #e0def4;
  --primary: #c4a7e7;
  --primary-foreground: #000000;
  --secondary: #26233a;
  --secondary-foreground: #e0def4;
  --muted: #21202e;
  --muted-foreground: #908caa;
  --accent: #403d52;
  --accent-foreground: #e0def4;
  --destructive: #eb6f92;
  --border: #403d52;
  --input: #403d52;
  --ring: #c4a7e7;
  --chart-1: #c4a7e7;
  --chart-2: #9ccfd8;
  --chart-3: #f6c177;
  --chart-4: #ebbcba;
  --chart-5: #eb6f92;
  --sidebar: #15131f;
  --sidebar-foreground: #e0def4;
  --sidebar-primary: #c4a7e7;
  --sidebar-primary-foreground: #000000;
  --sidebar-accent: #26233a;
  --sidebar-accent-foreground: #e0def4;
  --sidebar-border: #403d52;
  --sidebar-ring: #c4a7e7;
}
```

## 17. AMOLED

```css
.dark {
  color-scheme: dark;
  --background: #000000;
  --foreground: #f5f5f5;
  --card: #0a0a0a;
  --card-foreground: #f5f5f5;
  --popover: #141414;
  --popover-foreground: #f5f5f5;
  --primary: #60a5fa;
  --primary-foreground: #000000;
  --secondary: #171717;
  --secondary-foreground: #f5f5f5;
  --muted: #111111;
  --muted-foreground: #a3a3a3;
  --accent: #172554;
  --accent-foreground: #dbeafe;
  --destructive: #f87171;
  --border: #2f2f2f;
  --input: #2f2f2f;
  --ring: #60a5fa;
  --chart-1: #60a5fa;
  --chart-2: #4ade80;
  --chart-3: #facc15;
  --chart-4: #c084fc;
  --chart-5: #fb7185;
  --sidebar: #000000;
  --sidebar-foreground: #f5f5f5;
  --sidebar-primary: #60a5fa;
  --sidebar-primary-foreground: #000000;
  --sidebar-accent: #111111;
  --sidebar-accent-foreground: #f5f5f5;
  --sidebar-border: #2f2f2f;
  --sidebar-ring: #60a5fa;
}
```

## 18. Warm Graphite

```css
.dark {
  color-scheme: dark;
  --background: #181615;
  --foreground: #d5cfca;
  --card: #24211f;
  --card-foreground: #d5cfca;
  --popover: #2d2927;
  --popover-foreground: #d5cfca;
  --primary: #fb923c;
  --primary-foreground: #000000;
  --secondary: #2d2927;
  --secondary-foreground: #d5cfca;
  --muted: #24211f;
  --muted-foreground: #a8a29e;
  --accent: #3f2c22;
  --accent-foreground: #e4d5c6;
  --destructive: #f87171;
  --border: #3b3633;
  --input: #3b3633;
  --ring: #fb923c;
  --chart-1: #fb923c;
  --chart-2: #a3e635;
  --chart-3: #38bdf8;
  --chart-4: #c084fc;
  --chart-5: #fb7185;
  --sidebar: #141210;
  --sidebar-foreground: #d5cfca;
  --sidebar-primary: #fb923c;
  --sidebar-primary-foreground: #000000;
  --sidebar-accent: #3f2c22;
  --sidebar-accent-foreground: #e4d5c6;
  --sidebar-border: #3b3633;
  --sidebar-ring: #fb923c;
}
```

## 19. Forest

```css
.dark {
  color-scheme: dark;
  --background: #101a17;
  --foreground: #e5f2eb;
  --card: #192823;
  --card-foreground: #e5f2eb;
  --popover: #22352e;
  --popover-foreground: #e5f2eb;
  --primary: #6ee7b7;
  --primary-foreground: #000000;
  --secondary: #22352e;
  --secondary-foreground: #e5f2eb;
  --muted: #1d2d27;
  --muted-foreground: #9bb8aa;
  --accent: #244b3b;
  --accent-foreground: #d1fae5;
  --destructive: #fb7185;
  --border: #345247;
  --input: #345247;
  --ring: #6ee7b7;
  --chart-1: #6ee7b7;
  --chart-2: #93c5fd;
  --chart-3: #fcd34d;
  --chart-4: #c4b5fd;
  --chart-5: #fda4af;
  --sidebar: #0b1511;
  --sidebar-foreground: #e5f2eb;
  --sidebar-primary: #6ee7b7;
  --sidebar-primary-foreground: #000000;
  --sidebar-accent: #244b3b;
  --sidebar-accent-foreground: #d1fae5;
  --sidebar-border: #345247;
  --sidebar-ring: #6ee7b7;
}
```

## 20. Amber Terminal

```css
.dark {
  color-scheme: dark;
  --background: #171717;
  --foreground: #f5f5f4;
  --card: #202020;
  --card-foreground: #f5f5f4;
  --popover: #292929;
  --popover-foreground: #f5f5f4;
  --primary: #fbbf24;
  --primary-foreground: #000000;
  --secondary: #292929;
  --secondary-foreground: #f5f5f4;
  --muted: #242424;
  --muted-foreground: #a3a3a3;
  --accent: #493813;
  --accent-foreground: #fef3c7;
  --destructive: #f87171;
  --border: #3f3f3f;
  --input: #3f3f3f;
  --ring: #fbbf24;
  --chart-1: #fbbf24;
  --chart-2: #4ade80;
  --chart-3: #60a5fa;
  --chart-4: #c084fc;
  --chart-5: #fb7185;
  --sidebar: #111111;
  --sidebar-foreground: #f5f5f4;
  --sidebar-primary: #fbbf24;
  --sidebar-primary-foreground: #000000;
  --sidebar-accent: #493813;
  --sidebar-accent-foreground: #fef3c7;
  --sidebar-border: #3f3f3f;
  --sidebar-ring: #fbbf24;
}
```

## 21. Cyberpunk

```css
.dark {
  color-scheme: dark;
  --background: #0b1020;
  --foreground: #e6f7ff;
  --card: #111a2e;
  --card-foreground: #e6f7ff;
  --popover: #17233b;
  --popover-foreground: #e6f7ff;
  --primary: #22d3ee;
  --primary-foreground: #000000;
  --secondary: #1b2942;
  --secondary-foreground: #e6f7ff;
  --muted: #152037;
  --muted-foreground: #8ba7c2;
  --accent: #3b1d54;
  --accent-foreground: #f5d0fe;
  --destructive: #fb7185;
  --border: #263b58;
  --input: #263b58;
  --ring: #22d3ee;
  --chart-1: #22d3ee;
  --chart-2: #e879f9;
  --chart-3: #a3e635;
  --chart-4: #fbbf24;
  --chart-5: #60a5fa;
  --sidebar: #070c18;
  --sidebar-foreground: #e6f7ff;
  --sidebar-primary: #22d3ee;
  --sidebar-primary-foreground: #000000;
  --sidebar-accent: #3b1d54;
  --sidebar-accent-foreground: #f5d0fe;
  --sidebar-border: #263b58;
  --sidebar-ring: #22d3ee;
}
```

## 22. Ocean Teal

```css
.dark {
  color-scheme: dark;
  --background: #0f2027;
  --foreground: #e6f4f1;
  --card: #163039;
  --card-foreground: #e6f4f1;
  --popover: #1b3b44;
  --popover-foreground: #e6f4f1;
  --primary: #2dd4bf;
  --primary-foreground: #000000;
  --secondary: #1b3b44;
  --secondary-foreground: #e6f4f1;
  --muted: #18343b;
  --muted-foreground: #9abbb9;
  --accent: #164e63;
  --accent-foreground: #cffafe;
  --destructive: #fb7185;
  --border: #2c5158;
  --input: #2c5158;
  --ring: #2dd4bf;
  --chart-1: #2dd4bf;
  --chart-2: #93c5fd;
  --chart-3: #fcd34d;
  --chart-4: #c4b5fd;
  --chart-5: #fda4af;
  --sidebar: #0a191f;
  --sidebar-foreground: #e6f4f1;
  --sidebar-primary: #2dd4bf;
  --sidebar-primary-foreground: #000000;
  --sidebar-accent: #164e63;
  --sidebar-accent-foreground: #cffafe;
  --sidebar-border: #2c5158;
  --sidebar-ring: #2dd4bf;
}
```

## 23. Burgundy

```css
.dark {
  color-scheme: dark;
  --background: #1c1017;
  --foreground: #f9eaf0;
  --card: #2a1721;
  --card-foreground: #f9eaf0;
  --popover: #351d2a;
  --popover-foreground: #f9eaf0;
  --primary: #fb7185;
  --primary-foreground: #000000;
  --secondary: #351d2a;
  --secondary-foreground: #f9eaf0;
  --muted: #2a1721;
  --muted-foreground: #c3a0af;
  --accent: #512338;
  --accent-foreground: #ffe4e6;
  --destructive: #fda4af;
  --border: #50303e;
  --input: #50303e;
  --ring: #fb7185;
  --chart-1: #fb7185;
  --chart-2: #86efac;
  --chart-3: #fcd34d;
  --chart-4: #93c5fd;
  --chart-5: #d8b4fe;
  --sidebar: #160b11;
  --sidebar-foreground: #f9eaf0;
  --sidebar-primary: #fb7185;
  --sidebar-primary-foreground: #000000;
  --sidebar-accent: #512338;
  --sidebar-accent-foreground: #ffe4e6;
  --sidebar-border: #50303e;
  --sidebar-ring: #fb7185;
}
```

## 24. Indigo

```css
.dark {
  color-scheme: dark;
  --background: #141629;
  --foreground: #eef0ff;
  --card: #1d2038;
  --card-foreground: #eef0ff;
  --popover: #262b49;
  --popover-foreground: #eef0ff;
  --primary: #a5b4fc;
  --primary-foreground: #000000;
  --secondary: #262b49;
  --secondary-foreground: #eef0ff;
  --muted: #20243e;
  --muted-foreground: #a3a9cc;
  --accent: #30366b;
  --accent-foreground: #e0e7ff;
  --destructive: #fb7185;
  --border: #373d63;
  --input: #373d63;
  --ring: #a5b4fc;
  --chart-1: #a5b4fc;
  --chart-2: #6ee7b7;
  --chart-3: #fcd34d;
  --chart-4: #f0abfc;
  --chart-5: #fb7185;
  --sidebar: #101225;
  --sidebar-foreground: #eef0ff;
  --sidebar-primary: #a5b4fc;
  --sidebar-primary-foreground: #000000;
  --sidebar-accent: #30366b;
  --sidebar-accent-foreground: #e0e7ff;
  --sidebar-border: #373d63;
  --sidebar-ring: #a5b4fc;
}
```

## 25. Copper

```css
.dark {
  color-scheme: dark;
  --background: #181411;
  --foreground: #d8cbc3;
  --card: #241d1a;
  --card-foreground: #d8cbc3;
  --popover: #2e2420;
  --popover-foreground: #d8cbc3;
  --primary: #e59a72;
  --primary-foreground: #000000;
  --secondary: #2e2420;
  --secondary-foreground: #d8cbc3;
  --muted: #27201c;
  --muted-foreground: #b8a398;
  --accent: #443025;
  --accent-foreground: #e6d6cb;
  --destructive: #fb7185;
  --border: #40312b;
  --input: #40312b;
  --ring: #e59a72;
  --chart-1: #e59a72;
  --chart-2: #a3e635;
  --chart-3: #67e8f9;
  --chart-4: #c4b5fd;
  --chart-5: #fb7185;
  --sidebar: #130f0d;
  --sidebar-foreground: #d8cbc3;
  --sidebar-primary: #e59a72;
  --sidebar-primary-foreground: #000000;
  --sidebar-accent: #443025;
  --sidebar-accent-foreground: #e6d6cb;
  --sidebar-border: #40312b;
  --sidebar-ring: #e59a72;
}
```

---

## Recommended picks

- **Best general-purpose developer dashboard:** GitHub Dark
- **Best for long sessions / softer contrast:** GitHub Dimmed
- **Best if your product uses red branding:** Zinc + Coral
- **Best for logistics / operations:** Slate + Emerald
- **Best for AI products:** Neutral + Violet
- **Best for OLED displays:** AMOLED
- **Best warm premium appearance:** Warm Graphite or Copper

## Implementation notes

### 1. Keep semantic colors separate

Do not use the primary brand color for every status. Reserve status colors for meaning:

- Success: green
- Warning: amber/yellow
- Error/destructive: red
- Informational: blue or cyan

### 2. Keep the surface hierarchy restrained

A reliable dark-mode hierarchy is:

- `--background`: darkest broad surface
- `--sidebar`: same level or slightly darker than background
- `--card`: one level lighter than background
- `--popover`: slightly lighter than card
- `--border`: subtle, but visible around interactive controls

Avoid making every surface a different gray; too many layers can make a dashboard visually noisy.

### 3. `--input` and borders

Some shadcn components use `--input` as a border color, while custom components may use it as a background. In this collection, `--input` is configured as a border color to match common shadcn conventions. If your project uses it as an input fill, set a separate token such as `--field-background`.

### 4. Tailwind v4 theme mapping

Your existing mapping can stay as-is:

```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}
```

### 5. Theme selector

Only one `.dark` scheme should be active at a time. For runtime switching, store the selected scheme name and apply a class or data attribute, for example:

```html
<html class="dark" data-color-scheme="github-dark">
```

If you choose `data-color-scheme`, change the selector for each palette from `.dark` to a combined selector, for example:

```css
.dark[data-color-scheme='github-dark'] {
  /* GitHub Dark tokens */
}
```

Or use separate scheme classes such as `.theme-github-dark`, `.theme-github-dimmed`, and `.theme-zinc-coral`.

### 6. Fix the dark variant selector if needed

For Tailwind CSS v4, a common class-based dark variant is:

```css
@custom-variant dark (&:where(.dark, .dark *));
```

Use the exact selector expected by your app and shadcn setup; do not include extra `*` characters around CSS selectors.


## Accessibility and accuracy notes (revised)

- All 50 palettes were programmatically checked for WCAG 2.x AA contrast (at least 4.5:1) on the primary foreground/background pairs, including buttons, cards, muted text, sidebar and selection text. Most ordinary foreground text is targeted at 7:1.
- Border, input, focus-ring, chart and destructive-state colors still require component-level inspection against their actual adjacent surfaces; WCAG compliance for the full UI cannot be guaranteed by a token file alone.
- GitHub palettes use Primer-inspired base colors and semantic mapping into shadcn/ui tokens. These are **adaptations**, not an exact one-to-one reproduction of the GitHub UI. The light soft variant is custom, as Primer does not ship an official “GitHub Dimmed Light” theme.
- Official Primer theme tokens: https://github.com/primer/primitives and https://primer.style/primitives/ .
