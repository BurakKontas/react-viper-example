# Viper Pattern - TanStack + Ant Design Project Structure
```

## Folder Structure

```
src/
├── components/
│   ├── common/
│   │   ├── Layout/
│   │   │   ├── Layout.tsx
│   │   │   └── Layout.module.scss
│   │   └── LoadingSpinner/
│   │       ├── LoadingSpinner.tsx
│   │       └── LoadingSpinner.module.scss
├── features/
│   └── users/
│       ├── components/
│       │   ├── UserCard/
│       │   │   ├── UserCard.tsx
│       │   │   └── UserCard.module.scss
│       │   └── UserList/
│       │       ├── UserList.tsx
│       │       └── UserList.module.scss
│       ├── hooks/
│       │   └── useUsers.ts
│       ├── services/
│       │   └── userService.ts
│       ├── store/
│       │   └── userStore.ts
│       └── types/
│           └── user.types.ts
├── router/
│   ├── router.ts
│   └── routes.tsx
├── store/
│   └── globalStore.ts
├── styles/
│   ├── globals.scss
│   └── variables.scss
├── utils/
│   ├── queryClient.ts
│   └── api.ts
├── App.tsx
└── main.tsx
```