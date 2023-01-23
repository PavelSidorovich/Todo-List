import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [],
  imports: [
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatInputModule,
  ],
  exports: [
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatInputModule,
  ],
})
export class MaterialModule {}
