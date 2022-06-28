import { LoggerService } from './services/logger/logger.service';
import { GameLogicService } from './services/game-logic/game-logic.service';
import { GameLoopService } from './services/engine/services/game-loop.service';
import { EngineService } from './services/engine/engine.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AffinityTablesComponent } from './components/affinity-tables/affinity-tables.component';
import { LogComponent } from './components/log/log.component';
import { ActionSelectionComponent } from './components/action-selection/action-selection.component';
import { RoundCounterComponent } from './components/round-counter/round-counter.component';
import { EndScreenComponent } from './components/end-screen/end-screen.component';
import { MainScreenComponent } from './components/main-screen/main-screen.component';
import { AffinityDescriptionGeneratorComponent } from './components/affinity-tables/components/affinity-description-generator/affinity-description-generator.component';

@NgModule({
  declarations: [
    AppComponent,
    AffinityTablesComponent,
    LogComponent,
    ActionSelectionComponent,
    RoundCounterComponent,
    EndScreenComponent,
    MainScreenComponent,
    AffinityDescriptionGeneratorComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    EngineService,
    GameLoopService,
    GameLogicService,
    LoggerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
