import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Category } from './category';
import { Difficulty } from './difficulty';
import { DIFFICULTIES, CATEGORIES } from '../constants';
import { Selections } from './selections';
import { QuestionsDataService } from '../services/data/questions-data.service';
import { RetrievedQuestions } from './retrievedQuestions';

@Component({
  selector: 'app-category-selection',
  templateUrl: './category-selection.component.html',
  styleUrls: ['./category-selection.component.css'],
})
export class CategorySelectionComponent implements OnInit {

  difficultyText: Set<string> = DIFFICULTIES;
  categoriesText: Set<string> = CATEGORIES;

  @ViewChild('difficulties', { static: false }) private difficultiesDiv: ElementRef;
  @ViewChild('categories', { static: false }) private categoriesDiv: ElementRef;
  areButtonsSelected: boolean = true;
  private CategoriesEnum = Category;
  private DifficultiesEnum = Difficulty;
  private difficulties: Set<string> = new Set();
  private categories: Set<string> = new Set();
  private selections: Selections = new Selections(this.difficulties, this.categories);
  private retrievedQuestions: Array<RetrievedQuestions> = new Array();

  constructor(
    private questionsDataService: QuestionsDataService,
    private renderer: Renderer2,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  toggleClass(event) {
    if (event.target.classList.contains('btn-dark')) {
      this.renderer.removeClass(event.target, 'btn-dark');
      this.renderer.addClass(event.target, 'btn-success');
    } else if (event.target.classList.contains('btn-success')) {
      this.renderer.removeClass(event.target, 'btn-success');
      this.renderer.addClass(event.target, 'btn-dark');
    }
  }

  onStart() {
    //matches every character EXCEPT a-z, A-z, 0-9
    let matcher = /([^a-zA-z0-9]+)/g;

    for (let elRef of this.difficultiesDiv.nativeElement.childNodes) {
      // After adding *ngFor to create divs , Angular added another div
      // made of a comment which breaks this for loop if it iterates through it
      if (elRef.childNodes.length < 1) { break; }
      if (elRef.childNodes[0].classList.contains('btn-success')) {
        this.difficulties.add(this.DifficultiesEnum[elRef.childNodes[0].innerText]);
      }
    }

    for (let elRef of this.categoriesDiv.nativeElement.childNodes) {
      if (elRef.childNodes.length < 1) { break; }
      if (elRef.childNodes[0].classList.contains('btn-success')) {
        this.categories.add(this.CategoriesEnum[elRef.childNodes[0].innerText.replace(matcher, '')]);
      }
    }

    if (this.selections.getCategories().size == 0 ||
      this.selections.getDifficulties().size == 0
      ) {
      this.areButtonsSelected = false;
    } else {
      //data has to be converted to ARRAY instead of SET in order to avoid JSON parsing error in the backend
      this.selections.setDifficulties(Array.from(this.difficulties));
      this.selections.setCategories(Array.from(this.categories));

      this.questionsDataService
      .retrieveQuestionsByCategoryAndDifficulty(this.selections)
      .subscribe(data => {
        data.forEach(x => {
          this.retrievedQuestions.push(x);
        });
        this.questionsDataService.changeRetrievedQuestions(this.retrievedQuestions);
        this.router.navigate(['/interview-questions']);
      });
    }
  }

}
