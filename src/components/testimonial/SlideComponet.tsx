import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useEffect, useState } from "react";
import { RiDoubleQuotesR } from "react-icons/ri";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const testimonials = [
    {
      name: "David Parker",
      title: "Chief Executive",
      quote: "Our collaboration has been seamless, and the results speak for themselves. The dedication and expertise displayed have been remarkable."
    },
    {
      name: "Sophie Johnson",
      title: "Marketing Director",
      quote: "Working with this team has been an absolute pleasure. Their attention to detail and commitment to quality have made all the difference."
    },
    {
      name: "Mark Thompson",
      title: "Lead Developer",
      quote: "The technical expertise and innovative solutions they've brought to the table have truly impressed us. Our projects have never run more smoothly."
    },
    {
      name: "Rachel Adams",
      title: "Product Manager",
      quote: "The support and insights provided have been invaluable. They consistently deliver on time and beyond expectations."
    }
  ];
  

const SliderComponent = () => {
  const [sliderRef, sliderInstance] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 1,
      spacing: 0, 
    },
    mode: "snap",
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (sliderInstance.current) {
      sliderInstance.current.on("slideChanged", (s) => {
        setCurrentSlide(s.track.details.rel);
      });
    }
  }, [sliderInstance]);

  // Autoplay Effect
  useEffect(() => {
    if (!sliderInstance.current) return;
    const interval = setInterval(() => {
      sliderInstance.current?.next();
    }, 4000);
    return () => clearInterval(interval);
  }, [sliderInstance]);

  return (
    <div className="relative w-full mx-auto pb-10">
      {/* Slider */}
      <div ref={sliderRef} className="keen-slider">
        {testimonials.map(
          (item, index) => (
            <div
              key={index}
              className={`keen-slider__slide flex items-center justify-center   text-lg font-bold`}
            > 
            <div className="flex flex-col justify-center items-center gap-4">
            <div>
            <RiDoubleQuotesR size={55} className="text-red-400" />
            </div>
            <div className="px-28 space-y-2">
             <span className="block text-xl font-normal " >{item.quote}</span>
             <span className="block text-lg font-semibold ">{item.name}</span>
             <span className="text-sm">{item.title}</span>
            </div>
            </div>
            </div>
          )
        )}
      </div>

      {/* Left and Right Navigation Buttons */}
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
        <button
          className="bg-red-400 text-white py-2 px-4 "
          onClick={() => sliderInstance.current?.prev()}
        >
          <FaAngleLeft size={22} />
        </button>
      </div>
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
        <button
          className="bg-red-400 text-white py-2 px-4"
          onClick={() => sliderInstance.current?.next()}
        >
          <FaAngleRight size={22} />
        </button>
      </div>
    </div>
  );
};

export default SliderComponent;
