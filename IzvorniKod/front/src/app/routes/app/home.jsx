import Header from "../../../components/header/header";
import CarouselAuto from "../../../components/carousel/carouselAuto";
import Categories from "../../../components/categories/categories";
import Items from "../../../components/items/items";
import Footer from "../../../components/footer/footer";

function Home() {
	return <>
		<Header></Header>	
		<CarouselAuto/>
		<Categories/>
		<Items/>
		<Footer/>
	</>;
}

export default Home;
