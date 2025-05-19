import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, Slide } from 'react-toastify';

const Notice = () => {
  const teacherLoggedIn = document.cookie.includes("teacherToken");
  const adminLoggedIn = document.cookie.includes("adminToken");
  const studentLoggedIn = document.cookie.includes("studentToken");
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const renderNotices = async () => {
      let response = null;
      try {
        setLoading(true);
        if (!teacherLoggedIn && !adminLoggedIn && !studentLoggedIn) {
          response = await axios.get("http://localhost:8000/get/notices");
        } else if (teacherLoggedIn) {
          response = await axios.get(
            "http://localhost:8000/get/notices/teachers",
            { withCredentials: true }
          );
        } else if (adminLoggedIn) {
          response = await axios.get(
            "http://localhost:8000/get/notices/admins",
            { withCredentials: true }
          );
        } else {
          response = await axios.get(
            "http://localhost:8000/get/notices/students",
            { withCredentials: true }
          );
        }
        
        // Sort notices by date (newest first)
        const sortedNotices = response.data.sort((a, b) => {
          const dateA = new Date(a.date || a.createdAt);
          const dateB = new Date(b.date || b.createdAt);
          return dateB - dateA;
        }).reverse(); // If dates are the same, last-inserted will be on top
        console.log('Sorted Notices:', sortedNotices.map(n => n.date || n.createdAt));
        
        setNotices(sortedNotices);
        setLoading(false);
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data);
        } else {
          toast.error(error.message);
        }
        setLoading(false);
      }
    };

    renderNotices();
  }, []);

  // Function to format date properly
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'short', 
      day: 'numeric'
    });
  };
  
  // Improved helper function to ensure attachments are treated as an array
  const getAttachments = (attachments) => {
    if (!attachments) return [];
    if (Array.isArray(attachments)) return attachments;
    return [attachments]; // Convert single item to array if it's not already an array
  };
  
  // Helper function to get proper file URL
  const getFileUrl = (attachment) => {
    if (!attachment) return '#';
    
    try {
      if (typeof attachment === 'string') {
        if (attachment.includes('public/')) {
          return `http://localhost:8000/${attachment.split('public/')[1]}`;
        } else if (attachment.includes('/')) {
          return `http://localhost:8000/${attachment.split('/').slice(-2).join('/')}`;
        }
        return `http://localhost:8000/${attachment}`;
      }
      return `http://localhost:8000/uploads/${attachment}`;
    } catch (err) {
      console.error("Error parsing attachment URL:", err);
      return `http://localhost:8000/uploads/${attachment}`;
    }
  };
  
  // Helper function to get displayable file name
  const getFileName = (attachment) => {
    if (!attachment) return 'Attachment';
    
    try {
      if (typeof attachment === 'string') {
        if (attachment.includes('uploads/')) {
          return attachment.split('uploads/')[1];
        } else if (attachment.includes('/')) {
          return attachment.split('/').pop();
        }
        return attachment;
      }
      return 'Attachment';
    } catch (err) {
      console.error("Error parsing file name:", err);
      return 'Attachment';
    }
  };

  const handleDelete = (noticeId) => {
    toast.info(
      <div>
        Are you sure you want to delete this notice? This action cannot be undone.<br/>
        <button
          onClick={async () => {
            toast.dismiss();
            try {
              await axios.delete(`http://localhost:8000/admin/delete/notice/${noticeId}`, { withCredentials: true });
              setNotices((prev) => prev.filter((n) => n._id !== noticeId));
              toast.success('Notice deleted successfully');
            } catch (error) {
              toast.error(error.response?.data?.message || 'Failed to delete notice');
            }
          }}
          className="mt-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs font-semibold"
        >
          Confirm Delete
        </button>
      </div>,
      { autoClose: false, closeOnClick: false, transition: Slide }
    );
  };

  return (
    <div className="min-h-screen bg-[#f3f2ef] py-8 px-4">
      {/* LinkedIn style main container */}
      <div className="max-w-2xl mx-auto">
        {/* LinkedIn header section */}
        <div className="mb-4 bg-white rounded-lg shadow-sm border border-[#e0e0e0] p-4">
          <h1 className="text-xl font-semibold text-[#191919] flex items-center">
            <svg className="w-6 h-6 text-[#0a66c2] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
            </svg>
            School Notices
          </h1>
        </div>

        {/* LinkedIn style content feed */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm border border-[#e0e0e0] p-4">
                <div className="animate-pulse">
                  <div className="flex items-center space-x-3">
                    <div className="rounded-full bg-[#e0e0e0] h-10 w-10"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-[#e0e0e0] rounded w-1/4"></div>
                      <div className="h-3 bg-[#e0e0e0] rounded w-1/6"></div>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="h-4 bg-[#e0e0e0] rounded w-3/4"></div>
                    <div className="h-4 bg-[#e0e0e0] rounded"></div>
                    <div className="h-4 bg-[#e0e0e0] rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : notices.length ? (
          <div className="space-y-3">
            {notices.map((notice) => (
              <div key={`${notice._id}-${notice.date || notice.createdAt}`} className="bg-white rounded-lg shadow-sm border border-[#e0e0e0] hover:shadow-md transition-shadow duration-200">
                {/* Notice header with LinkedIn style */}
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex">
                      {/* Profile avatar */}
                      <div className="h-12 w-12 rounded-full bg-gradient-to-r from-[#0077B5] to-[#0a66c2] flex items-center justify-center text-white font-bold text-lg">
                        {notice.adminName ? notice.adminName.charAt(0).toUpperCase() : "A"}
                      </div>
                      {/* Author info */}
                      <div className="ml-3 flex-1">
                        <div className="flex flex-wrap items-center">
                          <h3 className="font-semibold text-[#191919]">{notice.adminName}</h3>
                          <span className="ml-2 text-xs text-[#666666]">• School Administrator</span>
                        </div>
                        <div className="flex items-center text-xs text-[#666666] mt-1">
                          <span>{formatDate(notice.date || notice.createdAt)}</span>
                          <span className="mx-1">•</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            notice.noticecategory === "Exam" ? "bg-green-100 text-green-700" :
                            notice.noticecategory === "Event" ? "bg-purple-100 text-purple-700" :
                            notice.noticecategory === "Holiday" ? "bg-red-100 text-red-700" :
                            notice.noticecategory === "Important" ? "bg-yellow-100 text-yellow-700" :
                            "bg-blue-100 text-[#0a66c2]"
                          }`}>
                            {notice.noticecategory}
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* Delete button for admin */}
                    {adminLoggedIn && (
                      <button
                        onClick={() => handleDelete(notice._id)}
                        className="ml-4 text-red-600 hover:text-red-800 font-semibold text-xs px-3 py-1 rounded transition-colors border border-red-100 hover:border-red-300 bg-red-50"
                        title="Delete Notice"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                  
                  {/* Notice content */}
                  <div className="mt-3">
                    <h2 className="text-base font-semibold text-[#191919] mb-2">{notice.noticetitle}</h2>
                    <div className="text-sm text-[#191919] whitespace-pre-line">
                      {notice.noticedes}
                    </div>
                  </div>
                  
                  {/* FIXED: Improved LinkedIn style attachments handling */}
                  {notice.attachments && (
                    <div className="mt-4 bg-[#f9fafb] p-3 rounded-lg border border-[#e0e0e0]">
                      <h4 className="text-xs font-medium text-[#666666] uppercase mb-2">Attachments</h4>
                      <div className="space-y-2">
                        {getAttachments(notice.attachments).map((attachment, index) => (
                          <a 
                            key={index} 
                            href={getFileUrl(attachment)}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center p-2 bg-white rounded border border-[#e0e0e0] hover:border-[#0a66c2] hover:bg-[#f3f9ff] transition-colors duration-150 text-sm"
                          >
                            <svg className="w-5 h-5 text-[#0a66c2] mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                            </svg>
                            <span className="text-[#191919] truncate">{getFileName(attachment)}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-[#e0e0e0] p-6 text-center">
            <div className="mx-auto w-16 h-16 bg-[#f3f7fa] rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-[#0a66c2]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-[#191919] mb-2">No Notices Available</h2>
            <p className="text-[#666666]">Check back later for updates and announcements</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notice;