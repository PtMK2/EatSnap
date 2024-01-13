"use client"
import axios from 'axios';
export default function App() {

	const handleSubmit = async (event: { preventDefault: () => void; }) => {
		// ここでサーバーに送信する処理を書くとか？
		event.preventDefault();
		console.log('Form submitted!');
		const formData = new FormData(document.getElementById('f') as HTMLFormElement);
		// (document.getElementById('f') as HTMLFormElement).submit();
		console.log(Array.from(formData.entries()));

		//サーバーに送信処理 by林田　動くかわからない
		try {
			const response = await axios.post('http://localhost:8080/signup', formData, {
				//ここの処理は謎です。 by林田
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});
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

				<form className="slideContents" id="f">
					<section id="slide1">
						<p>
							こんにちは<br />
							あなたの名前を教えてください
						</p>
						<input type="text" name="name" />
					</section>
					<section id="slide2">
						<p>
							あなたのIDを決めてください<br />
							世界でひとつのIDです。
						</p>
						<input type="text" name="id" />
					</section>
					<section id="slide3">
						<p>
							あなたのメールアドレスを教えてください
						</p>
						<input type="email" name="mail" />
					</section>
					<section id="slide4">
						<p>
							あなたのパスワードを教えてください
						</p>
						<input type="password" name="password" />
					</section>
				</form>

				<p className="arrow next">
					<span className="dli-arrow-right"></span>
					<label htmlFor="switch1" onClick={handleSubmit}></label>
					<label htmlFor="switch2"></label>
					<label htmlFor="switch3"></label>
					<label htmlFor="switch4"></label>

				</p>
			</div>

		</>
	);
}
