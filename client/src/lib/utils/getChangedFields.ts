export function getChangedFields<T extends Record<string, unknown>>(
  newData: T,
  oldData: Partial<T>,
): Partial<T> {
  return Object.keys(newData).reduce((result, key) => {
    const typedKey = key as keyof T;

    if (typedKey in oldData && newData[typedKey] !== oldData[typedKey]) {
      result[typedKey] = newData[typedKey];
    }

    return result;
  }, {} as Partial<T>);
}
