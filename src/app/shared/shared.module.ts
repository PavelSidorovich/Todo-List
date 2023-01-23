import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SearchBarComponent,
    PageNotFoundComponent,
  ],
  imports: [CommonModule, MaterialModule, FormsModule, RouterModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    SearchBarComponent,
    PageNotFoundComponent,
  ],
})
export class SharedModule {}
