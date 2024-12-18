import AddIcon from '@mui/icons-material/Add';
import GroupsIcon from '@mui/icons-material/Groups';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button, Tooltip } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Model from '../components/model';
import NewBoard from '../components/newBoard';
import { useUser } from '../context/userProvider';

const Dashboard: React.FC = () => {
    const { user, logout, boards } = useUser();
    const [create, setCreate] = useState<boolean>(true)
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [dialogOpen, setDialogOpen] = useState<boolean>(false)

    return (
        <div className="flex flex-col p-5 bg-slate-900 text-white h-screen">
            <header className="flex items-center justify-between mb-6">
                <div className="flex md:gap-1 items-center">
                    <div className="w-10 md:w-14 h-10 md:h-14 bg-gray-400 rounded-full"></div>
                    <div className="flex-1 ml-4">
                        <h1 className="text-lg md:text-2xl font-medium">{user?.name}</h1>
                        <h1 className="text-sm md:text-xl font-normal">{user?.email}</h1>
                    </div>
                </div>
                <Tooltip title="Logout">
                    <Button onClick={() => setDialogOpen(true)} className='!text-white'>
                        <LogoutIcon sx={{ fontSize: 40 }} />
                    </Button>
                </Tooltip>
            </header>
            <div className="flex gap-4 mb-6 flex-col md:flex-row">
                <Button onClick={() => { setModalOpen(true), setCreate(true) }} className='w-full md:w-2/5 lg:w-1/3'>
                    <div className="p-5 w-full  bg-gray-300 rounded flex justify-start items-center gap-2">
                        <AddIcon sx={{ fontSize: 40 }} />
                        <div className="flex flex-col gap-1">
                            <h1 className="text-lg font-bold w-fit">New Board</h1>
                            <h1 className="text-md font-normal">Create Your Own Board</h1>
                        </div>
                    </div>
                </Button>
                <Button className='w-full md:w-fit lg:w-1/3' onClick={() => { setModalOpen(true), setCreate(false) }}>
                    <div className="p-5 w-full bg-gray-300 rounded flex items-center gap-4">
                        <GroupsIcon sx={{ fontSize: 50 }} />
                        <div className="flex flex-col">
                            <h1 className="text-lg font-bold w-fit">Join Board</h1>
                            <h1 className="text-md font-normal text-start">Connect with Your colleague</h1>
                        </div>
                    </div>
                </Button>
            </div>
            <h1 className="text-2xl font-medium mb-5">Your Boards</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-3">
                {
                    boards?.map((e, i) => {
                        return (
                            <Link to={`/whiteboard/${e.id}`} state={{ board: e, }} className="flex flex-col justify-center" key={i}>
                                <div className="h-52 bg-gray-300 rounded"></div>
                                <h1 className="text-xl text-center mt-3">{e.name}</h1>
                            </Link>
                        )
                    })
                }
            </div>
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle id="alert-dialog-title">
                    Logout
                </DialogTitle>
                <DialogContent className='!pe-28'>
                    <DialogContentText id="alert-dialog-description">Do You want to Logout?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)}>cancel</Button>
                    <Button onClick={() => logout()} autoFocus> Logout </Button>
                </DialogActions>
            </Dialog>
            <Model open={modalOpen} setOpen={(val: boolean) => setModalOpen(val)}>
                <NewBoard className='h-full' createBoard={create} />
            </Model>
        </div >
    );
};

export default Dashboard;
