export enum ProgressOfReading {
  NotReadAtAll = `NotReadAtAll`,
  ReadPartially = `ReadPartially`,
  ReadEntirely = `ReadEntirely`,
  Unknown = `Unknown`
}

export const PROGRESS_LABELS: Record<string, string> = {
  [ProgressOfReading.NotReadAtAll]: `Not Read At All`,
  [ProgressOfReading.ReadPartially]: `Read Partially`,
  [ProgressOfReading.ReadEntirely]: `Read Entirely`,
  [ProgressOfReading.Unknown]: `Unknown`,
}

export const PROGRESS_OPTIONS = Object.values(ProgressOfReading)
  .filter(value => typeof value === `string` && value !== ProgressOfReading.Unknown)
  .map(value => ({
    value: value as string,
    label: PROGRESS_LABELS[value as ProgressOfReading],
  }))