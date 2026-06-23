export const analyticsService = {
  logEvent: (event: string, params?: Record<string, any>) => {
    console.log(`[ANALYTICS] Event: ${event}`, params);
  },
};
