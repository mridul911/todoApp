import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  callBoardsApi,
  callDataApi,
  setCurrentTab,
  onAddData,
  onPatchData,
  onDeleteDataAction
} from 'actions/todoActions';
const useToDo = () => {
  const [newTask, setNewTasks] = useState([]);
  const [completedTask, setCompletedTask] = useState([]);
  const [boardValue, setBoardValue] = useState();
  const { boards, data, currentTab } = useSelector(
    (state) => state.todoReducer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(callBoardsApi(true));
    dispatch(callDataApi(true));
  }, [dispatch]);

  useEffect(() => {
    if (boards) {
      setBoardValue(boards);
    }
  }, [boards, dispatch]);

  useEffect(() => {
    if (data) {
      const haveABoard = data.filter((sub) => sub.boardId != null);
      const filterDataWithBoard = haveABoard.filter(
        (subValue) => subValue?.boardId?.id === currentTab?.id
      );
      const filterNewTask = filterDataWithBoard.filter(
        (sub) => sub.isCompleted === false
      );
      const filterCompletedTask = filterDataWithBoard.filter(
        (sub) => sub.isCompleted === true
      );
      setNewTasks(filterNewTask);
      setCompletedTask(filterCompletedTask);
    }
  }, [currentTab, data, data.length]);

  const setCurrenTab = (value) => {
    dispatch(setCurrentTab(value));
  };

  const onAddtask = (value) => {
    const jsonData = {
      name: value,
      boardId: currentTab.id,
      isCompleted: false
    };
    dispatch(onAddData(jsonData));
  };

  const onChangeName = (id, value) => {
    const jsonData = {
      name: value
    };
    dispatch(onPatchData(id, jsonData));
  };

  const onCompleteClick = (id) => {
    const jsonData = {
      isCompleted: true
    };
    dispatch(onPatchData(id, jsonData));
  };

  const onDeleteData = (id) => {
    dispatch(onDeleteDataAction(id));
  };

  return {
    setCurrenTab,
    boardValue,
    newTask,
    currentTab,
    completedTask,
    onAddtask,
    onChangeName,
    onCompleteClick,
    onDeleteData
  };
};

export default useToDo;
