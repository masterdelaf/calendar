import { addHours } from "date-fns"
import { useCalendarStore, useUiStore } from "../../hooks"


export const FabAddNew = () => {

    const { openDateModal } = useUiStore()
    const { setActiveEvent } = useCalendarStore()

    const handleClickNew = () => {
        setActiveEvent({
            title: '',
            note: '',
            start: new Date(),
            end: addHours( new Date(), 2 ),
            bgColor: '#fafafa',
            user: {
                _id: '123',
                name: 'Francisco' 
            }
        })
        openDateModal()
    }

  return (
    <button
        onClick={ handleClickNew }
        className="btn btn-primary fab"
    >
        <i className="fas fa-plus"></i>
    </button>
  )
}
