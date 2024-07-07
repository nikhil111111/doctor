const Biography = ({ imageUrl }) => {
    return (
        <>
            <div className="container biography">
                <div className="banner">
                    <img src={imageUrl} alt="whoweare" />
                </div>
                <div className="banner">
                    <p>Biography</p>
                    <h3>Who We Are</h3>
                    <p>
                        Garg Medical Institute is a premier healthcare facility committed to providing exceptional medical services with a personal touch. Our highly trained team utilizes the latest advancements in medical technology to deliver individualized care, ensuring every patient receives the best possible treatment. From routine check-ups to specialized procedures, we are dedicated to supporting your health and well-being at every stage. At Garg Medical Institute, your health is our priority, and we strive to create a comforting and supportive environment for all our patients.
                    </p>
                    <p>We are all in 2024!</p>
                    <p>We are working on latest Technologies.</p>
                    <p>
                        At Garg Medical Institute, we are working on the forefront of medical innovation to provide exceptional healthcare services with a personal touch. Our highly trained team leverages the latest advancements in medical technology to deliver individualized care. From routine check-ups to specialized procedures, we are dedicated to supporting your health and well-being at every stage. Your health is our priority.
                    </p>
                    <p>caring is good thing!</p>
                </div>
            </div>
        </>
    );
};

export default Biography;