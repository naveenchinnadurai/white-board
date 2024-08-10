import { Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import NewBoard from './newBoard';
interface Prop {
    open: boolean;
    setOpen: (val: boolean) => void;
}
function Model(props: Prop) {
    return (
        <Modal open={props.open} onClose={() => props.setOpen(false)} className='h-screen w-screen flex items-center justify-center ' >
            <div className='w-1/2 h-3/5 bg-sky-100 rounded-3xl p-4'>
                {/* <Button className="bg-red-700 absolute top-0 right-0" onClick={() => props.setOpen(false)}>
                    <CloseIcon/>
                </Button> */}
                <NewBoard className='h-full' />
            </div>
        </Modal>
    )
}

export default Model