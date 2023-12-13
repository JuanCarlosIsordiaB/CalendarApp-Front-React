import { useDispatch, useSelector } from 'react-redux';
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from '../store/calendar/calendarSlice';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


//Takes the information (events, activeEvent) from calendarSlice.
export const useCalendarStore = () => {

  const dispatch = useDispatch();
  const {events,activeEvent} = useSelector( state => state.calendar );

  const setActiveEvent = ( calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  }

  const startSavingEvent = async(calendarEvent ) => {
    //TODO: llegar al backend

    //Todo bien
    if(calendarEvent._id){
      dispatch(onUpdateEvent({...calendarEvent}));
    }else{

      dispatch(onAddNewEvent({...calendarEvent, _id: new Date().getTime()}))
    }
  }

  const startDeletingEvent = ()  => {
    //Llegar al Backend
    dispatch(onDeleteEvent());  
    Swal.fire('Evento Eliminado', 'Se ha eliminado correctamente el evento', 'success');
  }

  return {
    //Properties
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    //Methods
    startDeletingEvent,
    setActiveEvent,
    startSavingEvent
  }
}
