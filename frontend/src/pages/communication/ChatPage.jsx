import { useState, useRef, useEffect } from "react";
import "./ChatPage.css";
import { FiBell, FiSettings, FiSend, FiPaperclip } from "react-icons/fi";

const CONTACTS = {
  instructors: [
    {
      id: 1,
      name: "Saman S. kumar ( instructor )",
      avatar: "/src/assets/images/saman.jpg",
      online: true,
    },
    {
      id: 2,
      name: "Latha ( instructor )",
      avatar: "/src/assets/images/latha.jpg",
      online: false,
    },
  ],
  peers: [
    {
      id: 3,
      name: "Samana S. kumari",
      avatar: "/src/assets/images/samana.jpg",
      online: true,
    },
    {
      id: 4,
      name: "Kumara",
      avatar: "/src/assets/images/kumara.jpg",
      online: true,
    },
    {
      id: 5,
      name: "Saman S. Somapala",
      avatar: "/src/assets/images/somapala.jpg",
      online: false,
    },
  ],
};

const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: "instructor",
    text: "Michael, I looked at the circuit coordinate system in the Fluid Systems assignment 2 you sent.",
    avatar: "/src/assets/images/saman.jpg",
  },
  {
    id: 2,
    sender: "me",
    text: "Thank you Lecturer! There was a slight confusion with the coordinates on Slide 4. I have now corrected it.",
    avatar: "/src/assets/images/chat.jpg",
  },
  {
    id: 3,
    sender: "instructor",
    text: "Yes Michael, your circuit coordinates look correct now. Good luck!",
    avatar: "/src/assets/images/saman.jpg",
  },
];

export default function ChatPage() {
  const [activeContact, setActiveContact] = useState(CONTACTS.instructors[0]);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const bottomRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: "me", text: input.trim(), avatar: "https://i.pravatar.cc/150?img=33" },
    ]);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const filterContacts = (list) =>
    list.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="cp-shell">

      {/* Navbar */}
      <header className="cp-navbar">
        <div className="cp-navbar-left">
          <span className="cp-logo">LMS</span>
          <nav className="cp-topnav">
            <span className="cp-topnav-active">Home</span>
            <span>Courses</span>
          </nav>
        </div>
        <div className="cp-navbar-right">
          <FiBell className="cp-nav-icon" />
          <FiSettings className="cp-nav-icon" />
          <img src="https://i.pravatar.cc/150?img=12" alt="avatar" className="cp-avatar" />
        </div>
      </header>

      {/* Page body */}
      <div className="cp-body">
        <div className="cp-container">

          {/* Left sidebar — contacts */}
          <aside className="cp-sidebar">
            <div className="cp-search-wrap">
              <FiSettings className="cp-search-icon" style={{ display: "none" }} />
              <span className="cp-search-mag">🔍</span>
              <input
                className="cp-search"
                placeholder="search....."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="cp-group-label">Instructors / mentors</div>
            {filterContacts(CONTACTS.instructors).map((c) => (
              <div
                key={c.id}
                className={`cp-contact ${activeContact.id === c.id ? "cp-contact-active" : ""}`}
                onClick={() => setActiveContact(c)}
              >
                <div className="cp-contact-avatar-wrap">
                  {c.avatar
                    ? <img src={c.avatar} alt={c.name} className="cp-contact-img" />
                    : <div className="cp-contact-placeholder"><FiBell /></div>
                  }
                  <span className={`cp-dot ${c.online ? "cp-dot-on" : "cp-dot-off"}`} />
                </div>
                <span className="cp-contact-name">{c.name}</span>
              </div>
            ))}

            <div className="cp-group-label" style={{ marginTop: "18px" }}>Study Peers</div>
            {filterContacts(CONTACTS.peers).map((c) => (
              <div
                key={c.id}
                className={`cp-contact ${activeContact.id === c.id ? "cp-contact-active" : ""}`}
                onClick={() => setActiveContact(c)}
              >
                <div className="cp-contact-avatar-wrap">
                  {c.avatar
                    ? <img src={c.avatar} alt={c.name} className="cp-contact-img" />
                    : <div className="cp-contact-placeholder" />
                  }
                  <span className={`cp-dot ${c.online ? "cp-dot-on" : "cp-dot-off"}`} />
                </div>
                <span className="cp-contact-name">{c.name}</span>
              </div>
            ))}
          </aside>

          {/* Right — chat area */}
          <div className="cp-chat">

            {/* Chat header */}
            <div className="cp-chat-header">
              <div className="cp-chat-header-avatar-wrap">
                {activeContact.avatar
                  ? <img src={activeContact.avatar} alt="" className="cp-chat-header-img" />
                  : <div className="cp-contact-placeholder" />
                }
                <span className={`cp-dot ${activeContact.online ? "cp-dot-on" : "cp-dot-off"}`} />
              </div>
              <span className="cp-chat-header-name">{activeContact.name}</span>
            </div>

            {/* Messages */}
            <div className="cp-messages">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`cp-msg-row ${msg.sender === "me" ? "cp-msg-row-me" : ""}`}
                >
                  {msg.sender !== "me" && (
                    <img src={msg.avatar} alt="" className="cp-msg-avatar" />
                  )}
                  <div className={`cp-bubble ${msg.sender === "me" ? "cp-bubble-me" : "cp-bubble-them"}`}>
                    {msg.text}
                  </div>
                  {msg.sender === "me" && (
                    <img src={msg.avatar} alt="" className="cp-msg-avatar" />
                  )}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input bar */}
            <div className="cp-input-bar">
              <button className="cp-attach-btn" onClick={() => fileInputRef.current.click()}>
                <FiPaperclip size={18} />
              </button>
              <input type="file" ref={fileInputRef} style={{ display: "none" }} />
              <input
                className="cp-msg-input"
                placeholder="Type your message here....."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button className="cp-send-btn" onClick={handleSend}>
                <FiSend size={16} />
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="cp-footer">
        <span className="cp-footer-logo">LMS</span>
        <span className="cp-footer-copy">© 2024 LMS Sri Lanka. All Rights Reserved.</span>
        <div className="cp-footer-links">
          <span>Support</span>
          <span>Terms of Service</span>
          <span>Privacy Policy</span>
          <span>Contact Us</span>
        </div>
        <div className="cp-footer-icons">
          <span>🔗</span>
          <span>🌐</span>
        </div>
      </footer>

    </div>
  );
}
