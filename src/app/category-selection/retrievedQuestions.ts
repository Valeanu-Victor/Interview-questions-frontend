export class RetrievedQuestions {
  private id: number;
  private question: string;
  private answer: string;
  private difficulty: string;
  private category: string;

  constructor(id, question, answer, difficulty, category) {
    this.id = id;
    this.question = question;
    this.answer = answer;
    this.difficulty = difficulty;
    this. category = category;
  }
}
