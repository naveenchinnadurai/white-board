import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { Button, TextField, IconButton, InputAdornment, FormControl, InputLabel, OutlinedInput, FormHelperText } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { registerSchema } from '../utils/formSchema';
import { useUser } from '../context/userProvider';
import axios from 'axios';

export default function Register() {
  const navigate = useNavigate();
  const { setUserState } = useUser();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      mobileNumber: ''
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    setLoading(true)
    const { name, mobileNumber, email, password } = values;
    try {
      const res = await axios.post('http://localhost:7000/api/v1/auth/signup', {
        email,
        password,
        name,
        mobileNumber
      })
      console.log('Logged in successfully:', res.data)
      setUserState({
        isLoggedIn: true,
        id: res.data.user.id,
        name: res.data.user.name,
        email: res.data.user.email,
        mobileNumber: res.data.user.mobileNumber,
        boards: res.data.user.boards
      })
      navigate('/dashboard')
    } catch (error) {
      console.error('Login error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className='flex h-svh w-svw items-center justify-center'>
        <div className='flex min-w-[400px] flex-col gap-4'>
          <h1 className='text-2xl font-bold'>Create your Zween White Board account</h1>
          <p className='mb-3'>
            Already have an account?{' '}
            <Link to='/login' className='text-blue-500'>
              Sign in
            </Link>
            .
          </p>
          <form onSubmit={registerForm.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
            <TextField
              label='Name'
              {...registerForm.register('name')}
              error={!!registerForm.formState.errors.name}
              helperText={registerForm.formState.errors.name?.message}
              fullWidth
              variant='outlined'
              margin='normal'
            />

            <TextField
              label='Email'
              {...registerForm.register('email')}
              error={!!registerForm.formState.errors.email}
              helperText={registerForm.formState.errors.email?.message}
              fullWidth
              variant='outlined'
              margin='normal'
            />

            <TextField
              label='Mobile Number'
              {...registerForm.register('mobileNumber')}
              error={!!registerForm.formState.errors.mobileNumber}
              helperText={registerForm.formState.errors.mobileNumber?.message}
              fullWidth
              variant='outlined'
              margin='normal'
            />

            <FormControl variant="outlined" fullWidth margin='normal'>
              <InputLabel>Password</InputLabel>
              <OutlinedInput
                type={showPassword ? 'text' : 'password'}
                {...registerForm.register('password')}
                error={!!registerForm.formState.errors.password}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label='Password'
              />
              <FormHelperText error={!!registerForm.formState.errors.password}>
                {registerForm.formState.errors.password?.message}
              </FormHelperText>
            </FormControl>

            <FormControl variant="outlined" fullWidth margin='normal'>
              <InputLabel>Confirm Password</InputLabel>
              <OutlinedInput
                type={showConfirmPassword ? 'text' : 'password'}
                {...registerForm.register('confirmPassword')}
                error={!!registerForm.formState.errors.confirmPassword}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label='Confirm Password'
              />
              <FormHelperText error={!!registerForm.formState.errors.confirmPassword}>
                {registerForm.formState.errors.confirmPassword?.message}
              </FormHelperText>
            </FormControl>

            <Button type='submit' variant='contained' color='primary' className='mt-4'>
              {loading ? "Creating account" : "Create Account"}
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
