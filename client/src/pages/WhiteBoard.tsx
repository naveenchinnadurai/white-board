import { Button } from '@mui/material';
import { User } from 'lucide-react';
import Whiteboard from '../components/whiteBoard';

function WhiteBoard() {

    return (
        <div className="relative">
            <nav className="absolute top-0 flex w-full justify-end p-5 z-10 bg-transparent">
                <Button className='!px-4 !py-4 !rounded-full'>
                    <User size={33} className='m-0 text-white'/>
                </Button>
            </nav>
            <Whiteboard />
        </div>
    );
}

export default WhiteBoard;
