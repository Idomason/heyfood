// Helper to convert snake_case to camelCase
export const toCamelCase = (obj: any): any => {
    return Object.keys(obj).reduce((acc, key) => {
      const camelKey = key.replace(/_([a-z])/g, (_, p1) => p1.toUpperCase());
      acc[camelKey] = obj[key];
      return acc;
    }, {} as any);
  };