import React, { useState, useEffect, useCallback } from 'react';
import { Collapse } from 'react-bootstrap';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import 'bootstrap/dist/css/bootstrap.min.css';
import { collection, getDocs, orderBy, query, limit } from 'firebase/firestore';
import { fireStore } from '../firebase/firebase'; // Ensure this path points to your Firebase configuration
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const DropdownComponent = () => {
  const [openDropdown, setOpenDropdown] = useState(null); // Track which main dropdown is open
  const [openCategory, setOpenCategory] = useState({}); // Track which category dropdown is open
  const [dropdownData, setDropdownData] = useState([]); // Dynamic data
  const [recentPosts, setRecentPosts] = useState([]); // Recent posts data
  const [loading, setLoading] = useState(true); // Track loading state

  // Fetch dropdown data from Firestore
  const fetchDropdownData = useCallback(async () => {
    try {
      if (!fireStore) throw new Error('Firestore instance is not defined');

      const querySnapshot = await getDocs(
        query(collection(fireStore, 'topics'), orderBy('timestamp'))
      );

      const data = {};

      querySnapshot.forEach((doc) => {
        const { class: className, subCategory, topic, timestamp } = doc.data();
        if (['Class 9', 'Class 10', 'Class 11', 'Class 12'].includes(className)) {
          if (!data[className]) {
            data[className] = {};
          }
          if (!data[className][subCategory]) {
            data[className][subCategory] = [];
          }
          data[className][subCategory].push({ topic, timestamp, id: doc.id });
        }
      });

      // Format the data to match the desired structure (grouped by subcategory)
      const formattedData = Object.keys(data).map((classKey) => ({
        title: classKey,
        content: Object.keys(data[classKey]).map((subCategory) => ({
          subCategory,
          topics: data[classKey][subCategory].sort((a, b) => a.timestamp - b.timestamp),
        })),
      }));

      setDropdownData(formattedData);
    } catch (error) {
      console.error('Error fetching dropdown data:', error);
    }
  }, []);

  // Fetch recent posts from Firestore
  const fetchRecentPosts = useCallback(async () => {
    try {
      if (!fireStore) throw new Error('Firestore instance is not defined');

      const querySnapshot = await getDocs(
        query(collection(fireStore, 'topics'), orderBy('timestamp', 'desc'), limit(5))
      );

      const posts = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        const timestamp = data.timestamp?.seconds ? new Date(data.timestamp.seconds * 1000) : null;
        if (data.topic) {
          return { ...data, timestamp, topicId: doc.id }; // Only add posts that have a topic
        }
        return null;
      }).filter(post => post !== null); // Filter out null posts

      setRecentPosts(posts);
    } catch (error) {
      console.error('Error fetching recent posts:', error);
    } finally {
      setLoading(false); // Set loading to false once data is fetched
    }
  }, []);

  // Initialize data fetching on mount
  useEffect(() => {
    fetchDropdownData();
    fetchRecentPosts();
  }, [fetchDropdownData, fetchRecentPosts]);

  const toggleDropdown = useCallback((index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  }, [openDropdown]);

  const toggleCategory = useCallback((mainIndex, categoryIndex) => {
    const key = `${mainIndex}-${categoryIndex}`;
    setOpenCategory((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  }, []);

  // Scroll to the top when a link is clicked
  const scrollToTopic = (topicId) => {
    const element = document.getElementById(topicId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Loader component
  const Loader = () => (
    <div className="loader" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
      <div className="spinner-border" role="status" style={{ width: '3rem', height: '3rem', color: '#000' }}>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );

  return (
    <div className="container" style={{ fontFamily: 'Roboto, sans-serif' }}>
      <h1 className="text-center mt-4" style={{ fontSize: '2.5rem', fontWeight: 700, color: '#000' }}>
         Gramture Study - For FREE
      </h1>
      <p className="text-center text-muted mb-4" style={{ fontSize: '1.1rem' }}>
        Free Video Lectures, Practice MCQs & Test Sessions
      </p>

      {/* Display Loader until data is loaded */}
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* Dropdown for Classes */}
          <div className="row justify-content-center">
            {dropdownData.map((dropdown, index) => (
              <div className="col-md-6 mb-3" key={index} style={{ padding: '10px' }}>
                <div
                  className="card shadow-sm"
                  style={{
                    cursor: 'pointer',
                    borderRadius: '8px',
                    backgroundColor: '#ffffff',
                    transition: 'box-shadow 0.3s ease',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                  }}
                  onClick={() => toggleDropdown(index)}
                >
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 style={{ fontSize: '1.5rem', fontWeight: '600' }}>{dropdown.title}</h5>
                      {openDropdown === index ? <BsChevronUp /> : <BsChevronDown />}
                    </div>
                    <Collapse in={openDropdown === index}>
                      <div className="mt-3">
                        {dropdown.content.map((category, categoryIndex) => (
                          <div key={categoryIndex} className="mb-3">
                            <div
                              className="d-flex justify-content-between align-items-center"
                              style={{ cursor: 'pointer', padding: '8px 0' }}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleCategory(index, categoryIndex);
                              }}
                            >
                              <h6 style={{ fontSize: '1.2rem', fontWeight: '500' }}>
                                {category.subCategory}
                              </h6>
                              {openCategory[`${index}-${categoryIndex}`] ? <BsChevronUp /> : <BsChevronDown />}
                            </div>
                            <Collapse in={openCategory[`${index}-${categoryIndex}`]}>
                              <ul className="list-unstyled mt-2 pl-4">
                                {category.topics.map((topic, topicIndex) => {
                                  const topicId = `${dropdown.title}-${category.subCategory}-${topic.topic}`;
                                  return (
                                    <li className="py-1" key={topicIndex}>
                                      <Link
                                        to={`/description/${category.subCategory}/${topic.id}`} // Navigate to specific topic using topic.id
                                        className="sub-category-link"
                                        onClick={() => {
                                          scrollToTopic(topicId); // Scroll to the specific topic on click
                                        }}
                                        style={{
                                          textDecoration: 'none',
                                          color: '#007bff',
                                          fontSize: '1rem',
                                          fontWeight: '400',
                                          transition: 'color 0.2s ease',
                                        }}
                                      >
                                        {topic.topic}
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            </Collapse>
                          </div>
                        ))}
                      </div>
                    </Collapse>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Posts Section */}
          <div className="recent-posts-section" style={{ marginTop: '50px' }}>
            <h3 className="text-center" style={{ fontSize: '2rem', fontWeight: '700', color: '#333' }}>
              Recent Posts
            </h3>
            <div>
              <div className="list-group">
                {recentPosts.length > 0 ? (
                  recentPosts.map((post, index) => {
                    return (
                      <Link
                        key={index}
                        to={`/description/${post.subCategory}/${post.topicId}`} // Navigate to specific topic using topicId
                        style={{
                          textDecoration: 'none',
                          color: 'inherit',
                        }}
                       
                      >
                        <div
                          className="list-group-item list-group-item-action"
                          style={{
                            padding: '15px',
                            borderRadius: '8px',
                            marginBottom: '15px',
                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                            cursor: 'pointer',
                          }}
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <h5 className="mb-0" style={{ fontSize: '1.2rem', fontWeight: '600', color: '#000' }}>
                                {index + 1}. {post.topic}
                              </h5>
                              <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>
                                <strong>Class:</strong> {post.class} &nbsp; | &nbsp;
                                <strong>SubCategory:</strong> {post.subCategory}
                              </p>
                            </div>
                          </div>
                          {/* View Details Link */}
                          <div className="mt-2 text-right">
                            <Link
                              to={`/description/${post.subCategory}/${post.topicId}`} // Navigate to specific topic
                              style={{ fontSize: '0.9rem', fontWeight: '600', color: '#007bff' }}
                            >
                              View Details
                            </Link>
                          </div>
                        </div>
                      </Link>
                    );
                  })
                ) : (
                  <div className="col-12">
                    <p className="text-center text-muted">No recent posts available.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DropdownComponent;
