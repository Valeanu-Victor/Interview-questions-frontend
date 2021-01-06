export class Selections {
  private difficulties;
  private categories;

  constructor(difficulties, categories) {
    this.difficulties = difficulties;
    this.categories = categories;
  }

  getDifficulties() {
    return this.difficulties;
  }

  getCategories() {
    return this.categories;
  }

  setDifficulties(difficulties) {
    this.difficulties = difficulties;
  }

  setCategories(categories) {
    this.categories = categories;
  }
}
