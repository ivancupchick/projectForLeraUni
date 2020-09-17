import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TextListComponent } from './components/text-list/text-list.component';
import { VocabularyComponent } from './components/vocabulary/vocabulary.component';
import { ViewerComponent } from './components/viewer/viewer.component';
import {TagDefinitionComponent} from './components/tag-definition/tag-definition.component';
import {AnnotatedTextComponent} from './components/annotated-text/annotated-text.component';
import {AnnotatedViewerComponent} from './components/annotated-viewer/annotated-viewer.component';
import {StatisticsViewerComponent} from './components/statistics-viewer/statistics-viewer.component';

const routes: Routes = [
  { path: '', redirectTo: 'text-list', pathMatch: 'full' },
  { path: 'text-list', component: TextListComponent },
  { path: 'vocabulary', component: VocabularyComponent },
  { path: 'viewer', component: ViewerComponent },
  { path: 'tag-definition', component: TagDefinitionComponent },
  { path: 'annotated-text', component: AnnotatedTextComponent },
  { path: 'annotated-viewer', component: AnnotatedViewerComponent },
  { path: 'statistics-viewer', component: StatisticsViewerComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
