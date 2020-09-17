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
import {TagDefinitionComponent} from './components/tag-definition/tag-definition.component';
import {AnnotatedTextComponent} from './components/annotated-text/annotated-text.component';
import {AnnotatedViewerComponent} from './components/annotated-viewer/annotated-viewer.component';
import {StatisticsViewerComponent} from './components/statistics-viewer/statistics-viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    TextListComponent,
    VocabularyComponent,
    ViewerComponent,
    TagDefinitionComponent,
    AnnotatedTextComponent,
    AnnotatedViewerComponent,
    StatisticsViewerComponent
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
