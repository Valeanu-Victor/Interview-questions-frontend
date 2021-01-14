import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DIFFICULTIES, CATEGORIES } from 'src/app/constants';
import { QuestionsDataService } from '../services/data/questions-data.service';

export class ProposedQuestion{
  private question: string;
  private answer: string;
  private difficulty: string;
  private category: string;

  constructor(difficulty: string, category: string, question: string, answer: string) {
    this.difficulty = difficulty;
    this.category = category;
    this.question = question;
    this.answer = answer;
  }
}

@Component({
  selector: 'app-propose-questions',
  templateUrl: './propose-questions.component.html',
  styleUrls: ['./propose-questions.component.css']
})
export class ProposeQuestionsComponent implements OnInit {

  difficulties = DIFFICULTIES;
  categories = CATEGORIES;

  @ViewChild('difficulty') difficultyBtn: ElementRef;
  @ViewChild('category') categoryBtn: ElementRef;

  questionText: string = "";
  answerText: string = "";

  errorMsg: string = "Failed! Please fill in all fields!";
  successMsg: string = "Question sent succesfully! Admin will revise it! Thank You!"

  isSuccessMsgShown: boolean = false;
  isErrorMsgShown: boolean = false;

  constructor(
    private questionsDataService: QuestionsDataService,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {}

  changeDropdownValueDifficulty(value: string) {
    this.difficultyBtn.nativeElement.innerText = value;
    if (this.difficultyBtn.nativeElement.classList.contains('btn-secondary')) {
    this.renderer.removeClass(this.difficultyBtn.nativeElement, 'btn-secondary');
    this.renderer.addClass(this.difficultyBtn.nativeElement, 'btn-primary');
    }
  }

  changeDropdownValueCategory(value: string) {
    this.categoryBtn.nativeElement.innerText = value;
    if (this.categoryBtn.nativeElement.classList.contains('btn-secondary')) {
    this.renderer.removeClass(this.categoryBtn.nativeElement, 'btn-secondary');
    this.renderer.addClass(this.categoryBtn.nativeElement, 'btn-primary');
    }
  }

  onSubmit() {
    if(this.isFormValid()) {
      let proposedQuestion: ProposedQuestion = new ProposedQuestion(
        this.difficultyBtn.nativeElement.innerText,
        this.categoryBtn.nativeElement.innerText,
        this.questionText,
        this.answerText
      );
      this.isSuccessMsgShown = true;
      this.isErrorMsgShown = false;
      setTimeout(() => this.isSuccessMsgShown = false, 4000);
      this.questionsDataService.sendProposedQuestion(proposedQuestion).subscribe(
        response => {},
        error => console.log(error)
        );
    } else {
    this.isSuccessMsgShown = false;
    this.isErrorMsgShown = true;
    setTimeout(() => this.isErrorMsgShown = false, 4000);
    }
  }

  isFormValid(): boolean {
    if(this.categoryBtn.nativeElement.innerText != "Category" &&
    this.difficultyBtn.nativeElement.innerText != "Difficulty" &&
    this.questionText != null && this.questionText != "" &&
    this.answerText != null && this.answerText != "") {
      return true;
    }

    return false;
  }

}
