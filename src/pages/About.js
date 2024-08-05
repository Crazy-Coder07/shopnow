import React from 'react'
import Layout from '../components/Layout/Layout'
import img1 from '../images/about.jpg';
const About = () => {
  return (
    <Layout title={"About us - Ecommer app"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img src={img1} alt="contactus"
            style={{ width: "100%" }} />
        </div>
        <div className="col-md-4">
          <h3 className="text-justify mt-12 fw-bold ">
            Hey Welcome To ShopNow!!
          </h3>
          <h5 className='mb-6'>
            I'm Aditya Ranjan, a graduate of IIIT Ranchi with a B.Tech in Computer Science & Engineering, having completed my studies in May 2024.
          </h5>
        </div>
      </div>
    </Layout>
  )
}

export default About