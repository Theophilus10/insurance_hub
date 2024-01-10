export const convertDataToSelectObject = (
  data: any,
  label: string = 'name',
  value: any = 'id'
) => {
  if (!data) return [];
  return data.map((item: any) => ({
    label: item[label],
    value: item[value],
  }));
};
