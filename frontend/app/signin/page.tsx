"use client"
import "./signin.css"
export default function App() {
    return (   
        <div className="formContainer">
            <form>
                <h1>ログインフォーム</h1>
                <hr />
                <div className="uiForm">
                    <div className="formField">
                        <label>ID</label>
                        <input type="text" placeholder="ID" name="id" />
                    </div>
                    <div className="formField">
                        <label>パスワード</label>
                        <input type="text" placeholder="パスワード" name="password" />
                    </div>
                    <button className="submitButton">ログイン</button>
                </div>
            </form>
        </div>
    );
}