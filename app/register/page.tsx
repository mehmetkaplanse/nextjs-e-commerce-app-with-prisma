import { getCurrentUser } from "../actions/getCurrentUser"
import RegisterClient from "../components/auth/RegisterClient"


const Register = async () => {
  const currentUser = getCurrentUser()
  return (
    <div>
      <RegisterClient currentUser={currentUser}/>
    </div>
  )
}

export default Register