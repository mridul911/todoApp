import React from 'react';
import { Header } from 'semantic-ui-react';
import TaskCard from 'components/TaskCard';
const CompletedColumns = ({
  completedTask,
  onChangeName,
  onCompleteClick,
  onDeleteData
}) => {
  return (
    <>
      <Header as="h3" textAlign="center">
        Completed Tasks
      </Header>
      {completedTask.map((row) => (
        <TaskCard
          name={row.name}
          id={row.id}
          onChangeName={onChangeName}
          onCompleteClick={onCompleteClick}
          onDeleteData={onDeleteData}
        />
      ))}
    </>
  );
};

export default CompletedColumns;
