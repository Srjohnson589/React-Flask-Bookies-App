import { createContext, useState } from 'react';

interface UserContext {
    user: User
    setUser: React.Dispatch<React.SetStateAction<User>>
}

interface User {
    username: string;
    profile_pic: string;
}

export const UserContext = createContext<UserContext>({} as UserContext)

export default function UserContextProvider({children}: {children: React.ReactNode}){

    const [user, setUser] = useState<User>({
        username: '',
        profile_pic: 'https://cdn2.iconfinder.com/data/icons/hobby-butterscotch-vol-3/512/Reading-512.png'
    })

    const values={
        user,
        setUser
    }

    return(
        <UserContext.Provider value={values}>
            {children}
        </UserContext.Provider>
    )

}