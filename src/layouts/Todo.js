import React from 'react';
import { Header, Grid } from 'semantic-ui-react';
import BoardTabs from '../components/BoardTabs';
import CompletedColumns from '../components/CompletedColumns';
import NewColumns from 'components/NewColumns';
import AddTasks from 'components/AddTasks';
import useToDo from 'hooks/useToDo';
const ToDo = () => {
  const {
    setCurrenTab,
    boardValue,
    newTask,
    currentTab,
    completedTask,
    onAddtask,
    onChangeName,
    onCompleteClick,
    onDeleteData
  } = useToDo();

  return (
    <div>
      <Header as="h1" textAlign="center">
        To Do App
      </Header>
      <BoardTabs
        setCurrenTab={setCurrenTab}
        boardValue={boardValue}
        currentTab={currentTab}
      />
      {currentTab && (
        <Grid columns={3} divided>
          <Grid.Column>
            <NewColumns
              newTask={newTask}
              onChangeName={onChangeName}
              onCompleteClick={onCompleteClick}
              onDeleteData={onDeleteData}
            />
          </Grid.Column>
          <Grid.Column>
            <AddTasks tabName={currentTab?.name} onAddtask={onAddtask} />
          </Grid.Column>
          <Grid.Column>
            <CompletedColumns
              completedTask={completedTask}
              onChangeName={onChangeName}
              onCompleteClick={onCompleteClick}
              onDeleteData={onDeleteData}
            />
          </Grid.Column>
        </Grid>
      )}
    </div>
  );
};

export default ToDo;
