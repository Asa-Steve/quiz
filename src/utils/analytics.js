import ReactGA from "react-ga4";

const TRACKING_ID = "G-XXXXXXXXXX"; // Replace with your Measurement ID
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
