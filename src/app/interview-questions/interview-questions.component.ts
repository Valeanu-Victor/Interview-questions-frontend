import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-interview-questions',
  templateUrl: './interview-questions.component.html',
  styleUrls: ['./interview-questions.component.css']
})
export class InterviewQuestionsComponent implements OnInit {

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
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
