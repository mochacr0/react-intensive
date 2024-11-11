import Sliders from "../../components/Banner";
import Categories from "../../components/Categories";
import ProductCatalog from "../../components/ProductCatalog";

const HomePage = () => {
    document.title = "Shop | Home";

    return (
        <>
            <Sliders />
            <Categories />
            <ProductCatalog />
        </>
    );
};

export default HomePage;
