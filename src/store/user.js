import { create } from "zustand";
import { toast } from "react-toastify";

const URL = "http://localhost:8080";

export const useUserStore = create (( set ) => ({
    users: [],
    createUsers: (users) => set ({ users }),
    getUser: async () => {
         
        const response = await fetch(`${URL}/api/v1/users/profile`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem("auth"))}`
            }
        });

        const data = await response.json();
        
        if (response.ok) {
            set((state) => ({users: [...state.users, data]}));
            return data;
        } else {
            toast.error("Fail to fetch data.");
        }

    },
    editUser: async (body, userId) => {

        try {
            const response = await fetch(`${URL}/api/v1/users/${userId}/edit`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${JSON.parse(localStorage.getItem("auth"))}`,
                    "content-type": "application/json"
                },
                body: JSON.stringify(body)
            });
    
            const result = await response.json();
    
            if (response.ok) {
                const id = body.id;
                set(state => ({ users: state.users.map(user => user.id === id ? result : user) }));
                return { success: true }
            } else {
                toast.error(result.message)
            }
                
        } catch (error) {
            return { success: false };
        }
    }
}));