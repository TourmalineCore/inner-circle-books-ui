// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deepCompareObjects = (a: any, b: any): boolean => JSON.stringify(a) === JSON.stringify(b)
