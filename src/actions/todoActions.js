import fetch from 'isomorphic-fetch';

export const initializeBoards = (boards) => ({
  boards,
  type: 'ADD_BOARDS'
});

export const initializedata = (data) => ({
  data,
  type: 'ADD_DATA'
});

export const setCurrentTab = (currentTab) => ({
  currentTab,
  type: 'CURRENT_TYPE'
});

export const callBoardsApi = (isFirstLoad) => (dispatch) => {
  fetch('http://localhost:1337/boards', {
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  }).then((response) => {
    response.json().then((ans) => {
      ans = ans.sort(function (a, b) {
        return a.id - b.id;
      });
      dispatch(initializeBoards(ans));
      if (isFirstLoad && ans.length > 0) {
        dispatch(setCurrentTab(ans[0]));
      }
    });
  });
};

export const callDataApi = () => (dispatch) => {
  fetch('http://localhost:1337/data', {
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  }).then((response) => {
    response.json().then((ans) => {
      ans = ans.sort(function (a, b) {
        return a.id - b.id;
      });
      dispatch(initializedata(ans));
    });
  });
};

export const onAddBoards = (data) => (dispatch) => {
  const jsonValue = {
    name: data
  };
  fetch('http://localhost:1337/boards', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(jsonValue)
  }).then((response) => {
    response.json().then((response) => {
      dispatch(callBoardsApi());
      dispatch(setCurrentTab(response));
    });
  });
};

export const onPatchBoards = (id, data) => (dispatch) => {
  const jsonValue = {
    name: data
  };
  fetch(`http://localhost:1337/boards/${id}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(jsonValue)
  }).then((response) => {
    response.json().then((response) => {
      dispatch(callBoardsApi());
      dispatch(setCurrentTab(response));
    });
  });
};

export const onDeleteBoards = (id, currentTab) => (dispatch) => {
  fetch(`http://localhost:1337/boards/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    response.json().then((response) => {
      dispatch(callBoardsApi());
      if (currentTab) dispatch(setCurrentTab(currentTab));
      else dispatch(setCurrentTab(null));
    });
  });
};

export const onAddData = (data) => (dispatch) => {
  fetch('http://localhost:1337/data', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then((response) => {
    response.json().then((response) => {
      dispatch(callDataApi());
    });
  });
};

export const onPatchData = (id, data) => (dispatch) => {
  fetch(`http://localhost:1337/data/${id}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then((response) => {
    response.json().then((response) => {
      dispatch(callDataApi());
    });
  });
};

export const onDeleteDataAction = (id) => (dispatch) => {
  fetch(`http://localhost:1337/data/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    response.json().then((response) => {
      dispatch(callDataApi());
    });
  });
};
