import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersLayoutComponent } from './components/users-layout/users-layout.component';
import { UsersRoutingModule } from './users-routing.module';
import { UserService } from './services/user.service';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserDetailsLayoutComponent } from './components/user-details-layout/user-details-layout.component';
import { WebComponent } from './components/web/web.component';
import { AdaptiveComponent } from './components/adaptive/adaptive.component';

export const WIDTH_BASED_COMPONENT = new InjectionToken<any>(
  'Width based component'
);

const widthBasedComponentFactory = () => {
  if (window.innerWidth > 961) {
    return WebComponent;
  } else {
    return AdaptiveComponent;
  }
};

@NgModule({
  declarations: [
    UsersLayoutComponent,
    UserDetailsLayoutComponent,
    WebComponent,
    AdaptiveComponent,
  ],
  imports: [CommonModule, UsersRoutingModule, MaterialModule, SharedModule],
  providers: [
    UserService,
    { provide: WIDTH_BASED_COMPONENT, useFactory: widthBasedComponentFactory },
  ],
})
export class UsersModule {}
