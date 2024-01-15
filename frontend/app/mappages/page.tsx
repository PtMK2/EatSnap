"use client"
import GoogleMapComponent from '@/components/GoogleMap';
import "./mappages.css";


const Home = () => {
  return (
    <div>
      <div className="search-bar">
        {/* ここに検索ボックスを作成 */}
        {/* 検索バーの実装はここに */}
      </div>
      
      <div className="map-container">
        <GoogleMapComponent />
      </div>

      <div className="top-buttons">
        {/* <button className="pooh-button">クッキングpooh</button> */}
        <img src="/cook.jpg" alt="Cook" className="pooh-image" />
        <br />
        <img src="/star_icon.png" alt="Cook" className="pooh-image" />
      </div>

      <footer>
        <button className="footer-button">戻る</button>
        <button className="footer-button">お気に入り</button>
        <button className='footer-button'>行ってみたい</button>
      </footer>
    </div>



  );
};

export default Home;