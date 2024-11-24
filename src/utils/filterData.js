export const filterData = (data, defaultValues = {}) => {
  return Object.fromEntries(
    Object.entries(data).filter(([key, value]) => {
      if (key === 'projects') {
        //exclude projects
        if (Array.isArray(value) && defaultValues[key]) {
          const areProjectsEqual =
            JSON.stringify(value) === JSON.stringify(defaultValues[key]);

          if (areProjectsEqual) {
            return false;
          }
        }
      }

      // fro create
      if (defaultValues[key] === undefined) {
        return value !== undefined && value !== '';
      }

      // fro update
      return defaultValues[key] !== value;
    })
  );
};
