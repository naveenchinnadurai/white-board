import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { useUser } from '../context/userProvider';
import axios from 'axios';

interface Prop {
    className: string
}


const NewBoard: React.FC<Prop> = (props) => {
    const { user } = useUser();
    const [name, setBoardName] = useState<string>();
    const [errors, setErrors] = useState<string>("")
    const [password, setPassword] = useState<string>();

    const handleCreateRoom = async () => {
        if (!password) {
            setErrors("password cannot be empty")
            return;
        }
        const id = user?.id
        try {
            const date = new Date()
            const res = await axios.post('http://localhost:7000/api/v1/board', {
                id: `${id}` + date.getDate() + date.getMonth() + date.getFullYear() + date.getHours() + date.getMinutes(),
                createdBy: user?.id,
                name: name || user?.id,
                password,
            });
            console.log(res.data);
        } catch (error) {
            console.error('Error creating room:', error);
        }
    };

    return (
        <div className={`flex flex-col items-center justify-center gap-2 ${props.className}`}>
            <Typography variant="h4" gutterBottom> Create a Collaborative Board </Typography>
            <div className="flex flex-col gap-2">
                <TextField
                    label="Board Name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setBoardName(e.target.value)}
                    className='w-64 m-0'
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='w-64 m-0'
                />
                <p className="text-red-400 text-lg">{errors}</p>
            </div>
            <Button variant="contained" onClick={handleCreateRoom} className="absolute" >Create Room</Button>
        </div>
    );
};

export default NewBoard;
