import Header from "../../../components/header/header";
import CarouselAuto from "../../../features/carouselAuto/components/carouselAuto";
import Categories from "../../../features/categoriesList/components/categoriesList";
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
