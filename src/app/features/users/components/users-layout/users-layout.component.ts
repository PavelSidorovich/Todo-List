import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  AfterViewInit,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { CommonComponent } from 'src/app/shared/components/generic/common-component';
import { SearchBarComponent } from 'src/app/shared/components/search-bar/search-bar.component';
import { FetchStatus } from 'src/app/shared/enums/fetch-status.enum';
import { UserService } from '../../services/user.service';
import { User } from './user.interface';

@Component({
  selector: 'app-users-layout',
  templateUrl: './users-layout.component.html',
  styleUrls: ['./users-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersLayoutComponent
  extends CommonComponent
  implements AfterViewInit, OnDestroy
{
  public filteredUsers: User[] = [];

  private _users: User[] = [];
  private _usersSubsription: Subscription;
  @ViewChild('searchBar') private _searchComponent: SearchBarComponent;

  constructor(
    private _userService: UserService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {
    super();
  }

  public ngAfterViewInit(): void {
    this._fetchUsers();
  }

  public ngOnDestroy(): void {
    this._usersSubsription.unsubscribe();
  }

  private _fetchUsers(): void {
    this.fetchStatus = FetchStatus.LOADING;
    this._usersSubsription = this._userService.fetchAll().subscribe({
      next: (data: User[]) => {
        this._users = data;
        this.fetchStatus = FetchStatus.COMPLETED;
        this.filterUsers();
      },
      error: (err: HttpErrorResponse) => {
        this.fetchStatus = FetchStatus.ERROR;
        this.errorMsg = err.message;
      },
    });
  }

  public filterUsers(): void {
    const filter = this._searchComponent.filterValue.toLowerCase();

    this.filteredUsers = this._users.filter((user) => {
      return (
        user.name.includes(filter) ||
        user.username.includes(filter) ||
        user.email.includes(filter)
      );
    });
    this._changeDetectorRef.detectChanges();
  }
}
