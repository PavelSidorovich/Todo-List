import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';

import { CustomHttpResponse } from 'src/app/shared/interfaces/custom-http-response.interface';
import { UserService } from '../../services/user.service';
import { User } from '../users-layout/user.interface';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details-layout.component.html',
  styleUrls: ['./user-details-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailsLayoutComponent implements OnInit, OnDestroy {
  public user?: User;
  public isLoading: boolean = false;
  public errorMsg: string = '';

  private _userSubscription: Subscription;

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _changeDetectorRef: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.isLoading = true;
    this._userSubscription = this._route.paramMap
      .pipe(
        switchMap((params) =>
          this._userService.fetchById(Number(params.get('id')))
        )
      )
      .subscribe((res: CustomHttpResponse<User>) => {
        if (res.errorMsg) {
          this.errorMsg =
            res.statusCode === 404
              ? "Sorry! Can't find user with such id."
              : res.errorMsg;
        } else {
          this.user = res.data;
          this._changeDetectorRef.detectChanges();
        }
        this.isLoading = false;
        this._changeDetectorRef.detectChanges();
      });
  }

  public ngOnDestroy(): void {
    this._userSubscription.unsubscribe();
  }
}
