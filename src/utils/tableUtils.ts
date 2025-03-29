export const findMaxDepth = (obj, depth = 0) => {
  if (typeof obj !== "object" || Object.keys(obj).length === 0) return depth;
  return Math.max(
    ...Object.values(obj).map((child) => findMaxDepth(child, depth + 1))
  );
};

export function convertToArray(
  obj,
  path = [],
  result = [],
  lastItems = [],
  maxDepth = Infinity
) {
  const keys = Object.keys(obj);

  keys.forEach((key, index) => {
    const newPath = [...path, key];
    const isLastAtThisLevel = index === keys.length - 1;
    const children = Object.keys(obj[key]);

    if (children.length === 0 || newPath.length >= maxDepth) {
      // Stop adding further if maxDepth is reached
      result.push([...newPath]);

      if (isLastAtThisLevel) {
        lastItems.push(key);
      }
    } else {
      convertToArray(obj[key], newPath, result, lastItems, maxDepth);
      if (isLastAtThisLevel) {
        lastItems.push(key);
      }
    }
  });

  return {
    allPaths: result,
    lastItems: lastItems,
  };
}

export const createNestedStructure = (
  baseNum,
  maxDepth,
  currentDepth = 1,
  currentPath = baseNum.toString()
) => {
  if (currentDepth > maxDepth) {
    return {};
  }

  const result = {};
  const newKey = currentDepth === 1 ? baseNum.toString() : `${currentPath}.1`;

  result[newKey] = createNestedStructure(
    baseNum,
    maxDepth,
    currentDepth + 1,
    newKey
  );

  return result;
};
