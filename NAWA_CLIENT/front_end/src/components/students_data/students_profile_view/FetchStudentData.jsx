import React from "react";
import { Link, Links, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const FetchStudentData = (props) => {
  const adminLoggedIn = document.cookie.includes("adminToken");
  const teacherLoggedIn = document.cookie.includes("teacherToken");
  const navigate=useNavigate();
  const handleEditFunc = async () => {
    try {
      navigate("/edit-details",{state:{student:props.student}});
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleViewFeeFunc=async()=>{
    try {
      navigate("/view-fee",{state:{student:props.student}});
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <div className="min-h-screen bg-[#f3f2ef] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-t-lg shadow-sm overflow-hidden border border-gray-200 border-b-0">
          <div className="bg-gradient-to-r from-[#0a66c2] to-[#0073b1] h-24 relative">
            <div className="absolute -bottom-12 left-6">
              <div className="h-24 w-24 rounded-full bg-white p-1 shadow-md">
                <div className="h-full w-full rounded-full bg-[#0a66c2] flex items-center justify-center text-white font-bold text-2xl">
                  {props.student.name.charAt(0)}
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-14 pb-6 px-6">
            <h1 className="text-2xl font-bold text-gray-900">
              {props.student.name}
            </h1>
            <p className="text-gray-600 mt-1">Class: {props.student.class_name}</p>
          </div>
        </div>
        
        {/* Profile Content */}
        <div className="bg-white rounded-b-lg shadow-sm border border-gray-200 border-t-0 overflow-hidden mb-4">
          {/* Basic Info */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-[#0a66c2]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Basic Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500">Student ID</p>
                <p className="font-medium text-gray-900">{props.student._id || "Not assigned"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium text-gray-900">{props.student.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Class</p>
                <p className="font-medium text-gray-900">{props.student.class_name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium text-gray-900">{props.student.address}</p>
              </div>
            </div>
          </div>
          
          {/* Parent Information */}
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-[#0a66c2]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Parent Information
            </h2>
            
            <div className="space-y-6">
              {/* Father's Information */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Father's Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium text-gray-900">{props.student.father_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Contact Number</p>
                    <p className="font-medium text-gray-900 flex items-center">
                      <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {props.student.father_phone}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Mother's Information */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Mother's Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium text-gray-900">{props.student.mother_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Contact Number</p>
                    <p className="font-medium text-gray-900 flex items-center">
                      <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {props.student.mother_phone}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 justify-between">
          <button
            onClick={() => {
              props.setshowModal(false), props.setsingleData(null);
            }}
            className="text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 focus:ring-2 focus:outline-none focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center shadow-sm transition-colors duration-200"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to List
          </button>
          
          <div className="flex flex-wrap gap-3">
            {adminLoggedIn && (
              <button
                onClick={handleEditFunc}
                className="text-white bg-[#0a66c2] hover:bg-[#004182] focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center shadow-sm transition-colors duration-200"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Edit Details
              </button>
            )}
            
            {adminLoggedIn && (
              <button
                onClick={handleViewFeeFunc}
                className="text-[#0a66c2] bg-white hover:bg-blue-50 border border-[#0a66c2] focus:ring-2 focus:outline-none focus:ring-blue-100 font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center shadow-sm transition-colors duration-200"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                View Fee Record
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FetchStudentData;