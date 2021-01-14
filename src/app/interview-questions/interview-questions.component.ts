import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { RetrievedQuestions } from '../category-selection/retrievedQuestions';
import { QuestionsDataService } from '../services/data/questions-data.service';

@Component({
  selector: 'app-interview-questions',
  templateUrl: './interview-questions.component.html',
  styleUrls: ['./interview-questions.component.css'],
})
export class InterviewQuestionsComponent implements OnInit {
  @ViewChild('eyeBtn') eyeBtn: ElementRef;

  private retrievedQuestions: Array<RetrievedQuestions>;
  private noQuestionsMsg: string =
    'Sorry, no questions match the selected combination of categories and difficulties!';
  private noAnswersMsg: string = '-';
  congratsQuestionMsg: string = 'Well done, you finished all the questions!';
  totalQuestions: number = 0;
  currQuestionNumber: number = 0;
  isAnswearHidden: boolean = true;
  displayedQuestion: string = 'loading questions...';
  displayedAnswer: string = '-';

  constructor(
    private renderer: Renderer2,
    private questionsService: QuestionsDataService
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, document.body.scrollHeight);
    this.retrievedQuestions = this.questionsService.getCurrentQuestions();
    if (
      this.retrievedQuestions == null ||
      this.retrievedQuestions.length == 0
    ) {
      this.displayedQuestion = this.noQuestionsMsg;
      this.displayedAnswer = this.noAnswersMsg;
    } else {
      this.displayedQuestion = this.retrievedQuestions[0]['question'];
      this.displayedAnswer = this.retrievedQuestions[0]['answer'];
      this.currQuestionNumber = 1;
      this.totalQuestions = this.retrievedQuestions.length;
    }
  }

  toggleEyeIcon() {
    this.isAnswearHidden = !this.isAnswearHidden;
    if (this.eyeBtn.nativeElement.childNodes[0].classList.contains('fa-eye')) {
      this.renderer.removeClass(
        this.eyeBtn.nativeElement.childNodes[0],
        'fa-eye'
      );
      this.renderer.addClass(
        this.eyeBtn.nativeElement.childNodes[0],
        'fa-eye-slash'
      );
    } else if (
      this.eyeBtn.nativeElement.childNodes[0].classList.contains('fa-eye-slash')
    ) {
      this.renderer.removeClass(
        this.eyeBtn.nativeElement.childNodes[0],
        'fa-eye-slash'
      );
      this.renderer.addClass(this.eyeBtn.nativeElement.childNodes[0], 'fa-eye');
    }
  }

  getNextQuestion(currMsg: string) {
    if (this.isArrNullOrEmpty(this.retrievedQuestions)) {
      this.hideAnswer();
      return;
    }
    let currIndex: number = this.getIndex(this.retrievedQuestions, currMsg);
    if (currIndex > -1 &&
      currIndex === this.retrievedQuestions.length - 1
      ) {
      this.displayedQuestion = this.congratsQuestionMsg;
      this.displayedAnswer = this.noAnswersMsg;
      this.currQuestionNumber = this.totalQuestions;
    } else if (
      currIndex > -1 &&
      currIndex < this.retrievedQuestions.length - 1
    ) {
      currIndex++;
      this.displayedQuestion = this.retrievedQuestions[currIndex]['question'];
      this.displayedAnswer = this.retrievedQuestions[currIndex]['answer'];
      this.currQuestionNumber = ++currIndex;
    }
    this.hideAnswer();
  }

  getPreviousQuestion(currMsg: string) {
    if (this.isArrNullOrEmpty(this.retrievedQuestions)) {
      this.hideAnswer();
      return;
    }
    let currIndex: number = this.getIndex(this.retrievedQuestions, currMsg);
    if (currIndex > 0) {
      currIndex--;
      this.displayedQuestion = this.retrievedQuestions[currIndex]['question'];
      this.displayedAnswer = this.retrievedQuestions[currIndex]['answer'];
      this.currQuestionNumber = ++currIndex;
    } else if (this.displayedQuestion === this.congratsQuestionMsg) {
      currIndex = this.retrievedQuestions.length - 1;
      this.displayedQuestion = this.retrievedQuestions[currIndex]['question'];
      this.displayedAnswer = this.retrievedQuestions[currIndex]['answer'];
      this.currQuestionNumber = ++currIndex;
    }
    this.hideAnswer();
  }

  getIndex(arr: Array<RetrievedQuestions>, question: string) {
    for (let el of arr) {
      if (el['question'] === question) {
        return arr.indexOf(el);
      }
    }

    return -1;
  }

  isArrNullOrEmpty(arr: Array<RetrievedQuestions>) {
    if (
      this.retrievedQuestions == null ||
      this.retrievedQuestions.length == 0
    ) {
      return true;
    }

    return false;
  }

  hideAnswer() {
    if (this.eyeBtn.nativeElement.childNodes[0].classList.contains('fa-eye')) {
      this.renderer.removeClass(
        this.eyeBtn.nativeElement.childNodes[0],
        'fa-eye'
      );
      this.renderer.addClass(
        this.eyeBtn.nativeElement.childNodes[0],
        'fa-eye-slash'
      );
      this.isAnswearHidden = !this.isAnswearHidden;
    }
  }
}
