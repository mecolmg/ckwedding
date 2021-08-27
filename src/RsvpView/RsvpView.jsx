import React from 'react';
import Footer from 'Footer/Footer';
import Navigation from 'Navigation/Navigation';
import RsvpForm from 'RsvpForm/RsvpForm';

export default function RsvpView() {
  return (
    <div>
      <Navigation />
      <RsvpForm />
      <Footer />
    </div>
  );
}
