import { api } from '@utils/api'
import type { User } from '../types/user.types'

export const userService = {
  getUsers: async (): Promise<User[]> => {
    const response = await api.get<User[]>('/users')
    return response.data
  },

  getUser: async (id: number): Promise<User> => {
    const response = await api.get<User>(`/users/${id}`)
    return response.data
  },

  createUser: async (user: Omit<User, 'id'>): Promise<User> => {
    const response = await api.post<User>('/users', user)
    return response.data
  },

  updateUser: async (id: number, user: Partial<User>): Promise<User> => {
    const response = await api.put<User>(`/users/${id}`, user)
    return response.data
  },

  deleteUser: async (id: number): Promise<void> => {
    await api.delete(`/users/${id}`)
  },
}