import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useEffect, useState } from "react";
import { KeenSliderInstance } from "keen-slider";
import Card from "../card/Card";

import { TProduct } from "../../types";
import { useGetAllProductQuery } from "../../redux/features/product/productApi";

const SliderComponent = () => {
  const { data } = useGetAllProductQuery([{ name: "limit", value: 40 }]);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 4,
      spacing: 0,
    },
    mode: "free",
    dragSpeed: 0.8,
    breakpoints: {
      "(min-width: 640px)": {
        slides: { perView: 2, spacing: 0 },
      },
      "(max-width: 639px)": {
        slides: { perView: 1, spacing: 0 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 4, spacing: 0 },
      },
    },
  });

  const [slider, setSlider] = useState<KeenSliderInstance | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (instanceRef.current) {
      setSlider(instanceRef.current);
      instanceRef.current.on("slideChanged", (s) => {
        setCurrentSlide(s.track.details?.rel ?? 0);
      });
    }
  }, [instanceRef.current]); // ✅ Ensure correct dependency to avoid stale state

  // Autoplay Effect
  useEffect(() => {
    if (!slider) return;
    const interval = setInterval(() => {
      if (slider.track.details) {
        slider.moveToIdx((slider.track.details.rel + 1) % slider.track.details.slides.length, true);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [slider]);

  return (
    <div className="relative bg-white pb-10">
      {/* Slider */}
      <div ref={sliderRef} className="keen-slider">
        {data?.data?.result?.map((item: TProduct) => (
          <div key={item.id} className="keen-slider__slide p-5 min-w-80">
            <Card
              rating={Number(item.rating)}
              newprice={item.newprice}
              oldprice={Number(item.price)}
              name={item.name}
              img={item.img}
              id={item.id}
            />
          </div>
        ))}
      </div>

      {/* Dots Pagination */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
        {[...Array(data?.data?.result?.length || 6)].map((_, i) => (
          <button
            key={i}
            onClick={() => slider?.moveToIdx(i)}
            className={`h-2 w-2 rounded-full transition-all ${
              currentSlide === i ? "bg-red-500 w-4" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default SliderComponent;
