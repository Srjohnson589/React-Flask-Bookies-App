import { createContext, useState } from 'react';

interface UserContext {
    user: User
    setUser: React.Dispatch<React.SetStateAction<User>>
}

interface User {
    username: string;
}

export const UserContext = createContext<UserContext>({} as UserContext)

export default function UserContextProvider({children}: {children: React.ReactNode}){

    const [user, setUser] = useState<User>({
        username: ''
    })

    const values={
        user,
        setUser
    }

    return(
        <UserContextProvider value={values}>
            {children}
        </UserContextProvider>
    )

}