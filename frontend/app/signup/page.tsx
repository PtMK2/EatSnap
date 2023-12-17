export default function App() {
  return (
    <>
        <div className="slideshow">
			<input type="radio" name="slideshow" id="switch1" defaultChecked />
			<input type="radio" name="slideshow" id="switch2" />
			<input type="radio" name="slideshow" id="switch3" />
			<input type="radio" name="slideshow" id="switch4" />

			<div className="slideContents">
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
						世界でひとつの
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
			</div>

			<p className="arrow next">
				<label htmlFor="switch1"></label>
				<label htmlFor="switch2"></label>
				<label htmlFor="switch3"></label>
				<label htmlFor="switch4"></label>

			</p>
		</div>

    </>
  );
}