import * as React from 'react';
import image from '../../images/profile.jpeg';
export default function ProfileImage() {
  return (
    <div className="w-32 h-32">
      <img className="w-32 h-32 rounded-full" alt="Profile Image" src={image} />
    </div>
  );
}
