import "./forget.css";
import axios from 'axios';
import { useState } from 'react';

export default function ForgetPassword() {
    const initialValues = {email:""};
    const [formValues,setFormValues] = useState(initialValues);
    const [formErrors,setFormErrors] = useState<{ email?: string }>({});
    const [isSubmit,setIsSubmit] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name,value} = e.target;
        setFormValues({...formValues,[name]:value});
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    }

    const validate = (values: { email?: string }) => {
        const errors: { email?: string } = {};
        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if(!values.email){
            errors.email = "メールアドレスを入力してください";
        }else if(!regexEmail.test(values.email)){
            errors.email = "有効なメールアドレスを入力してください";
        }else{
            errors.email = "";
        }
        return errors;
    }

    return (
        <div className="formContainer" >
            <form onSubmit={(e) => handleSubmit(e)}>
                <h1>パスワードリセット</h1>
                <hr/>
                <div className="uiForm">
                    <div className="formField">
                        <label>メールアドレス</label>
                        <input type="email" placeholder="メールアドレス" name="email" value={formValues.email} onChange={(e) => handleChange(e)} suppressHydrationWarning={true} />
                        <p className="errorMsg">{formErrors.email}</p>
                    </div>
                    <button className="submitButton" type="submit">リセットリンクを送信</button>
                    {Object.keys(formErrors).length === 0 && isSubmit && <div className="successMsg">リセットリンクを送信しました。メールをご確認ください。</div>}
                </div>
            </form>
        </div>
    );
}