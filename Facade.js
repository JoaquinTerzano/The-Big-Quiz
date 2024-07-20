
// clase maestra que hace todo
class Facade {
  constructor(state = "", score = 0) {
    this.state = state;
    this.score = score;
  }

  changeState(state) {
    this.state = state;
  }

  incrementScore() {
    this.score += 1;
  }

  resetScore() {
    this.score = 0;
  }
  // gestiona la lógica de las transiciones
  transition(transitionType, chosenOption) {
    let nextState
    if (transitionType == "default") {
      nextState = this.state.transitions[chosenOption];
    }
    else if (transitionType == "forced") {
      nextState = this.state.transitions["next"];
    }
    else if (transitionType == "scoreBased") {
      nextState = this.state.transitions[String(this.score)];
    }
    update(nextState);
    this.changeState(states[nextState])
  }
  // hace cosas varias dependiendo del estado en el que esté
  doStuff(stateType, chosenOption) {
    if (stateType == "quiz") {
      if (this.state.correctAnswer == chosenOption) {
        $("#correct")[0].play();
        this.incrementScore();
      }
      else {
        $("#incorrect")[0].play();
      }
    }
    else {
      // reproduce aleatoriamente uno de los sonidos de transición
      $(".transition-audio")[Math.floor(Math.random() * 2)].play();
    }
  }
  // método que se llama cada vez que se presiona un botón
  execute(stateType, transitionType, chosenOption) {
    this.doStuff(stateType, chosenOption);
    this.transition(transitionType, chosenOption);
  }
  // cuando se elige la opción izquierda
  onLeftOption() {
    this.execute(this.state.type, this.state.transitions.type, "left");
  }
  // cuando se elige la opción derecha
  onRightOption() {
    this.execute(this.state.type, this.state.transitions.type, "right");
  }
}
