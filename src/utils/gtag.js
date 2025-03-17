// const GA_TRACKING_ID = "G-W6678Q6LCJ"; // Replace with your Measurement ID

// // Load Google Analytics script dynamically
// export const initGA = () => {
//   window.dataLayer = window.dataLayer || [];
//   function gtag() {
//     window.dataLayer.push(arguments);
//   }
//   gtag("js", new Date());
//   gtag("config", GA_TRACKING_ID);

//   // Inject gtag.js into the page
//   const script = document.createElement("script");
//   script.async = true;
//   script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
//   document.head.appendChild(script);
// };

// export const trackEvent = (action, category, label) => {
//   window.gtag("event", action, {
//     event_category: category,
//     event_label: label,
//   });
// };

// export const trackTiming = (name, duration) => {
//   window.gtag("event", "timing_complete", {
//     name: name, // e.g., "Quiz Completion Time"
//     value: duration, // Duration in milliseconds
//     event_category: "Timing",
//   });
// };


const GA_TRACKING_ID = "G-W6678Q6LCJ"; // Replace with your single Measurement ID

export const initGA = () => {
  if (window.gtag) return; // Prevent duplicate initialization

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag; // Ensure gtag is available globally

  gtag("js", new Date());
  gtag("config", GA_TRACKING_ID);

  // Inject Google Analytics script
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  document.head.appendChild(script);
};

export const trackEvent = (action, category, label) => {
  if (!window.gtag) return; // Prevent errors if GA hasn't loaded
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
  });
};

export const trackTiming = (name, duration) => {
  if (!window.gtag) return;
  window.gtag("event", "timing_complete", {
    name,
    value: duration,
    event_category: "Timing",
  });
};
