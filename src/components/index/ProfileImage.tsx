import * as React from 'react';
import image from '../../images/profile.jpeg';

export default function ProfileImage() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-36 h-36 mb-4">
        <img
          className="w-36 h-36 rounded-full shadow-lg ring-2 ring-slate-200"
          alt="Profile Image"
          src={image}
        />
      </div>
      <h1 className="text-2xl font-semibold text-slate-800 tracking-tight">
        Nish
      </h1>
      <p className="text-lg text-slate-600 font-medium mt-1">
        Lead Software Engineer
      </p>
    </div>
  );
}
