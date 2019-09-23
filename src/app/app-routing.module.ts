import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TextListComponent } from './components/text-list/text-list.component';
import { VocabularyComponent } from './components/vocabulary/vocabulary.component';

const routes: Routes = [
  { path: '', redirectTo: 'text-list', pathMatch: 'full' },
  { path: 'text-list', component: TextListComponent },
  { path: 'vocabulary', component: VocabularyComponent },
  // { path: 'quastion', component: CreatequastionComponent, canActivate: [AuthGuard] },
  // { path: 'quastion/:id', component: QuastionComponent },
  // { path: 'editquastion/:id', component: EditQuestionComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
