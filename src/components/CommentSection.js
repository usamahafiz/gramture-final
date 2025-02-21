import React, { useState, useEffect } from "react";
import { message } from "antd";
import { addDoc, collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { fireStore } from "../firebase/firebase";

const CommentSection = ({ subCategory, topicId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({
    name: "",
    email: "",
    comment: "",
  });
  const [newReply, setNewReply] = useState("");
  const [replyingToIndex, setReplyingToIndex] = useState(null);

  // Fetch the comments specifically for the topic (subCategory and topicId)
  useEffect(() => {
    fetchComments();
  }, [subCategory, topicId]);

  const fetchComments = async () => {
    try {
      // Reference to the specific topic's comments collection
      const commentsRef = collection(
        fireStore,
        "comments",
        subCategory,
        "topicComments",
        topicId, // Make sure we are targeting the correct topic by ID
        "replies"
      );
      const querySnapshot = await getDocs(commentsRef);
      const commentsList = querySnapshot.docs.map((doc) => ({
        id: doc.id, // Ensure we are capturing the document ID
        ...doc.data(),
      }));
      setComments(commentsList);
    } catch (error) {
      message.error("Failed to fetch comments.");
      console.error(error);
    }
  };

  const handleCommentChange = (e) => {
    setNewComment({
      ...newComment,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitComment = async () => {
    // Check if name, email, and comment are filled out
    if (!newComment.name || !newComment.email || !newComment.comment) {
      message.warning("Please fill out all fields before submitting your comment.");
      return;
    }

    const currentDate = new Date();
    const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;
    const newCommentWithDate = { ...newComment, date: formattedDate };

    try {
      const docRef = await addDoc(
        collection(fireStore, "comments", subCategory, "topicComments", topicId, "replies"),
        newCommentWithDate
      );
      setComments([...comments, { id: docRef.id, ...newCommentWithDate }]);
      setNewComment({ name: "", email: "", comment: "" });
      message.success("Comment added successfully!");
    } catch (error) {
      message.error("Failed to add comment.");
      console.error(error);
    }
  };

  const handleReplyChange = (e) => {
    setNewReply(e.target.value);
  };

  const handleSubmitReply = async (commentIndex) => {
    if (comments[commentIndex]) {
      if (!newReply.trim()) {
        message.warning("Please enter a reply.");
        return;
      }

      const updatedComments = [...comments];
      const commentRef = doc(
        fireStore,
        "comments",
        subCategory,
        "topicComments",
        topicId,
        "replies",
        comments[commentIndex].id // Ensure valid comment ID is used
      );

      // Ensure replies array is initialized before pushing the new reply
      const updatedReplies = comments[commentIndex].replies
        ? [...comments[commentIndex].replies, newReply]
        : [newReply];

      try {
        // Update Firestore with the new reply
        await updateDoc(commentRef, {
          replies: updatedReplies,
        });

        // Update the local state
        updatedComments[commentIndex].replies = updatedReplies;
        setComments(updatedComments);

        // Clear the reply input and reset reply state
        setNewReply("");
        setReplyingToIndex(null);
      } catch (error) {
        message.error("Failed to submit reply.");
        console.error(error);
      }
    } else {
      message.error("Invalid comment index.");
    }
  };

  return (
    <div className="comment-section">
      <h3
        style={{
          textAlign: "center",
          fontSize: "2rem",
          fontWeight: "bold",
          color: "#000",
        }}
      >
        Leave a Comment
      </h3>

      {/* Display the number of comments */}
      <p style={{ textAlign: "center", fontSize: "1.2rem", fontWeight: "bold" }}>
        {comments.length === 0
          ? "This post has no comments yet."
          : `This post has ${comments.length} ${comments.length === 1 ? "comment" : "comments"}.`}
      </p>

      <div className="comment-form row">
        <div className="col-12 col-md-6 col-lg-4">
          <input
            type="text"
            name="name"
            value={newComment.name}
            onChange={handleCommentChange}
            placeholder="Your Name"
            className="comment-input form-control"
          />
        </div>
        <div className="col-12 col-md-6 col-lg-4">
          <input
            type="email"
            name="email"
            value={newComment.email}
            onChange={handleCommentChange}
            placeholder="Your Email"
            className="comment-input form-control"
          />
        </div>
        <div className="col-12">
          <textarea
            name="comment"
            value={newComment.comment}
            onChange={handleCommentChange}
            placeholder="Your Comment"
            className="comment-textarea form-control"
          />
        </div>
        <div className="col-12">
          <button
            onClick={handleSubmitComment}
            className="btn btn-primary btn-block"
          >
            Submit Comment
          </button>
        </div>
      </div>

      {/* Render the comments only if there are any */}
      <div className="comments-list">
        {comments.map((comment, index) => (
          <div key={index} className="comment-item">
            <p className="comment-author">{comment.name}</p>
            <p className="comment-text">{comment.comment}</p>
            <p className="comment-date">{comment.date}</p>

            <div className="replies">
              {comment.replies &&
                comment.replies.map((reply, replyIndex) => (
                  <div key={replyIndex} className="comment-reply">
                    <p className="reply-text">{reply}</p>
                  </div>
                ))}
            </div>

            {/* Only show reply button if not already replying to this comment */}
            {replyingToIndex !== index && (
              <button
                onClick={() => setReplyingToIndex(index)}
                className="reply-button"
              >
                Reply
              </button>
            )}

            {/* Only show reply form if replying to this comment */}
            {replyingToIndex === index && (
              <div className="reply-form">
                <textarea
                  value={newReply}
                  onChange={handleReplyChange}
                  className="reply-input"
                  placeholder="Write a reply..."
                ></textarea>
                <button
                  onClick={() => handleSubmitReply(index)} // Handle reply submission for this comment index
                  className="submit-reply-button"
                >
                  Submit Reply
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
