import { ICard } from '../../../models/Card';
import { Containers } from '../../../models/Containers';

export interface IState {
  cards: Record<number, ICard>;
  containers: Record<Containers, number[]>;
}
