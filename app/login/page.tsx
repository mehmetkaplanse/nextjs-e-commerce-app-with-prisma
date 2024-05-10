import { getCurrentUser } from "../actions/getCurrentUser"
import LoginClient from "../components/auth/LoginClient"

const Login = async () => {
  const currentUser = getCurrentUser()
  return (
    <div>
      <LoginClient currentUser={currentUser}/>
    </div>
  )
}

export default Login