import Hero from '../components/Hero'
import Biography from '../components/Biography'

const AboutUs = () => {
    return (
        <>
            <Hero
                title={"Learn More About Us | Garg Medical Institute"}
                imageUrl={"/about.png"}
            />
            <Biography imageUrl={"/whoweare.png"} />
        </>
    );
};

export default AboutUs;