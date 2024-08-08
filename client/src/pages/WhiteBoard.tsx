import Whiteboard from '../components/whiteBoard'
import { Button } from '@mui/material'
import { Menu, User } from 'lucide-react'
function WhiteBoard() {
    return (
        <div className='relative'>
            <nav className='absolute top-0 flex w-full justify-between p-5 z-10'>
                <Button>
                    <Menu />
                </Button>
                <div className="flex gap-5 items-center justify-center">
                    <Button className='px-3 py-1 bg-gray-200 border border-gray-400 rounded '>Invite</Button>
                    <Button className="p-2 bg-slate-300 rounded-full cursor-pointer">
                        <User size={30} />
                    </Button>
                </div>
            </nav>
            <Whiteboard />
        </div>
    )
}

export default WhiteBoard