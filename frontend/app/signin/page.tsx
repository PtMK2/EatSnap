"use client"
import "./signin.css"
import axios from 'axios';
import { useState } from 'react';

export default function App() {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await axios.post('http://localhost:8080/login', {
            id: id,
            password: password
        });

        if (response.data.success) {
            // ログイン成功
            console.log("ログイン成功");
        } else {
            // ログイン失敗
            console.log("ログイン失敗");
        }
    }

    return (   
        <div className="formContainer">
            <form onSubmit={handleSubmit}>
                <h1>ログインフォーム</h1>
                <hr />
                <div className="uiForm">
                    <div className="formField">
                        <label>ID</label>
                        <input type="text" placeholder="ID" name="id" value={id} onChange={(e) => setId(e.target.value)} />
                    </div>
                    <div className="formField">
                        <label>パスワード</label>
                        <input type="password" placeholder="パスワード" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button className="submitButton" type="submit">ログイン</button>
                </div>
            </form>
        </div>
    );
}