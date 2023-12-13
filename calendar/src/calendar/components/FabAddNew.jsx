import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks"


export const FabAddNew = () => {

    const {openDateModal} = useUiStore();
    const {setActiveEvent} = useCalendarStore();

    const handleClickNew = () => {
        //Clean the modal
        setActiveEvent({
            title: '',
            notes: '',
            start: new Date(),
            end: addHours(new Date(), 2),
            bgColor: '#asasdsasd',
            user : {
                _id: '123',
                name: 'Juan Carlos'
            }
        });
        //Open modal
        openDateModal();
    }

  return (
    <button
        className="btn btn-primary fab"
        onClick={handleClickNew}
    >
        <i className="fas fa-plus"></i>

    </button>
  )
}
