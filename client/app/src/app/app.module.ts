import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoinsTableComponent } from './components/coins-table/coins-table.component';
import { CoinsTableRowComponent } from './components/coins-table/coins-table-row/coins-table-row/coins-table-row.component';

@NgModule({
  declarations: [
    AppComponent,
    CoinsTableComponent,
    CoinsTableRowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }