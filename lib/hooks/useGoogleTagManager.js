import { useEffect } from "react";
import { google } from "../constants";

// Run Google Analytics on intial app mount in production.

export const useGoogleTagManager = () =>
  useEffect(() => {
    process.env.NODE_ENV === "production" &&
      (() => {
        !window.dataLayer && (window.dataLayer = []);
        function gtag() {
          dataLayer.push(arguments);
        }
        GOOGLE.tagManager.params.forEach((param) =>
          gtag(param.name, param.value)
        );
      })();
  }, []);
