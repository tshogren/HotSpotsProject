import { NgModule } from '@angular/core';
import { SuggestionCardComponent } from './suggestion-card/suggestion-card';
import {IonicModule} from "ionic-angular";
@NgModule({
	declarations: [SuggestionCardComponent],
	imports: [IonicModule],
	exports: [SuggestionCardComponent]
})
export class ComponentsModule {}
