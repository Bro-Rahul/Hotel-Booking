import './footer.scss'
export default function Footer(){
    return(
        <footer>
            <h6>Hotelzz</h6>
            <h1>Contact</h1>

            <div>
                    <ul>
                        <li>123 Road</li>
                        <li><i className='bx bx-paper-plane'></i> codewithgoku</li>
                        <li><i className='bx bx-phone-call' ></i> 111-002-555</li>
                        <li><i className='bx bx-message-dots' ></i>code with Rahul</li>
                    </ul>
                    <ul>
                        <li>Our Story</li>
                        <li>Get in Touch</li>
                        <li>Our Privacy Commitment</li>
                        <li>Terms of service</li>
                        <li>Customer Assistance</li>
                    </ul>
                    <ul>
                        <li>Dining Experience</li>
                        <li>Wellness</li>
                        <li>Fitness</li>
                        <li>Sports</li>
                        <li>Events</li>
                    </ul>
            </div>
        </footer>
    );

}