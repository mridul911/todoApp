import React from 'react';
import { Header } from 'semantic-ui-react';
import TaskCard from 'components/TaskCard';
const NewColumns = ({
  newTask,
  onChangeName,
  onCompleteClick,
  onDeleteData
}) => {
  return (
    <>
      <Header as="h3" textAlign="center">
        New Tasks
      </Header>
      {newTask.map((row) => (
        <TaskCard
          name={row.name}
          id={row.id}
          showApprove
          onChangeName={onChangeName}
          onCompleteClick={onCompleteClick}
          onDeleteData={onDeleteData}
        />
      ))}
    </>
  );
};

export default NewColumns;
