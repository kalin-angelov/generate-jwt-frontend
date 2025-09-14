import { useState } from "react";

export const useForm = (initialValue) => {
    const [formValue, setFormValue] = useState(initialValue);

    const onFormValueChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setFormValue(state => ({...state, [name]: value}));
    };

    return {
        formValue,
        onFormValueChange
    };
};