import React, { useState, useEffect } from 'react';
import { FaImage, FaReply } from 'react-icons/fa'; // Import React Icons
import { message, Modal, Input, Button, Spin } from 'antd'; // Import Modal and Ant Design components
import { app, fireStore, storage } from '../firebase/firebase'; // Import Firebase config
import { collection, addDoc, getDocs, updateDoc, doc } from 'firebase/firestore'; 
import '../assets/css/discussion-forum.css';

const DiscussionForum = () => {
  const [question, setQuestion] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [currentQuestionId, setCurrentQuestionId] = useState(null); // Store the current question ID for replying
  const [loading, setLoading] = useState(false); // For button loaders
  const [loadingReply, setLoadingReply] = useState(false); // For reply button loader

  // Fetch all questions and replies on page load
  useEffect(() => {
    const fetchQuestions = async () => {
      const querySnapshot = await getDocs(collection(fireStore, "questions"));
      const questionsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setQuestions(questionsData);
    };

    fetchQuestions();
  }, []);

  // Submit a new question to Firebase Firestore
  const submitQuestion = async () => {
    if (question && name && email) {
      setLoading(true);
      try {
        const newQuestion = {
          question,
          name,
          email,
          replies: [],
          image: image || null,
        };

        // Add new question to Firestore
        const docRef = await addDoc(collection(fireStore, "questions"), newQuestion);
        setQuestions([...questions, { id: docRef.id, ...newQuestion }]);
        setQuestion('');
        setName('');
        setEmail('');
        setImage(null);
        message.success('Your question has been posted successfully!');
      } catch (e) {
        message.error('Error posting question');
        console.error(e);
      } finally {
        setLoading(false);
      }
    } else {
      message.error('Please fill in all fields.');
    }
  };

  // Submit a reply to a question in Firestore
  const submitReply = async () => {
    if (!replyText || !name || !email) {
      message.error('Please fill in all fields before submitting.');
      return;
    }

    setLoadingReply(true);

    try {
      const newReply = {
        reply: replyText,
        name,
        email,
        image: image || null,
      };

      // Find the question and update it with the new reply
      const questionRef = doc(fireStore, "questions", currentQuestionId);
      await updateDoc(questionRef, {
        replies: [...questions.find(q => q.id === currentQuestionId).replies, newReply]
      });

      // Update the local state for immediate reflection
      setQuestions(questions.map((item) =>
        item.id === currentQuestionId ? {
          ...item,
          replies: [...item.replies, newReply]
        } : item
      ));

      setModalVisible(false); // Close the modal
      setReplyText(''); // Reset the reply input
      message.success('Reply posted successfully!');
    } catch (e) {
      message.error('Error posting reply');
      console.error(e);
    } finally {
      setLoadingReply(false);
    }
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) {  // Limit file size to 5MB
        message.error('File size must be less than 5MB');
      } else {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImage(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  // Open the reply modal
  const openReplyModal = (questionId) => {
    setCurrentQuestionId(questionId);
    setModalVisible(true);
  };

  return (
    <div className="discussion-forum">
      <h1 className="forum-title">Discussion Forum</h1>

      {/* Ask Question Section */}
      <div className="ask-section">
        <input
          type="text"
          className="input"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          className="input"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          className="input question-input"
          placeholder="Ask your question here..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <div className="image-picker">
          <label htmlFor="question-image">
            <FaImage size={24} color="gray" />
            {image ? (
              <span>Image selected</span>
            ) : (
              <span>Upload Image</span>
            )}
          </label>
          <input
            type="file"
            id="question-image"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
        </div>

        <button className="submit-btn" onClick={submitQuestion} disabled={loading}>
          {loading ? <Spin size="small" /> : 'Post Question'}
        </button>
      </div>

      {/* Questions & Replies Section */}
      <div className="questions-list">
        {questions.map((item) => (
          <div key={item.id} className="question-card">
            <h2>{item.name} asks:</h2>
            <p>{item.question}</p>
            {item.image && (
              <div className="image-preview">
                <img src={item.image} alt="question" className="uploaded-image" />
              </div>
            )}

            <div className="replies-container">
              <h3>Replies:</h3>
              {item.replies.map((reply, index) => (
                <div key={index} className="reply-card">
                  <p>{reply.reply}</p>
                  <p><strong>{reply.name}</strong> (Email: {reply.email})</p>
                  {reply.image && (
                    <div className="image-preview">
                      <img
                        src={reply.image}
                        alt="reply"
                        className="uploaded-image"
                      />
                    </div>
                  )}
                </div>
              ))}

              <button
                className="reply-btn"
                onClick={() => openReplyModal(item.id)}
                disabled={loadingReply}
              >
                {loadingReply ? <Spin size="small" /> : <><FaReply size={20} /> Reply</>}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for replying */}
      <Modal
        title="Post a Reply"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Input
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Your Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          className="reply-input"
          placeholder="Write a reply..."
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
        />
        <div className="image-picker">
          <label htmlFor="reply-image">
            <FaImage size={24} color="gray" />
            Upload Image
          </label>
          <input
            type="file"
            id="reply-image"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
        </div>
        <Button type="primary" onClick={submitReply} style={{ marginTop: '10px' }} loading={loadingReply}>
          Submit Reply
        </Button>
      </Modal>
    </div>
  );
};

export default DiscussionForum;
 