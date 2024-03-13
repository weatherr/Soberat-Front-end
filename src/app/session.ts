import { Drink } from './drink';
import { NormalDrink } from './normalDrink';

export interface Session {
  id: number;
  user_id: number;
  products: Drink[];
  normal_drinks: NormalDrink[];
  hours_needed: string;
  created_at: string;
}
