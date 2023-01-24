import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SearchBarComponent],
  imports: [CommonModule, MaterialModule, FormsModule, RouterModule],
  exports: [SearchBarComponent],
})
export class SharedModule {}
