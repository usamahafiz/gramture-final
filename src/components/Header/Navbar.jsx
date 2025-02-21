import React, { useState, useEffect, useRef } from "react";
import { Collapse } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { fireStore } from "../../firebase/firebase";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../../assets/css/navbar.css";

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [classes, setClasses] = useState([]);
  const [visibleStartIndex, setVisibleStartIndex] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 992);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 992);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchClassesAndTopics = async () => {
      try {
        const q = query(
          collection(fireStore, "topics"),
          orderBy("timestamp", "asc")
        );
        const querySnapshot = await getDocs(q);
        const data = {};

        querySnapshot.forEach((doc) => {
          const { class: className, subCategory, topic } = doc.data();
          if (["Class 9", "Class 10", "Class 11", "Class 12"].includes(className)) {
            return;
          }
          if (!data[className]) {
            data[className] = [];
          }
          data[className].push({ id: doc.id, subCategory, topic });
        });

        const formattedData = Object.keys(data).map((classKey) => ({
          class: classKey,
          topics: data[classKey],
        }));

        setClasses(formattedData);
      } catch (error) {
        console.error("Error fetching classes and topics:", error);
      }
    };

    fetchClassesAndTopics();
  }, []);

  const scrollNav = (direction) => {
    if (!isSmallScreen) {
      if (direction === "left" && visibleStartIndex > 0) {
        setVisibleStartIndex(visibleStartIndex - 1);
      } else if (
        direction === "right" &&
        visibleStartIndex + 6 < classes.length
      ) {
        setVisibleStartIndex(visibleStartIndex + 1);
      }
    }
  };

  const handleSubCategoryClick = () => {
    if (isSmallScreen) {
      setIsNavbarOpen(false);
    }
    setOpenDropdown(null);
  };

  return (
    <nav
      className="navbar navbar-expand-lg custom-navbar navbar-offset"
      style={{
        backgroundColor: "#fcf9f9",
        zIndex: isSmallScreen ? 1000 : "auto",
      }}
    >
      <div className="container-fluid">
        <button
          className="navbar-toggler order-1"
          type="button"
          onClick={() => setIsNavbarOpen(!isNavbarOpen)}
          aria-controls="navbarNav"
          aria-expanded={isNavbarOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link to="/" className="navbar-brand order-2 ms-2">
          {/* Your Logo or Brand Name */}
        </Link>
        {!isSmallScreen && (
          <FaAngleLeft
            className={`nav-arrow left-arrow order-3 ${
              visibleStartIndex === 0 ? "disabled" : ""
            }`}
            onClick={() => scrollNav("left")}
          />
        )}
        <div
          className={`collapse navbar-collapse justify-content-center order-4 ${
            isNavbarOpen ? "show" : ""
          }`}
          id="navbarNav"
        >
          <ul
            className="navbar-nav d-flex justify-content-center w-100"
            ref={dropdownRef}
          >
            {Array.isArray(classes) && classes.length > 0 ? (
              classes
                .slice(
                  isSmallScreen ? 0 : visibleStartIndex,
                  isSmallScreen ? classes.length : visibleStartIndex + 6
                )
                .map((classData, index) => (
                  <li
                    className="nav-item dropdown position-relative mx-2"
                    key={index}
                  >
                    <div
                      className="nav-link dropdown-toggle"
                      onClick={() =>
                        setOpenDropdown(openDropdown === index ? null : index)
                      }
                      style={{
                        cursor: "pointer",
                        wordWrap: "break-word",
                        whiteSpace: "normal",
                      }}
                    >
                      {classData.class}
                    </div>
                    <Collapse in={openDropdown === index}>
                      <div
                        className="dropdown-menu mt-0 shadow p-3 bg-light border"
                        style={{
                          maxHeight: "300px",
                          overflowY: "auto",
                        }}
                      >
                        <div className="mb-3">
                          <ul className="list-unstyled ms-3 mt-2">
                            {classData.topics.map((topic, topicIndex) => (
                              <li key={topicIndex} className="py-0.5">
                                <Link
                                  to={`/description/${topic.subCategory}/${topic.id}`} // Routing using subCategory and topic.id
                                  className="sub-category-link"
                                  onClick={handleSubCategoryClick}
                                  style={{
                                    textDecoration: "none",
                                    color: "#007bff",
                                    fontSize: "0.8rem",
                                    fontWeight: "400",
                                    transition: "color 0.2s ease",
                                  }}
                                >
                                  {`${topicIndex + 1}. ${topic.topic}`}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </Collapse>
                  </li>
                ))
            ) : (
              <li>Loading...</li>
            )}
          </ul>
        </div>
        {!isSmallScreen && (
          <FaAngleRight
            className={`nav-arrow right-arrow order-5 ${
              visibleStartIndex + 6 >= classes.length ? "disabled" : ""
            }`}
            onClick={() => scrollNav("right")}
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
