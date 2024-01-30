"use client"
import React, { useState } from 'react';
import './Threads.css';

interface Post {
  id: number;
  content: string;
  images: string[];
  timestamp: string;
  currentImageIndex: number;
}

const Page: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState('');
  const [newImages, setNewImages] = useState<File[]>([]);
  const [showPostForm, setShowPostForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');

  const handlePostChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewPost(event.target.value);
  };

  const handleImagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setNewImages(Array.from(event.target.files));
    }
  };

  const handlePostSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const timestamp = new Date().toLocaleString('ja-JP');
    const imageUrls = newImages.map(image => URL.createObjectURL(image));
    const newPostObject = {
      id: Date.now(),
      content: newPost,
      images: imageUrls,
      timestamp,
      currentImageIndex: 0
    };
    setPosts([newPostObject, ...posts]);
    setNewPost('');
    setNewImages([]);
    setShowPostForm(false);
  };

  const handleImageSlide = (postId: number, direction: 'left' | 'right') => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        let newIndex = post.currentImageIndex;
        if (direction === 'right') {
          newIndex = (newIndex + 1) % post.images.length;
        } else {
          newIndex = newIndex - 1 < 0 ? post.images.length - 1 : newIndex - 1;
        }
        return { ...post, currentImageIndex: newIndex };
      }
      return post;
    }));
  };

  const openModal = (image: string) => {
    setModalImage(image);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="threads-page">
      <header className="header">
        <button className="scroll-to-top" onClick={scrollToTop}>
          ↑ 
        </button>
      </header>
      <div className="posts">
        {posts.map(post => (
          <div key={post.id} className="post">
            <p>{post.content}</p>
            {post.images.length > 0 && (
              <div className="post-image-container">
                {post.images.length > 1 && (
                  <button 
                    className="slide-button left" 
                    onClick={() => handleImageSlide(post.id, 'left')}
                  >
                    &lt;
                  </button>
                )}
                <img 
                  src={post.images[post.currentImageIndex]} 
                  alt={`投稿画像 ${post.currentImageIndex + 1}`} 
                  onClick={() => openModal(post.images[post.currentImageIndex])}
                />
                {post.images.length > 1 && (
                  <button 
                    className="slide-button right" 
                    onClick={() => handleImageSlide(post.id, 'right')}
                  >
                    &gt;
                  </button>
                )}
              </div>
            )}
            <div className="timestamp">{post.timestamp}</div>
          </div>
        ))}
      </div>
      <button className="post-toggle" onClick={() => setShowPostForm(!showPostForm)}>
        投稿
      </button>
      {showPostForm && (
        <div className="post-form-overlay">
          <form className="post-form" onSubmit={handlePostSubmit}>
            <textarea
              value={newPost}
              onChange={handlePostChange}
              placeholder="何が起きていますか？"
            />
            <input type="file" multiple onChange={handleImagesChange} />
            <button type="submit">投稿する</button>
          </form>
        </div>
      )}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content">
            <img src={modalImage} alt="拡大画像" />
          </div>
        </div>
      )}
      <footer className="footer"></footer>
    </div>
  );
};

export default Page;
