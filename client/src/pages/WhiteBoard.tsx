import { ArrowBack } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Users } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import Whiteboard from '../components/whiteBoard';
import { useUser } from '../context/userProvider';

function WhiteBoard() {
    const { navigateTo } = useUser();
    const location = useLocation();
    if (!location.state) {
        location.state = {
            title: "New Board"
        }
    }
    return (
        <div className="relative overflow-auto">
            <nav className="absolute top-0 px-5 flex w-full justify-between items-center z-10 bg-transparent">
                <Button onClick={() => navigateTo('/dashboard')} className="flex gap-2 justify-center items-center">
                    <ArrowBack />
                    <h1 className="text-xl font-medium">Back</h1>
                </Button>
                <h1 className="text-2xl font-medium">{location.state.title}</h1>
                <Button className='!px-4 !py-4 !rounded-full '>
                    <Users size={33} className='m-0' />
                </Button>
            </nav>
            <Whiteboard />
        </div>
    );
}

export default WhiteBoard;
