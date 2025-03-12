import React, { useState } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import { toast } from "react-toastify";
import { QRCodeCanvas } from "qrcode.react"; // ✅ Correct import
import * as Yup from "yup";

const PaymentPage = () => {
  const [qrCode, setQrCode] = useState(null);
  const [orderId, setOrderId] = useState("");

  const PaymentSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    studentId: Yup.string().required("Required"),
    amount: Yup.number().required("Required"),
  });

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Pay School Fees</h2>

      <Formik
        initialValues={{ studentId: "", name: "", email: "", amount: "" }}
        validationSchema={PaymentSchema}
        onSubmit={async (values) => {
          try {
            const { data } = await axios.post(
              "http://localhost:5000/api/payment/qr",
              values
            );
            setQrCode(data.qr);
            setOrderId(data.orderId);
            toast.success("Scan QR to complete payment!");
          } catch (error) {
            toast.error("Payment failed. Try again!");
          }
        }}
      >
        {({ errors, touched }) => (
          <Form className="space-y-4">
            <Field
              name="studentId"
              className="input"
              placeholder="Student ID"
            />
            <Field name="name" className="input" placeholder="Full Name" />
            <Field
              name="email"
              className="input"
              type="email"
              placeholder="Email"
            />
            <Field
              name="amount"
              className="input"
              type="number"
              placeholder="Amount (₹)"
            />

            <button type="submit" className="btn-primary">
              Generate QR Code
            </button>
          </Form>
        )}
      </Formik>

      {qrCode && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Scan QR to Pay</h3>
          <QRCodeCanvas value={qrCode} size={200} /> {/* ✅ Now it works! */}
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
