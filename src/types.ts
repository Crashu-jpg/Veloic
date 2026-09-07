export interface MetricItem {
  id: string;
  label: string;
  value: string;
  suffix?: string;
  change: string;
  isPositive: boolean;
}

export interface FeatureCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
  iconName: string;
  span?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface EdgeRegion {
  id: string;
  name: string;
  code: string;
  ping: number;
  status: 'Optimal' | 'Fast';
  coords: { x: number; y: number };
}
