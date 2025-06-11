import React, { Component } from 'react';

export default class About extends Component {
  render() {
    return (
      <div style={{ padding: '60px 20px', backgroundColor: '#f8f9fa', fontFamily: 'Arial, sans-serif' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: '40px', marginBottom: '20px', color: '#00bfa5' }}>About BikeBuddy</h1>
          <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#555', marginBottom: '30px' }}>
            BikeBuddy is a smart bikepooling platform built for college campuses. We aim to solve the everyday transportation challenges students face by connecting riders with those who need a lift, reducing travel costs, saving time, and promoting sustainable mobility.
          </p>

          <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#555', marginBottom: '30px' }}>
            Our mission is to reduce carbon emissions, decongest campus traffic, and create a close-knit community that values shared responsibility. With features like real-time ride matching, GPS tracking, and carbon footprint monitoring, BikeBuddy is not just a transport app—it's a movement toward a greener, more connected future.
          </p>

          <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#555', marginBottom: '30px' }}>
            Whether you're a bike owner looking to share your ride or a student seeking a quick and cost-effective way to get around, BikeBuddy makes campus commuting easy, safe, and eco-friendly.
          </p>

          <div style={{ marginTop: '40px' }}>
            <h2 style={{ fontSize: '28px', color: '#333', marginBottom: '10px' }}>Why Choose BikeBuddy?</h2>
            <ul style={{ listStyle: 'none',color: '#333', padding: 0, maxWidth: '700px', margin: '0 auto', textAlign: 'left' }}>
              <li style={{ marginBottom: '12px', fontSize: '16px' }}>✅ Save time by matching rides instantly within the campus</li>
              <li style={{ marginBottom: '12px', fontSize: '16px' }}>✅ Cut down fuel costs and share expenses fairly</li>
              <li style={{ marginBottom: '12px', fontSize: '16px' }}>✅ Help reduce carbon emissions and traffic congestion</li>
              <li style={{ marginBottom: '12px', fontSize: '16px' }}>✅ Stay safe with real-time tracking and SOS features</li>
              <li style={{ marginBottom: '12px', fontSize: '16px' }}>✅ Join a responsible and eco-conscious student community</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
