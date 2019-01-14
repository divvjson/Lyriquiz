import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Question } from 'src/models/question.model';
import { TeamService } from 'src/services/team.service';
import { Team } from 'src/models/team.model';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {

  question: Question;
  correctAnswer: boolean;
  unsanitizedUrl: string = "https://open.spotify.com/embed/track/";
  teams: Team[];

  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<AnswerComponent>, private sanitizer: DomSanitizer, private teamService: TeamService) {

    this.question = data.question;
    this.correctAnswer = data.correctAnswer;
    this.unsanitizedUrl = this.unsanitizedUrl + data.trackId;
  }

  ngOnInit() {
    this.teamService.getTeams().subscribe(teams => {
      this.teams = teams;
    });
  }

  // Sanitizes the string to an valid URL
  getSpotifyUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.unsanitizedUrl);
  }

  // Changes the score for a team accordingly
  onTeamAnswered(team: Team) {
    this.teamService.changeScore(team.color, this.correctAnswer);
    this.dialogRef.close();
  }
}