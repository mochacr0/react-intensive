import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import BannerImage from "./BannerItem";

const sliders: string[] = [
    "https://cms.cloudinary.vpsvc.com/images/c_scale,dpr_auto,f_auto,q_auto:good,w_1920/legacy_dam/en-us/S001839825/NPIB35138-Holiday-Signage-L2-Banners-flags-Global",
    "https://static-cse.canva.com/blob/1167217/createbanners.jpg",
    "https://cms.cloudinary.vpsvc.com/images/c_scale,dpr_auto,f_auto,q_auto:best,t_productPageHeroGalleryTransformation_v2,w_auto/site-merchandising/9ce6207a-4bde-41ab-afd1-2f6d6964587e/en-au/ANZS1181-PDP-Image-Optimisation-VinylBanner-marquee-006",
];

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 1,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
};

const Banner = () => {
    return (
        <Carousel
            className="max-h-44"
            responsive={responsive}
            itemClass="px-3"
            draggable={false}
            infinite={true}
            rewind={true}
        >
            {sliders.map((imageUrl, index) => (
                <BannerImage key={imageUrl.concat(index.toString())} imageUrl={imageUrl} />
            ))}
        </Carousel>
    );
};

export default Banner;
