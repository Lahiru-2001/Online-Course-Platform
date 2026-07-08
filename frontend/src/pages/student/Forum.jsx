import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../../styles/Forum.css';
import avatar1Img from '../../assets/Skydiving-and-Parachuting-in-sri-lanka-dp-aviation.jpg';
import avatar2Img from '../../assets/KarlsonGoh-LRCropped_20220117033131.jpg';
import avatar3Img from '../../assets/dp.webp';
import avatar4Img from '../../assets/images (2).jpg';

const Forum = ({ onBackToLanding }) => {
  const [activeTopic, setActiveTopic] = useState('Physical Science & Engendering');
  const [expandedPosts, setExpandedPosts] = useState({});

  // Ask Question Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newQuestionTitle, setNewQuestionTitle] = useState('');
  const [newQuestionCategory, setNewQuestionCategory] = useState('Physical Science & Engendering');
  const [newQuestionDescription, setNewQuestionDescription] = useState('');

  const toggleReplies = (postId) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const topics = [
    'Physical Science & Engendering',
    'Computer Science',
    'Business Study',
    'Data Science',
    'Health',
    'Maths and logic',
    'Language Learning'
  ];

  const initialPosts = [
    {
      id: 1,
      author: 'Saman S. kumar',
      avatar: avatar2Img,
      title: 'How to configure hydraulic cylinder simulation coordinates?',
      content: "Hi all, I'm trying to align the sensor outputs of the simulated robotic arm with the coordinates from Moratuwa fluid dynamic slides (Lecture 4). Any direct equations to calculate dynamic feedback?",
      replies: []
    },
    {
      id: 2,
      author: 'N. Nayana',
      avatar: avatar4Img,
      title: 'How to configure hydraulic cylinder simulation coordinates?',
      content: "Hi all, I'm trying to align the sensor outputs of the simulated robotic arm with the coordinates from Moratuwa fluid dynamic slides (Lecture 4). Any direct equations to calculate dynamic feedback?",
      replies: [
        {
          id: 21,
          author: 'Saman S. kumar',
          avatar: avatar2Img,
          content: "Hi, I'm trying to align the sensor outputs of the simulated robotic arm with the coordinates from Moratuwa fluid dynamic slides (Lecture 4)."
        },
        {
          id: 22,
          author: 'Saman S. kumar',
          avatar: avatar2Img,
          content: "Hi, I'm trying to align the sensor outputs of the simulated robotic arm with the coordinates from Moratuwa fluid dynamic slides (Lecture 4)."
        }
      ]
    },
    {
      id: 3,
      author: 'Saman S. kumar',
      avatar: avatar2Img,
      title: 'How to configure hydraulic cylinder simulation coordinates?',
      content: "Hi all, I'm trying to align the sensor outputs of the simulated robotic arm with the coordinates from Moratuwa fluid dynamic slides (Lecture 4). Any direct equations to calculate dynamic feedback?",
      replies: []
    },
    {
      id: 4,
      author: 'Pathum P. kumara',
      avatar: avatar1Img,
      title: 'How to configure hydraulic cylinder simulation coordinates?',
      content: "Hi all, I'm trying to align the sensor outputs of the simulated robotic arm with the coordinates from Moratuwa fluid dynamic slides (Lecture 4). Any direct equations to calculate dynamic feedback?",
      replies: []
    }
  ];

  const [forumPosts, setForumPosts] = useState(initialPosts);
  const [replyTexts, setReplyTexts] = useState({});

  const handleSendReply = (postId) => {
    const text = replyTexts[postId];
    if (!text || !text.trim()) return;

    setForumPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            replies: [
              ...post.replies,
              {
                id: Date.now(),
                author: 'Kasun Perera',
                avatar: avatar3Img,
                content: text.trim()
              }
            ]
          };
        }
        return post;
      })
    );

    // Clear reply text field
    setReplyTexts((prev) => ({
      ...prev,
      [postId]: ''
    }));
  };

  return (
    <div className="forum-page-wrapper">
      <Navbar />
      <div className="forum-layout">
        {/* Sidebar Topics */}
        <aside className="forum-sidebar">
          <h2 className="forum-sidebar-title">Topics</h2>
          <nav className="forum-sidebar-menu">
            {topics.map((topic, index) => {
              const isActive = activeTopic === topic;
              return (
                <button
                  key={index}
                  className={`forum-menu-item ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveTopic(topic)}
                >
                  <i className="fa-solid fa-graduation-cap topic-icon"></i>
                  <span className="topic-name">{topic}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Forum Content */}
        <main className="forum-main">
          <header className="forum-header">
            <h1 className="forum-header-title">{activeTopic}</h1>
            <button className="ask-question-btn" onClick={() => setIsModalOpen(true)}>
              <span className="plus-icon">+</span> Ask Question
            </button>
          </header>

          <div className="forum-feed">
            {forumPosts.map((post) => (
              <div key={post.id} className="forum-post-card">
                <div className="post-header">
                  <img src={post.avatar} alt={post.author} className="author-avatar" />
                  <span className="author-name">{post.author}</span>
                </div>

                <div className="post-body">
                  <h3 className="post-title">{post.title}</h3>
                  <p className="post-content">{post.content}</p>
                </div>

                <div className="post-replies-section">
                  <div className="reply-trigger-row" style={{ display: 'flex', justifyContent: post.replies.length > 0 ? 'flex-start' : 'flex-end' }}>
                    <span 
                      className={`reply-count-trigger ${post.replies.length > 0 ? 'orange' : 'blue'}`}
                      onClick={() => toggleReplies(post.id)}
                      style={{ userSelect: 'none' }}
                    >
                      Reply ({post.replies.length})
                    </span>
                  </div>

                  {expandedPosts[post.id] && (
                    <div className="nested-replies-list">
                      {post.replies.map((reply) => (
                        <div key={reply.id} className="nested-reply-card">
                          <div className="post-header">
                            <img src={reply.avatar} alt={reply.author} className="author-avatar small" />
                            <span className="author-name">{reply.author}</span>
                          </div>
                          <p className="post-content nested">{reply.content}</p>
                        </div>
                      ))}

                      <div className="forum-reply-input-wrapper">
                        <img 
                          src={avatar3Img} 
                          alt="current user" 
                          className="author-avatar small" 
                        />
                        <div className="forum-reply-input-box">
                          <input 
                            type="text" 
                            placeholder="Write a reply..." 
                            className="forum-reply-field"
                            value={replyTexts[post.id] || ''}
                            onChange={(e) => setReplyTexts({
                              ...replyTexts,
                              [post.id]: e.target.value
                            })}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleSendReply(post.id);
                              }
                            }}
                          />
                          <button 
                            className="forum-reply-send-btn"
                            onClick={() => handleSendReply(post.id)}
                          >
                            Send
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Modal Popup for Ask a New Question */}
        {isModalOpen && (
          <div className="modal-backdrop">
            <div className="ask-question-modal">
              {/* Header */}
              <div className="modal-header">
                <div className="modal-header-left">
                  <svg viewBox="0 0 24 24" className="modal-bulb-icon">
                    <circle cx="12" cy="12" r="10" fill="#f59e0b" />
                    <path d="M12 7c-2.21 0-4 1.79-4 4 0 2.5 2 3.5 2 5h4c0-1.5 2-2.5 2-5 0-2.21-1.79-4-4-4z" fill="#ffffff" />
                    <path d="M10 18h4v1.5h-4z" fill="#d97706" />
                    <path d="M9 14.5l2 2 4-4" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="modal-title-text">Ask a New Question</span>
                </div>
                <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>
                  <svg viewBox="0 0 24 24" className="modal-close-icon" style={{ width: '20px', height: '20px' }}>
                    <line x1="18" y1="6" x2="6" y2="18" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="6" y1="6" x2="18" y2="18" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              {/* Form Content */}
              <div className="modal-form-content">
                <div className="modal-form-group">
                  <label className="modal-form-label">Question Title</label>
                  <input 
                    type="text" 
                    placeholder="Enter your quotation title" 
                    className="modal-form-input"
                    value={newQuestionTitle}
                    onChange={(e) => setNewQuestionTitle(e.target.value)}
                  />
                </div>

                <div className="modal-form-group">
                  <label className="modal-form-label">Select Course Field</label>
                  <div className="modal-select-wrapper">
                    <select 
                      className="modal-form-select"
                      value={newQuestionCategory}
                      onChange={(e) => setNewQuestionCategory(e.target.value)}
                    >
                      {topics.map((t, idx) => (
                        <option key={idx} value={t}>{t}</option>
                      ))}
                    </select>
                    <svg className="select-chevron" viewBox="0 0 24 24" style={{ width: '18px', height: '18px' }}>
                      <polyline points="6 9 12 15 18 9" fill="none" stroke="#26374c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>

                <div className="modal-form-group">
                  <label className="modal-form-label">Describe your Question</label>
                  <textarea 
                    rows="6"
                    className="modal-form-textarea"
                    value={newQuestionDescription}
                    onChange={(e) => setNewQuestionDescription(e.target.value)}
                  />
                </div>
              </div>

              {/* Footer Actions */}
              <div className="modal-footer-actions">
                <button className="modal-cancel-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button 
                  className="modal-submit-btn"
                  onClick={() => {
                    if (newQuestionTitle.trim() && newQuestionDescription.trim()) {
                      const newPost = {
                        id: Date.now(),
                        author: 'Kasun Perera',
                        avatar: avatar3Img,
                        title: newQuestionTitle,
                        content: newQuestionDescription,
                        replies: []
                      };
                      setForumPosts([newPost, ...forumPosts]);
                      setNewQuestionTitle('');
                      setNewQuestionDescription('');
                      setIsModalOpen(false);
                    }
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Forum;
