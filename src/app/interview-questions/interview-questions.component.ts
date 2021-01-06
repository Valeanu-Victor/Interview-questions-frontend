import { Component, OnInit, Renderer2 } from '@angular/core';
import { RetrievedQuestions } from '../category-selection/retrievedQuestions';
import { QuestionsDataService } from '../services/data/questions-data.service';

@Component({
  selector: 'app-interview-questions',
  templateUrl: './interview-questions.component.html',
  styleUrls: ['./interview-questions.component.css']
})
export class InterviewQuestionsComponent implements OnInit {

  private retrievedQuestions: Array<RetrievedQuestions>;

  constructor(private renderer: Renderer2,
    private questionsService: QuestionsDataService) { }

  ngOnInit(): void {
    console.log(this.retrievedQuestions);
    this.questionsService.currentRetrievedQuestions.subscribe(
      data => this.retrievedQuestions = data
    );
    console.log(this.retrievedQuestions);
  }

  toggleEyeIcon(event) {
    if (event.target.childNodes[0].classList.contains('fa-eye')) {
      this.renderer.removeClass(event.target.childNodes[0], 'fa-eye');
      this.renderer.addClass(event.target.childNodes[0], 'fa-eye-slash');
    } else if (event.target.childNodes[0].classList.contains('fa-eye-slash')) {
      this.renderer.removeClass(event.target.childNodes[0], 'fa-eye-slash');
      this.renderer.addClass(event.target.childNodes[0], 'fa-eye');
    }
  }

}
