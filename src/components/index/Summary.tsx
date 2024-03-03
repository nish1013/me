import React from 'react';

// TODO: move text to resources.
const text = 'Dynamic and collaborative Software Engineer specializing in TypeScript, JavaScript, Node.js, and React.js. Proven track record in developing innovative products for renowned organizations like IBM, Visa, M&S, Virgin, and Telefonica. Strong expertise in full-stack development, microservices architecture, and modernizing predictive analytics processes. Skilled in UI development using React.js and proficient in JavaScript frameworks and libraries. Committed to delivering high-quality solutions while mentoring junior developers.';

export default function Summary() {

  return (
    <div className="font-sans text-justify my-5">
      {text}
    </div>
  );
}
