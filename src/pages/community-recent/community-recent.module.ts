import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommunityRecentPage } from './community-recent';
import {ComponentsModule} from "../../components/components.module";
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    CommunityRecentPage,
  ],
  imports: [
    IonicPageModule.forChild(CommunityRecentPage),
    ComponentsModule,
    PipesModule
  ],
})
export class CommunityRecentPageModule {}
