import Hero from '../components/Hero';
import AppointmentForm from "../components/AppointmentForm";

const Appointment = () => {
    return (
        <>
            <Hero
                title={"Schedule Your Appointment | Garg Medical Institute"}
                imageUrl={"/signin.png"}
            />
            <AppointmentForm />
        </>
    );
};

export default Appointment;