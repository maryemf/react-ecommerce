import { Link, useNavigate } from "react-router-dom"
import Layout from "../../Components/Layout"
import { useContext, useState } from "react"
import { ShoppingContext } from "../../Context"
import { validEmail } from "../../Utils/index,js";
import useFormBehaviour from "../../Hooks/useFormBehavior";
import useLocalUsers from "../../Hooks/useLocalUsers";

function SignIn() {
    const context = useContext(ShoppingContext);    
    const navigate = useNavigate();      
    const [successLogIn, setSuccessLogIn] = useState(null);
    const {getUserEmailAndPassword, getUserOrders} = useLocalUsers();
    const {formValue, formError, setFormError, formValid, setFormValid, handleChange, handleError} = useFormBehaviour({        
        email: "",
        password: ""
    });
    if (context.user?.id) {
        setTimeout(() => {
            navigate('/');
        }, 0);
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const validation = validateForm(formValue);
        if (!validation.valid) {
            setFormValid(false);
            setFormError(validation.errors);            
        } else {            
            let user = getUserEmailAndPassword(formValue.email, formValue.password);
            if (!user) {   
                setSuccessLogIn(false);
            } else {
                context.setUser(user);
                context.setOrder(getUserOrders(user.id));
                navigate('/');
            }           
        }
    }

    const validateForm = (formValue) => {          
        let errors = {email: {}, password: {}}; 
        let invalids = 0;
        Object.keys(formValue).forEach(field => {
            let message = [];
            let value = formValue[field].trim();
            if (!value) message.push("Required Field");
            if (field === 'email'){
                if (value && !validEmail(formValue.email)) message.push("Invalid Email Format");
            }  
            invalids = message.length > 0 ? invalids + 1 : invalids;          
            errors[field] = {valid: message.length == 0, message}; 
        }) 
        return {valid: invalids === 0 , errors}  
    }
    

    return (        
      <Layout>
        <div className="w-5/6 py-16">
          <div className="max-w-lg mx-auto shadow px-6 py-7 rounded-lg overflow-hidden">
              <h2 className="text-2xl uppercase font-medium mb-1">Login</h2>
              <p className="text-gray-600 mb-6 text-sm">
                  Welcome back customer!
              </p>
              {successLogIn === false && 
                <p className=" text-red-900 font-light text-sm text-center">Wrong email y/or password</p>
              }
              <form autoComplete="off">
                  <div className="space-y-2">
                      <div>
                          <label htmlFor="email" className="text-gray-600 mb-2 block">Email address</label>
                          <input type="email" name="email" id="email"
                              className={`${!formError?.email?.valid && !formValid ? 'border-red-900' : ''} block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded-lg focus:ring-0 focus:border-primary placeholder-gray-400`}
                              placeholder="youremail.@domain.com"
                              value={formValue.email || ""}
                              onChange={handleChange}
                            />
                            {handleError('email')}
                      </div>
                      <div>
                          <label htmlFor="password" className="text-gray-600 mb-2 block">Password</label>
                          <input type="password" name="password" id="password"
                              className={`${!formError?.password?.valid && !formValid ? 'border-red-900' : ''} block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded-lg focus:ring-0 focus:border-primary placeholder-gray-400`}
                              placeholder="*******"
                              value={formValue.password || ""}
                              onChange={handleChange}
                            />
                            {handleError('password')}
                      </div>
                  </div>                
                  <div className="mt-4">
                      <button type="submit"
                        className="block w-full py-2 text-center bg-black text-white border rounded-lg hover:bg-slate-800 transition uppercase font-medium"
                        onClick={handleSubmit}>
                            Sign in
                        </button>
                  </div>
              </form>
              <p className="mt-4 text-center text-sm text-gray-600">
                  Don&apos;t have account? 
                  <Link to='/register'>
                  <span className="cursor-pointer underline underline-offset-4"> Register now</span>
                  </Link>
              </p>
          </div>
        </div>
      </Layout>
    )
  }
  
  export default SignIn