import { QuestionService } from './../../services/question.service';
import { TeamService } from 'src/services/team.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Team } from 'src/models/team.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  team: Team;

  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<TeamComponent>, private teamService: TeamService, private questionService: QuestionService) {
    this.team = data.team;
  }

  ngOnInit() {

  }

  onDeleteTeam(color: string) {
    this.teamService.deleteTeam(color);
    this.dialogRef.close();
  }

  isGameOn(): boolean {
    if (this.questionService.isGameOn) {
      return true;
    } else {
      return false;
    }
  }
}