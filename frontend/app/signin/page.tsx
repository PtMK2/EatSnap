"use client"
import "./signin.css"
import axios from 'axios';
import { useState } from 'react';

export default function App() {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const initialValues = {id:"",password:""};
    const [formValues,setFormValues] = useState(initialValues);
    const [formErrors,setFormErrors] = useState<{ id?: string, password?: string }>({});
    const [isSubmit,setIsSubmit] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name,value} = e.target;
        setFormValues({...formValues,[name]:value});
        console.log(formValues);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("submit");
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    
        if (Object.keys(formErrors).length === 0) {
            try {
                const response = await axios.post('http://localhost:8080/login', {
                    user_id: formValues.id,
                    password: formValues.password
                }, {
                    withCredentials: true // クッキーを使用する場合に必要
                });
    
                if (response.data.success) {
                    // ログイン成功
                    console.log("ログイン成功");
                } else {
                    // ログイン失敗
                    console.log("ログイン失敗");
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    const validate = (values: { id?: string, password?: string }) => {
        const errors: { id?: string, password?: string } = {};
        const regexId = /^[a-zA-Z0-9]+$/;
        const regexPassword = /^[a-zA-Z0-9]+$/;

        if(!values.id){
            errors.id = "IDを入力してください";
        }else if(!regexId.test(values.id)){
            errors.id = "IDは半角英数字で入力してください";
        }else{
            errors.id = "";
        }
        if(!values.password){
            errors.password = "パスワードを入力してください";
        }else if(values.password.length < 8){
            errors.password = "パスワードは8文字以上16文字以下で入力してください";
        }else if(values.password.length > 16){
            errors.password = "パスワードは8文字以上16文字以下で入力してください";     
        }else if(!regexPassword.test(values.password)){
            errors.password = "パスワードは半角英数字で入力してください";
        }else{
            errors.password = "";
        }
        return errors;
    }

    /*const handleSubmit = async (event) => {
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
    */

    return (
        <div className="formContainer" >
            <form onSubmit={(e) => handleSubmit(e)}>
                <h1>ログインフォーム</h1>
                <hr/>
                <div className="uiForm">
                    <div className="formField">
                        <label>ID</label>
                        <input type="text" placeholder="ID" name="id" value={formValues.id} onChange={(e) => handleChange(e)} suppressHydrationWarning={true} />
                        <p className="errorMsg">{formErrors.id}</p> {/* Display the ID error message */}
                    </div>
                    <div className="formField">
                        <label>パスワード</label>
                        <input type="password" placeholder="パスワード" name="password" value={formValues.password} onChange={(e) => handleChange(e)} suppressHydrationWarning={true} />
                        <p className="errorMsg">{formErrors.password}</p>
                    </div>
                    <button className="submitButton" type="submit">ログイン</button>
                    {Object.keys(formErrors).length === 0 && isSubmit && <div className="successMsg">ログイン成功</div>}
                </div>
            </form>
        </div>
    );
}