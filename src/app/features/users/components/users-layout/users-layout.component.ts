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

  private users: User[] = [];
  private usersSubsription: Subscription;
  @ViewChild('searchBar') private searchComponent: SearchBarComponent;

  constructor(
    private userService: UserService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    super();
  }

  public ngAfterViewInit(): void {
    this.fetchUsers();
  }

  public ngOnDestroy(): void {
    this.usersSubsription.unsubscribe();
  }

  private fetchUsers(): void {
    this.fetchStatus = FetchStatus.LOADING;
    this.usersSubsription = this.userService.fetchAll().subscribe({
      next: (data: User[]) => {
        this.users = data;
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
    const filter = this.searchComponent.filterValue.toLowerCase();

    this.filteredUsers = this.users.filter((user) => {
      return (
        user.name.includes(filter) ||
        user.username.includes(filter) ||
        user.email.includes(filter)
      );
    });
    this.changeDetectorRef.detectChanges();
  }
}
