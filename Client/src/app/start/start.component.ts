import { QuestionService } from './../../services/question.service';
import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/services/team.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  member: string;
  members: string[];
  selected: number;

  constructor(private teamService: TeamService, private questionService: QuestionService) {
    this.members = [];
  }

  ngOnInit() {

  }

  add(member: string) {
    this.members.push(member);
    this.member = null;
  }

  remove(selected: number) {
    this.members.splice(selected, 1);
  }

  setSelected(index: number) {
    this.selected = index;
  }

  onCreateTeam() {
    this.teamService.createTeam(this.members);
    this.members.length = 0;
  }

  sufficientAmountOfTeams(): boolean {
    if (this.teamService.getNumberOfTeams() >= 2) {
      return true;
    } else {
      return false;
    }
  }

  onPlay() {
    this.questionService.isGameOn = true;
  }
}