import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import "./google-oauth.css";

function GoogleOAuthLogin() {
    const clientId = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID;

    if (!clientId)
        return (
            <>
                <h1>No Google OAuth Client ID found to use Google Login functionality.</h1>
                <p>Create Client ID and set environment variable REACT_APP_GOOGLE_OAUTH_CLIENT_ID.</p>
                <p><a href='https://console.cloud.google.com/'>Click</a> to create Google OAuth Client ID</p>
            </>
        );
    return <GoogleOAuthLoginChildren />
}

function GoogleOAuthLoginChildren() {
    const [ authInfo, setAuthInfo ] = useState(null);
    const [ profileInfo, setProfileInfo ] = useState(null);
    const [ errorInfo, setErrorInfo ] = useState(null);

    useEffect(() => {
        if (authInfo !== null)
            fetchProfileInfo();
    }, [authInfo]);

    async function fetchProfileInfo() {
        const apiResponse = await fetch(
            `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${authInfo?.access_token}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${authInfo?.access_token}`,
                    Accept: 'application/json'
                }
            }
        );
        const result = await apiResponse.json();
        console.log('Profile Info: ', result);
        setProfileInfo(result);
    }

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: (response) => setAuthInfo(response),
        onError: (error) => setErrorInfo(error)
    });

    const handleGoogleLogout = () => {
        googleLogout();
        setAuthInfo(null);
        setProfileInfo(null);
    };

    return (
        <div className='google-auth-login-container'>
            <h1>Google Auth Login Container</h1>
            {profileInfo !== null ? (
                <div>
                    <img src={profileInfo.picture} alt="Profile Pic" />
                    <p>{profileInfo.name}</p> 
                    <p>{profileInfo.email}</p>
                    <button onClick={handleGoogleLogout}>Logout</button>
                </div>
            ) : (
                <button onClick={handleGoogleLogin}>Google Login</button>
            )}
            {errorInfo !== null ? <p>{errorInfo}</p> : null}
        </div>
    )
};

export default GoogleOAuthLogin;