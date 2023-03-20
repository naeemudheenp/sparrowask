const initialUserState = {
  answer: [],
};

function setAnswer(state = initialUserState, action) {
  let temp = [];
  temp[0] = action.payLoad;

  switch (action.type) {
    case "SetAnswer":
      return {
        ...state,
        answer: state.answer.concat(temp),
      };

    default:
      return state;
  }
}

export default setAnswer;
