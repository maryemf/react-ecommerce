import { Link, useNavigate } from "react-router-dom";
import Layout from "../../Components/Layout";
import { useContext } from "react";
import { ShoppingContext } from "../../Context";
import { validEmail } from "../../Utils/index,js";
import useFormBehaviour from "../../Hooks/useFormBehavior";
import useLocalUsers from "../../Hooks/useLocalUsers";

const Register = () => {
    const context = useContext(ShoppingContext);
    const navigate = useNavigate();
    const { validateExistEmail, addUser } = useLocalUsers();
    const {formValue, formError, setFormError, formValid, setFormValid, handleChange, handleError} = useFormBehaviour({
        name: "",
        email: "",
        password: "",
        confirm: "",
        id: crypto.randomUUID()
    }); 

    const handleSubmit = (event) => {
        event.preventDefault();
        setFormError({});
        setFormValid(true);
        const validation = validateForm(formValue);
        if (!validation.valid) {
            setFormValid(false);
            setFormError(validation.errors);            
        } else {            
            addUser(formValue);
            context.setUser(formValue);
            navigate('/');
        }
    }

    const validateForm = (formValue) => {          
        let errors = {name: {}, email: {}, password: {}, confirm: {}}; 
        let invalids = 0;
        Object.keys(formValue).forEach(field => {
            if (field === 'id') return;
            let message = [];
            let value = formValue[field].trim();
            if (!value) message.push("Required Field");
            if (field === 'email'){
                if (value && !validEmail(formValue.email)) message.push("Invalid Email Format");
                if (value && validateExistEmail(formValue?.email)) message.push("This email is already registered");
            }
            if (field === 'password' || field === 'confirm'){
                if (formValue.password !== formValue.confirm) message.push( "Password and confirmation doesn't match" );
            }    
            invalids = message.length > 0 ? invalids + 1 : invalids;          
            errors[field] = {valid: message.length == 0, message}; 
        }) 
        return {valid: invalids === 0 , errors}  
    }

    return (
        <Layout>
            <div  className="w-5/6 py-16">
                <div  className="max-w-lg mx-auto shadow px-6 py-7 rounded-lg overflow-hidden">
                    <h2  className="text-2xl uppercase font-medium mb-1">Create an account</h2>
                    <p  className="text-gray-600 mb-6 text-sm">
                        Register for new cosutumer
                    </p>
                    <form autoComplete="off">
                        <div className="space-y-2">
                            <div>
                                <label htmlFor="name"  className="text-gray-600 mb-2 block">Full Name</label>
                                <input type="text" name="name" id="name"
                                    className={`${!formError?.name?.valid && !formValid ? 'border-red-900' : ''} block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded-lg focus:ring-0 focus:border-primary placeholder-gray-400`}
                                    placeholder="your name"
                                    value={formValue.name || ""}
                                    onChange={handleChange}
                                />
                                {handleError('name')}
                            </div>
                            <div>
                                <label htmlFor="email"  className="text-gray-600 mb-2 block">Email address</label>
                                <input type="email" name="email" id="email"
                                    className={`${!formError?.email?.valid && !formValid ? 'border-red-900' : ''} block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded-lg focus:ring-0 focus:border-primary placeholder-gray-400`}
                                    placeholder="youremail.@domain.com" 
                                    value={formValue.email || ""}
                                    onChange={handleChange}
                                />
                               {handleError('email')}
                            </div>
                            <div>
                                <label htmlFor="password"  className="text-gray-600 mb-2 block">Password</label>
                                <input type="password" name="password" id="password"
                                    className={`${!formError?.password?.valid && !formValid ? 'border-red-900' : ''} block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded-lg focus:ring-0 focus:border-primary placeholder-gray-400`}
                                    placeholder="*******" 
                                    value={formValue.password || ""}
                                    onChange={handleChange}
                                />
                               {handleError('password')}
                            </div>
                            <div>
                                <label htmlFor="confirm"  className="text-gray-600 mb-2 block">Confirm password</label>
                                <input type="password" name="confirm" id="confirm"
                                    className={`${!formError?.confirm?.valid && !formValid ? 'border-red-900' : ''} block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded-lg focus:ring-0 focus:border-primary placeholder-gray-400`}
                                    placeholder="*******" 
                                    value={formValue.confirm || ""}
                                    onChange={handleChange}
                                    />
                                {handleError('confirm')}
                            </div>
                        </div>                        
                        <div className="mt-4">
                            <button type="button"
                                className="block w-full py-2 text-center bg-black text-white border rounded-lg hover:bg-slate-800 transition uppercase font-medium"
                                onClick={handleSubmit}    
                            >
                                
                                    Create account
                            </button>
                        </div>
                    </form>
                    <p className="mt-4 text-center text-gray-600 text-sm">
                        Already have account? 
                        <Link to='/signin'>
                            <span className="cursor-pointer underline underline-offset-4"> Sign in</span>
                        </Link>
                    </p>
                </div>
            </div>
        </Layout>
    );
}

export default Register;