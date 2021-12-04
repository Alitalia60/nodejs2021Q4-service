module.exports = function checkRequestStructure(param, instanceOfClass) {
  let result = true;
  const correctStructure = Object.keys(instanceOfClass);
  const requestStructure = Object.keys(param);

  requestStructure.forEach((key) => {
    if (correctStructure.indexOf(key) == -1) {
      console.log('Task model: Incorrect key=', key);
      result = false;
    }
  });
  return result;
};
