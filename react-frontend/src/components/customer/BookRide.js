import './styles/loading.css';
import { HashLoader } from 'react-spinners';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function BookRide() {
  let navigate = useNavigate();
  const [paymentMode, setPaymentMode] = useState('online'); // Default to online payment
  const [isProcessing, setIsProcessing] = useState(false); // Track payment processing state
  const [otp, setOtp] = useState(null); // Store OTP for both emails

  useEffect(() => {
    // Ensure Razorpay script is loaded
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => console.log('Razorpay script loaded successfully.');
    script.onerror = () => console.error('Failed to load Razorpay script.');
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Helper to generate OTP
  const generateOtp = () => Math.floor(100000 + Math.random() * 900000);

  const handleOnlinePayment = async (orderId, amount, user, ride, otpValue) => {
    console.log('Initializing Razorpay payment...');
    const options = {
      key: 'rzp_test_TPGOsj7k2QPYfW', // Razorpay test key
      amount: amount * 100, // Amount in paise
      currency: 'INR',
      name: 'BikeBuddy',
      description: 'Ride Payment',
      order_id: orderId,
      handler: async (response) => {
        try {
          console.log('Payment successful:', response);
          // Send email notification to customer
          console.log('Sending payment confirmation email to customer');
          const { charges, driverPhone, driverName } = ride;
          const emailSubject = 'Ride Payment Confirmation';
          const emailBody = `Dear ${user.name}, your payment of ₹${charges} for the ride with driver ${driverName} (${driverPhone}) has been successfully processed.\nYour OTP for payment is ${otpValue}.`;

          await axios.post('http://localhost:8080/mail/send-mail', {
            email: user.email,
            subject: emailSubject,
            body: emailBody,
          });

          // Send email notification to driver
          // Fetch driver email from sessionStorage 'driver-info'
          const driverInfo = JSON.parse(sessionStorage.getItem('driver-info'));
          const driverEmail = driverInfo?.email;
          const driverSubject = 'New Ride Booked - Customer Details & OTP';
          const driverBody = `Dear ${driverName},\nA new ride has been booked by ${user.name} (${user.mobile}, ${user.email}).\nOTP for payment: ${otpValue}.`;

          if (driverEmail) {
            console.log('Sending ride info and OTP email to driver');
            await axios.post('http://localhost:8080/mail/send-mail', {
              email: driverEmail,
              subject: driverSubject,
              body: driverBody,
            });
          }

          // Navigate to status page
          navigate('/status');
        } catch (error) {
          console.error('Error handling payment success:', error);
          alert('Payment succeeded, but an error occurred while processing.');
        }
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: user.mobile,
      },
      theme: {
        color: '#0096FF',
      },
    };

    console.log('Razorpay options:', options); // Log Razorpay options for debugging

    try {
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Error initializing Razorpay:', error);
    }
  };

  const initiatePayment = async () => {
    try {
      console.log('Initiating payment...');
      setIsProcessing(true); // Start processing
      const ride = JSON.parse(sessionStorage.getItem('ride'));
      const { charges, driverPhone, driverName } = ride;
      const user = JSON.parse(sessionStorage.getItem('user'));

      // Generate OTP for this transaction
      const otpValue = generateOtp();
      setOtp(otpValue);

      if (paymentMode === 'cash') {
        // Handle Cash on Delivery
        console.log('Cash on Delivery selected');
        const emailSubject = 'Ride Confirmation';
        const emailBody = `Dear ${user.name}, your ride with driver ${driverName} (${driverPhone}) has been confirmed. Please pay ₹${charges} in cash upon arrival.`;
        console.log('Sending ride confirmation email to customer');
        await axios.post('http://localhost:8080/mail/send-mail', {
          email: user.email,
          subject: emailSubject,
          body: emailBody,
        });

        // Send email to driver as well
        const driverInfo = JSON.parse(sessionStorage.getItem('driver-info'));
        const driverEmail = driverInfo?.email;
        const driverSubject = 'New Ride Booked - Customer Details & OTP';
        const driverBody = `Dear ${driverName},\nA new ride has been booked by ${user.name} (${user.mobile}, ${user.email}).\nOTP for payment: ${otpValue}.`;
        if (driverEmail) {
          console.log('Sending ride info and OTP email to driver');
          await axios.post('http://localhost:8080/mail/send-mail', {
            email: driverEmail,
            subject: driverSubject,
            body: driverBody,
          });
        }

        // Navigate to status page
        navigate('/status');
        return;
      }

      // Create payment order for online payment
      const paymentResponse = await axios.post('http://localhost:8080/payment/createorder', {
        amount: charges,
        cid: user.uid,
        rid: ride.rid,
      });

      console.log('Payment order created:', paymentResponse.data);
      const { razorPayOrderId } = paymentResponse.data;

      // Trigger Razorpay payment
      handleOnlinePayment(razorPayOrderId, charges, user, ride, otpValue);
    } catch (error) {
      console.error('Error during payment process:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false); // Stop processing
    }
  };

  return (
    <div className="loading">
      <h4>Select Payment Mode:</h4>
      <div>
        <label>
          <input
            type="radio"
            value="online"
            checked={paymentMode === 'online'}
            onChange={() => setPaymentMode('online')}
          />
          Online Payment
        </label>
        <label>
          <input
            type="radio"
            value="cash"
            checked={paymentMode === 'cash'}
            onChange={() => setPaymentMode('cash')}
          />
          Cash on Delivery
        </label>
      </div>
      <button
        className="payment-button"
        onClick={initiatePayment}
        disabled={isProcessing}
      >
        {isProcessing ? 'Processing...' : 'Proceed to Pay'}
      </button>
      <HashLoader color="#0096FF" loading={isProcessing} />
    </div>
  );
}
