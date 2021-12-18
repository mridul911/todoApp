import React, { useState } from 'react';
import { Grid, Card, Button, Input, Icon } from 'semantic-ui-react';
const TaskCard = ({
  name,
  id,
  showApprove,
  onChangeName,
  onCompleteClick,
  onDeleteData
}) => {
  const [showInput, setShowInput] = useState(false);
  const [currentData, setCurrentData] = useState(name);

  const onClickHeader = () => {
    setShowInput(true);
    setCurrentData(name);
  };

  const onHandleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onChangeName(id, e.target.value);
      setShowInput(false);
    }
  };

  return (
    <Grid.Row style={{ display: 'flex', justifyContent: 'center' }}>
      <Card style={{ width: '100%' }}>
        <Card.Content>
          <Grid columns={2}>
            <Grid.Column textAlign="center">
              {showInput ? (
                <>
                  <Input
                    id="patchData"
                    focus
                    value={currentData}
                    onChange={(e) => setCurrentData(e.target.value)}
                    placeholder="Add New Task"
                    onKeyDown={onHandleKeyDown}
                  />
                  <Icon
                    name="close"
                    onClick={(e) => setShowInput(false)}
                    color="red"
                  />
                </>
              ) : (
                <Card.Header onClick={onClickHeader}>{name}</Card.Header>
              )}
            </Grid.Column>
            <Grid.Column>
              <div className="ui two buttons">
                {showApprove && (
                  <Button
                    basic
                    color="green"
                    onClick={() => onCompleteClick(id)}
                  >
                    Completed
                  </Button>
                )}
                <Button basic color="red" onClick={() => onDeleteData(id)}>
                  Delete
                </Button>
              </div>
            </Grid.Column>
          </Grid>
        </Card.Content>
      </Card>
    </Grid.Row>
  );
};

export default TaskCard;
