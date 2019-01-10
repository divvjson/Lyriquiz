import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Team } from 'src/models/team.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private teams: Team[];
  private observableTeams: BehaviorSubject<Team[]>;

  constructor() {
    this.teams = new Array<Team>();
    this.observableTeams = <BehaviorSubject<Team[]>>new BehaviorSubject([]);
  }

  getTeams() {
    return this.observableTeams.asObservable();
  }

  createTeam(members: string[]) {
    let team = new Team();
    team.color = this.getRandomColor();
    team.score = 0;
    team.members = Array.from(members);

    this.teams.push(team);
    this.observableTeams.next(this.teams);
  }

  private getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }

  deleteTeam(color: string) {
    for (var i = 0; i < this.teams.length; i++) {
      if (this.teams[i].color == color) {
        this.teams.splice(i, 1);
      }
    }
  }

  getNumberOfTeams(): number {
    return this.teams.length;
  }

  changeScore(color: string, correctAnswer: boolean) {
    for (var i = 0; i < this.teams.length; i++) {
      if (this.teams[i].color == color) {
        if (correctAnswer) {
          this.teams[i].score++;
        } else {
          this.teams[i].score--;
        }
      }
    }
  }

  resetScore() {
    for (var i = 0; i < this.teams.length; i++) {
      this.teams[i].score = 0;
    }
  }
}