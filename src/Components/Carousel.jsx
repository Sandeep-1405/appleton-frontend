import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Carousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
    };

    return (
        <Slider {...settings}>
            <div>
                <img src="https://picsum.photos/300/200?random=1" alt="image" />                
            </div>
            <div>
                <img src="https://picsum.photos/300/200?random=2" alt="image" />
            </div>
            <div>
                <img src="https://picsum.photos/300/200?random=3" alt="image" />
            </div>
            <div>
                <img src="https://picsum.photos/300/200?random=4" alt="image" />
            </div>
            <div>
                <img src="https://picsum.photos/300/200?random=5" alt="image" />
            </div>
        </Slider>
    )
};
export default Carousel;