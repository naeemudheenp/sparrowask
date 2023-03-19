function selectedtId(state = null, action) {
  switch (action.type) {
    case "SetId":
      return {state:action.payLoad};

    default:
      return { state: state };
  }
}

export default selectedtId;
