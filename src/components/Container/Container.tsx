import cls from './Container.module.css';
import { Card } from '../Card/Card';
import { useAppSelector, useAppDispatch } from '../../services';
import { Containers } from '../../models/Containers';
import { useDrop } from 'react-dnd';
import { moveCardBetweenContainers } from '../../services/slices/containersManager/slice';
import clsx from 'clsx';
import { dndTypes } from '../../models/dndTypes';

interface IProps {
  id: Containers;
}

export const Container = ({ id }: IProps) => {
  const dispatch = useAppDispatch();

  const cardsIds = useAppSelector((state) => state.containersManager.containers[id]);
  const cards = useAppSelector((state) => state.containersManager.cards);

  const [{ isOver }, dropRef] = useDrop({
    accept: dndTypes.CARD,
    drop: (item: { id: number }) => dispatch(moveCardBetweenContainers({ dragId: item.id, containerId: id })),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const classNames = clsx(cls.container, { [cls.hover]: isOver });

  return (
    <div className={classNames} ref={dropRef}>
      {cardsIds.map((id) => (
        <Card key={id} id={id} text={cards[id].text} />
      ))}
    </div>
  );
};
