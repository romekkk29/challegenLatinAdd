import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import { authService } from '@services/auth'
import { AuthBody, User } from '../types/user'

// Estado inicial
const storedUser = localStorage.getItem('user')
const initialState = {
  token: Cookies.get('token') || '',
  user: storedUser ? (JSON.parse(storedUser) as User) : null,
  error: null as string | null,
  loading: false
}

// Thunk para login
export const login = createAsyncThunk(
  'auth/login',
  async (body: AuthBody, { rejectWithValue }) => {
    try {
      const res = await authService.login(body)

      if (res.token) {
        const user: User = { email: res.email, name: res.name }

        // Guardar en localStorage y cookies
        localStorage.setItem('user', JSON.stringify(user))
        Cookies.set('token', res.token, { expires: 7 })

        return { user, token: res.token }
      } else {
        return rejectWithValue('Token no recibido')
      }
    } catch (err: any) {
      return rejectWithValue(err.message)
    }
  }
)

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = ''
      state.error = null
      state.loading = false
      Cookies.remove('token')
      localStorage.removeItem('user')
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  }
})

export const { logout } = authSlice.actions
export default authSlice.reducer
