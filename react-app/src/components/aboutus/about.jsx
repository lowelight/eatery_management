import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowBackIos } from "@mui/icons-material";

import YueNiu from "../../assets/YueNiu.jpg";
import Zhourui from "../../assets/zhourui.jpg";
import Lichen from "../../assets/lichen.jpg";
import Haoxian from "../../assets/Haoxian.jpg";
import Yimin from "../../assets/Yimin.jpg";


export default function AboutUS () {

    return (
        <div className="flex flex-col items-center space-y-10 bg-[#fef2f2] text-black min-h-screen">
            <div className=" w-full h-[50px]  py-2 flex">
                <Link to={-1}>
                    <ArrowBackIos className="text-black font-thin ml-2 w-fit mt-1" />
                </Link>
                {/* Title */}
                <h1 className="ml-auto text-center w-30 mx-auto text-3xl font-bold">About Us</h1>
            </div>
            
            {/* Team Introduction */}
            <div className="w-1/2 text-center">
                <p>
                    Our team consists of five passionate graduate students from the IT 8543 
                    program at the University of New South Wales (UNSW). Our team is 
                    dedicated to presenting you a unique and appealing catering 
                    webpage that allows your business to thrive in the digital world. 
                    Our platform serves as a conduit between eateries and potential customers, 
                    enabling restaurants to attract a wider audience. Simultaneously, 
                    it provides customers with a convenient way to search for restaurants 
                    that meet their unique preferences, and offers easy access to a variety 
                    of discount vouchers.
                </p>
            </div>

            {/* Team Members */}
            <div className="flex justify-between w-full py-20 items-start flex-grow">
                {/* Member 1 */}
                <div className="flex flex-col items-center w-1/5 border-r border-gray-300">
                    <img src={Zhourui} alt="Member 1" className="w-32 h-32 rounded-full" />
                    <h2 className="text-xl font-bold">Zhourui Shi</h2>
                    <p>  
                        As a member of the Eathub production team, 
                        I focus on UI design and optimization and front-end 
                        function realization.  Through passion and creativity, 
                        I strive to ensure a great user experience.            
                        We are well aware of user needs, so every decision is made to focus 
                        on providing an intuitive and highly interactive interface. 
                        Thank you for choosing us and look forward to creating an impressive 
                        dining experience for you!
                    </p>
                </div>

                {/* Member 2 */}
                <div className="flex flex-col items-center w-1/5 border-r border-gray-300">
                    <img src={YueNiu} alt="Member 2" className="w-32 h-32 rounded-full" />
                    <h2 className="text-xl font-bold">Yue Niu</h2>
                    <p>
                        As the Scrum Master of our team, my primary responsibility lies 
                        in full-stack development for the Eatery Management System project. 
                        I streamline the project framework and development process, fostering 
                        an environment where our team can work efficiently and harmoniously. 
                        I also coordinate all aspects of our team's work, ensuring that the 
                        project's progress is always on track and meets our high standards.
                    </p>
                </div>

                {/* Member 3 */}
                <div className="flex flex-col items-center w-1/5 border-r border-gray-300">
                    <img src={Lichen} alt="Member 3" className="w-32 h-32 rounded-full" />
                    <h2 className="text-xl font-bold">Lichen Zhang</h2>
                    <p>
                        As a pivotal part of the EatHub development team, my primary focus 
                        is in constructing the frontend architecture and actualizing its development. 
                        This role involves the communication with our backend and 
                        UI design colleagues to ensure seamless integration. I am also accountable 
                        for implementing web functionalities and ensuring that our web pages render 
                        impeccably, creating an enjoyable user experience.
                    </p>
                </div>

                {/* Member 4 */}
                <div className="flex flex-col items-center w-1/5 border-r border-gray-300">
                    <img src={Haoxian} alt="Member 4" className="w-32 h-32 rounded-full" />
                    <h2 className="text-xl font-bold">Haoxian Zhang</h2>
                    <p>
                        As an integral member of our EatHub development team, my main responsibility 
                        centers around designing robust backend APIs and database that enable a smooth flow of data. 
                        I work closely with our frontend team, providing the necessary infrastructure 
                        they need to realize the functionality of our web pages. This joint effort 
                        ensures that our website operates seamlessly, creating an enhanced user experience.
                    </p>
                </div>

                {/* Member 5 */}
                <div className="flex flex-col items-center w-1/5">
                    <img src={Yimin} alt="Member 5" className="w-32 h-32 rounded-full" />
                    <h2 className="text-xl font-bold">Yimin Liu</h2>
                    <p>
                        As a critical contributor to our EatHub development team, my chief 
                        duty revolves around the design and implementation of the backend 
                        APIs. These APIs form the backbone of our system, enabling data flow 
                        and integration between different parts of our application. This 
                        responsibility requires a blend of technical knowledge and creativity.
                    </p>
                </div>
            </div>
        </div>


    );
}