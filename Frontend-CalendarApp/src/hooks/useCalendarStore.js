import { useDispatch, useSelector } from 'react-redux';
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from '../store/calendar/calendarSlice';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import calendarApi from '../api/calendarApi';
import { convertEventToDateEvent } from '../helpers';


//Takes the information (events, activeEvent) from calendarSlice.
export const useCalendarStore = () => {

  const dispatch = useDispatch();
  const {events,activeEvent} = useSelector( state => state.calendar );
  const { user } = useSelector( state => state.calendar); 

  const setActiveEvent = ( calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  }

  const startSavingEvent = async(calendarEvent ) => {

    try {

      if(calendarEvent.id){
        //Actualizando
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
        dispatch(onUpdateEvent({...calendarEvent, user}));
        return;
  
      }
      const {data } = await calendarApi.post('/events', calendarEvent);
      dispatch(onAddNewEvent({...calendarEvent, id: data.evento.id, user}));

    } catch (error) {
      console.log(error);
      Swal.fire('Error al actualizar', error.response.data?.msg, 'error');
    }

    
    
  }

  const startDeletingEvent = async()  => {
    //Llegar al Backend
    

    try {
      await calendarApi.delete(`/events/${ activeEvent.id }`);
      dispatch(onDeleteEvent());  
      Swal.fire('Evento Eliminado', 'Se ha eliminado correctamente el evento', 'success');
    } catch (error) {
      console.log('Error al eliminar');
      console.log(error);
      Swal.fire('Error al eliminar', 'Este evento no fue creado por ti', 'error');
    }
    
  }

  const startLoadingEvents = async() => {
    try {
      const { data } = await calendarApi.get('/events');
      const events = convertEventToDateEvent(data.eventos);
      console.log(events);
      dispatch( onLoadEvents( events ));
      
      
    } catch (error) {
      console.log(error);
      console.log('Error Cargando eventos');
    }
  }

  return {
    //Properties
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    //Methods
    startDeletingEvent,
    setActiveEvent,
    startSavingEvent,
    startLoadingEvents
  }
}
