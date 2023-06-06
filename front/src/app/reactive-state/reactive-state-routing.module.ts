import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidateListComponent } from './candidate-list/candidate-list.component';
import { SingleCandidateComponent } from './single-candidate/single-candidate.component';

const routes: Routes = [
  { path: 'candidates', component: CandidateListComponent },
  { path: 'candidates/:id', component: SingleCandidateComponent },
  { path: '', pathMatch: 'full', redirectTo: 'candidates' }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReactiveStateRoutingModule { }
