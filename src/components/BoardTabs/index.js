import React, { useState, useEffect, useCallback } from 'react';
import { Tab, Menu, Icon, Grid, Input, Label } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import {
  onAddBoards,
  onPatchBoards,
  onDeleteBoards
} from 'actions/todoActions';
const BoardTabs = ({ setCurrenTab, boardValue, currentTab }) => {
  const [panes, setPanes] = useState([]);
  const [showInput, setShowInput] = useState(null);
  const [activeIndex, setActiveIndex] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    var index = -1;
    panes.find((item, i) => {
      if (item.value?.id === currentTab?.id) {
        index = i;
      }
    });
    if (!currentTab) {
      setActiveIndex(panes.length);
    } else {
      setActiveIndex(index);
    }
  }, [currentTab, panes]);

  const handleDelete = useCallback(
    (e, id, currentTab) => {
      e.stopPropagation();
      if (currentTab.id === id) {
        var index = activeIndex;
        dispatch(onDeleteBoards(id, panes[index + 1].value));
      } else {
        dispatch(onDeleteBoards(id));
      }
    },
    [dispatch, activeIndex]
  );

  const onHandleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        dispatch(onAddBoards(e.target.value));
        document.getElementById('addBoard').value = '';
      }
    },
    [dispatch]
  );

  const onHandleSubmit = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        dispatch(onPatchBoards(showInput.id, e.target.value));
        setShowInput(null);
      }
    },
    [dispatch, showInput]
  );

  useEffect(() => {
    if (boardValue) {
      const allPanes = [];
      boardValue.map((sub) => {
        allPanes.push({
          value: sub,
          menuItem: (
            <Menu.Item key={sub.name}>
              {showInput === sub ? (
                <>
                  <Input
                    placeholder={showInput.name}
                    onKeyDown={onHandleSubmit}
                  />
                  <Icon
                    name="close"
                    onClick={(e) => setShowInput(null)}
                    color="red"
                  />
                </>
              ) : (
                <>
                  <Label
                    onClick={() => setShowInput(sub)}
                    color="blue"
                    size="large"
                  >
                    {sub.name}
                  </Label>
                  <Icon
                    name="close"
                    onClick={(e) => handleDelete(e, sub.id, currentTab)}
                    color="red"
                  />
                </>
              )}
            </Menu.Item>
          )
        });
      });
      allPanes.push({
        menuItem: (
          <Menu.Item>
            <Input
              placeholder="Add New Board"
              id="addBoard"
              onKeyDown={onHandleKeyDown}
            />
          </Menu.Item>
        )
      });
      setPanes(allPanes);
    }
  }, [
    boardValue,
    boardValue?.length,
    onHandleKeyDown,
    showInput,
    onHandleSubmit,
    handleDelete,
    currentTab
  ]);

  return (
    <Grid>
      <Grid.Row>
        <Tab
          panes={panes}
          activeIndex={activeIndex}
          onTabChange={(value, data) => {
            setCurrenTab(panes[data.activeIndex].value);
          }}
        />
      </Grid.Row>
    </Grid>
  );
};

export default BoardTabs;
