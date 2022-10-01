import React, { useState, useEffect } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';

const GoogleLoginButton = () => {
    const [ profile, setProfile ] = useState(() => {
        return JSON.parse(localStorage.getItem('userInfo'));
      });
    const clientId = '311903986104-hr7uc61b1mmq2fc6c4ie8iutj92mi3ui.apps.googleusercontent.com';

    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: clientId,
                scope: ''
            });
        };
        gapi.load('client:auth2', initClient);
        
    });

    const onSuccess = (res) => {
        setProfile(res.profileObj);
        localStorage.setItem('userInfo', JSON.stringify(res.profileObj));
    };

    const onFailure = (err) => {
        console.log('failed', err);
    };

    const logOut = () => {
        setProfile(null);
        localStorage.clear();
    };

    return (
        <div>
            {profile ? (
                <div>
                    {profile.name + ' '}
                    <GoogleLogout clientId={clientId} buttonText="Log out" onLogoutSuccess={logOut} />
                </div>
            ) : (
                <GoogleLogin
                    clientId={clientId}
                    buttonText="Sign in with Google"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                />
            )}
        </div>
    );
}

export default GoogleLoginButton;