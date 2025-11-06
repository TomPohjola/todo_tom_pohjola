import { Link,useNavigate } from "react-router-dom"
import { useUser } from "../context/useUser"

export const AuthenticationMode = Object.freeze({
 SignIn: 'Login',
 SignUp: 'SignUp'
})
export default function Authentication({authenticationMode}) {

 const { user, setUser,signUp, signIn } = useUser()
 
 const navigate = useNavigate()

 const handleSubmit = async (e) => {
 e.preventDefault()
 const signFunction = authenticationMode === AuthenticationMode.SignUp ?
 signUp : signIn
 signFunction().then(response =>{
 navigate(authenticationMode === Authentication.SignUp ? '/signin' : '/')
 })
 .catch(error => {
 alert(error)
 })
 }
 return (
    <div class="container2">
        <form onSubmit={handleSubmit}>
        <h3 id="signin">{authenticationMode === AuthenticationMode.SignIn ? 'Sign in' : 'Sign up'}</h3>
        

            <label>Email</label> 
            <input placeholder='Email' value={user.email} onChange={e => setUser({...user,email: e.target.value})}/>
    
            <label>Password</label> 
            <input placeholder='Password' type='password' value={user.password} onChange={e => setUser({...user,password: e.target.value})}/>

            
            <hr></hr>
            <button type='submit'>{authenticationMode === AuthenticationMode.SignIn ? 'Login' : 'Submit'} </button> 
            <hr></hr>

            <section id="linkki">
            <Link to={authenticationMode === AuthenticationMode.SignIn ? '/signup' : '/signin'}> 
            {authenticationMode === AuthenticationMode.SignIn ? 'No account? Sign up' : 'Already signed up? Sign in'}
            </Link>      
            </section> 
            </form>
    </div>
 )
}
