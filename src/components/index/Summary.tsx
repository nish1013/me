import React from 'react';
import { useTrail, animated, config } from 'react-spring';

// TODO: move text to resources.
const text = 'Dynamic and collaborative Software Engineer specializing in TypeScript, JavaScript, Node.js, and React.js. Proven track record in developing innovative products for renowned organizations like IBM, Visa, M&S, Virgin, and Telefonica. Strong expertise in full-stack development, microservices architecture, and modernizing predictive analytics processes. Skilled in UI development using React.js and proficient in JavaScript frameworks and libraries. Committed to delivering high-quality solutions while mentoring junior developers.';
const words = text.split(' ');

export default function Summary() {
  const trail = useTrail(words.length, {
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: config.slow,
  });

  return (
    <div className="font-sans text-justify my-5">
      {trail.map((animationStyles, index) => (
        <animated.span key={index} style={animationStyles}>
          {words[index]}{' '}
        </animated.span>
      ))}
    </div>
  );
}
