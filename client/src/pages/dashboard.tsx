import React, { useState } from 'react';
import { useUser } from '../context/userProvider';
import AddIcon from '@mui/icons-material/Add';
import GroupsIcon from '@mui/icons-material/Groups';
import Model from '../components/model';
import { Button, Tooltip } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

const Dashboard: React.FC = () => {
    const { user, logout } = useUser();
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    return (
        <div className="flex flex-col p-5">
            <header className="flex items-center justify-between mb-6">
                <div className="flex gap-1">
                    <div className="w-14 h-14 bg-gray-400 rounded-full"></div>
                    <div className="flex-1 ml-4">
                        <h1 className="text-2xl font-medium">{user?.name}</h1>
                        <h1 className="text-xl font-normal">{user?.email}</h1>
                    </div>
                </div>
                <Tooltip title="Logout">
                    <Button onClick={() => logout()} className='!text-black'>
                        <LogoutIcon sx={{ fontSize: 40 }} />
                    </Button>
                </Tooltip>
            </header>
            <Model open={modalOpen} setOpen={(val: boolean) => setModalOpen(val)} />
            <div className="flex gap-4 mb-6">
                <Button onClick={() => setModalOpen(true)} className='!w-1/3'>
                    <div className="p-5 w-full  bg-gray-300 rounded flex justify-start items-center gap-2">
                        <AddIcon sx={{ fontSize: 40 }} />
                        <div className="flex flex-col gap-1">
                            <h1 className="text-lg font-bold w-fit">New Board</h1>
                            <h1 className="text-md font-normal">Create Your Own Board</h1>
                        </div>
                    </div>
                </Button>
                <Button className='w-1/3'>
                    <div className="p-5 w-full bg-gray-300 rounded flex items-center gap-4">
                        <GroupsIcon sx={{ fontSize: 50 }} />
                        <div className="flex flex-col">
                            <h1 className="text-lg font-bold w-fit">Join Board</h1>
                            <h1 className="text-md font-normal">Connect with Your colleague Board</h1>
                        </div>
                    </div>
                </Button>
            </div>
            <h1 className="text-2xl font-medium mb-5">Your Boards</h1>
            <div className="grid grid-cols-3 gap-5 p-3">
                <div className="flex flex-col justify-center">
                    <div className="h-52 bg-gray-300 rounded"></div>
                    <h1 className="text-xl text-center">This is Board 1</h1>
                </div>
                <div className="flex flex-col justify-center">
                    <div className="h-52 bg-gray-300 rounded"></div>
                    <h1 className="text-xl text-center">This is Board 2</h1>
                </div>
                <div className="flex flex-col justify-center">
                    <div className="h-52 bg-gray-300 rounded"></div>
                    <h1 className="text-xl text-center">This is Board 3</h1>
                </div>
            </div>
        </div >
    );
};

export default Dashboard;
