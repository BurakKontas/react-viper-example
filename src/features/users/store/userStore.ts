import { Store } from '@tanstack/store'
import type { UserFilters } from '../types/user.types'
import { useSyncExternalStore } from 'react'

interface UserStoreState {
  filters: UserFilters
  selectedUserId: number | null
  isModalOpen: boolean
}

export const useStore = () => {
    return useSyncExternalStore(
        userStore.subscribe,
        () => userStore.state
    );
};

export const userStore = new Store<UserStoreState>({
  filters: {
    search: '',
    sortBy: 'name',
    sortOrder: 'asc',
  },
  selectedUserId: null,
  isModalOpen: false,
})

// Actions
export const userStoreActions = {
  setFilters: (filters: Partial<UserFilters>) => {
    userStore.setState((state) => ({
      ...state,
      filters: { ...state.filters, ...filters },
    }))
  },

  setSelectedUser: (userId: number | null) => {
    userStore.setState((state) => ({
      ...state,
      selectedUserId: userId,
    }))
  },

  toggleModal: (isOpen?: boolean) => {
    userStore.setState((state) => ({
      ...state,
      isModalOpen: isOpen ?? !state.isModalOpen,
    }))
  },

  resetFilters: () => {
    userStore.setState((state) => ({
      ...state,
      filters: {
        search: '',
        sortBy: 'name',
        sortOrder: 'asc',
      },
    }))
  },
}