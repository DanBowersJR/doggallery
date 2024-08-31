import React from "react";

const ImageGallery = ({ dogImageLinks }) => {
  if (
    !dogImageLinks ||
    !Array.isArray(dogImageLinks) ||
    dogImageLinks.length === 0
  ) {
    return <div></div>;
  }

  return (
    <div className="imgGal">
      {dogImageLinks.map((url, index) => (
        <img
          key={index}
          src={url}
          alt={`Dog Image ${index + 1}`}
          style={{ width: "300px", height: "300px", margin: "10px" }}
        />
      ))}
    </div>
  );
};

export default ImageGallery;
