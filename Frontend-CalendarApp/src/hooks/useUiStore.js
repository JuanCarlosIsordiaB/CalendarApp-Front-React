
import { useDispatch, useSelector } from 'react-redux';
import { onCloseDateModal, onOpenDateModal} from '../store/ui/uiSlice';


//It helps to know if the modal is closed or opened
export const useUiStore = () => {

    const dispatch = useDispatch();

  const {
     isDateModalOpen
    } =   useSelector( state => state.ui);


    const openDateModal = () => {
        dispatch( onOpenDateModal() )
    }

    const closeDateModal = () => {
        dispatch( onCloseDateModal())
    }

    return{
        //Propiedades
        isDateModalOpen,

        //Métodos
        openDateModal,
        closeDateModal
    }

}