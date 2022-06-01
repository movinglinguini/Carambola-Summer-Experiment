import { LoggerService } from './services/logger/logger.service';
import { GameLogicService } from './services/game-logic/game-logic.service';
import { GameLoopService } from './services/engine/services/game-loop.service';
import { EngineService } from './services/engine/engine.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
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
