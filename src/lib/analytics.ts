// Analytics utility - supports multiple providers
// Currently: Cloudflare Web Analytics (free)
// To add Plausible: replace with plausible() calls

declare global {
  interface Window {
    // Cloudflare
    cfanalytics?: (event: string, options?: { props?: Record<string, string | number | boolean> }) => void;
    // Or Plausible (if upgraded later)
    plausible?: (event: string, options?: { props?: Record<string, string | number | boolean> }) => void;
  }
}

type AnalyticsProvider = 'cloudflare' | 'plausible' | 'none';

// Change this to switch analytics providers
const ANALYTICS_PROVIDER: AnalyticsProvider = 'cloudflare';

export function track(
  event: string,
  props?: Record<string, string | number | boolean>
): void {
  if (typeof window === 'undefined') return;

  switch (ANALYTICS_PROVIDER) {
    case 'cloudflare':
      if (window.cfanalytics) {
        window.cfanalytics(event, { props });
      }
      break;
    case 'plausible':
      if (window.plausible) {
        window.plausible(event, { props });
      }
      break;
    case 'none':
    default:
      // No-op in development or when analytics disabled
      break;
  }
}

// Pre-defined event names
export const AnalyticsEvents = {
  // Lead events
  LEAD_FORM_OPEN: 'lead_form_opened',
  LEAD_FORM_SUBMIT: 'lead_form_submitted',
  LEAD_FORM_CANCEL: 'lead_form_cancelled',

  // Coffee shop events
  COFFEE_SHOP_VIEW: 'coffee_shop_viewed',
  DIRECTIONS_CLICK: 'directions_clicked',
  INSTAGRAM_CLICK: 'instagram_clicked',
  PHONE_CLICK: 'phone_clicked',

  // Submission events
  SUBMISSION_FORM_OPEN: 'submission_form_opened',
  SUBMISSION_SUBMIT: 'submission_submitted',

  // Navigation events
  EXPLORE_CLICK: 'explore_clicked',
  ADD_COFFEE_SHOP_CLICK: 'add_coffee_shop_clicked',

  // Filter events
  FILTER_APPLIED: 'filter_applied',
  FILTER_CLEARED: 'filter_cleared',
  SEARCH_PERFORMED: 'search_performed',
} as const;

export type AnalyticsEventName = (typeof AnalyticsEvents)[keyof typeof AnalyticsEvents];
