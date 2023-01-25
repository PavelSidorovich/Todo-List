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
import { CustomHttpResponse } from 'src/app/shared/interfaces/custom-http-response.interface';
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
  public user?: User;

  private _userSubscription: Subscription;

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _changeDetectorRef: ChangeDetectorRef
  ) {
    super();
  }

  public ngOnInit(): void {
    this._userSubscription = this._route.paramMap
      .pipe(
        switchMap((params) => {
          this.fetchStatus = FetchStatus.LOADING;
          return this._userService.fetchById(Number(params.get('id')));
        })
      )
      .subscribe((res: CustomHttpResponse<User>) => {
        if (res.errorMsg) {
          this.errorMsg =
            res.statusCode === 404
              ? "Sorry! Can't find user with such id."
              : res.errorMsg;
          this.fetchStatus = FetchStatus.ERROR;
        } else {
          this.user = res.data;
          this.fetchStatus = FetchStatus.COMPLETED;
          this._changeDetectorRef.detectChanges();
        }
        this._changeDetectorRef.detectChanges();
      });
  }

  public ngOnDestroy(): void {
    this._userSubscription.unsubscribe();
  }
}
