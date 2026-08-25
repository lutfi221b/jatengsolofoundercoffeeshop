// Analytics utility - Cloudflare Web Analytics
// https://developers.cloudflare.com/analytics/web-analytics/

declare global {
  interface Window {
    cfanalytics?: (event: string, options?: { props?: Record<string, string | number | boolean> }) => void;
  }
}

export function track(
  event: string,
  props?: Record<string, string | number | boolean>
): void {
  if (typeof window === 'undefined') return;

  // Cloudflare Web Analytics custom events
  if (window.cfanalytics) {
    window.cfanalytics(event, { props });
  }

  // Debug log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', event, props);
  }
}

export const AnalyticsEvents = {
  LEAD_FORM_OPEN: 'lead_form_opened',
  LEAD_FORM_SUBMIT: 'lead_form_submitted',
  DIRECTIONS_CLICK: 'directions_clicked',
  INSTAGRAM_CLICK: 'instagram_clicked',
  PHONE_CLICK: 'phone_clicked',
  SUBMISSION_SUBMIT: 'submission_submitted',
  FILTER_CLEARED: 'filter_cleared',
  SEARCH_PERFORMED: 'search_performed',
} as const;
