import { CanActivate } from '@angular/router';

export class TimeGuard implements CanActivate {
  public canActivate(): boolean {
    const currentTime = new Date();
    const limitTime = new Date();
    limitTime.setHours(12);
    return currentTime < limitTime;
  }
}
