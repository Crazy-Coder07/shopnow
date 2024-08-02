import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Helmet } from "react-helmet";


const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
        {/* for SEO purpose we are using the Helmet */}
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "70vh" }}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "Shop now",
  description: "mern stack project",
  keywords: "mern,react,node,mongodb,express",
  author: "Aditya",
};

export default Layout;