import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommunityTopPage } from './community-top';
import {ComponentsModule} from "../../components/components.module";
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    CommunityTopPage,
  ],
  imports: [
    IonicPageModule.forChild(CommunityTopPage),
    ComponentsModule,
    PipesModule
  ],
})
export class CommunityTopPageModule {}
