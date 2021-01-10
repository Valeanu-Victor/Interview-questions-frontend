import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Selections } from 'src/app/category-selection/selections';
import { RetrievedQuestions } from 'src/app/category-selection/retrievedQuestions';

@Injectable({
  providedIn: 'root'
})
export class QuestionsDataService {

  private retrievedQuestions: Array<RetrievedQuestions> = [];

  constructor(
    private http: HttpClient
  ) { }

  changeRetrievedQuestions(newRetrievedQuestions: Array<RetrievedQuestions>) {
    this.retrievedQuestions = newRetrievedQuestions;
  }

  getCurrentQuestions() {
    return this.retrievedQuestions;
  }

  retrieveQuestionsByCategoryAndDifficulty(selections: Selections) {
    // I am using POST instead GET because I can't send a body with GET request
    return this.http.post<Array<RetrievedQuestions>>('http://localhost:8080/interview-questions/all', selections);
  }

}
