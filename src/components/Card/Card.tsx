import { memo } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useAppDispatch } from '../../services';
import { swapCards } from '../../services/slices/containersManager/slice';
import cls from './Card.module.css';
import clsx from 'clsx';
import { ICard } from '../../models/Card';
import { dndTypes } from '../../models/dndTypes';

export const Card = memo(({ id, text }: ICard) => {
  const dispatch = useAppDispatch();

  const [{ isDragging }, dragRef] = useDrag({
    type: dndTypes.CARD,
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, dropRef] = useDrop({
    accept: dndTypes.CARD,
    drop: (item: { id: number }) => dispatch(swapCards({ dragId: item.id, dropId: id })),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const classNames = clsx(cls.card, { [cls.dragging]: isDragging, [cls.hover]: isOver });

  return (
    <div ref={(node) => dragRef(dropRef(node))} className={classNames}>
      {text}
    </div>
  );
});
