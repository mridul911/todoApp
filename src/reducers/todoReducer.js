export const initialState = {
  boards: [],
  data: [],
  currentTab: null
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_BOARDS': {
      const { boards } = action;

      return {
        ...state,
        boards: boards
      };
    }

    case 'ADD_DATA': {
      const { data } = action;

      return {
        ...state,
        data: data
      };
    }

    case 'CURRENT_TYPE': {
      const { currentTab } = action;

      return {
        ...state,
        currentTab: currentTab
      };
    }

    default: {
      return state;
    }
  }
};
export default todoReducer;
