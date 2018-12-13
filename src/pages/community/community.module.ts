import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommunityPage } from './community';
import {ComponentsModule} from "../../components/components.module";
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    CommunityPage,
  ],
  imports: [
    IonicPageModule.forChild(CommunityPage),
    ComponentsModule,
    PipesModule
  ],
})
export class CommunityPageModule {}
