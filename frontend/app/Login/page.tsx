"use client"
import React, { useState, useEffect } from 'react';

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('ID:', id, 'Password:', password);
    // ログインロジックをここに追加
  };

  return (
    <div>
      <input
        type="text"
        placeholder="ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

function ClientSideComponent() {
  useEffect(() => {
    console.log("このコードはクライアントサイドでのみ実行されます");
  }, []);

  return <div>クライアントサイド専用コンテンツ</div>;
}

function Page() {
  const [isClientSide, setIsClientSide] = useState(false);

  useEffect(() => {
    setIsClientSide(true);
  }, []);

  return (
    <div>
      <Login />
      {isClientSide && <ClientSideComponent />}
    </div>
  );
}

export default Page;