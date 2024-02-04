"use client"
import "./forget.css";
import axios from 'axios';
import { useState } from 'react';
import Link from 'next/link';

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

    const sendEmail = async () => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            try {
                const response = await axios.post('/api/send-email', { email: formValues.email });
                if (response.data.success) {
                    console.log('Email sent successfully');
                }
            } catch (error) {
                console.error('Error sending email', error);
            }
        }
    }

    return (
        <div className="container">
            <h1>パスワードを忘れた方</h1>
            <form onSubmit={handleSubmit} noValidate>
                <div className="formRow">
                    <label>メールアドレス</label>
                    <input type="email" name="email" onChange={handleChange} />
                    {formErrors.email && isSubmit && <span className="errorMessage">{formErrors.email}</span>}
                </div>
                <button type="submit">送信</button>
            </form>
            <Link href="/login">ログインに戻る</Link>
        </div>
    );
}