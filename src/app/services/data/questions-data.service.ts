import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Selections } from 'src/app/category-selection/selections';
import { RetrievedQuestions } from 'src/app/category-selection/retrievedQuestions';
import { API_URL } from 'src/app/constants';

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
    return this.http.post<Array<RetrievedQuestions>>(`${API_URL}/interview-questions/selected`, selections);
  }

}
