import React from "react";
import Layout from "./../components/Layout/Layout";
import img1 from "../images/privecy.jpg"


const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src={img1}
            alt="contactus"
            style={{ width: "90%" }}
          />
        </div>
        <div className="col-md-4">
          <h3 className="text-justify mt-12 fw-bold ">
            Thank you for visiting our website
          </h3>
          <h6>We value your privacy and are committed
            to protecting your personal information.This privacy policy outlines how
            we collect, use, and safeguard your data. By using our website, you agree to the terms of this policy
          </h6>
          <h6>
            We may collect personal information such as your name, address, email, phone number, and payment details.
          </h6>
          <h6>
            We use the collected information to process orders, personalize your experience, communicate with you, and improve our services.
            We may share data with trusted third parties for order fulfillment, payment processing, and shipping.
          </h6>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;