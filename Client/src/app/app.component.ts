import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/services/question.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Lyriquiz';

  constructor(private questionService: QuestionService) { }

  // Canceling speech synthesis if user reloaded the page while speech synthesis was speaking
  ngOnInit(): void {
    window.speechSynthesis.cancel();
  }

  isGameOn(): boolean {
    return this.questionService.isGameOn;
  }
}