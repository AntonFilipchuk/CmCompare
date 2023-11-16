import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoinsTableComponent } from './components/coins-table/coins-table.component';
import { CoinsTableRowComponent } from './components/coins-table/coins-table-row/coins-table-row/coins-table-row.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TestTableComponent } from './components/test-table/test-table.component';
import { LoadingOrErrorComponent } from './components/loading-or-error/loading-or-error.component';
import { CoinInfoCellComponent } from './components/coins-table/coin-info-cell/coin-info-cell.component';
import { CoinDashboardComponent } from './components/coin-dashboard/coin-dashboard.component';
import { TestOneComponent } from './components/Test/test-one/test-one/test-one.component';
import { ApiInterceptor } from './Interceptors/ApiInterceptor';
import { TestTwoComponent } from './components/Test/test-two/test-two.component';
import { CoinsComponent } from './components/coins/coins.component';

@NgModule({
  declarations: [
    AppComponent,
    CoinsTableComponent,
    CoinsTableRowComponent,
    TestTableComponent,
    LoadingOrErrorComponent,
    CoinInfoCellComponent,
    CoinDashboardComponent,
    TestOneComponent,
    TestTwoComponent,
    CoinsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    DragDropModule
  ],
  providers: [
    //{ provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
