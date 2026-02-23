import {
  Box,
  IconButton,
  useBreakpointValue,
  Container,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import Slider from "react-slick";

const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

interface CarouselProps {
  images: string[];
}

const Carousel: FC<CarouselProps> = ({ images }) => {
  const [slider, setSlider] = useState<Slider | null>(null);

  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "40px" });

  return (
    <Box
      position={"relative"}
      // height={"600px"}
      height={"100%"}
      width={"full"}
      overflow={"hidden"}
    >
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      {images.length > 1 ? (
        <>
          <IconButton
            aria-label="left-arrow"
            variant="ghost"
            position="absolute"
            left={side}
            top={top}
            transform={"translate(0%, -50%)"}
            zIndex={2}
            onClick={() => slider?.slickPrev()}
          >
            <BiLeftArrowAlt size="40px" />
          </IconButton>
          <IconButton
            aria-label="right-arrow"
            variant="ghost"
            position="absolute"
            right={side}
            top={top}
            transform={"translate(0%, -50%)"}
            zIndex={2}
            onClick={() => slider?.slickNext()}
          >
            <BiRightArrowAlt size="40px" />
          </IconButton>
        </>
      ) : null}

      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {images?.map((card: string, index: number) => (
          <Box
            key={index}
            // height={"6xl"}
            h={"200px"}
            position="relative"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            backgroundImage={`url(${card})`}
          >
            <Container
              size="container.lg"
              height="600px"
              position="relative"
            ></Container>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default Carousel;
