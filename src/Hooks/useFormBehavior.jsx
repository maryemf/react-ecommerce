import { useState } from "react";

const useFormBehaviour  = (initialValue) => {
    const [formValue, setFormValue] = useState(initialValue);
    const [formError, setFormError] = useState({});
    const [formValid, setFormValid] = useState(true);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormValue(values => ({...values, [name]: value}));
    }

    const handleError = (field) => {
        const showError = !formError[field]?.valid && !formValid;
        return(
            showError && 
            <div className=" text-red-900 font-light text-xs">{formError[field]?.message?.join('. ')}
            </div>            
        );
    }    
    return { formValue, setFormValue, formError, setFormError, formValid, setFormValid, handleChange, handleError }
    
}

export default useFormBehaviour;