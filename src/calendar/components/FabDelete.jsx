import { useCalendarStore, useUiStore } from "../../hooks"


export const FabDelete = () => {

    const { startdeletingEvent, hasEventSelected } = useCalendarStore()
    const { isDateModalOpen } = useUiStore()

    const handleDelete = () => {
        startdeletingEvent()
    }

  return (
    <button
        onClick={ handleDelete }
        className="btn btn-danger fab-danger"
        style={{
            display: hasEventSelected && !isDateModalOpen ? '' : 'none'
        }}
    >
        <i className="fas fa-trash-alt"></i>
    </button>
  )
}
