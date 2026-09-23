import { User } from '@/components/user-card'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const default_users: User[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    img: "https://i.pravatar.cc/150?img=1",
    active: true
  },
  {
    id: "2",
    name: "Emily Johnson",
    email: "emily.johnson@example.com",
    img: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    img: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: "4",
    name: "Sophia Williams",
    email: "sophia.williams@example.com",
    img: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: "5",
    name: "Daniel Davis",
    email: "daniel.davis@example.com",
    img: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: "6",
    name: "Olivia Wilson",
    email: "olivia.wilson@example.com",
    img: "https://i.pravatar.cc/150?img=6",
  },
  {
    id: "7",
    name: "James Martinez",
    email: "james.martinez@example.com",
    img: "https://i.pravatar.cc/150?img=7",
  },
  {
    id: "8",
    name: "Ava Anderson",
    email: "ava.anderson@example.com",
    img: "https://i.pravatar.cc/150?img=8",
  },
  {
    id: "9",
    name: "William Taylor",
    email: "william.taylor@example.com",
    img: "https://i.pravatar.cc/150?img=9",
  },
  {
    id: "10",
    name: "Emma Thomas",
    email: "emma.thomas@example.com",
    img: "https://i.pravatar.cc/150?img=10",
  },
];

type UserStore = {
  users: User[],
  selecteduser?: User,
  createUser: (user: User) => void,
  toggleStatus: (id: string) => void,
  deleteUser: (id: string) => void,
  selectUser: (user: User) => void,
  updateUser: (user: User) => void,
}

export const useUserStore = create<UserStore>()(persist((set) => ({
  users: default_users,
  selecteduser: undefined,
  createUser: (user: User) => set((state) => ({ users: [...state.users, user] })),
  toggleStatus: (id: string) => set((state) => {
    return {
      users: state.users.map((u) => {
        if (u.id == id) {
          return { ...u, active: !u.active }
        } else {
          return u
        }
      })
    }
  }),
  deleteUser: (id: string) => set((state) => ({ users: state.users.filter((u) => u.id != id) })),
  selectUser: (user: User) => set(() => ({ selecteduser: user })),
  updateUser: (user: User) => set((state) => {
    const newUserList = state.users.map((u) => {
      if (u.id == user.id) {
        return user
      } else {
        return u
      }
    })
    return { users: newUserList }
  })
}), { name: 'user-list-store' })
)

