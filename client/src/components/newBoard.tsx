import { Button, IconButton, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useUser } from '../context/userProvider';
import { createBoard, joinBoard } from '../utils/api';
import { BoardType } from '../utils/types';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface Prop {
    className: string;
    createBoard: boolean;
}

const NewBoard: React.FC<Prop> = (props) => {
    const { user, setUserBoards, boards, navigateTo } = useUser();
    const [loading, setLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState(false)
    const [boardInfo, setBoardInfo] = useState({
        name: "",
        password: ""
    });

    const [errors, setErrors] = useState<string>("");

    useEffect(() => {
        const timeout = setTimeout(() => {
            setErrors("")
        }, 3000);

        return () => clearTimeout(timeout)
    }, [errors])


    const handleCreateRoom = async () => {

        if (!boardInfo.password) {
            setErrors("Password cannot be empty");
            return;
        }

        if (props.createBoard) {
            try {
                setLoading(true);
                const res: BoardType = await createBoard({ userId: user?.id, boardName: boardInfo.name, password: boardInfo.password });

                if (res.status) {
                    const board = boards;
                    boards?.push(res.board);
                    setUserBoards(board || [])
                    navigateTo(`/whiteboard/${res.board.id}`, {
                        state: {
                            board: res.board,
                        },
                    });
                } else {
                    setErrors(res?.error || "Something Went Wrong!!")
                }
            } catch (error: any) {
                setErrors("Something Went Wrong!!")
            } finally {
                setLoading(false);
                return;
            }
        }

        try {
            setLoading(true);
            const res: BoardType = await joinBoard({ userId: user?.id, boardName: boardInfo.name, password: boardInfo.password })
            console.log(res);
            if (res.status) {
                navigateTo(`/whiteboard/${res.board.id}`, {
                    state: {
                        board: res.board,
                    },
                });
            } else {
                setErrors(res?.error || "Something Went Wrong!!")
            }

        } catch (error: any) {
            setErrors(error?.response?.data?.error)
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBoardInfo({ ...boardInfo, [name]: value });
    };

    return (
        <div className={`flex flex-col items-center justify-center gap-2 p-3 ${props.className}`}>
            <Typography variant="h4" gutterBottom>{props.createBoard ? "Create" : "Join"} a Collaborative Board</Typography>
            <div className="flex flex-col gap-5">
                <TextField
                    label="Board Name"
                    variant="outlined"
                    name="name"
                    value={boardInfo.name}
                    onChange={handleInputChange}
                    className="w-64 m-0"
                    InputProps={{
                        sx: {
                            '& .MuiInputBase-input': { color: 'white' },
                            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'sky-blue' },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'blue' },
                        },
                    }}
                    InputLabelProps={{ sx: { color: 'white' } }}
                />

                <TextField
                    label="Password"
                    variant="outlined"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={boardInfo.password}
                    onChange={handleInputChange}
                    className="w-64 m-0"
                    InputProps={{
                        sx: {
                            '& .MuiInputBase-input': { color: 'white' },
                            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'blue' },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'blue' },
                        },
                        endAdornment: (
                            <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                            >
                                {showPassword ? <Visibility className='!text-white' /> : <VisibilityOff className='!text-white' />}
                            </IconButton>
                        )
                    }}
                    InputLabelProps={{ sx: { color: 'white' } }}
                />
            </div>
            <p className="text-red-400 text-center text-md h-5 w-64 m-0">{errors}   </p>
            <Button variant="contained" onClick={handleCreateRoom} className={`${loading ? "opacity-45" : "opacity-1"}`}>
                {loading ? (props.createBoard ? "Creating Board ..." : "Joining Board ...") : (props.createBoard ? "Create" : "Join Board")}
            </Button>
        </div>
    );
};

export default NewBoard;
