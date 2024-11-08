import { Box } from "@mui/material";

type BannerImageProps = {
    imageUrl: string;
};

const BannerImage: React.FC<BannerImageProps> = ({ imageUrl }) => {
    return <Box component="img" src={imageUrl} alt="Banner" className="h-auto w-full object-cover" />;
};

export default BannerImage;
