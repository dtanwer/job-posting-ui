import { Business, Email,Phone, Person } from '@mui/icons-material';
import GroupsIcon from '@mui/icons-material/Groups';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { signup } from '../../../services/auth-services';
import Input from '../../Input/Input';
import OtpVerification from './OtpVerification';

const SIGNUP_FORM_FIELDS = [
  { name: "name", label: "Name", type: "text", icon: <Person /> },
  { name: "companyName", label: "Company Name", type: "text", icon: <Business /> },
  { name: "email", label: "Email", type: "email", icon: <Email /> },
  { name: "phone", label: "Phone", type: "text", icon: <Phone /> },
  { name: "employeeCount", label: "Employee Size", type: "number", icon: <GroupsIcon /> },
]



function Signup() {
  const [isOtpVisible, setIsOtpVisible] = useState(false);
  const { register, handleSubmit } = useForm();
  
  const onSubmit = async (data) => {
    try {
      const response = await signup(data)

      localStorage.setItem("id", response.data.company._id)
      localStorage.setItem("token", response.data.token)
      
      if (response.status === 201) {
        setIsOtpVisible(true);
      }
    } catch (error) {
      console.error('Error during API call:', error);
    }
  };



  return (
    <div>
      <div className="flex flex-col md:flex-row justify-center items-center mt-4 mx-4">
        <div className="md:max-w-[40%] md:ml-[5%] mb-6 md:mb-0">
          <p className="text-center md:text-left">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.
          </p>
        </div>
        <div className="flex items-center justify-center w-full md:w-[70%]">
          {!isOtpVisible ? (
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
              <div className="flex flex-col justify-center items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Sign Up</h2>
                <p className="text-center text-sm">Lorem Ipsum is simply dummy text</p>
              </div>
              <div className="flex flex-col space-y-2">

                {
                  SIGNUP_FORM_FIELDS.map((field, idx) =>
                    <Input name={field.name}
                      type={field.type}
                      placeholder={field.label}
                      icon={field.icon}
                      register={register}
                      key={idx}
                    />
                  )
                }
                <div className="flex flex-col justify-center items-center">
                  <p className="text-center">By clicking on proceed you will accept our</p>
                  <p className="text-blue-700">Terms & Conditions</p>
                </div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
                >
                  Proceed
                </button>
              </div>
            </form>
          ) : (
            <OtpVerification />
          )}
        </div>
      </div>
    </div>
  );
}

export default Signup;
