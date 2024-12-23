import React from 'react'
import { Carousel, CarouselItem } from 'react-bootstrap'

const CarouselComponent = () => {


    const ImageURLArray = ["./slider-1.jpg" , "./slider-2.jpg", "./slider-3.jpg"];


  return (
        <>
        
        <div id="slider" class="carousel slide w-100" data-bs-ride="carousel">
            <ol class="carousel-indicators">
              <li
                data-bs-target="#slider"
                data-bs-slide-to="0"
                class="active"
              ></li>
              <li data-bs-target="#slider" data-bs-slide-to="1"></li>
              <li data-bs-target="#slider" data-bs-slide-to="2"></li>
            </ol>
            <div class="carousel-inner" role="listbox">
              <Carousel>
                {
                   ImageURLArray.map((eachimgurl) =>      
                    <CarouselItem>
                             <img src={eachimgurl} class="slider-img" />
                    </CarouselItem>
                
                    )
                }
              </Carousel>
            </div>
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#slider"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#slider"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>
        </div>
        
        </>
  )
}

export default CarouselComponent