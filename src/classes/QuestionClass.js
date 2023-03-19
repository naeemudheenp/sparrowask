export  class QuestionClass {

  Question = "";
  QuestionType = "";
  Options = [];
  Answers = [];

  AddOption(Input) {
    this.Options.push(Input);
  }
  RemoveOption(Input) {
    this.Options.pop(Input);
  }

  AddAnswer(Input) {
    this.Answers.push(Input);
  }
  RemoveAnswer(Input) {
    this.Answers.pop(Input);
  }
  CheckAnswer(Arr) {
    const equalsCheck = (a, b) => {
      return JSON.stringify(a) === JSON.stringify(b);
    };

    this.Answers.sort();
    Arr.sort();
    
    if (equalsCheck(Arr, this.Answers)) alert("The arrays have the same elements.");
    else alert("The arrays have different elements.");
  }
}
