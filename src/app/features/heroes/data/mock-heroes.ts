import { Hero } from '../models/hero';

export const POWERS = [
  'Really Smart', 
  'Super Flexible',
  'Super Hot', 
  'Weather Changer'
];

export const HEROES: Hero[] = [
  { id: 12, name: 'Dr. Nice', power: POWERS[12 % POWERS.length] },
  { id: 13, name: 'Bombasto', power: POWERS[12 % POWERS.length] },
  { id: 14, name: 'Celeritas', power: POWERS[12 % POWERS.length] },
  { id: 15, name: 'Magneta', power: POWERS[12 % POWERS.length] },
  { id: 16, name: 'RubberMan', power: POWERS[12 % POWERS.length] },
  { id: 17, name: 'Dynama', power: POWERS[12 % POWERS.length] },
  { id: 18, name: 'Dr. IQ', power: POWERS[12 % POWERS.length] },
  { id: 19, name: 'Magma', power: POWERS[12 % POWERS.length] },
  { id: 20, name: 'Tornado', power: POWERS[12 % POWERS.length] }
];