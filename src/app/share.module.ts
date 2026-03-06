import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { Loader } from './shared/components/loader/loader';
import { NoData } from './shared/components/no-data/no-data';

@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      MatIconModule,
      MatButtonModule,
      Loader,
      NoData,
      RouterModule,
      MatProgressSpinnerModule,
   ],
   exports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      MatIconModule,
      MatButtonModule,
      Loader,
      NoData,
      RouterModule,
      MatProgressSpinnerModule,
   ]
})
export class SharedModule { }