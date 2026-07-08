import React, { useEffect, useRef, useState } from "react";
import { Search, Send, Paperclip } from "lucide-react";

import { useAuth } from "../../context/AuthContext";

import socket from "../../services/socket";

import {
  getChatUsers,
  getConversations,
  createConversation,
  getMessages,
  sendMessage,
  markMessagesSeen,
} from "../../services/chatService";

export default function ChatPage() {

  const { userId } = useAuth();
  const [chatUsers, setChatUsers] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [search, setSearch] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {

    loadUsers();

    loadConversations();

  }, []);

  const loadUsers = async () => {

    try {

      setLoadingUsers(true);

      const res = await getChatUsers();

      console.log("USERS");
      console.table(
        res.users.map((u) => ({
          name: u.fullName,
          role: u.userType,
          image: u.profileImage,
        }))
      );


      setChatUsers(res.users);

    } catch (err) {

      console.error(err);

    } finally {

      setLoadingUsers(false);

    }

  };


  const loadConversations = async () => {

    try {

      const res = await getConversations();

      setConversations(res.conversations || []);

    } catch (err) {

      console.error(err);

    }

  };

  const openChat = async (chatUser) => {

    try {

      setSelectedUser(chatUser);

      const res = await createConversation(chatUser._id);

      const conversation = res.conversation;

      setConversationId(conversation._id);

      await loadMessages(conversation._id);

    } catch (err) {

      console.error(err);

    }

  };

  const loadMessages = async (conversationId) => {

    try {

      setLoadingMessages(true);

      const res = await getMessages(conversationId);

      setMessages(res.messages || []);

      await markMessagesSeen(conversationId);

    } catch (err) {

      console.error(err);

    } finally {

      setLoadingMessages(false);

    }

  };


  const handleSend = async (e) => {

    e.preventDefault();

    if (!newMessage.trim()) return;

    if (!conversationId || !selectedUser) return;

    try {

      const res = await sendMessage({

        conversationId,

        receiverId: selectedUser._id,

        text: newMessage,

      });

      setMessages((prev) => [

        ...prev,

        res.message,

      ]);

      setNewMessage("");

    } catch (err) {

      console.error(err);

    }

  };

  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({

      behavior: "smooth",

    });

  }, [messages]);


  useEffect(() => {

    socket.on("receive_message", (message) => {

      if (message.conversation === conversationId) {

        setMessages((prev) => [...prev, message]);

      }

    });

    socket.on("online-users", (users) => {

      setOnlineUsers(users);

    });

    socket.on("messages_seen", () => {

      if (conversationId) {

        loadMessages(conversationId);

      }

    });

    return () => {

      socket.off("receive_message");

      socket.off("online-users");

      socket.off("messages_seen");

    };

  }, [conversationId]);

  const isOnline = (userId) => {

    return onlineUsers.includes(userId);

  };

  const filteredUsers = chatUsers.filter((user) =>
    user.fullName
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col lg:flex-row gap-6 min-h-[calc(100vh-100px)] bg-gray-50/50 p-4 rounded-2xl border border-gray-200">
      {/* Left panel: Contacts sidebar */}
      {/* ================= LEFT SIDEBAR ================= */}

      <div className="w-full lg:w-80 shrink-0 bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-4 shadow-sm">

        {/* Search */}

        <div className="relative">

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm outline-none focus:border-orange-500"
          />

          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />

        </div>

        {/* Loading */}

        {loadingUsers && (

          <div className="text-center py-10 text-gray-400 text-sm">

            Loading chat users...

          </div>

        )}

        {/* Empty */}

        {!loadingUsers && filteredUsers.length === 0 && (

          <div className="text-center py-10 text-gray-400 text-sm">

            No users available.

          </div>

        )}

        {/* User List */}

        {!loadingUsers &&

          filteredUsers.map((user) => {

            const active =
              selectedUser?._id === user._id;

            return (

              <div
                key={user._id}
                onClick={() => openChat(user)}
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition

          ${active
                    ? "bg-orange-50 border border-orange-200"
                    : "hover:bg-gray-50"
                  }`}
              >

                {/* Avatar */}

                <div className="relative">

                  <img
                    src={
                      user.profileImage
                        ? `http://localhost:5000${user.profileImage}`
                        : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          user.fullName
                        )}&background=184B65&color=fff`
                    }
                    alt={user.fullName}
                    className="w-10 h-10 rounded-full object-cover"
                  />

                  <span
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white

              ${isOnline(user._id)
                        ? "bg-green-500"
                        : "bg-gray-400"
                      }`}
                  />

                </div>

                {/* Name */}

                <div className="flex-1">

                  <p className="font-semibold text-sm">

                    {user.fullName}

                  </p>

                  <p className="text-xs text-gray-500">

                    {user.userType}

                  </p>

                  <p
                    className={`text-[11px]

              ${isOnline(user._id)
                        ? "text-green-600"
                        : "text-gray-400"
                      }`}
                  >

                    {isOnline(user._id)
                      ? "Online"
                      : "Offline"}

                  </p>

                </div>

              </div>

            );

          })}

      </div>
      {/* Right panel: Active Chat */}
      {/* ================= RIGHT CHAT ================= */}

      <div className="flex-grow bg-white border border-gray-200 rounded-xl flex flex-col overflow-hidden">

        {/* No chat selected */}

        {!selectedUser ? (

          <div className="flex flex-1 items-center justify-center text-gray-400">

            Select a user to start chatting

          </div>

        ) : (

          <>

            {/* Header */}

            <div className="px-6 py-4 bg-[#184B65] text-white flex items-center gap-3">

              <img
                src={
                  selectedUser.profileImage
                    ? `http://localhost:5000${selectedUser.profileImage}`
                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      selectedUser.fullName
                    )}&background=184B65&color=fff`
                }
                alt={selectedUser.fullName}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h3 className="!text-white">
                  {selectedUser.fullName}
                </h3>

                <p className="!text-white text-xs">
                  {selectedUser.userType}
                </p>

              </div>

            </div>

            {/* Messages */}

            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">

              {loadingMessages ? (

                <div className="text-center text-gray-400">

                  Loading messages...

                </div>

              ) : messages.length === 0 ? (

                <div className="text-center text-gray-400">

                  No messages yet.

                </div>

              ) : (

                messages.map((message) => {

                  const isMe =
                    message.sender._id === userId;

                  return (

                    <div
                      key={message._id}
                      className={`flex

                ${isMe
                          ? "justify-end"
                          : "justify-start"
                        }`}
                    >

                      <div
                        className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm

                  ${isMe
                            ? "bg-orange-500 text-white rounded-br-none"
                            : "bg-blue-50 border border-blue-100 rounded-bl-none"
                          }`}
                      >

                        {message.text}

                        <div className="text-[10px] opacity-70 mt-1 text-right">

                          {new Date(
                            message.createdAt
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}

                        </div>

                        {isMe && (

                          <div className="text-[10px] text-right mt-1">

                            {message.seen
                              ? "✓✓ Seen"
                              : "✓ Sent"}

                          </div>

                        )}

                      </div>

                    </div>

                  );

                })

              )}

              <div ref={messagesEndRef} />

            </div>

            {/* Input */}

            <form
              onSubmit={handleSend}
              className="border-t p-4 flex gap-3"
            >

              <button
                type="button"
                className="text-gray-500"
              >
                <Paperclip size={20} />
              </button>

              <input
                value={newMessage}
                onChange={(e) =>
                  setNewMessage(e.target.value)
                }
                placeholder="Type a message..."
                className="flex-1 border rounded-full px-4 py-2 outline-none focus:border-orange-500"
              />

              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full"
              >
                <Send size={18} />
              </button>

            </form>

          </>

        )}

      </div>
    </div>
  );
}