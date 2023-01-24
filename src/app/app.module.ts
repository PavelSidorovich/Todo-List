import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { TodosLayoutComponent } from './core/components/todos-layout/todos-layout.component';
import { AppRoutingModule } from './app-routing.module';
import { TodoCardComponent } from './core/components/todo-card/todo-card.component';
import { MaterialModule } from './material.module';
import { ModalWindowComponent } from './core/components/modal-window/modal-window.component';
import { SharedModule } from './shared/shared.module';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { PageNotFoundLayoutComponent } from './core/components/page-not-found-layout/page-not-found-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundLayoutComponent,
    TodosLayoutComponent,
    TodoCardComponent,
    ModalWindowComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
