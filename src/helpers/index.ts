export const convertDataToSelectObject = (
  data: any,
  label: string = "name",
  value: any = "id"
) => {
  if (!data) return [];
  return data.map((item: any) => ({
    label: item[label],
    value: item[value],
  }));
};
export const convertDataToSelectObjectWithDescription = (
  fire_risk_classes: any,
  label: string = "description",
  value: any = "id"
) => {
  if (!fire_risk_classes) return [];
  return fire_risk_classes.map((item: any) => ({
    label: item[label],
    value: item[value],
  }));
};

export const convertDataToSelectObjectNameAsValue = (
  data: any,
  label: string = "name",
  value: any = "name"
) => {
  if (!data) return [];
  return data.map((item: any) => ({
    label: item[label],
    value: item[value],
  }));
};

export const validateForm = (
  stateSetter: (parameter: object) => void,
  values: { [key: string]: string | number }
) => {
  const errors: Record<string, string> = {};
  Object.keys(values).forEach((key) => {
    const value = values[key];

    if (typeof value === "string" && value.trim() === "" && key !== "id") {
      errors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
    } else if (typeof value === "number" && isNaN(value) && key !== "id") {
      errors[key] = `${
        key.charAt(0).toUpperCase() + key.slice(1)
      } must be a valid number`;
    }
  });

  stateSetter(errors);
  return Object.values(errors).every((error) => !error);
};
