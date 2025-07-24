import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { userService } from '../services/userService'
import { useStore } from '../store/userStore'
import type { User } from '../types/user.types'

export const useUsers = () => {
    const queryClient = useQueryClient()
    const { filters } = useStore()

    const usersQuery = useQuery({
        queryKey: ['users'],
        queryFn: userService.getUsers,
        select: (users: User[]) => {
            let filteredUsers = users

            // Search filter
            if (filters.search) {
                filteredUsers = filteredUsers.filter(
                    (user) =>
                        user.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                        user.email.toLowerCase().includes(filters.search.toLowerCase())
                )
            }

            // Sort
            filteredUsers.sort((a, b) => {
                const aVal = a[filters.sortBy]
                const bVal = b[filters.sortBy]

                if (typeof aVal === 'string' && typeof bVal === 'string') {
                    const comparison = aVal.localeCompare(bVal)
                    return filters.sortOrder === 'asc' ? comparison : -comparison
                }

                if (
                    typeof aVal === 'object' && aVal !== null &&
                    typeof bVal === 'object' && bVal !== null &&
                    'name' in aVal && 'name' in bVal
                ) {
                    const comparison = aVal.name.localeCompare(bVal.name)
                    return filters.sortOrder === 'asc' ? comparison : -comparison
                }

                return 0
            })

            return filteredUsers
        },
    })

    const createUserMutation = useMutation({
        mutationFn: userService.createUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] })
        },
    })

    const updateUserMutation = useMutation({
        mutationFn: ({ id, user }: { id: number; user: Partial<User> }) =>
            userService.updateUser(id, user),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] })
        },
    })

    const deleteUserMutation = useMutation({
        mutationFn: userService.deleteUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] })
        },
    })

    return {
        users: usersQuery.data || [],
        isLoading: usersQuery.isLoading,
        error: usersQuery.error,
        createUser: createUserMutation.mutate,
        updateUser: updateUserMutation.mutate,
        deleteUser: deleteUserMutation.mutate,
        isCreating: createUserMutation.isPending,
        isUpdating: updateUserMutation.isPending,
        isDeleting: deleteUserMutation.isPending,
    }
}