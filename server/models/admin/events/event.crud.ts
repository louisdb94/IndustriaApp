import {DefaultCrud} from '../../default-crud.crud';
import {EventModel} from './event.model';

export class EventCrud extends DefaultCrud<EventModel>{

  constructor(){
    super("events");
  }

  parseObject(input: any): EventModel {
    const _newEvent = new EventModel();

    _newEvent.id = input.id;
    _newEvent.title = input.title;
    _newEvent.start = input.start;
    _newEvent.end = input.end;
    _newEvent.color = input.color;

    return _newEvent;
  }
}
