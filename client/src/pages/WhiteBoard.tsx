import { ArrowBack } from '@mui/icons-material';
import { Button } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import { Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Board from '../components/board';
import { useUser } from '../context/userProvider';
import { BoardInfo, BoardType } from '../utils/types';
import { getBoardInfo, leaveBoard } from '../utils/api';

function WhiteBoard() {
    const { navigateTo, user } = useUser();
    const [open, setOpen] = useState<boolean>(false);
    const location = useLocation();

    const [boardInfo, setBoardInfo] = useState<BoardInfo | null>();

    const getBoardDetails = async () => {
        try {
            if (!location.state.board.id) return;
            const res: BoardType = await getBoardInfo(location.state.board.id)
            setBoardInfo(res.board)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setBoardInfo(location.state?.board)
    }, [])

    useEffect(() => {
        getBoardDetails();
    }, [open])

    const back = async () => {
        try {
            if (boardInfo?.createdBy != user?.id) {
                await leaveBoard(boardInfo?.id, user?.id)
            }
        } catch (error) {
            console.log(error);
        } finally {
            navigateTo('/dashboard')
        }
    }
    return (
        <div className="relative overflow-auto h-screen">
            <nav className="absolute top-0 px-5 flex w-full justify-between items-center z-10 bg-transparent">
                <Button onClick={back} className="flex gap-2 justify-center items-center">
                    <ArrowBack />
                    <h1 className="text-lg font-medium">Back</h1>
                </Button>
                <h1 className="text-2xl font-medium">{boardInfo?.name}</h1>
                <div className="relative">
                    <Button className='px-4 py-4 rounded-full flex-col' onClick={() => setOpen(!open)}>
                        <Users size={33} className='m-0' />
                    </Button>
                    <Collapse in={open} className='absolute right-0 w-auto'>
                        {
                            boardInfo?.currentParticipants && boardInfo?.currentParticipants.map((e) => {
                                return (
                                    <h1>{e}</h1>
                                )
                            })
                        }
                    </Collapse>
                </div>
            </nav>

            <Board />
        </div>
    );
}

export default WhiteBoard;
