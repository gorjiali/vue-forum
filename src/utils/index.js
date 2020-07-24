const countObjectProperties = (obj) => {
  if (typeof obj === 'object') {
    return Object.values(obj).length;
  }
  return 0;
};

const removeEmptyProperties = (obj) => {
  let copyObj = { ...obj };
  Object.keys(copyObj).forEach(key => {
    if (!copyObj[key]) delete copyObj[key]
  })
  return copyObj
}

export {
  countObjectProperties,
  removeEmptyProperties
}
