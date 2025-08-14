'use client';

import { useEffect } from "react";
import ReactPixel from "react-facebook-pixel";

const PixelTracker = () => {
  useEffect(() => {
    const pixelId = "1813866265831966"; // Tu Pixel ID hardcodeado
    
    ReactPixel.init(pixelId);
    ReactPixel.pageView();
  }, []);

  return null;
};

export default PixelTracker;