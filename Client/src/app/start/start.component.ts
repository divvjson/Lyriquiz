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

  onKeyDown(event, member: string) {
    if (event.key === "Enter" && member != null && member.length != 0) {
      event.preventDefault();
      this.members.push(member);
      this.member = null;
    }
  }

  // Adds a member to the create team list
  add(member: string) {
    this.members.push(member);
    this.member = null;
  }

  // Removes a member from the create team list
  remove(selected: number) {
    this.members.splice(selected, 1);
  }

  // Determines which member in the create team list is selected
  setSelected(index: number) {
    this.selected = index;
  }

  // Calls Team Service to create a team base on the create team list
  onCreateTeam() {
    this.teamService.createTeam(this.members);
    this.members.length = 0;
  }

  // Determines if there's sufficient amount of teams (at least 2) to play
  sufficientAmountOfTeams(): boolean {
    if (this.teamService.getNumberOfTeams() >= 2) {
      return true;
    } else {
      return false;
    }
  }

  // Game is on
  onPlay() {
    this.questionService.isGameOn = true;
  }
}