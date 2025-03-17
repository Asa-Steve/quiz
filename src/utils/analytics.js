import ReactGA from "react-ga4";
const key = import.meta.env.VITE_G_ANALYTICS_KEY;

const TRACKING_ID = key; // Replace with your Measurement ID
ReactGA.initialize(TRACKING_ID);

export const trackEvent = (category, action, label) => {
  ReactGA.event({
    category,
    action,
    label,
  });
};

export const trackUserTiming = (category, variable, value) => {
  ReactGA.timing({
    category,
    variable,
    value, // Time in milliseconds
  });
};
