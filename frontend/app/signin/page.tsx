"use client"

import "./signin.css";
import axios from 'axios';
import { useState, ChangeEvent } from 'react'; 
import Link from 'next/link';
import { useRouter } from 'next/navigation';//ページ遷移用

export default function App() {
    const initialValues = {id:"",password:""};//フォームの初期値
    const [formValues,setFormValues] = useState(initialValues);//初期値空
    const [formErrors,setFormErrors] = useState<{ id?: string, password?: string }>({}); 
    const [isSubmit,setIsSubmit] = useState(false); 
    const [loginSuccess, setLoginSuccess] = useState(false);
    const router = useRouter();//ページ遷移用

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {//一字入力するたびに更新
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    }
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
      
        if (Object.keys(formErrors).length === 0) {
            try {
                const response = await axios.post('http://localhost:8080/login', formValues);
                console.log(response.data);
                if (response.data.redirect) {
                    // バックエンドからのリダイレクト指示に従う
                    router.push(response.data.redirect);
                }
                if (response.data.success) {
                    if(response.data.err){
                        // ログイン失敗
                        setLoginSuccess(false);
                        setFormErrors({ id: "idもしくはパスワードが違います", password: "idもしくはパスワードが違います" });
                    }else{
                        // ログイン成功
                        setLoginSuccess(true);
                    }
                }
            } catch (error) {
                console.error('Error:', error);
                // エラー処理
            }
        }
    }

    const validate = (values: { id?: string, password?: string }) => {
        const errors: { id: string, password: string } = { id: "", password: "" };
        const regexId = /^[a-zA-Z0-9]+$/;
        const regexPassword = /^[a-zA-Z0-9]+$/;

        if (!values.id?.trim()) {
            errors.id = "IDを入力してください";
        } else if (!regexId.test(values.id)) {
            errors.id = "IDは半角英数字で入力してください";
        } else {
            errors.id = "";
        }

        if (!values.password?.trim()) {
            errors.password = "パスワードを入力してください";
        } else if (values.password.length < 8 || values.password.length > 16) {
            errors.password = "パスワードは8文字以上16文字以下で入力してください";
        } else if (!regexPassword.test(values.password)) {
            errors.password = "パスワードは半角英数字で入力してください";
        } else {
            errors.password = "";
        }

        return errors;
    };

    return (
        <div className="formContainer" >
            <form onSubmit={(e) => handleSubmit(e)}>
                <h1>ログインフォーム</h1>
                <hr/>
                <div className="uiForm">
                    <div className="formField">
                        <label>ID</label>
                        <input type="text" placeholder="ID" name="id" value={formValues.id} onChange={(e) => handleChange(e)} suppressHydrationWarning={true} />
                        <p className="errorMsg">{formErrors.id}</p> {/* IDのエラーメッセージを表示 */}
                    </div>
                    <div className="formField">
                        <label>パスワード</label>
                        <input type="password" placeholder="パスワード" name="password" value={formValues.password} onChange={(e) => handleChange(e)} suppressHydrationWarning={true} />
                        <p className="errorMsg">{formErrors.password}</p> {/* パスワードのエラーメッセージを表示 */}
                    </div>
                    <button className="submitButton" type="submit">ログイン</button>
                    <Link href="/signup" className="forgetButton">新規登録</Link>
                    <Link href="/forget" className="forgetButton">ID パスワードを<br />忘れた方はこちら</Link>
                    {Object.keys(formErrors).length === 0 && isSubmit && <div className="successMsg">ログイン成功</div>}
                </div>
            </form>
        </div>
    );
}