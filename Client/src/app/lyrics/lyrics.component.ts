import { QuestionService } from 'src/services/question.service';
import { Component, OnInit } from '@angular/core';
import { Question } from 'src/models/question.model';

@Component({
  selector: 'app-lyrics',
  templateUrl: './lyrics.component.html',
  styleUrls: ['./lyrics.component.css']
})
export class LyricsComponent implements OnInit {

  currentQuestion: Question

  constructor(private questionService: QuestionService) {
    this.questionService.questionObservable.subscribe(x => this.currentQuestion = x);
  }

  ngOnInit() {

  }
}
