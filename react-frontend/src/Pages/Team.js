import React, { Component } from 'react';

export default class Team extends Component {
  render() {
    return (
      <div className="team-section" style={{ padding: '60px 20px', backgroundColor: '#f9f9f9' }}>
        <div className="container text-center">
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '20px' }}>Meet the BikeBuddy Team</h2>
          <p style={{ fontSize: '16px', color: '#555', maxWidth: '800px', margin: '0 auto 40px' }}>
            We are a passionate group of engineers and visionaries working to make campus travel smarter, safer, and greener. Our goal is to connect students and reduce carbon footprints through innovative bikepooling technology.
          </p>

          <div className="row justify-content-center" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '30px' }}>
            {[{
              name: 'Vishal Sahni',
              role: 'DataBase Handling',
              img: '/images/Vishal2.jpeg'
            }, {
              name: 'Aditya Singh',
              role: 'Frontend Lead',
              img: '/images/Aditya.jpeg'
            }, {
              name: 'Lakshita Mittal',
              role: 'UI/UX Designer',
              img: '/images/Lakshita.jpeg'
            }, {
              name: 'Piyush Tiwari',
              role: 'Backend Developer',
              img: '/images/Piyush.jpeg'
            }].map((member, index) => (
              <div key={index} style={{ width: '220px', textAlign: 'center' }}>
                <img
                  src={member.img}
                  alt={member.name}
                  style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '12px', marginBottom: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <h5 style={{ fontSize: '18px', marginBottom: '6px' }}>{member.name}</h5>
                <p style={{ fontSize: '14px', color: '#777' }}>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}