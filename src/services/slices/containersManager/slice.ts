import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IState } from './types';
import { Containers } from '../../../models/Containers';

const initialState: IState = {
  cards: {
    1: { id: 1, text: 'Card 1' },
    2: { id: 2, text: 'Card 2' },
    3: { id: 3, text: 'Card 3' },
    4: { id: 4, text: 'Card 4' },
    5: { id: 5, text: 'Card 5' },
    6: { id: 6, text: 'Card 6' },
  },
  containers: {
    [Containers.FIRST_CONTAINER]: [1, 2, 3, 4, 5],
    [Containers.SECOND_CONTAINER]: [6],
  },
};

const getCardContainer = (cardId: number, containers: typeof initialState.containers) => {
  return containers[Containers.FIRST_CONTAINER].includes(cardId)
    ? Containers.FIRST_CONTAINER
    : Containers.SECOND_CONTAINER;
};

const containersManagerSlice = createSlice({
  name: 'containersManager',
  initialState,
  reducers: {
    swapCards: ({ containers }, { payload: { dragId, dropId } }: PayloadAction<{ dragId: number; dropId: number }>) => {
      const dragCardContainerName = getCardContainer(dragId, containers);
      const dropCardContainerName = getCardContainer(dropId, containers);

      const indexOfDrag = containers[dragCardContainerName].indexOf(dragId);
      const indexOfDrop = containers[dropCardContainerName].indexOf(dropId);

      containers[dragCardContainerName][indexOfDrag] = dropId;
      containers[dropCardContainerName][indexOfDrop] = dragId;
    },
    moveCardBetweenContainers: (
      { containers },
      { payload: { dragId, containerId } }: PayloadAction<{ dragId: number; containerId: Containers }>
    ) => {
      const dragCardContainerName = getCardContainer(dragId, containers);
      if (dragCardContainerName !== containerId) {
        containers[dragCardContainerName] = containers[dragCardContainerName].filter((id) => id !== dragId);
        containers[containerId].push(dragId);
      }
    },
  },
});

export const containersManagerReducer = containersManagerSlice.reducer;
export const { swapCards, moveCardBetweenContainers } = containersManagerSlice.actions;
