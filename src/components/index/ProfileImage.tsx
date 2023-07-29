import * as React from "react"
import image from "../../images/profile.jpeg"
export default function ProfileImage() {
  return (
    <div className="w-64 h-64">
      <img
        className="w-64 h-64 rounded-full"
        alt="Profile Image"
        src={image}
      />
    </div>
  );
}