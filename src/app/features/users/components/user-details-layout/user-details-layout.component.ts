import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';

import { CustomHttpResponse } from 'src/app/shared/interfaces/custom-http-response.interface';
import { UserService } from '../../services/user.service';
import { WIDTH_BASED_COMPONENT } from '../../users.module';
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
    private _changeDetectorRef: ChangeDetectorRef,
    private _viewContainerRef: ViewContainerRef,
    @Inject(WIDTH_BASED_COMPONENT) private _componentToken: any
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

    this._viewContainerRef.createComponent(this._componentToken);
  }

  public ngOnDestroy(): void {
    this._userSubscription.unsubscribe();
  }
}
