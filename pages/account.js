import React, { useState, useEffect } from 'react';
import BasicLayout from "../layouts/BasicLayout";
import { useRouter } from 'next/router';
import useAuth from '../hooks/useAuth';
import { getMeApi } from '../api/user';
import ChangeNameForm from '../components/Account/ChangeNameForm';
import ChangeEmailForm from '../components/Account/ChangeEmailForm';
import ChangePasswordForm from '../components/Account/ChangePasswordForm';

export default function Account() {
    const router = useRouter();
    const [user, setUser] = useState(undefined);
    const { auth, logout, setReloadUser } = useAuth();

    useEffect(() => {
      (async () =>{
          const response = await getMeApi(logout);
          setUser(response || null);
          
      })();
    }, [auth]);
    

    if(user === undefined) return null;
    
    if(!auth && !user){
        router.replace("/");
        return null;
    }
    


  return (
    <BasicLayout className="account">
        <Configuration user={user} logout={logout} setReloadUser={setReloadUser}/>
    </BasicLayout>
  )
}


function Configuration(props){
  const { user, setReloadUser, logout } = props;
    return (
        <div className='account__configuration'>
            <div className='title'>Configuración</div>
            <div className='data'>
              <ChangeNameForm user={user} logout={logout} setReloadUser={setReloadUser}/>
              <ChangeEmailForm user={user} logout={logout} setReloadUser={setReloadUser}/>
              <ChangePasswordForm user={user} logout={logout}/>
            </div>
        </div>)
}