"use client"
import React, { useState } from 'react';
import './login.css';

// データベースから取得するデータの型
interface UserData {
  id: string;
  password: string;
}

export default function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
    event.preventDefault();
    const data: UserData = {
      id,
      password
    };
    console.log('Form data:', data);

    // データベースへの接続とデータの送信を行う処理をここに書く
    // ...

    if (response.ok) {
      console.log('Login successful');
      // ログイン成功後の処理をここに書く
    } else {
      console.error('Login failed');
    }
  };

  const handleSignUp = () => {
    // 新規登録ボタンの処理をここに書く
  };

  const handleForgotPassword = () => {
    // パスワードを忘れた人用ボタンの処理をここに書く
  };

  return (
    <>
      <form>
        <label>
          ID:
          <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button onClick={handleSubmit} name="loginButton">ログイン</button>
        <button onClick={handleSignUp} name="signupButton">新規登録</button>
        <button onClick={handleForgotPassword} name="forgetButton">ID,パスワードを忘れた方</button>
      </form>
    </>
  );
ID}