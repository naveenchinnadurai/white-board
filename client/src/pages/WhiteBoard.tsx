import { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { User } from 'lucide-react';
import { useUser } from '../context/userProvider';
import Whiteboard from '../components/whiteBoard';
import Model from '../components/model';

function WhiteBoard() {
    const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const { user, logout } = useUser();

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMenuAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setMenuAnchorEl(null);
    };

    return (
        <div className="relative">
            <nav className="absolute top-0 flex w-full justify-end p-5 z-10 bg-transparent">
                <Model open={modalOpen} setOpen={(val: boolean) => setModalOpen(val)} />
                <Button onClick={handleMenuOpen}>
                    <User size={30} />
                </Button>
                <Menu anchorEl={menuAnchorEl} open={Boolean(menuAnchorEl)} onClose={handleMenuClose} >
                    <MenuItem onClick={handleMenuClose}>{user?.name}</MenuItem>
                    <MenuItem onClick={() => { setModalOpen(true); handleMenuClose(); }}>Create New Board</MenuItem>
                    <MenuItem onClick={() => { handleMenuClose(); logout() }}>Logout</MenuItem>
                </Menu>
            </nav>
            <Whiteboard />
        </div>
    );
}

export default WhiteBoard;
