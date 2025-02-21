import React, { useState, useEffect } from 'react';
import '../../assets/css/topbar.css';
import { Modal, Input, Badge, Dropdown, Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { fireStore } from '../../firebase/firebase'; // Assuming fireStore is properly initialized
import img from '../../assets/images/new-logo.webp'; // Your logo image
import { FaBell, FaRegBell, FaHome, FaInfoCircle, FaComments } from 'react-icons/fa'; // Import FontAwesome icons

const Topbar = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [notifications, setNotifications] = useState([]); // Notifications state
  const [notificationCount, setNotificationCount] = useState(0); // Notification count
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to check if dropdown is open
  const navigate = useNavigate();

  const searchKeywords = [
    { label: "About", link: "/about" },
    { label: "Services", link: "/services" },
    { label: "Contact", link: "/contact" },
    { label: "Class 9", link: "/class9" },
    { label: "Class 10", link: "/class10" },
    { label: "Class 11", link: "/class11" },
    { label: "Class 12", link: "/class12" },
    { label: "Bsc", link: "/bsc" },
  ];

  // Handle search icon click
  const handleSearch = () => {
    setIsModalVisible(true);
  };

  // Handle search modal close
  const handleModalOk = () => {
    setIsModalVisible(false);
  };

  // Handle search modal cancel
  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  // Handle input change for search
  const handleSearchQuery = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    const results = searchKeywords.filter(keyword =>
      keyword.label.toLowerCase().includes(query)
    );

    setSearchResults(results);
  };

  // Handle navigation from search results
  const handleNavigate = (link) => {
    navigate(link);
    setIsModalVisible(false);
  };

  // Fetch notifications from Firestore
  useEffect(() => {
    const fetchNotifications = async () => {
      const questionsRef = collection(fireStore, 'questions');
      const querySnapshot = await getDocs(questionsRef);

      if (!querySnapshot.empty) {
        const questionsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name || "Unknown",
          question: doc.data().question || "No question available",
        }));

        setNotifications(questionsList);
        setNotificationCount(questionsList.length);
      } else {
        setNotifications([]);
        setNotificationCount(0);
      }
    };

    fetchNotifications();
  }, []);

  // Notification dropdown menu
  const notificationMenu = (
    <Menu>
      {notifications.length > 0 ? (
        notifications.map((notif, index) => (
          <Menu.Item key={index} onClick={() => handleQuestionClick(notif)}>
            <div>
              <strong>{notif.name}</strong>: {notif.question}
            </div>
          </Menu.Item>
        ))
      ) : (
        <Menu.Item>No notifications available</Menu.Item>
      )}
    </Menu>
  );

  // Handle dropdown open
  const handleDropdownOpen = () => {
    setIsDropdownOpen(true);
    setNotificationCount(0);  // Reset notification count when dropdown is opened
  };

  // Handle dropdown close
  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
  };

  // Handle click on a notification (question)
  const handleQuestionClick = (notif) => {
    // Navigate to the discussion forum page
    navigate('/discussion_forum', { state: { questionId: notif.id } });
  };

  return (
    <div className="topbar" style={{ zIndex: 15000 }}>
      <div className="topbar-content">
        {/* Left: Logo */}
        <div className="topbar-logo">
          <Link to="/Add Grammar">
            <img src={img} alt="Logo" />
          </Link>
        </div>

        {/* Center: Links */}
        <div className="topbar-links">
          <Link to="/" className="topbar-link">
            <FaHome style={{ marginRight: '8px' }} />
            Home
          </Link>
          <Link to="/about" className="topbar-link">
            <FaInfoCircle style={{ marginRight: '8px' }} />
            About Us
          </Link>
          <Link to="/discussion_forum" className="topbar-link">
            <FaComments style={{ marginRight: '8px' }} />
            Discussion Forum
          </Link>
        </div>

        {/* Right: Search Icon and Notification Bell */}
        <div className="topbar-right">
          {/* Notification Bell */}
          <Badge 
            count={notificationCount} 
            overflowCount={99} 
            style={{ display: isDropdownOpen ? 'none' : 'block' }} 
          >
            <Dropdown
              overlay={notificationMenu}
              trigger={['click']}
              onOpen={handleDropdownOpen}
              onClose={handleDropdownClose}
            >
              {/* Notification Bell Icon */}
              {notificationCount > 0 ? (
                <FaBell style={{ fontSize: '24px', cursor: 'pointer', color: '#000' }} />
              ) : (
                <FaRegBell style={{ fontSize: '24px', cursor: 'pointer', color: '#000' }} />
              )}
            </Dropdown>
          </Badge>

          {/* Search Icon */}
          <button className="search-icon" onClick={handleSearch}>
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>

      {/* Search Modal */}
      <Modal
        title="Search"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        footer={null}
        centered
        className="search-modal"
      >
        <Input
          placeholder="Search..."
          size="large"
          value={searchQuery}
          onChange={handleSearchQuery}
        />
        <div className="search-results mt-3">
          {searchResults.length > 0 ? (
            <ul>
              {searchResults.map((result, index) => (
                <li
                  key={index}
                  onClick={() => handleNavigate(result.link)}
                  style={{ cursor: "pointer" }}
                >
                  {result.label}
                </li>
              ))}
            </ul>
          ) : (
            <p>No results found.</p>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Topbar;
