import axios from "axios";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {useNavigate} from "react-router-dom"
import { toast } from 'react-toastify';

const View_Class_Fee_Structure = () => {
  const navigate=useNavigate();
  const [showStructform, setshowStructform] = useState(false);
  const [structFee,setstructFee]=useState({});
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const fetchClass_Stucture_Fees = async (data) => {
    try {
      if (showStructform) {
        setshowStructform(!showStructform);
        setstructFee({});
      } else {
        const response = await axios.get(
          `http://localhost:8000/fetch/class/structure/fees/${data.class_name}`,
          { withCredentials: true }
        );
        setshowStructform(true);
        setstructFee({class_name:response.data.class_name,admission_fee:response.data.admission_fee,monthly_fee:response.data.monthly_fee,comp_fee:response.data.comp_fee,total:response.data.total});
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data);
      } else {
        toast.error(error.message);
      }
    }
  };

  const handleEdit=async()=>{
    try {
      navigate("/edit-fee-struct",{state:{structFee:structFee}})
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <div className="min-h-screen bg-[#f3f2ef] py-8 px-4 sm:px-6">
      <div className="max-w-lg mx-auto">
        {/* NAWATARA STYLE header */}
        <div className="bg-white rounded-lg shadow-sm border border-[#e0e0e0] p-6 mb-6">
          <div className="flex items-center">
            <div className="p-2 bg-[#e9f0f8] rounded-lg mr-3 flex-shrink-0">
              <svg className="w-6 h-6 text-[#0a66c2]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-[#191919]">
                Fee Structure Viewer
              </h1>
              <p className="text-sm text-[#666666]">
                View and manage class fee configurations
              </p>
            </div>
          </div>
        </div>

        {/* NAWATARA STYLE form card */}
        <div className="bg-white rounded-lg shadow-sm border border-[#e0e0e0] p-6">
          <form onSubmit={handleSubmit(fetchClass_Stucture_Fees)} className="space-y-5">
            <div>
              <label
                htmlFor="class_name"
                className="block mb-1.5 text-sm font-medium text-[#191919]"
              >
                Select Class
              </label>
              <select
                id="class_name"
                className="w-full p-2.5 bg-white border border-[#e0e0e0] rounded-md text-[#191919] text-sm focus:ring-[#0a66c2] focus:border-[#0a66c2] hover:border-[#0a66c2] transition-colors"
                {...register("class_name", { 
                  required: "Please select a class" 
                })}
              >
                <option value="">Select a class</option>
                <option value="1">Class 1</option>
                <option value="2">Class 2</option>
                <option value="3">Class 3</option>
                <option value="4">Class 4</option>
                <option value="5">Class 5</option>
                <option value="6">Class 6</option>
                <option value="7">Class 7</option>
              </select>
              {errors.class_name && (
                <p className="mt-1.5 text-sm text-red-600">
                  {errors.class_name.message}
                </p>
              )}
            </div>
            
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-5 py-2.5 bg-[#0a66c2] text-white rounded-full font-medium text-sm hover:bg-[#004182] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0a66c2] focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading...
                  </>
                ) : showStructform ? "Hide Fee Structure" : "Show Fee Structure"}
              </button>
            </div>
          </form>
        </div>

        {/* Fee structure details card */}
        {showStructform && (
          <div className="mt-6 bg-white rounded-lg shadow-sm border border-[#e0e0e0] p-6">
            <div className="flex items-center mb-5 pb-4 border-b border-[#e0e0e0]">
              <div className="p-1.5 bg-[#e9f0f8] rounded-lg mr-3 flex-shrink-0">
                <svg className="w-5 h-5 text-[#0a66c2]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <h2 className="text-base font-semibold text-[#191919]">
                  Class {structFee.class_name} Fee Structure
                </h2>
                <p className="text-xs text-[#666666]">
                  Current fee configuration details
                </p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between p-3 bg-[#f9fafb] rounded-lg hover:bg-[#f3f9ff] transition-colors">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2.5"></span>
                  <span className="text-sm font-medium text-[#191919]">Admission Fee</span>
                </div>
                <span className="text-sm font-semibold text-[#191919]">RS {structFee.admission_fee}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-[#f9fafb] rounded-lg hover:bg-[#f3f9ff] transition-colors">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2.5"></span>
                  <span className="text-sm font-medium text-[#191919]">Monthly Fee</span>
                </div>
                <span className="text-sm font-semibold text-[#191919]">RS {structFee.monthly_fee}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-[#f9fafb] rounded-lg hover:bg-[#f3f9ff] transition-colors">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2.5"></span>
                  <span className="text-sm font-medium text-[#191919]">Computer Fee</span>
                </div>
                <span className="text-sm font-semibold text-[#191919]">RS {structFee.comp_fee}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 mt-1 bg-[#e9f0f8] rounded-lg">
                <span className="text-sm font-semibold text-[#0a66c2]">Total Fee</span>
                <span className="text-sm font-bold text-[#0a66c2]">RS {structFee.total}</span>
              </div>
            </div>
            
            <div className="pt-4 border-t border-[#e0e0e0]">
              <button
                onClick={handleEdit}
                className="w-full px-5 py-2.5 bg-[#0a66c2] text-white rounded-full font-medium text-sm hover:bg-[#004182] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0a66c2] focus:ring-offset-2"
              >
                Edit Fee Structure
              </button>
            </div>
          </div>
        )}
        
        {/* NAWATARA STYLE info card (shown only when no structure is displayed) */}
        {!showStructform && (
          <div className="mt-6 bg-white rounded-lg shadow-sm border border-[#e0e0e0] p-5">
            <div className="flex items-start">
              <div className="flex-shrink-0 p-1 bg-[#f9fafb] rounded-full border border-[#e0e0e0]">
                <svg className="w-5 h-5 text-[#0a66c2]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-[#191919]">About Fee Structure</h3>
                <p className="mt-1 text-xs text-[#666666]">
                  Select a class from the dropdown to view its current fee structure. 
                  You can also edit the fee structure if changes are needed.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default View_Class_Fee_Structure;