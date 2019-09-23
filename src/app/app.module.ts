import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TextListComponent } from './components/text-list/text-list.component';
import { HttpClientModule } from '@angular/common/http';
import { VocabularyComponent } from './components/vocabulary/vocabulary.component';
import { FormsModule } from '@angular/forms';
import { ViewerComponent } from './components/viewer/viewer.component';
import { ViewerService } from './service/viewer.service';

@NgModule({
  declarations: [
    AppComponent,
    TextListComponent,
    VocabularyComponent,
    ViewerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    ViewerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
