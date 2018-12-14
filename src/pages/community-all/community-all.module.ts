import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommunityAllPage } from './community-all';
import { ComponentsModule } from "../../components/components.module";
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    CommunityAllPage,
  ],
  imports: [
    IonicPageModule.forChild(CommunityAllPage),
    ComponentsModule,
    PipesModule
  ],
})
export class CommunityAllPageModule {}
