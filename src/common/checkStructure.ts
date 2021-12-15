export function checkRequestStructure(
  param: any,
  instanceOfClass: any
): boolean {
  let result: boolean = true;
  const correctStructure = Object.keys(instanceOfClass);
  const requestStructure = Object.keys(param);

  requestStructure.forEach((key: string) => {
    if (key in correctStructure != true) {
      result = false;
    }
  });
  return result;
}
