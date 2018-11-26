import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SuggestFormPage } from './suggest-form';

@NgModule({
  declarations: [
    SuggestFormPage,
  ],
  imports: [
    IonicPageModule.forChild(SuggestFormPage),
  ],
})
export class SuggestFormPageModule {}
