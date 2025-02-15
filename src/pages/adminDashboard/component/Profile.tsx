
import ChangePassword from '../../../components/changepassword/Changepassworld'
import Mainprofile from '../../../components/profile/Profile'
import { useAppSelector } from '../../../redux/hooks'
import { RootState } from '../../../redux/store'


const Profile = () => {
  const {changepassword} = useAppSelector((state:RootState) => state.loginisShow)
  return (
    <div className="relative min-h-screen">
     {
        changepassword && <ChangePassword/>
     }
     
     <Mainprofile/>
    
    </div>
  )
}

export default Profile
