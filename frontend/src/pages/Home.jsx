import Hero from '../components/Hero';
import Biography from '../components/Biography';
import Departments from '../components/Departments';
import MessageForm from "../components/MessageForm";
import Navbar from '../components/Navbar';

const Home = () => {
    return (
        <>
            <Navbar />
            {/* componnts create krne h 1.hero component  2.Biography  3.Departments  4. Message form */}
            <Hero title={"Welcome to HealthSphere Hospital | your trusted Healthcare Provider"} imageUrl={"/hero.png"} />
            <Biography imageUrl={"/about.png"} />
            <Departments />
            <MessageForm />
        </>
    );
};

export default Home