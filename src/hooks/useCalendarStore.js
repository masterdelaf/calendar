import { useSelector, useDispatch } from 'react-redux'
import { onAddNewEvent, onSetActiveEvent, onUpdateEvent, onDeleteEvent, onLoadEvents } from '../store'
import calendarApi from '../api/calendarApi'
import { convertEventsToDateEvents } from '../helpers'
import Swal from 'sweetalert2'

export const useCalendarStore = () => {

    const dispatch = useDispatch()

    const { 
        events,
        activeEvent 
    } = useSelector( state => state.calendar )
    const { user } = useSelector( state => state.auth )

    const setActiveEvent = ( calendarEvent ) => {
      dispatch( onSetActiveEvent( calendarEvent  ) )
    }

    const startSavingEvent = async( calendarEvent ) => {

      try {
        if( calendarEvent.id ) {
          // Actualizando
          await calendarApi.put(`/events/${ calendarEvent.id }`, calendarEvent )
          dispatch( onUpdateEvent( { ...calendarEvent } ) )
          return
  
        }
  
          // Creando
          const { data } = await calendarApi.post('/events', calendarEvent)
          dispatch( onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }) )
        
      } catch (error) {
        console.log(error)
        Swal.fire('Error al guardar', error.response.data.msg, 'error')
      }

      
    }

    const startdeletingEvent = async() => {
      try {
        await calendarApi.delete(`/events/${ activeEvent.id }`)
        dispatch( onDeleteEvent() )

      } catch (error) {
        console.log(error)
        Swal.fire('Error al eliminar', error.response.data.msg, 'error')
      }
    }

    const startLoadingEvents = async() => {
      try {
        const { data } = await calendarApi.get('/events')
        const events = convertEventsToDateEvents( data.eventos )
        dispatch( onLoadEvents(events) )
      } catch (error) {
        console.log(error)
      }
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
    startLoadingEvents,
    onLoadEvents,
  }
    
  
}

