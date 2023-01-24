import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';

import { CommonComponent } from 'src/app/shared/components/generic/common-component';
import { FetchStatus } from 'src/app/shared/enums/fetch-status.enum';
import { UserService } from '../../services/user.service';
import { User } from '../users-layout/user.interface';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details-layout.component.html',
  styleUrls: ['./user-details-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailsLayoutComponent
  extends CommonComponent
  implements OnInit, OnDestroy
{
  public user: User | undefined;

  private userSubscription: Subscription;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    super();
  }

  public ngOnInit(): void {
    this.userSubscription = this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.fetchStatus = FetchStatus.LOADING;
          return this.userService.fetchById(Number(params.get('id')));
        })
      )
      .subscribe({
        next: (res: User) => {
          this.user = res;
          this.fetchStatus = FetchStatus.COMPLETED;
          this.changeDetectorRef.detectChanges();
        },
        error: (err: HttpErrorResponse) => {
          this.handleFetchError(err);
          this.fetchStatus = FetchStatus.ERROR;
          this.changeDetectorRef.detectChanges();
        },
      });
  }

  public ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  private handleFetchError(error: HttpErrorResponse): void {
    this.errorMsg =
      error.status === 404
        ? "Sorry! Can't find user with such id."
        : error.message;
  }
}
