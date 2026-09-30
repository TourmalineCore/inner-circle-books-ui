export enum AvailabilityStatus {
  InOffice = `InOffice`,
  OnHand = `OnHand`,
  OnYou = `OnYou`,
}

export const AVAILABILITY_STATUS_LABELS: Record<AvailabilityStatus, string> = {
  [AvailabilityStatus.InOffice]: `In Office`,
  [AvailabilityStatus.OnHand]: `On Hand`,
  [AvailabilityStatus.OnYou]: `On You`,
}
