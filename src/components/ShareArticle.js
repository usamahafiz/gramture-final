import React from 'react';
import { message } from 'antd';
import { FaShareAlt } from 'react-icons/fa';
import "../assets/css/sharearticle.css";

const ShareArticle = () => {
  const handleShare = () => {
    if (typeof window !== 'undefined' && window.location) {
      const url = window.location.href;
      
      // Check for mobile sharing using the Web Share API
      if (navigator.share) {
        navigator
          .share({
            title: 'Check out this article!',
            url,
          })
          .then(() => {
            message.success('Article shared successfully!');
          })
          .catch((error) => {
            console.error('Error sharing:', error);
            // If mobile share fails, fallback to copying link
            copyLinkToClipboard(url);
          });
      } else {
        // If Web Share API is not available (desktop or unsupported mobile browser)
        copyLinkToClipboard(url);
      }
    } else {
      message.error('Unable to get the current URL.');
      console.error('window.location is not available.');
    }
  };

  const copyLinkToClipboard = (url) => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          message.success('Link copied to clipboard!');
        })
        .catch((error) => {
          message.error('Failed to copy the link.');
          console.error(error);
        });
    } else {
      // Fallback for devices/browsers that don’t support clipboard API
      message.warning('Clipboard API not supported. Try using a desktop browser.');
    }
  };

  return (
    <div className="share-article-container">
      <button onClick={handleShare} className="share-button">
        <FaShareAlt /> Share Article
      </button>
    </div>
  );
};

export default ShareArticle;
