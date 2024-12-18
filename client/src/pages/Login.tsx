import { zodResolver } from '@hookform/resolvers/zod'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Button, CircularProgress, IconButton, TextField, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import axios from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'
import { useUser } from '../context/userProvider'
import { loginFormSchema } from '../utils/formSchema'


type LoginFormValues = z.infer<typeof loginFormSchema>

const FormContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  minWidth: '400px',
}))

export default function Login() {
  const { navigateTo, user, setAlert } = useUser();
  if (user?.isLoggedIn) {
    navigateTo('/dashboard')
  }

  const { setUserState, setUserBoards } = useUser();
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
    try {
      const res = await axios.post('http://localhost:7000/api/v1/auth/login', {
        email: values.email,
        password: values.password
      })
      if (res.status == 201) {
        setUserState({
          isLoggedIn: true,
          id: res.data.user.id,
          name: res.data.user.name,
          email: res.data.user.email,
          mobileNumber: res.data.user.mobileNumber
        })
        setUserBoards(res.data.userBoards)
        navigateTo('/dashboard')
        setAlert({
          state: true,
          content: "Login successful!!",
          type: "success"
        })
      } else {
        setAlert({
          state: true,
          content: "Sorry, Something went Wrong",
          type: "info"
        })
      }
    } catch (error: any) {
      const code = error.response.status;
      switch (code) {
        case 404:
          setAlert({
            state: true,
            content: error.response.data.error,
            type: "warning"
          })
          break;
        case 303:
          setAlert({
            state: true,
            content: error.response.data.error,
            type: "error"
          })
          break;
        case 500:
          setAlert({
            state: true,
            content: error.response.data.error,
            type: "info"
          })
          break;

        default:
          setAlert({
            state: true,
            content: "Sorry, Something went Wrong",
            type: "info"
          })
          break;
      }
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <div className='flex h-screen w-screen items-center justify-center bg-slate-900 text-white'>
      <FormContainer className=''>
        <Typography variant="h4" component="h1" gutterBottom>
          Sign into Zween White <br /> Board account
        </Typography>
        <Typography variant="body1" component="p">
          Don't have an account?{' '}
          <Link to='/signup' className='text-blue-500'>
            Sign up
          </Link>
          .
        </Typography>

        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col'>
          <TextField
            label="Email"
            margin="normal"
            className='!placeholder:text-white !text-white border-w'
            {...form.register('email')}
            error={!!form.formState.errors.email}
            helperText={form.formState.errors.email?.message}
            InputProps={{
              sx: {
                '& .MuiInputBase-input': {
                  color: 'white',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'blue',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'blue',
                },
              },
            }}
            InputLabelProps={{
              sx: {
                color: 'white',
              },
            }}
          />
          <TextField
            label="Password"
            margin="normal"
            className=''
            type={showPassword ? 'text' : 'password'}
            {...form.register('password')}
            error={!!form.formState.errors.password}
            helperText={form.formState.errors.password?.message}
            InputProps={{
              sx: {
                '& .MuiInputBase-input': {
                  color: 'white',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'blue',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'blue',
                },
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
            InputLabelProps={{
              sx: {
                color: 'white',
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className=''
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
    </div >
  )
}