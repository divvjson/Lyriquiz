import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/services/team.service';
import { Team } from 'src/models/team.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TeamComponent } from '../team/team.component';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {

  team: Team;
  teams: Team[];

  constructor(private teamService: TeamService, private teamDialog: MatDialog) {
    this.teams = [];
  }

  ngOnInit() {
    this.teamService.getTeams().subscribe(teams => {
      this.teams = teams;
    });
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