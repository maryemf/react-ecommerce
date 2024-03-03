import { useContext, useState } from "react";
import Layout from "../../Components/Layout";
import useFormBehaviour from "../../Hooks/useFormBehavior";
import { ShoppingContext } from "../../Context";
import { PencilIcon } from "@heroicons/react/24/solid";
import { validEmail } from "../../Utils/index,js";
import useLocalUsers from "../../Hooks/useLocalUsers";

function MyAccount() {
  const context = useContext(ShoppingContext);
  const {formValue, setFormValue, formError, setFormError, setFormValid, handleChange, handleError} = useFormBehaviour({});
  const { validateExistEmail, updateUser } = useLocalUsers();
  const [editName, setEditName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [formInfoValid, setFormInfoValid] = useState(true);
  const [formPasswordValid, setFormPasswordValid] = useState(true);


  const validateForm = (formValue, fields) => {
    let errors = {name: {}, email: {}, password: {}, confirm: {}}; 
    let invalids = 0;
    fields.forEach(field => {
        let message = [];
        let value = formValue[field]?.trim();

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

  const handleSubmitInfo = (event) => {
    event.preventDefault();
    resetErrors();
    let fields = [];
    if (editName) fields.push('name')
    if (editEmail) fields.push('email')
    const validation = validateForm(formValue, fields);
    if (!validation.valid) {
        setFormInfoValid(false);
        setFormValid(false);
        setFormError(validation.errors);            
    } else { 
      const user =  {...context.user, ...formValue};
      setEditName(false)
      setEditEmail(false);
      updateUser(user);
      context.setUser(user);
    }
  }

  const handleSubmitPassword = (event) => {
    event.preventDefault();
    resetErrors();
    const validation = validateForm(formValue, ['password', 'confirm']);
    if (!validation.valid) {
      setFormPasswordValid(false);
      setFormValid(false);
      setFormError(validation.errors);            
    } else {    
      const user =  {...context.user, ...formValue};
      updateUser(user);
      context.setUser(user);
    }
  }

  const resetErrors = () => {
    setFormError({});
    setFormValid(true);
    setFormInfoValid(true);
    setFormPasswordValid(true);
  }

  return (
    <Layout>
      <div className="flex w-80 items-center justify-center relative mb-6">
        <h1  className=" font-medium text-xl">My account</h1>
      </div>
      <div  className="w-5/6 py-5">
          <div  className="max-w-lg mx-auto shadow px-6 py-7 rounded-lg overflow-hidden"> 
            <p  className=" text-lg font-medium mb-4">Change your personal  information</p>               
            <form autoComplete="off" className="mb-10">
                <div className="space-y-2">
                    <div>
                        <label htmlFor="name"  className="text-gray-600 mb-2 block">Full Name</label>
                        <label 
                          className=" text-gray-500 mb-2 block font-light ml-3 cursor-pointer"
                          onClick={() => [setEditName(!editName), setFormValue({name: context.user.name, email: context.user.email})]}
                          >{context.user.name} <span><PencilIcon className="w-3 h-3  inline-flex" /></span></label>
                        <input type="text" name="name" id="name"
                            className={`${!formError?.name?.valid && !formInfoValid ? 'border-red-900' : ''} ${editName ? 'block' : 'hidden'}  w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded-lg focus:ring-0 focus:border-primary placeholder-gray-400`}                              
                            value={formValue.name || ''}
                            onChange={handleChange}
                        />
                        {handleError('name')}
                    </div>
                    <div>
                        <label htmlFor="email"  className="text-gray-600 mb-2 block">Email address</label>
                        <label 
                          className=" text-gray-500 mb-2 block font-light ml-3 cursor-pointer"
                          onClick={() => [setEditEmail(!editEmail), setFormValue({name: context.user.name, email: context.user.email})]}
                          >{context.user.email} <span><PencilIcon className="w-3 h-3 inline-flex" /></span></label>
                        <input type="email" name="email" id="email"
                            className={`${!formError?.email?.valid && !formInfoValid ? 'border-red-900' : ''} ${editEmail ? 'block' : 'hidden'} w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded-lg focus:ring-0 focus:border-primary placeholder-gray-400`}
                            placeholder="youremail.@domain.com" 
                            value={formValue.email || ''}
                            onChange={handleChange}
                        />
                        {handleError('email')}
                    </div>                        
                </div>                        
                <div className="mt-4">
                    <button type="button"
                        className="block w-full py-2 text-center bg-black text-white border rounded-lg hover:bg-slate-800 transition uppercase font-medium disabled:bg-slate-600"
                        onClick={handleSubmitInfo}
                        disabled={!editEmail && !editName} 
                    >
                        
                            Save
                    </button>
                </div>         

                <h2  className="text-lg font-medium mb-4">Change password</h2> 
                <div className="space-y-2">                        
                    <div>
                        <label htmlFor="password"  className="text-gray-600 mb-2 block">Password</label>
                        <input type="password" name="password" id="password"
                            className={`${!formError?.password?.valid && !formPasswordValid ? 'border-red-900' : ''} block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded-lg focus:ring-0 focus:border-primary placeholder-gray-400`}
                            placeholder="*******" 
                            onChange={handleChange}
                        />
                        {handleError('password')}
                    </div>
                    <div>
                        <label htmlFor="confirm"  className="text-gray-600 mb-2 block">Confirm password</label>
                        <input type="password" name="confirm" id="confirm"
                            className={`${!formError?.confirm?.valid && !formPasswordValid ? 'border-red-900' : ''} block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded-lg focus:ring-0 focus:border-primary placeholder-gray-400`}
                            placeholder="*******" 
                            onChange={handleChange}
                            />
                        {handleError('confirm')}
                    </div>
                </div>                        
                <div className="mt-4">
                    <button type="button"
                        className="block w-full py-2 text-center bg-black text-white border rounded-lg hover:bg-slate-800 transition uppercase font-medium"
                        onClick={handleSubmitPassword}    
                    >
                        
                            Save
                    </button>
                </div>
            </form>
          </div>
      </div>
    </Layout>
  )
}
  
  export default MyAccount