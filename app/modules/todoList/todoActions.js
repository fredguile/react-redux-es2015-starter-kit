export const TODO_ADD_ITEM = 'TODO_ADD_ITEM';
export const TODO_REMOVE_ITEM = 'TODO_REMOVE_ITEM';

export function addTodoItem(item) {
  return {
    type: TODO_ADD_ITEM,
    payload: {
      item
    }
  };
};

export function removeTodoItem(uuid) {
  return {
    type: TODO_REMOVE_ITEM,
    payload: {
      uuid
    }
  };
};
