import { createContext, useEffect, useState } from "react";

export const CurrentUser = createContext();

function CurrentUserProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        const getLoggedInUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/getUser/:id`, {
                        headers: {
                            'Authorization': `Bearer ${token}` 
                        }
                    });
        
                    if (!response.ok) {
                        throw new Error('Failed to fetch user data');  
                    }
        
                    const contentType = response.headers.get('content-type');
                    console.log('Content-Type:', contentType);
                    if (contentType && contentType.includes('application/json')) {
                        const user = await response.json(); 
                        setCurrentUser(user);
                        localStorage.setItem('currentUser', JSON.stringify(user));
                    } else {
                        throw new Error('Response is not JSON');
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        getLoggedInUser();
    }, []);

    return (
        <CurrentUser.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </CurrentUser.Provider>
    );
}



export default CurrentUserProvider;
