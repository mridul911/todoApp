import React from 'react';
import { Header, Grid, Input } from 'semantic-ui-react';
const AddTasks = ({ tabName, onAddtask }) => {
  const onHandleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onAddtask(e.target.value);
      document.getElementById('addValue').value = '';
    }
  };
  return (
    <>
      <Header as="h3" textAlign="center">
        {`Add New Task For ${tabName || 'Name'}`}
      </Header>
      <Grid.Row style={{ display: 'flex', justifyContent: 'center' }}>
        <Input
          id="addValue"
          focus
          placeholder="Add New Task"
          onKeyDown={onHandleKeyDown}
        />
      </Grid.Row>
    </>
  );
};

export default AddTasks;
