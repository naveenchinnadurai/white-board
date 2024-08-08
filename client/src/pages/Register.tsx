import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { Button, TextField, IconButton, InputLabel, FormControl, FormHelperText } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { registerSchema } from '../schema/registerSchema';
import axios from 'axios';


export default function Register() {
  const [showPassword, setShowPassword] = useState(false);

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name:'',
      email: '',
      password: '',
      confirmPassword:'',
      mobileNumber:''
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    const { name, email, password, mobileNumber } = values;

    try {
      const res = await axios.post('http://localhost:7000/api/v1/auth/signup', {
        name,
        email,
        password,
        mobileNumber
      });
      console.log(res)
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  }

  return (
    <>
      <div className='flex h-svh w-svw items-center justify-center'>
        <div className='flex min-w-[400px] flex-col gap-4'>
          <h1 className='text-2xl font-bold'>Create your Job Board account</h1>
          <p className='mb-3'>
            Already have an account?{' '}
            <Link to='/login' className='text-blue-500'>
              Sign in
            </Link>
            .
          </p>
          <form onSubmit={registerForm.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
            <TextField
              label='Email'
              {...registerForm.register('email')}
              error={!!registerForm.formState.errors.email}
              helperText={registerForm.formState.errors.email?.message}
              fullWidth
              variant='outlined'
              margin='normal'
            />
            <FormControl variant="outlined" fullWidth margin='normal'>
              <InputLabel>Password</InputLabel>
              <TextField
                type={showPassword ? 'text' : 'password'}
                {...registerForm.register('password')}
                error={!!registerForm.formState.errors.password}
                helperText={registerForm.formState.errors.password?.message}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  ),
                }}
                label='Password'
                variant='outlined'
              />
            </FormControl>
            <Button type='submit' variant='contained' color='primary' className='mt-4'>
              Create account
            </Button>
          </form>
          <p className='mt-4 text-sm'>
            By signing up, you agree to our{' '}
            <Link to={`/terms`} className='text-blue-500'>
              terms
            </Link>
            , {'and '}
            <Link to={`/privacy`} className='text-blue-500'>
              privacy policy
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}