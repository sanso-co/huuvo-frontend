import ReactGA from "react-ga4";

const GA_MEASUREMENT_ID = "G-0HFVR37Z1C";

export const initializeGA = (): void => {
    ReactGA.initialize(GA_MEASUREMENT_ID);
};

export const trackPageView = (path: string): void => {
    ReactGA.send({ hitType: "pageview", page: path });
};

export const trackEvent = (category: string, action: string, label?: string): void => {
    ReactGA.event({
        category,
        action,
        label,
    });
};
