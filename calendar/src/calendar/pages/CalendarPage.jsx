import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, NavBar } from "../";
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Calendar } from 'react-big-calendar';

import { localizer, getMessagesES } from "../../helpers";
import { useState } from "react";
import { useUiStore, useCalendarStore } from "../../hooks";




export const CalendarPage = () => {

  const {openDateModal} = useUiStore();
  const { events, setActiveEvent } = useCalendarStore();
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') ||'week' );
  //I used localStorage to track the last view

  const eventStyleGetter = (event,start, end, isSelected) => {
   // console.log({event,start, end, isSelected});

    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return {
      style
    }
  }

  const onDoubleClick = ( e ) => {
    //console.log({doubleClick: e});
    openDateModal();
  }
  const onSelect = ( e ) => {
    //console.log({click: e});
    setActiveEvent(e);
  }
  const onViewChange = (e) => {
    localStorage.setItem('lastView', e);
    setLastView(e);
  }

  return (
    <>
      <NavBar/>

      <Calendar
        culture='es' //Spanish Configuration Part 1
        localizer={localizer}  //Configuration of calendar
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 680 }}
        messages={ getMessagesES()} //Spanish Configuration Part 2
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChange} //LocalStorage
      />

      <CalendarModal  />

      <FabAddNew
        
      />
      <FabDelete />

      

    </>
  )
}

