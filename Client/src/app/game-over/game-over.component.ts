import { TeamService } from 'src/services/team.service';
import { Component, OnInit } from '@angular/core';
import { Team } from 'src/models/team.model';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.css']
})
export class GameOverComponent implements OnInit {

  teams: Team[];
  winningTeam: Team;

  constructor(private teamService: TeamService) {
    this.teams = [];
    this.winningTeam = new Team();
  }

  ngOnInit() {
    this.teamService.getTeams().subscribe(teams => {
      this.teams = teams;
    });

    this.setWinner();
  }

  setWinner() {
    for (var i = 0; i < this.teams.length; i++) {
      if (this.teams[i].score == 5) {
        this.winningTeam = this.teams[i];
      }
    }
  }

  onPlayAgain() {
    this.teamService.resetScore();
  }
}