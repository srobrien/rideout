import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { PlaceBar } from './styled/StyledDraggableList';

// helper function to handle re-ordering of location items.
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

// sets style of location items when being dragged / dropped.
const getItemStyle = (draggableStyle, isDragging) => ({
  userSelect: 'none',
  padding: 8,
  margin: `0 0 8px 0`,
  background: isDragging ? '#4a89dc' : '#eaeaea',
  color: isDragging ? '#ffffff' : '#757575',
  boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
  cursor: 'move',
  ...draggableStyle,
});

// sets style of location item when being dragged over.
const getListStyle = isDraggingOver => ({
  width: '100%',
  marginBottom: '30px',
});

// component displays location items and allows them to be dragged / dropped and re-ordered
const DraggableList = ({ items, setItems }) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
    return function cleanUp() {
      setLoaded(false);
    };
  }, [loaded]); // checks if compontent has been mounted.

  // function handles re-ordering and setting of locations when dragging comeplted.
  const onDragEnd = result => {
    if (!result.destination) {
      return;
    }

    const newItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    setItems(newItems);
  };

  // helper function to handle removing element from the list.
  const removeItem = (e, list, i) => {
    e.preventDefault();
    const updatedList = list.slice(0, i).concat(list.slice(i + 1, list.length));
    setItems(updatedList);
  };

  if (!loaded) {
    return null;
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
            {...provided.droppableProps}
          >
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div>
                    <div
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      style={getItemStyle(
                        provided.draggableProps.style,
                        snapshot.isDragging
                      )}
                    >
                      {item.description}

                      <PlaceBar>
                        <button
                          type="button"
                          onClick={e => removeItem(e, items, index)}
                        >
                          <i className="fas fa-minus-square" />
                        </button>
                      </PlaceBar>
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DraggableList;

DraggableList.propTypes = {
  items: PropTypes.array,
  setItems: PropTypes.func,
};
