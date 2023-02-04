import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  AfterViewInit,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { SearchBarComponent } from 'src/app/shared/components/search-bar/search-bar.component';
import { CustomHttpResponse } from 'src/app/shared/interfaces/custom-http-response.interface';
import { UserService } from '../../services/user.service';
import { User } from './user.interface';

@Component({
  selector: 'app-users-layout',
  templateUrl: './users-layout.component.html',
  styleUrls: ['./users-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersLayoutComponent implements AfterViewInit, OnDestroy {
  public filteredUsers: User[] = [];
  public isLoading: boolean = false;
  public errorMsg: string = '';

  private _users: User[] = [];
  private _usersSubsription: Subscription;
  @ViewChild('searchBar') private _searchComponent: SearchBarComponent;

  constructor(
    private _userService: UserService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {}

  public ngAfterViewInit(): void {
    this._fetchUsers();
  }

  public ngOnDestroy(): void {
    this._usersSubsription.unsubscribe();
  }

  private _fetchUsers(): void {
    this.isLoading = true;
    this._usersSubsription = this._userService
      .fetchAll()
      .subscribe((res: CustomHttpResponse<User[]>) => {
        if (res.errorMsg) {
          this.errorMsg = res.errorMsg;
        } else {
          this._users = res.data;
          this.filteredUsers = res.data;
        }
        this.isLoading = false;
        this._changeDetectorRef.detectChanges();
      });
  }

  public filterUsers(): void {
    const filter = this._searchComponent.filterValue.value?.toLowerCase() || '';

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
