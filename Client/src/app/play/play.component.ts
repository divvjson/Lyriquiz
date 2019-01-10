import { Component, OnInit } from '@angular/core';
import { Question, RelatedArtist } from 'src/models/question.model';
import { QuestionService } from 'src/services/question.service';
import { TeamService } from 'src/services/team.service';
import { Team } from 'src/models/team.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AnswerComponent } from '../answer/answer.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  question: Question;
  artists: RelatedArtist[];
  speechSynthesis: any = window.speechSynthesis;
  teams: Team[];

  constructor(private questionService: QuestionService, private teamService: TeamService, private answerDialog: MatDialog, private router: Router) {
    this.teams = [];
  }

  ngOnInit() {
    this.teamService.getTeams().subscribe(teams => {
      this.teams = teams;
    });

    this.getQuestion();
  }

  getQuestion() {
    this.questionService.getQuestion().subscribe((response: Question) => {
      this.question = response;
      this.questionService.setQuestion(this.question);
      console.log(this.question);
    }, error => console.log(error),
      () => this.generateQuestion());
  }

  generateQuestion() {
    let array: RelatedArtist[] = [];

    // Add the "correct" artist
    let artist = new RelatedArtist();
    artist.Artist = this.question.Artist;
    artist.Photo = this.question.Photo;
    array.push(artist);

    // Add the "related" artists
    for (var i = 0; i < 3; i++) {
      let artist = new RelatedArtist();
      artist.Artist = this.question.RelatedArtists[i].Artist;
      artist.Photo = this.question.RelatedArtists[i].Photo;
      array.push(artist);
    }

    // Shuffle the artists
    this.artists = this.shuffleArtists(array);
    this.speak(this.question.Lyrics.Result.Track.Text);
  }

  shuffleArtists(array: RelatedArtist[]) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  speak(lyrics: string) {
    let sayThis = new SpeechSynthesisUtterance(lyrics);
    sayThis.rate = 0.7;
    this.speechSynthesis.speak(sayThis);
  }

  onAnswer(answer: string) {
    this.speechSynthesis.cancel();
    let correctAnswer: boolean;
    if (answer == this.question.Artist) {
      correctAnswer = true;
    } else {
      correctAnswer = false;
    }

    let question = this.question;
    let trackId = this.question.TrackId;

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "30%";
    dialogConfig.data = { question, correctAnswer, trackId };

    let dialogRef = this.answerDialog.open(AnswerComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(x => {
      if (this.isGameOver()) {
        this.questionService.setQuestion(null);
        this.router.navigate(['game-over']);
      } else {
        this.getQuestion();
      }
    });
  }

  private isGameOver(): boolean {
    for (var i = 0; i < this.teams.length; i++) {
      if (this.teams[i].score == 5) {
        return true;
      } else {
        return false;
      }
    }
  }
}