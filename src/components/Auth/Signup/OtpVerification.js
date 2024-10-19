import React, { useEffect, useState } from 'react'
import Input from '../../Input/Input'
import { useForm } from "react-hook-form";
import EmailIcon from '@mui/icons-material/Email';
import SendToMobileIcon from '@mui/icons-material/SendToMobile';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { verifyEmailOtp, verifyMobileOtp } from '../../../services/otp-services';
import { useNavigate } from 'react-router-dom';


const OtpVerification = () => {
    const [emailVerified, setEmailVerified] = useState(false);
    const [mobileVerified, setMobileVerified] = useState(false);
    const navigation = useNavigate();

    useEffect(() => {

        if (mobileVerified && emailVerified) {
            navigation('/dashboard')
        }

    }, [mobileVerified, emailVerified, navigation])

    return (
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
            <div className="flex flex-col justify-center items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Sign Up</h2>
                <p className="text-center">Lorem Ipsum is simply dummy text</p>
            </div>
            <EmailVerification emailVerified={emailVerified} setEmailVerified={setEmailVerified} />
            <PhoneVerification mobileVerified={mobileVerified} setMobileVerified={setMobileVerified} />
        </div>
    )
}

export default OtpVerification


const EmailVerification = (props) => {
    const { emailVerified, setEmailVerified } = props
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");


    const onSubmit = async (data) => {

        const id = localStorage.getItem("id");
        try {
            await verifyEmailOtp({ id, ...data })
            setEmailVerified(true);
            setError("")

        } catch (error) {
            setError('Invalid Email OTP. Please try again.');
            console.log(error)
        }

    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='mb-5'>
            <Input name='otp'
                placeholder="Email OTP"
                icon={<SendToMobileIcon />}
                endIcon={emailVerified && <CheckCircleIcon style={{ color: 'green' }} />}
                register={register}
            />
            <p>{error}</p>

            {!emailVerified && (
                <button
                    type="submit"
                    className="w-full py-2 px-4 mt-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
                >
                    Verify OTP
                </button>
            )}
        </form>
    )
}
const PhoneVerification = (props) => {
    const { mobileVerified, setMobileVerified } = props
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");



    const onSubmit = async (data) => {
        try {
            const id = localStorage.getItem("id");
            await verifyMobileOtp({ id, ...data })
            setMobileVerified(true);
            setError("")

        } catch (error) {

            setError('Invalid Email OTP. Please try again.');
            console.log(error)
        }

    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='mb-5'>
            <Input name='otp'
                placeholder="Mobile OTP"
                icon={<EmailIcon />}
                endIcon={mobileVerified && <CheckCircleIcon style={{ color: 'green' }} />}
                register={register}
            />
            <p>{error}</p>
            {!mobileVerified && (
                <button
                    type="submit"
                    className="w-full py-2 px-4 mt-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
                >
                    Verify OTP
                </button>
            )}
        </form>
    )
}

