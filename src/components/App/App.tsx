import cls from './App.module.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Container } from '../Container/Container';
import { Containers } from '../../models/Containers';

export const App = () => {
  return (
    <div className={cls.app}>
      <DndProvider backend={HTML5Backend}>
        <div className={cls.wrap}>
          <Container id={Containers.FIRST_CONTAINER} />
          <Container id={Containers.SECOND_CONTAINER} />
        </div>
      </DndProvider>
    </div>
  );
};
