import axios from "axios";
import React, { useEffect, useState } from "react";
import NoAccess from "../../NoAccess";
import { toast } from 'react-toastify';

const TeacherPayroll = () => {
  const adminLoggedIn = document.cookie.includes("adminToken");
  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [btnClick, setbtnClick] = useState(false);
  const [record, setRecord] = useState([]);
  const [show, setShowMsg] = useState("Show");
  const [selectedTeacherId, setSelectedTeacherId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [salaryForm, setSalaryForm] = useState({
    salary: 0,
    allowance: 0,
    remarks: ""
  });

  const months = [
    "Baishakh",
    "Jestha",
    "Asadhh",
    "Shrawan",
    "Bhadra",
    "Ashwin",
    "Kartik",
    "Mangsir",
    "Poush",
    "Magh",
    "Falgun",
    "Chaitra",
  ];
  
  useEffect(() => {
    const view_teachers_func = async () => {
      try {
        const teachersData = await axios.get(
          "http://localhost:8000/api/teacher-payroll",
          {
            withCredentials: true,
          }
        );
        setTeachers(teachersData.data);
        setFilteredTeachers(teachersData.data);
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error(error.message);
        }
      }
    };

    view_teachers_func();
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredTeachers(teachers);
    } else {
      setFilteredTeachers(
        teachers.filter(t =>
          t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t._id.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, teachers]);
  
  const handleViewPayments = async (id) => {
    try {
      setIsLoading(true);
      setSelectedTeacherId(id);
      setShowMsg("Hide");
      setbtnClick(true);
      
      const response = await axios.get(
        `http://localhost:8000/api/teacher-payroll/${id}`,
        { withCredentials: true }
      );
      setRecord([response.data]);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleSalaryUpdate = async (month) => {
    try {
      setIsLoading(true);
      const response = await axios.put(
        `http://localhost:8000/api/teacher-payroll/${selectedTeacherId}`,
        {
          month,
          ...salaryForm
        },
        { withCredentials: true }
      );
      setRecord([response.data]);
      setSelectedMonth(null);
      setSalaryForm({ salary: 0, allowance: 0, remarks: "" });
      setIsLoading(false);
      toast.success(response.data);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSalaryForm(prev => ({
      ...prev,
      [name]: name === "remarks" ? value : parseFloat(value) || 0
    }));
  };
  
  return adminLoggedIn ? (
    <div className="min-h-screen bg-[#f3f6f8] font-sans py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-[#0a66c2] tracking-tight drop-shadow-lg" style={{letterSpacing: '-0.5px'}}>Teacher Payroll Management</h1>
          <p className="mt-3 text-lg text-[#434649]">View and manage salary records for teaching staff</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Teacher Selection Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-[#e6e9ec]">
              <div className="bg-gradient-to-r from-[#0a66c2] to-[#004182] px-6 py-5">
                <h2 className="text-white text-xl font-semibold">Select Teacher</h2>
                <p className="text-blue-100 text-sm">Choose a teacher to view payment history</p>
              </div>
              {/* Search Bar */}
              <div className="px-4 pt-4 pb-2 bg-white sticky top-0 z-10">
                <input
                  type="text"
                  placeholder="Search by name or ID..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-[#e6e9ec] focus:border-[#0a66c2] focus:ring-[#0a66c2] text-base bg-[#f3f6f8] placeholder-[#0a66c2] outline-none transition"
                  style={{fontFamily: 'inherit'}}
                />
              </div>
              <div className="p-4 overflow-y-auto max-h-[500px]">
                <div className="space-y-3">
                  {filteredTeachers && filteredTeachers.length > 0 ? (
                    filteredTeachers.map((teacher) => (
                      <button
                        key={teacher._id}
                        onClick={() => handleViewPayments(teacher._id)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center shadow-sm
                          ${teacher._id === selectedTeacherId 
                            ? 'bg-[#eaf1fb] border border-[#0a66c2] ring-2 ring-[#0a66c2]' 
                            : 'hover:bg-[#f3f6f8] border border-transparent hover:shadow-md'
                          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0a66c2]`}
                      >
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0 transition-colors duration-200
                          ${teacher._id === selectedTeacherId 
                            ? 'bg-[#0a66c2] text-white' 
                            : 'bg-[#eaf1fb] text-[#0a66c2]'}`}
                        >
                          {teacher.name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <p className={`text-base font-semibold transition-colors duration-200 ${teacher._id === selectedTeacherId ? 'text-[#0a66c2]' : 'text-[#434649]'}`}>
                            {teacher.name}
                          </p>
                          <p className="text-xs text-gray-500">ID: {teacher._id.substring(0, 8)}...</p>
                        </div>
                        {teacher._id === selectedTeacherId && (
                          <div className="ml-auto">
                            <svg className="h-6 w-6 text-[#0a66c2]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                          </div>
                        )}
                      </button>
                    ))
                  ) : (
                    <div className="text-center py-4">
                      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                      </svg>
                      <p className="mt-2 text-sm text-gray-500">No teachers found</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Payment Records Panel */}
          <div className="lg:col-span-2">
            {btnClick ? (
              <div className="bg-white shadow-lg rounded-xl overflow-hidden transform transition-all duration-300 ease-in-out border border-[#e6e9ec]">
                <div className="bg-gradient-to-r from-[#0a66c2] to-[#004182] px-6 py-5 flex justify-between items-center">
                  <div>
                    <h2 className="text-white text-xl font-semibold">Payment Records</h2>
                    <p className="text-blue-100 text-sm">
                      {teachers.find(t => t._id === selectedTeacherId)?.name || "Teacher"}'s monthly salary history
                    </p>
                  </div>
                  <button 
                    onClick={() => {
                      setbtnClick(false);
                      setShowMsg("Show");
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base font-semibold rounded-lg text-[#0a66c2] bg-white hover:bg-[#eaf1fb] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-colors duration-200 shadow"
                  >
                    <svg className="mr-2 -ml-1 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                    Back
                  </button>
                </div>
                
                <div className="p-6">
                  {isLoading ? (
                    <div className="py-16 flex justify-center items-center">
                      <div className="flex flex-col items-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-[#0a66c2]"></div>
                        <p className="mt-4 text-lg text-gray-500">Loading salary data...</p>
                      </div>
                    </div>
                  ) : record.length === 0 ? (
                    <div className="py-16 text-center">
                      <svg className="mx-auto h-14 w-14 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                      <h3 className="mt-3 text-xl font-semibold text-[#434649]">No payment records</h3>
                      <p className="mt-2 text-base text-gray-500">This teacher has no salary records yet.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto max-h-[500px]">
                      {record && months.map((month) => {
                        const monthData = record[0]?.records[month];
                        const totalSalary = monthData ? 
                          monthData.salary + monthData.allowance : 0;
                        
                        return (
                          <div 
                            key={month} 
                            className="border border-[#e6e9ec] rounded-xl overflow-hidden shadow bg-white hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
                          >
                            <div className="px-5 py-4 bg-[#f3f6f8] border-b border-[#e6e9ec] flex justify-between items-center">
                              <span className="font-semibold text-[#0a66c2] flex items-center text-lg">
                                <svg className="mr-2 h-6 w-6 text-[#0a66c2]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                                {month}
                              </span>
                              {monthData?.status === 'paid' ? (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#e0f7e9] text-[#0a8a43]">
                                  <span className="w-2 h-2 rounded-full bg-[#0a8a43] mr-2"></span>
                                  Paid
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#fff3cd] text-[#b8860b]">
                                  <span className="w-2 h-2 rounded-full bg-[#b8860b] mr-2"></span>
                                  Pending
                                </span>
                              )}
                            </div>
                            
                            <div className="p-5 space-y-3">
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="text-sm text-[#434649]">Total Amount</p>
                                  <p className="text-2xl font-bold text-[#0a66c2]">
                                    {totalSalary > 0 ? `Rs. ${totalSalary.toLocaleString()}` : 'Not Processed'}
                                  </p>
                                </div>
                                {monthData?.status === 'paid' ? (
                                  <button
                                    onClick={() => {
                                      setSelectedMonth(month);
                                      setSalaryForm({
                                        salary: monthData.salary,
                                        allowance: monthData.allowance,
                                        remarks: monthData.remarks || ""
                                      });
                                    }}
                                    className="inline-flex items-center px-4 py-2 border border-[#e6e9ec] shadow-sm text-base font-medium rounded-lg text-[#0a66c2] bg-white hover:bg-[#eaf1fb] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0a66c2] transition-colors duration-200"
                                  >
                                    <svg className="mr-2 -ml-1 h-5 w-5 text-[#0a66c2]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                                    </svg>
                                    Edit
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => {
                                      setSelectedMonth(month);
                                      setSalaryForm({ salary: 0, allowance: 0, remarks: "" });
                                    }}
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-lg text-white bg-[#0a66c2] hover:bg-[#004182] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0a66c2] transition-colors duration-200"
                                  >
                                    <svg className="mr-2 -ml-1 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                    </svg>
                                    Add
                                  </button>
                                )}
                              </div>
                              {/* Remarks Display */}
                              {monthData?.remarks && (
                                <div className="bg-[#eaf1fb] border-l-4 border-[#0a66c2] p-3 rounded-md text-[#0a66c2] text-sm">
                                  <span className="font-semibold">Remarks:</span> {monthData.remarks}
                                </div>
                              )}
                              {/* Edit/Add Form */}
                              {selectedMonth === month && (
                                <div className="space-y-4 mt-2">
                                  <div>
                                    <label className="block text-sm font-medium text-[#0a66c2]">Base Salary</label>
                                    <input
                                      type="number"
                                      name="salary"
                                      value={salaryForm.salary}
                                      onChange={handleInputChange}
                                      className="mt-1 block w-full rounded-lg border-[#e6e9ec] shadow-sm focus:border-[#0a66c2] focus:ring-[#0a66c2] text-base"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-[#0a66c2]">Allowance</label>
                                    <input
                                      type="number"
                                      name="allowance"
                                      value={salaryForm.allowance}
                                      onChange={handleInputChange}
                                      className="mt-1 block w-full rounded-lg border-[#e6e9ec] shadow-sm focus:border-[#0a66c2] focus:ring-[#0a66c2] text-base"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-[#0a66c2]">Remarks</label>
                                    <textarea
                                      name="remarks"
                                      value={salaryForm.remarks}
                                      onChange={handleInputChange}
                                      rows={2}
                                      className="mt-1 block w-full rounded-lg border-[#e6e9ec] shadow-sm focus:border-[#0a66c2] focus:ring-[#0a66c2] text-base resize-none"
                                      placeholder="Add any remarks (optional)"
                                    />
                                  </div>
                                  <div className="flex space-x-3">
                                    <button
                                      onClick={() => handleSalaryUpdate(month)}
                                      className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-base font-semibold rounded-lg text-white bg-[#0a66c2] hover:bg-[#004182] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0a66c2]"
                                    >
                                      Save
                                    </button>
                                    <button
                                      onClick={() => {
                                        setSelectedMonth(null);
                                        setSalaryForm({ salary: 0, allowance: 0, remarks: "" });
                                      }}
                                      className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-[#e6e9ec] text-base font-semibold rounded-lg text-[#0a66c2] bg-white hover:bg-[#eaf1fb] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0a66c2]"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white shadow-lg rounded-xl overflow-hidden h-full flex items-center justify-center p-10 transform transition-all duration-300 ease-in-out border border-[#e6e9ec]">
                <div className="text-center">
                  <svg className="mx-auto h-20 w-20 text-[#eaf1fb]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                  </svg>
                  <h3 className="mt-6 text-2xl font-bold text-[#0a66c2]">No Records Selected</h3>
                  <p className="mt-2 text-lg text-[#434649]">Select a teacher to view their salary records</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <NoAccess />
  );
};

export default TeacherPayroll;