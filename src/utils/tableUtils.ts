export interface NestedObject {
  [key: string]: NestedObject | unknown;
}

export const findMaxDepth = (obj: NestedObject, depth: number = 0): number => {
  if (typeof obj !== "object" || obj === null || Object.keys(obj).length === 0)
    return depth;
  return Math.max(
    ...Object.values(obj).map((child) =>
      findMaxDepth(child as NestedObject, depth + 1)
    )
  );
};

export function convertToArray(
  obj: Record<string, unknown>,
  path: string[] = [],
  result: string[][] = [],
  lastItems: string[] = [],
  maxDepth: number = Infinity
) {
  const keys = Object.keys(obj);

  keys.forEach((key, index) => {
    const newPath = [...path, key];
    const isLastAtThisLevel = index === keys.length - 1;
    const children =
      typeof obj[key] === "object" && obj[key] !== null
        ? Object.keys(obj[key] as object)
        : [];

    if (children.length === 0 || newPath.length >= maxDepth) {
      // Stop adding further if maxDepth is reached
      result.push([...newPath]);

      if (isLastAtThisLevel) {
        lastItems.push(key);
      }
    } else {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        convertToArray(
          obj[key] as Record<string, unknown>,
          newPath,
          result,
          lastItems,
          maxDepth
        );
      }
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
  baseNum: number | string,
  maxDepth: number,
  currentDepth = 1,
  currentPath = baseNum.toString()
) => {
  if (currentDepth > maxDepth) {
    return {};
  }

  const result: Record<string, unknown> = {};
  const newKey = currentDepth === 1 ? baseNum.toString() : `${currentPath}.1`;

  result[newKey] = createNestedStructure(
    baseNum,
    maxDepth,
    currentDepth + 1,
    newKey
  );

  return result;
};
