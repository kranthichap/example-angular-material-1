import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatMenuModule, MatButtonModule, MatIconModule, MatCardModule, MatToolbar, MatBasicChip, MatButton, MatMenuItem, MatMenuContent, MatMenu, MatTab, MatDialog } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MenudemoComponent } from './menudemo/menudemo.component';



@NgModule({
  declarations: [
    AppComponent,
    MenudemoComponent,
    MatToolbar
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatToolbar,
    MatButton,
    MatMenuItem,
    MatMenuContent,
    MatMenu,
    MatTab,
    MatDialog
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
