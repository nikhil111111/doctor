const Hero = ({ title, imageUrl }) => {
    return (
        <>
            <div className="hero container">
                <div className="banner">
                    <h1>{title}</h1>
                    <p>
                        Welcome to Garg Medical Institute, where we blend advanced healthcare with compassionate service.
                        Our state-of-the-art facility offers personalized care tailored to your needs.
                        With a dedicated team of skilled professionals, we prioritize your well-being and aim for optimal health and wellness.
                        From diagnostics to treatment, we use cutting-edge technology to provide comprehensive healthcare services.
                        Visit us to experience compassionate care and clinical excellence at Garg Medical Institute.
                    </p>
                </div>
                <div className="banner">
                    <img src={imageUrl} alt="hero" className="animated-image" />
                    <span>
                        <img src="/Vector.png" alt="vector" />
                    </span>
                </div>
            </div>
        </>
    );
};

export default Hero;