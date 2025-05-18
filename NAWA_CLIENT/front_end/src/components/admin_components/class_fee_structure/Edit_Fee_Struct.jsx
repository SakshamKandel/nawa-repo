import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";
import NoAccess from "../../NoAccess";
import axios from "axios";
import { toast } from 'react-toastify';

const Edit_Fee_Struct = () => {
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmAction, setConfirmAction] = useState(() => () => {});
  
  const updateFeeFunc = async (data) => {
    try {
      if (showConfirm) {
        confirmAction();
      } else {
        setShowConfirm(true);
        setConfirmAction(() => async () => {
          const response = await axios.patch(
            `http://localhost:8000/fetch/class/edit/fee/${location.state?.structFee.class_name}`,
            data,
            {withCredentials:true}
          );
          toast.success(response.data);
        });
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data);
      } else {
        toast.error(error.message);
      }
    }
  };
  
  return location.state ? (
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
                Edit Fee Structure
              </h1>
              <p className="text-sm text-[#666666]">
                Class {location.state.structFee.class_name} - Fee Configuration
              </p>
            </div>
          </div>
        </div>

        {/* NAWATARA STYLE form card */}
        <div className="bg-white rounded-lg shadow-sm border border-[#e0e0e0] p-6">
          <form onSubmit={handleSubmit(updateFeeFunc)} className="space-y-5">
            <div>
              <label
                htmlFor="admission_fee"
                className="block mb-1.5 text-sm font-medium text-[#191919]"
              >
                Admission Fee
              </label>
              <input
                type="number"
                id="admission_fee"
                name="admission_fee"
                defaultValue={location.state.structFee.admission_fee}
                className="w-full p-2.5 bg-white border border-[#e0e0e0] rounded-md text-[#191919] text-sm focus:ring-[#0a66c2] focus:border-[#0a66c2] hover:border-[#0a66c2] transition-colors"
                {...register("admission_fee", {
                  required: "Admission fee cannot be empty",
                  min: { value: 0, message: "Please enter a valid number" },
                })}
              />
              {errors.admission_fee && (
                <p className="mt-1.5 text-sm text-red-600">
                  {errors.admission_fee.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="monthly_fee"
                className="block mb-1.5 text-sm font-medium text-[#191919]"
              >
                Monthly Fee
              </label>
              <input
                type="number"
                id="monthly_fee"
                name="monthly_fee"
                defaultValue={location.state.structFee.monthly_fee}
                className="w-full p-2.5 bg-white border border-[#e0e0e0] rounded-md text-[#191919] text-sm focus:ring-[#0a66c2] focus:border-[#0a66c2] hover:border-[#0a66c2] transition-colors"
                {...register("monthly_fee", {
                  required: "Monthly fee cannot be empty",
                  min: { value: 0, message: "Please enter a valid number" },
                })}
              />
              {errors.monthly_fee && (
                <p className="mt-1.5 text-sm text-red-600">
                  {errors.monthly_fee.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="comp_fee"
                className="block mb-1.5 text-sm font-medium text-[#191919]"
              >
                Computer Fee
              </label>
              <input
                type="number"
                id="comp_fee"
                name="comp_fee"
                defaultValue={location.state.structFee.comp_fee}
                className="w-full p-2.5 bg-white border border-[#e0e0e0] rounded-md text-[#191919] text-sm focus:ring-[#0a66c2] focus:border-[#0a66c2] hover:border-[#0a66c2] transition-colors"
                {...register("comp_fee", {
                  required: "Computer fee cannot be empty",
                  min: { value: 0, message: "Please enter a valid number" },
                })}
              />
              {errors.comp_fee && (
                <p className="mt-1.5 text-sm text-red-600">
                  {errors.comp_fee.message}
                </p>
              )}
            </div>

            <div className="pt-4 border-t border-[#e0e0e0] flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 bg-[#0a66c2] text-white rounded-full font-medium text-sm hover:bg-[#004182] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0a66c2] focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating...
                  </>
                ) : (
                  <>Update Fee Structure</>
                )}
              </button>
              
              <Link to="/update-class-structure" className="flex-1 sm:flex-none">
                <button
                  type="button"
                  className="w-full px-5 py-2.5 border border-[#0a66c2] rounded-full text-[#0a66c2] font-medium text-sm hover:bg-[#f3f9ff] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0a66c2] focus:ring-offset-2"
                >
                  Back to Class List
                </button>
              </Link>
            </div>
          </form>
        </div>
        
        {/* NAWATARA STYLE info card */}
        <div className="mt-6 bg-white rounded-lg shadow-sm border border-[#e0e0e0] p-5">
          <div className="flex items-start">
            <div className="flex-shrink-0 p-1 bg-[#f9fafb] rounded-full border border-[#e0e0e0]">
              <svg className="w-5 h-5 text-[#0a66c2]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-[#191919]">About Fee Updates</h3>
              <p className="mt-1 text-xs text-[#666666]">
                Changes to fee structure will affect all students in class {location.state.structFee.class_name}. 
                Updates will be reflected immediately in all financial reports.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <NoAccess />
  );
};

export default Edit_Fee_Struct;