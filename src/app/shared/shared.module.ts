import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { MaterialModule } from './material.module';
import { RouterModule } from '@angular/router';
import { HoverDirective } from './directives/hover.directive';
import { UppercasePipe } from './pipes/uppercase.pipe';

@NgModule({
  declarations: [SearchBarComponent, HoverDirective, UppercasePipe],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterModule,
    MaterialModule,
  ],
  exports: [SearchBarComponent, MaterialModule, HoverDirective, UppercasePipe],
})
export class SharedModule {}
