// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material';

// Components
import { AppComponent } from './app.component';
import { StartComponent } from './start/start.component';
import { TeamListComponent } from './team-list/team-list.component';
import { TeamComponent } from './team/team.component';
import { PlayComponent } from './play/play.component';
import { AnswerComponent } from './answer/answer.component';
import { GameOverComponent } from './game-over/game-over.component';
import { LyricsComponent } from './lyrics/lyrics.component';
import { AboutComponent } from './about/about.component';
import { AboutDialogComponent } from './about-dialog/about-dialog.component';
import { ApiComponent } from './api/api.component';

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    TeamListComponent,
    TeamComponent,
    PlayComponent,
    AnswerComponent,
    GameOverComponent,
    LyricsComponent,
    AboutComponent,
    AboutDialogComponent,
    ApiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    MatProgressSpinnerModule
  ],
  entryComponents: [TeamComponent, AnswerComponent, AboutDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
