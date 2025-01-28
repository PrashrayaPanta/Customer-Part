import React from "react";
import { Carousel, CarouselItem } from "react-bootstrap";
import ImageComponent from "./ImageComponent";

const CarouselComponent = () => {
  const ImageURLArray = ["./slider-1.jpg", "./slider-2.jpg", "./slider-3.jpg"];

  const ContentToStackForImage = [
    {
      stackContent: ["We are Good", "Good is alwyas"],
      ImageUrl: ["./slider-1.jpg"],
    },

    {
      stackContent: ["We are bad", "Bad is always bad"],
      ImageUrl: ["./slider-2.jpg"],
    },

    {
      stackContent: ["We are bad", "Bad is always bad"],
      ImageUrl: ["./slider-3.jpg"],
    },
  ];

  return (
    <>
      <div id="slider" className="carousel slide w-100" data-bs-ride="carousel">
        <ol className="carousel-indicators">
          <li
            data-bs-target="#slider"
            data-bs-slide-to="0"
            className="active bg-primary"
          >
            Hello
          </li>
          <li data-bs-target="#slider" data-bs-slide-to="1"></li>
          <li data-bs-target="#slider" data-bs-slide-to="2"></li>
        </ol>
        <div className="carousel-inner" role="listbox">
          <Carousel>
            {ImageURLArray.map((eachimgurl, index) => (
              <CarouselItem key={index}>
                <div className="image-stacked-content">
                  <div>
                    <ImageComponent url={eachimgurl} />
                  </div>
                  {/* <div className="stacked-content">
                      <h1>We are good </h1>
                      <h1>IKJDSAKFLSAKDJGFLAKDGKL</h1>
                  </div> */}
                </div>
              </CarouselItem>
            ))}
          </Carousel>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#slider"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#slider"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
};

export default CarouselComponent;
