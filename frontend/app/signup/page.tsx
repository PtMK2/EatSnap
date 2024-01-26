"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
export default function App() {
    const router = useRouter();

	const [slidePosition, setSlidePosition] = useState(0); // スライドの位置を状態として管理

	const handleSlide = (position: number) => {
	  setSlidePosition(position); // スライドの位置を更新
	  console.log(position);
	  
	};

	const handleSubmit = async (event: { preventDefault: () => void; }) => {

		const err1 = document.getElementById('err1') as HTMLInputElement;
		const err2 = document.getElementById('err2') as HTMLInputElement;
		const err3 = document.getElementById('err3') as HTMLInputElement;
		const err4 = document.getElementById('err4') as HTMLInputElement;

		const regexId = /^[a-zA-Z0-9]+$/;
        const regexPassword = /^[a-zA-Z0-9]+$/;
		
		const formData = new FormData(document.getElementById('f') as HTMLFormElement);

		// (document.getElementById('f') as HTMLFormElement).submit();
		console.log(Array.from(formData.entries()));

		// バリデーションチェック
		let errFlag = false;

		if (formData.get('name') == '') {
			err1.innerHTML = '名前を入力してください';
			errFlag = true;
		} else {
			err1.innerHTML = '';
		}

		if (formData.get('id') == '') {
			err2.innerHTML = 'IDを入力してください';
			errFlag = true;
		} else if (!regexId.test(formData.get('id') as string)) {
			err2.innerHTML = 'IDは半角英数字で入力してください';
			errFlag = true;
		} else {
			err2.innerHTML = '';
		}

		if (formData.get('mail') == '') {
			err3.innerHTML = 'メールアドレスを入力してください';
			errFlag = true;
		} else {
			err3.innerHTML = '';
		}

		if (formData.get('password') == '') {
			err4.innerHTML = 'パスワードを入力してください';
			errFlag = true;
		} else if (!regexPassword.test(formData.get('password') as string)) {
			err4.innerHTML = 'パスワードは半角英数字で入力してください';
			errFlag = true;
		} else if ((formData.get('password') as string).length < 8  || (formData.get('password') as string).length > 16) {
			err4.innerHTML = 'パスワードは8文字以上16文字以下で入力してください';
			errFlag = true;
		} else {
			err4.innerHTML = '';
		}

		if (errFlag) {

			// フォームを先頭に戻す
			const switch1 = document.getElementById('switch1') as HTMLInputElement;
			switch1.checked = true;

			handleSlide(0);
			return;
		}

		console.log('Form submitted!');

		//サーバーに送信処理 by林田　動くかわからない
		try {
			const response = await axios.post('http://localhost:8080/signup', formData, {
				//ここの処理は謎です。 by林田
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});
            if (response.data.redirect) {
                // バックエンドからのリダイレクト指示に従う
                router.push(response.data.redirect);
              }
			console.log(response.data);
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<>
			<div className="slideshow">
				<input type="radio" name="slideshow" id="switch1" defaultChecked />
				<input type="radio" name="slideshow" id="switch2" />
				<input type="radio" name="slideshow" id="switch3" />
				<input type="radio" name="slideshow" id="switch4" />

				<form className="slideContents" style={{ transform: `translateX(-${slidePosition}%)` }} id="f">
					<section id="slide1">
						<p>
							こんにちは<br />
							あなたの名前を教えてください
						</p>
						<input type="text" id='nameForm' name="name" />
						<p id='err1'></p>
					</section>
					<section id="slide2">
						<p>
							あなたのIDを決めてください<br />
							世界でひとつのIDです。
						</p>
						<input type="text" id='idForm' name="id" />
						<p id='err2'></p>
					</section>
					<section id="slide3">
						<p>
							あなたのメールアドレスを教えてください
						</p>
						<input type="email" id='emailForm' name="mail" />
						<p id='err3'></p>
					</section>
					<section id="slide4">
						<p>
							あなたのパスワードを教えてください
						</p>
						<input type="password" id='passwordForm' name="password" />
						<p id='err4'></p>
					</section>
				</form>

				<p className="arrow next">
					<span className="dli-arrow-right"></span>
					<label htmlFor="switch1" onClick={handleSubmit}></label>
					<label htmlFor="switch2" onClick={() => handleSlide(20)}></label>
					<label htmlFor="switch3" onClick={() => handleSlide(40)}></label>
					<label htmlFor="switch4" onClick={() => handleSlide(60)}></label>

				</p>
			</div>

		</>
	);
}
