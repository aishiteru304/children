import React, { useState } from 'react';

const SERVER_URL = 'http://localhost:8080'; // URL của server 1

function App() {

  const storageLogin = JSON.parse(localStorage.getItem('info'))

  const [userInfo, setUserInfo] = useState(storageLogin ?? null);

  const handleLogin = () => {
    const width = 500;
    const height = 400;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    const popup = window.open(`${SERVER_URL}/login-popup`, 'Login', `width=${width}, height=${height}, top=${top}, left=${left}`);
    const timer = setInterval(() => {
      if (popup.closed) {
        clearInterval(timer);
      }
    }, 500);
  };

  // Lắng nghe sự kiện message từ cửa sổ popup
  window.addEventListener('message', (event) => {
    if (event.origin !== `${SERVER_URL}`) {
      return;
    }

    // Xử lý token nhận được từ cửa sổ popup
    if (event.data)
      setUserInfo(event.data)
    localStorage.setItem('info', JSON.stringify({ username: event.data.username, token: event.data.token }))
  });

  const handleLogout = () => {
    setUserInfo(null)
    localStorage.removeItem('info')
  }


  return (
    <div>
      <h2>Website 2</h2>
      {userInfo ? (
        <div>
          <h3>Thông tin người dùng:</h3>
          <p>ID: {userInfo.id}</p>
          <p>Tên người dùng: {userInfo.username}</p>
          <button onClick={handleLogout}>Đăng xuất</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Đăng nhập</button>
      )}
    </div>
  );
}

export default App;
