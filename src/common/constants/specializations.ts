export enum Specialization {
  FRONTEND = 1,
  BACKEND = 2,
  ML = 3,
  DEVOPS = 4,
  QA = 5,
  DESIGN = 6,
  BUSINESS_AND_MANAGEMENT = 7,
  EMBEDDED = 8,
  GAMEDEV = 9,
  MARKETING = 10,
  INFORMATION_SECURITY = 11,
  PSYCOLOGY = 12,
  COPYWRITING_AND_EDITING = 13,
  LANGUAGES = 14,
}

export const SPECIALIZATION_LABELS: Record<Specialization, string> = {
  [Specialization.FRONTEND]: `Frontend`,
  [Specialization.BACKEND]: `Backend`,
  [Specialization.ML]: `ML`,
  [Specialization.DEVOPS]: `DevOps`,
  [Specialization.QA]: `QA`,
  [Specialization.DESIGN]: `Design`,
  [Specialization.BUSINESS_AND_MANAGEMENT]: `Business and Management`,
  [Specialization.EMBEDDED]: `Embedded`,
  [Specialization.GAMEDEV]: `Gamedev`,
  [Specialization.MARKETING]: `Marketing`,
  [Specialization.INFORMATION_SECURITY]: `Information Security`,
  [Specialization.PSYCOLOGY]: `Psycology`,
  [Specialization.COPYWRITING_AND_EDITING]: `Copywriting and Editing`,
  [Specialization.LANGUAGES]: `Languages`,
}

export const SPECIALIZATIONS = Object.values(Specialization)
  .filter(value => typeof value === `number`)
  .map(value => ({
    value: value as number,
    label: SPECIALIZATION_LABELS[value as Specialization],
  }))