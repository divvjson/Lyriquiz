import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Question } from 'src/models/question.model';

const endpoint = 'http://localhost:5000/api/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private questionSubject: BehaviorSubject<Question>;
  public questionObservable: Observable<Question>;

  constructor(private http: HttpClient) {

    this.questionSubject = new BehaviorSubject<Question>(null);
    this.questionObservable = this.questionSubject.asObservable();
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  getQuestion(): Observable<any> {
    return this.http.get(endpoint + 'question').pipe(
      map(this.extractData));
  }

  /*
  public get currentQuestionValue(): Question {
    return this.questionSubject.value;
  }
  */

  public setQuestion(question: Question) {
    this.questionSubject.next(question);
  }
}
