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
import { FetchStatus } from 'src/app/shared/enums/fetch-status';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailsComponent
  extends CommonComponent
  implements OnInit, OnDestroy
{
  user: User | undefined;
  userSubscription: Subscription;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit(): void {
    this.userSubscription = this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.fetchStatus = FetchStatus.Loading;
          return this.userService.fetchById(Number(params.get('id')));
        })
      )
      .subscribe({
        next: (res: User) => {
          this.user = res;
          this.fetchStatus = FetchStatus.Completed;
          this.changeDetectorRef.detectChanges();
        },
        error: (err: HttpErrorResponse) => {
          this.handleFetchError(err);
          this.fetchStatus = FetchStatus.Error;
          this.changeDetectorRef.detectChanges();
        },
      });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  handleFetchError(error: HttpErrorResponse): void {
    this.errorMsg =
      error.status === 404
        ? "Sorry! Can't find user with such id."
        : error.message;
  }
}
