import { useSelector, useDispatch } from 'react-redux'
import { onAddNewEvent, onSetActiveEvent, onUpdateEvent, onDeleteEvent } from '../store'

export const useCalendarStore = () => {

    const dispatch = useDispatch()

    const { 
        events,
        activeEvent 
    } = useSelector( state => state.calendar )

    const setActiveEvent = ( calendarEvent ) => {
      dispatch( onSetActiveEvent( calendarEvent  ) )
    }

    const startSavingEvent = async( calendarEvent ) => {


      if( calendarEvent._id ) {
        // Actualizando
        dispatch( onUpdateEvent( { ...calendarEvent } ) )
      }else{
        // Creando
        dispatch( onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }) )
      }
    }

    const startdeletingEvent = () => {
      dispatch( onDeleteEvent() )
    }

  return {
    // Properties
    events,
    activeEvent,
    hasEventSelected: !!activeEvent, //Para saber si hay evento activo, las !! es para pasarlo a true o false (por defecto es null si no se ponen)
    // Methods
    setActiveEvent,
    startSavingEvent,
    startdeletingEvent,
  }
    
  
}

