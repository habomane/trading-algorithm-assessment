import { useRef } from "react";

interface ShowDirectionProps {
  value: number;
}

export const ShowDirection: React.FC<ShowDirectionProps> = ({ value }) => {
  const lastValueRef = useRef(value);

  const diff = value - lastValueRef.current;

  lastValueRef.current = value;

  const directionArrow = () => {
    if (diff > 0) {
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            shapeRendering="geometricPrecision"
            textRendering="geometricPrecision"
            imageRendering="optimizeQuality"
            fillRule="evenodd"
            clipRule="evenodd"
            viewBox="0 0 463.96 512"
          >
            <path
              fill-rule="nonzero"
              d="M332.67 512V268.5h92.3c15.48-.68 26.47-5.77 32.82-15.42 17.21-25.8-5.25-52.31-22.6-69.25L261.61 14.33c-17.29-19.11-41.93-19.11-59.22 0L24.42 188.72C8.03 204.78-9.67 229.27 6.21 253.08c6.35 9.65 17.34 14.74 32.81 15.42h92.31V512h201.34z"
            />
          </svg>
        );
    }
       else {
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            shapeRendering="geometricPrecision"
            textRendering="geometricPrecision"
            imageRendering="optimizeQuality"
            fillRule="evenodd"
            clipRule="evenodd"
            viewBox="0 0 464 512.05"
          >
            <path
              fillRule="nonzero"
              d="M332.7 0v243.52h92.31c15.47.69 26.46 5.78 32.82 15.43 17.21 25.8-5.25 52.31-22.6 69.25l-173.6 169.52c-17.29 19.1-41.93 19.1-59.22 0L24.42 323.32C8.03 307.26-9.67 282.76 6.21 258.95c6.35-9.65 17.34-14.74 32.82-15.43h92.31V0H332.7z"
            />
          </svg>
        );
      }
    };

    return directionArrow();

};