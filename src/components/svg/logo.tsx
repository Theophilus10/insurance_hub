import React from "react";

interface LogoProps {
  width?: string | number;
  height?: string | number;
}

const Logo: React.FC<LogoProps> = ({ width, height }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      data-v-423bf9ae=""
      viewBox="0 0 908.5398618132497 982"
      className="iconAbove"
      width={width}
      height={height}
    >
      {/* <g
        data-v-423bf9ae=""
        id="ed214fe5-38a5-4365-b27c-71a98dbec6c4"
        fill="#000000"
        transform="matrix(5.7526364568010235,0,0,5.7526364568010235,196.95448308980264,921.5399513244629)"
      >
        <path d="M3.75 10.26L3.75 9.80L2.74 9.28L2.74 2.84L3.75 2.32L3.75 1.86L0.35 1.86L0.35 2.32L1.36 2.84L1.36 9.28L0.35 9.80L0.35 10.26ZM11.75 10.26L11.75 9.80L10.72 9.28L10.72 6.02C10.72 4.47 9.66 3.57 7.92 3.57C7.07 3.57 6.03 3.74 5.18 3.99L4.96 4.05L5.26 5.08L5.26 10.26L6.58 10.26L6.58 4.89C7 4.77 7.48 4.70 7.92 4.70C8.90 4.70 9.41 5.15 9.41 6.02L9.41 10.26ZM17.63 8.34C17.63 7.03 16.70 6.34 15.08 6.34C14.24 6.34 13.90 6.01 13.90 5.52C13.90 5.12 14.22 4.70 15.34 4.70C15.74 4.70 16.16 4.76 16.56 4.83L17.05 5.80L17.51 5.80L17.51 3.92C16.83 3.71 16.11 3.57 15.34 3.57C13.43 3.57 12.56 4.56 12.56 5.60C12.56 6.90 13.50 7.60 15.08 7.60C15.95 7.60 16.28 7.92 16.28 8.43C16.28 8.86 15.95 9.28 14.80 9.28C14.11 9.28 13.36 9.16 12.59 8.92L12.59 10.07C13.33 10.29 14.03 10.43 14.80 10.43C16.74 10.43 17.63 9.42 17.63 8.34ZM25.82 10.26L25.82 9.14C25.62 9.21 25.40 9.28 25.16 9.28C24.84 9.28 24.70 9.13 24.70 8.81L24.70 3.72L23.38 3.72L23.38 9.02C22.96 9.18 22.54 9.28 22.04 9.28C21.06 9.28 20.55 8.83 20.55 7.98L20.55 3.72L19.24 3.72L19.24 7.98C19.24 9.52 20.30 10.43 22.04 10.43C22.67 10.43 23.24 10.28 23.76 10.04C24.01 10.29 24.40 10.43 24.82 10.43C25.17 10.43 25.55 10.35 25.82 10.26ZM31.64 5.80L31.64 3.86C31.11 3.70 30.39 3.57 29.86 3.57C29.01 3.57 27.97 3.74 27.12 3.99L26.89 4.05L27.20 5.08L27.20 10.26L28.52 10.26L28.52 4.89C28.94 4.77 29.41 4.70 29.86 4.70C30.10 4.70 30.38 4.73 30.66 4.79L31.18 5.80ZM39.17 10.26L39.17 9.14C38.98 9.21 38.75 9.28 38.51 9.28C38.19 9.28 38.05 9.13 38.05 8.81L38.05 6.02C38.05 4.44 36.93 3.57 35.13 3.57C34.54 3.57 33.81 3.70 33.15 3.88L33.15 5.80L33.60 5.80L34.12 4.82C34.47 4.75 34.83 4.70 35.13 4.70C36.20 4.70 36.74 5.17 36.74 6.02L36.74 6.40L34.97 6.40C33.33 6.40 32.48 7.24 32.48 8.34C32.48 9.53 33.45 10.43 35.20 10.43C35.87 10.43 36.53 10.25 37.06 9.98C37.30 10.26 37.72 10.43 38.18 10.43C38.53 10.43 38.91 10.35 39.17 10.26ZM36.74 9.02C36.27 9.24 35.73 9.38 35.20 9.38C34.27 9.38 33.81 8.99 33.81 8.34C33.81 7.78 34.16 7.43 34.97 7.43L36.74 7.43ZM47.04 10.26L47.04 9.80L46.02 9.28L46.02 6.02C46.02 4.47 44.95 3.57 43.22 3.57C42.36 3.57 41.33 3.74 40.47 3.99L40.25 4.05L40.56 5.08L40.56 10.26L41.87 10.26L41.87 4.89C42.29 4.77 42.77 4.70 43.22 4.70C44.20 4.70 44.70 5.15 44.70 6.02L44.70 10.26ZM53.03 10.12L53.03 8.99C52.46 9.17 51.83 9.28 51.27 9.28C49.94 9.28 49.18 8.54 49.18 7C49.18 5.45 49.94 4.70 51.27 4.70C51.51 4.70 51.77 4.73 52.05 4.79L52.58 5.80L53.03 5.80L53.03 3.86C52.51 3.70 51.80 3.57 51.27 3.57C49.08 3.57 47.81 4.84 47.81 7C47.81 9.14 49.08 10.43 51.27 10.43C51.80 10.43 52.51 10.29 53.03 10.12ZM57.32 3.57C55.44 3.57 54.21 4.86 54.21 7C54.21 9.21 55.59 10.43 57.85 10.43C58.46 10.43 59.25 10.29 59.81 10.08L59.81 8.95C59.23 9.14 58.49 9.28 57.85 9.28C56.57 9.28 55.69 8.74 55.58 7.43L60.33 7.43C60.34 7.29 60.34 7.15 60.34 7C60.34 4.86 59.21 3.57 57.32 3.57ZM59.04 6.36L55.59 6.36C55.72 5.25 56.38 4.65 57.32 4.65C58.21 4.65 58.90 5.22 59.04 6.36ZM73.15 10.26L73.15 1.86L70.81 1.86L70.81 2.32L71.82 2.84L71.82 5.36L67.63 5.36L67.63 1.86L66.32 1.86L66.32 10.26L67.63 10.26L67.63 6.69L71.82 6.69L71.82 10.26ZM81.93 10.26L81.93 9.14C81.73 9.21 81.51 9.28 81.27 9.28C80.95 9.28 80.81 9.13 80.81 8.81L80.81 3.72L79.49 3.72L79.49 9.02C79.07 9.18 78.65 9.28 78.15 9.28C77.17 9.28 76.66 8.83 76.66 7.98L76.66 3.72L75.35 3.72L75.35 7.98C75.35 9.52 76.41 10.43 78.15 10.43C78.78 10.43 79.35 10.28 79.87 10.04C80.12 10.29 80.51 10.43 80.93 10.43C81.28 10.43 81.66 10.35 81.93 10.26ZM89.11 7C89.11 4.87 87.88 3.57 85.93 3.57C85.51 3.57 84.98 3.65 84.59 3.78L84.59 0L83.27 0L83.27 10.02C84.07 10.23 85.13 10.43 85.93 10.43C87.88 10.43 89.11 9.11 89.11 7ZM87.72 7C87.72 8.50 87.04 9.28 85.93 9.28C85.47 9.28 85.01 9.21 84.59 9.10L84.59 4.89C85.01 4.77 85.47 4.70 85.93 4.70C87.04 4.70 87.72 5.50 87.72 7Z" />
      </g> */}
      <defs data-v-423bf9ae="">
        <linearGradient
          data-v-423bf9ae=""
          gradientTransform="rotate(25)"
          id="3aad4d9f-bc91-465e-87a4-fc74aadd3914"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop
            offset="0%"
            style={{ stopColor: "rgb(0, 102, 120)", stopOpacity: 1 }}
          />
          <stop
            offset="100%"
            style={{ stopColor: "rgb(79, 168, 255)", stopOpacity: 1 }}
          />
        </linearGradient>
      </defs>
      <g
        data-v-423bf9ae=""
        id="56adb416-603e-4950-8d5c-f1fc51c48567"
        transform="matrix(3.1772454155815972,0,0,3.1772454155815972,-21.780536358263475,-21.562888222348477)"
        stroke="none"
        fill="url(#3aad4d9f-bc91-465e-87a4-fc74aadd3914)"
      >
        <path d="M273.5 150c.1-.1-91.1-91.8-91.1-91.8-2.2-2.2-1.5-5.8 1.2-7.1 18.1-8.9 40.4-6.3 55.7 8.3 10.1 9.7 15.2 22.8 15.1 35.7 0 2.4 1 4.7 2.7 6.4l23.8 23.8c2.3 2.3 6.3 1.4 7.3-1.6 10.7-30.8 3.8-66.4-20.8-91-32-32-82.9-34-117.3-6.1-.1-.1-91.8 91.1-91.8 91.1-2.2 2.2-5.8 1.5-7.1-1.2-8.9-18.1-6.3-40.4 8.3-55.7 9.7-10.1 22.8-15.2 35.7-15.1 2.4 0 4.7-1 6.4-2.7l23.8-23.8c2.3-2.3 1.4-6.3-1.6-7.3C93 1.2 57.4 8.1 32.8 32.7c-32 32-34 82.9-6.1 117.3-.1.1 91.1 91.8 91.1 91.8 2.2 2.2 1.5 5.8-1.2 7.1-18.1 8.9-40.4 6.3-55.7-8.3-10.1-9.7-15.2-22.8-15.1-35.7 0-2.4-1-4.7-2.7-6.4l-23.8-23.8c-2.3-2.3-6.3-1.4-7.3 1.6-10.7 30.8-3.8 66.4 20.8 91 32 32 82.9 34 117.3 6.1.1.1 91.8-91.1 91.8-91.1 2.2-2.2 5.8-1.5 7.1 1.2 8.9 18.1 6.3 40.4-8.3 55.7-9.7 10.1-22.8 15.2-35.7 15.1-2.4 0-4.7 1-6.4 2.7l-23.8 23.8c-2.3 2.3-1.4 6.3 1.6 7.3 30.8 10.7 66.4 3.8 91-20.8 32-32 34-82.9 6.1-117.3zm-41.3 17.4c-13.4-4.5-29-1.4-39.7 9.3l-56.4 56.4c-1.2 1.2-3.3 0-2.8-1.7 4-13.3.8-28.2-9.6-38.7 0 0-40.9-40.9-57.5-57.6-1.2-1.2.1-3.3 1.7-2.8 13.4 4.5 29 1.4 39.7-9.3 0 0 40.4-40.4 57.9-57.8 1.2-1.2 3.4.1 2.8 1.7-5 13.7-2 29.6 9.1 40.7 0 0 40.2 40.2 56.7 56.8 1.1 1.5-.2 3.6-1.9 3z" />
      </g>
    </svg>
  );
};

export default Logo;
