import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Popup2 from './PopUp2';

function AuthHandler() {
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');

    useEffect(() => {
        const checkTokenRenewal = () => {
          const token = localStorage.getItem('userToken');
          if (!token) return;
    
          const payload = JSON.parse(atob(token.split('.')[1]));
          const exp = payload.exp;
          const now = Date.now() / 1000; // current time in seconds
    
          // Check if the token expires within the next 15 seconds
          if (exp - now < 15) {
            setShowPopup(true);
            setPopupMessage('Your session is about to expire. Do you want to continue?');
          } else if (exp - now < 15) { // 15 minutes before token expires
            renewToken(token);
          }
        };
    
        const intervalId = setInterval(checkTokenRenewal, 5000); // Check every 5 seconds
    
        return () => clearInterval(intervalId); // Cleanup the interval on component unmount
      }, []);

      const renewToken = (token) => {
        fetch('http://127.0.0.1:8000/refresh_token', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(res => res.json())
        .then(data => {
          if (data.token) {
            localStorage.setItem('userToken', data.token);
            console.log('Your session has been renewed.');
          } else {
            console.log('Please log in again.'); // or automatically trigger re-login
          }
        })
        .catch(error => console.error('Error renewing token:', error));
      };
    
      const handleRenewSession = () => {
        const token = localStorage.getItem('userToken');
        renewToken(token);
        setShowPopup(false);
      };
    
      const handleLogout = () => {
        localStorage.removeItem('userToken');
        setShowPopup(false);
        // Redirect to login page or handle the logout appropriately
        navigate('/login');
      };

      return showPopup && (
        <Popup2 
          title="Session Timeout" 
          message={popupMessage}
          onConfirm={handleRenewSession}
          onCancel={handleLogout}
        />
      );
    }
export default AuthHandler;