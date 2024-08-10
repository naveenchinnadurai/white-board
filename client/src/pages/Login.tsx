import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { TextField, Button, IconButton, Typography, CircularProgress } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { styled } from '@mui/material/styles'
import { loginFormSchema } from '../utils/formSchema'
import axios from 'axios'
import { useUser } from '../context/userProvider'


type LoginFormValues = z.infer<typeof loginFormSchema>

const FormContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  minWidth: '400px',
}))

export default function Login() {
  const navigate = useNavigate();
  const { setUserState } = useUser();
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  })

  async function onSubmit(values: LoginFormValues) {
    setIsLoading(true)
    console.log(values)
    try {
      const res = await axios.post('http://localhost:7000/api/v1/auth/login', {
        email: values.email,
        password: values.password
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
      navigate('/whiteboard')
    } catch (error) {
      console.error('Login error:', error)
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <>
      <div className='flex h-screen w-screen items-center justify-center'>
        <FormContainer>
          <Typography variant="h4" component="h1" gutterBottom>
            Sign into Job Board account
          </Typography>
          <Typography variant="body1" component="p">
            Don't have an account?{' '}
            <Link to='/signup' className='text-blue-500'>
              Sign up
            </Link>
            .
          </Typography>

          <form onSubmit={form.handleSubmit(onSubmit)}>
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              {...form.register('email')}
              error={!!form.formState.errors.email}
              helperText={form.formState.errors.email?.message}
            />
            <TextField
              label="Password"
              fullWidth
              margin="normal"
              type={showPassword ? 'text' : 'password'}
              {...form.register('password')}
              error={!!form.formState.errors.password}
              helperText={form.formState.errors.password?.message}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                )
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isLoading}
              style={{ marginTop: '16px' }}
            >
              {isLoading ? <CircularProgress size={24} /> : 'Sign In'}
            </Button>
          </form>

          <Typography variant="body2" style={{ marginTop: '16px' }}>
            By signing in, you agree to our{' '}
            <Link to={`/terms`} className='text-blue-500'>
              terms
            </Link>
            , and{' '}
            <Link to={`/privacy`} className='text-blue-500'>
              privacy policy
            </Link>
          </Typography>
        </FormContainer>
      </div>
    </>
  )
}
