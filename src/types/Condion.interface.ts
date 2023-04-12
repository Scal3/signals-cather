// interface CondionResult {
//   result: string;

// }

export interface Condition {
  checkCondition(array: number[], eventTime: number): string;
}