import { Between, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';

export class TimeRangeParams {
  public readonly fromTime: Date | undefined;
  public readonly toTime: Date | undefined;

  constructor(fromTime: Date | undefined, toTime: Date | undefined) {
    this.fromTime = fromTime;
    this.toTime = toTime;
  }

  timeRange() {
    if (this.fromTime && this.toTime) {
      return Between(this.fromTime, this.toTime);
    } else if (this.fromTime) {
      return MoreThanOrEqual(this.fromTime);
    } else if (this.toTime) {
      return LessThanOrEqual(this.fromTime);
    }
    return undefined;
  }
}
