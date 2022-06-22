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

@NgModule({
  declarations: [
    AppComponent,
    AffinityTablesComponent,
    LogComponent,
    ActionSelectionComponent,
    RoundCounterComponent,
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
