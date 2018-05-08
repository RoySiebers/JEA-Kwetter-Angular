import {Owner} from './owner';

export class Tweet {
    id?: number;
    content: string;
    date?: Date;
    owner: Owner;
  }