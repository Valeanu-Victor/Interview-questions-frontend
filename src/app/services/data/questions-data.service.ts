import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Selections } from 'src/app/category-selection/selections';
import { RetrievedQuestions } from 'src/app/category-selection/retrievedQuestions';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionsDataService {

  private retrievedQuestions = new BehaviorSubject<Array<RetrievedQuestions>>(null);
  currentRetrievedQuestions = this.retrievedQuestions.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  changeRetrievedQuestions(newRetrievedQuestions: Array<RetrievedQuestions>) {
    this.retrievedQuestions.next(newRetrievedQuestions);
  }

  retrieveQuestionsByCategoryAndDifficulty(selections: Selections) {
    // I am using POST instead GET because I can't send a body with GET request
    console.log(selections);
    return this.http.post<Array<RetrievedQuestions>>('http://localhost:8080/interview-questions/all', selections);
  }

}
