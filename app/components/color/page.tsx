import type { Metadata } from 'next';

import ColorGuideClient from './color-guide-client';

export const metadata: Metadata = {
  title: 'Color - UI Design System',
  description: 'Choose a color schema and copy its light and dark theme configuration.',
};

export default function ColorGuidePage() {
  return <ColorGuideClient />;
}
