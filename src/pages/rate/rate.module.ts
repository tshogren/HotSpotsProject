import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RatePage } from './rate';
import {ComponentsModule} from "../../components/components.module";
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    RatePage,
  ],
  imports: [
    IonicPageModule.forChild(RatePage),
    ComponentsModule,
    PipesModule
  ],
})
export class RatePageModule {}
