import React from 'react';
import styles from '../../styles/AboutUs.module.css';
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai"
import { CgProfile } from "react-icons/cg"

const teamMembers = [
  {
    name: 'Alal Uddin',
    expert: 'Full Stack Developer',
    image: 'https://avatars.githubusercontent.com/u/103570261?s=120&v=4',
    github: "https://github.com/alalUDDIN123",
    linked: "https://www.linkedin.com/in/alal-uddin-066444206/",
    portfolio: "https://alaluddin123.github.io/"
  },
  {
    name: 'Ravi Ranjan Ram',
    expert: 'Full Stack Developer',
    image: 'https://avatars.githubusercontent.com/u/103764080?s=120&v=4',
    github: "https://github.com/Ravi-047",
    linked: "https://www.linkedin.com/in/ravi-ranjan-136844231",
    portfolio: "https://ravi-047.github.io/"
  },
  {
    name: 'Abhijit Biswas',
    expert: 'Full Stack Developer',
    image: 'https://avatars.githubusercontent.com/u/103665864?s=120&v=4',
    github: "https://github.com/abhijitnr",
    linked: "https://www.linkedin.com/in/abhijit-biswas-3b6586162/",
    portfolio: "https://abhijitnr.github.io/"
  },
];

const About = () => {

  return (
    <div className={styles.__about__us__main__container}>
      <h1>About Us</h1>
      <p className={styles.__about__us__desc} >Reliability and dependability are key characteristics of our team members, 
        as we understand the importance of meeting deadlines and fulfilling our commitments.</p>
      <h2>Team Members</h2>
      <div className={styles.__team__members__container}>
        {teamMembers.map((member) => (
          <div key={member.name} className={styles.__team__member}>
            <img src={member.image} alt={member.name} />
            <h3>{member.name}</h3>
            <p>{member.expert}  Expert </p>
            <p>{member.contribution}</p>

            <div>
              <a href={member.github} target='_blank'>
                <AiFillGithub  />
              </a>
              <a href={member.linked} target='_blank' >
                <AiFillLinkedin  />
              </a>

              <a href={member.portfolio} target='_blank' >
                <CgProfile  />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
