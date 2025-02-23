import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals'; 
import GlobalState from './components/22.movie-app/context/GlobalState';

const root = ReactDOM.createRoot(document.getElementById('root'));
const REACT_APP_GOOGLE_OAUTH_CLIENT_ID = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID;

const children = <GlobalState><App /></GlobalState>;
if (REACT_APP_GOOGLE_OAUTH_CLIENT_ID) {
  root.render(
    <React.StrictMode>
      <GoogleOAuthProvider clientId={REACT_APP_GOOGLE_OAUTH_CLIENT_ID}>
        {children}
      </GoogleOAuthProvider>
    </React.StrictMode>
  )
}
else {
  root.render(
    <React.StrictMode>
      {children}
    </React.StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
