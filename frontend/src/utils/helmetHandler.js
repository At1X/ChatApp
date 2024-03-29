import React from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const HelmetHandler = () => {
  const location = useLocation();

  const capitalize = (str) => {
    // Replace underscores and dashes with spaces
    str = str.replace(/[_-]/g, " ");

    // Split the string by spaces
    const words = str.split(" ");

    // Capitalize the first character of each word
    const capitalizedWords = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });

    // Join the words back together with spaces
    return capitalizedWords.join(" ");
  };

  const canonicalUrl = window.location.origin + location.pathname;

  const getPageMetadata = () => {
    const pathSegments = location.pathname.split("/");
    const firstSegment = pathSegments[1];
    const lastSegment = pathSegments[pathSegments.length - 1];
    const capitalizedLastSegment = capitalize(lastSegment);

    switch (firstSegment) {
      // managing all auth routes
      case "auth":
        if (lastSegment === "welcome") {
          return {
            title: "Welcome to TwinkConnect | By Vaibhaw Mishra",
            description:
              "Welcome to TwinkConnect, a Real-Time web based Chat App developed by Vaibhaw Mishra with advanced features. Make friends, connect and enjoy your stay.",
            keywords:
              "twinkconnect, vaibhaw mishra, chat, chat app, mern, message, welcome",
          };
        } else {
          return {
            title: `${capitalizedLastSegment} | TwinkConnect`,
            description:
              "Robust authentication system of TwinkConnect | Login or Register and connect with your friends on an exciting journey.",
            keywords:
              "login, register, create account, twinkconnect, vaibhaw mishra, chat, chat app, mern, message, welcome",
          };
        }

      case "app":
        return {
          title: `All Chats | TwinkConnect`,
          description:
            "Chat, share memes and video call with all your friends with TwinkConnect's robust communication system on the go.",
        };

      // metadata for all default routes
      default:
        return {
          title: `${capitalizedLastSegment} | TwinkConnect`,
        };
    }
  };

  const { title, description, keywords } = getPageMetadata();

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {/* Add any other meta tags or elements as needed */}
    </Helmet>
  );
};

export default HelmetHandler;
