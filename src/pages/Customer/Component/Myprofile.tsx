

import { useAppSelector } from "../../../redux/hooks"
import { RootState } from "../../../redux/store"
import ChangePassword from "../../../components/changepassword/Changepassworld"
import Profile from "../../../components/profile/Profile"






const Myprofile = () => {
    const {changepassword} = useAppSelector((state:RootState) => state.loginisShow)
  return (
    <div className="relative">
     {
        changepassword && <ChangePassword/>
     }
     <Profile/>
    </div>
  )
}

export default Myprofile
