import { QuestionService } from './../../services/question.service';
import { TeamService } from 'src/services/team.service';
import { Component, OnInit } from '@angular/core';
import { Team } from 'src/models/team.model';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { TeamComponent } from '../team/team.component';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.css']
})
export class GameOverComponent implements OnInit {

  teams: Team[];
  winningTeam: Team;

  constructor(private teamService: TeamService, private questionService: QuestionService, private teamDialog: MatDialog) {
    this.teams = [];
    this.winningTeam = new Team();
  }

  ngOnInit() {
    this.teamService.getTeams().subscribe(teams => {
      this.teams = teams;
    });

    this.setWinner();
  }

  // Determines which team is the winner, first to 5 wins
  setWinner() {
    for (var i = 0; i < this.teams.length; i++) {
      if (this.teams[i].score == 5) {
        this.winningTeam = this.teams[i];
      }
    }
  }

  // Resets the score and navigates user back to start
  onPlayAgain() {
    this.questionService.isGameOn = false;
    this.teamService.resetScore();
  }

  // Opens a dialog which presents a detailed view of the team
  showTeamDetails(team: Team) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "25%";
    dialogConfig.data = { team };

    this.teamDialog.open(TeamComponent, dialogConfig);
  }
}