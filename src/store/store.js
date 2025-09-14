import { create } from "zustand";

import { registerFormValidator } from "../utils/formValidator"; 

const URL = "http://localhost:8080";

export const useAuthStore = create (( set ) => ({
    auths: [],
    createAuths: (auths) => set ({ auths }),
    createAuth: async(newAuth) => {

        try {

            registerFormValidator(newAuth);
            
            const response = await fetch(`${URL}/api/v1/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newAuth)
            });

            const data = await response.json();
           
            if (data.status !== 201) {
                return { success: false, message: data.message };
            }

            set((state) => ({auths: [...state.auths, data.data]}));
            return { success: true, message: "Successfully register."}

        } catch (error) {
            
            return { success: false, message: error.message };
        }
    },
    singInAuth: async(auth) => {

        if(!auth.username  || !auth.password) {
            return { success: false, message: "All fields are required"};
        }

        try {
            const response = await fetch(`${URL}/api/v1/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(auth)
            });

            const data = await response.json();

            if (data.status !== 200) {
                return { success: false, message: data.message };
            }
            
            return { success: true, message: "Welcome", token: data.token };

        } catch (error) {
            return { success: false, message: error.message };
        }   
    },
    logout: async() => {

        try {
            await fetch(`${URL}/api/v1/auth/logout`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${JSON.parse(localStorage.getItem("auth"))}`
                }
            });

            return { success: true, message: "Goodbye" };
        } catch (error) {
            return { success: false, message: error.message };
        }
       
        
    }
}));