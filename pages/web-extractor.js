import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateClick = async () => {
    setIsLoading(true);
    setData(null);

    try {
      const response = await fetch('/api/web-extract', 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url_path: url }),
      });

      if (response.ok) {
        const responseData = await response.json();
        setData(responseData.data.tags);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderClickableLinks = (fieldValue) => {
    const urls = fieldValue.match(/https?:\/\/[^\s]+/g);
    if (urls && urls.length > 0) {
      return fieldValue.split(urls[0]).map((text, index) =>
        index === 0 ? (
          text
        ) : (
          <a
            key={index}
            href={urls[0]}
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            {urls[0]}
          </a>
        )
      );
    }
    return fieldValue;
  };

  const organizeDataByFields = () => {
    const organizedData = {};
    data.forEach((tag) => {
      const fieldName = tag.name || 'Unknown';
      if (!organizedData[fieldName]) {
        organizedData[fieldName] = [];
      }
      organizedData[fieldName].push(tag);
    });
    return organizedData;
  };

  return (
    <div className="container">
      <h1 className='title1'>WEB EXTRACTOR</h1>
      <div className="input-container">
        <div className="form-control">
          <input
            className="input input-alt"
            placeholder="Enter URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <span className="input-border input-border-alt"></span>
        </div>
        <button onClick={handleGenerateClick} className="btn">
          <span className="text">GENERATE</span>
        </button>
      </div>

      {isLoading && (
        <div className="loader-container">
          <div aria-label="Orange and tan hamster running in a metal wheel" role="img" className="loader">
            <div className="wheel-and-hamster">
              <div className="wheel"></div>
              <div className="hamster">
                <div className="hamster__body">
                  <div className="hamster__head">
                    <div className="hamster__ear"></div>
                    <div className="hamster__eye"></div>
                    <div className="hamster__nose"></div>
                  </div>
                  <div className="hamster__limb hamster__limb--fr"></div>
                  <div className="hamster__limb hamster__limb--fl"></div>
                  <div className="hamster__limb hamster__limb--br"></div>
                  <div className="hamster__limb hamster__limb--bl"></div>
                  <div className="hamster__tail"></div>
                </div>
              </div>
              <div className="spoke"></div>
            </div>
          </div>
        </div>
      )}

      {data && (
        <div className="data-container">
          {Object.entries(organizeDataByFields()).map(([field, tags], index) => (
            <div className="field-box" key={index}>
              <h2>{field}</h2>
              <div className="data-box">
                <table className="data-table">
                  <tbody>
                    {tags.map((tag, tagIndex) => (
                      <tr key={tagIndex}>
                        <td>
                          <strong>{tag.name}:</strong>
                        </td>
                        <td className="data-value">
                          {renderClickableLinks(tag.value)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`

      .title1
      {
        display:flex;
        align-items: center;
        justify-content:center;
        font-family:monospace;
      }

        body {
          background-color: black;
        }

        .container {
          padding: 20px;
          background-color: #333;
          color: white;
          
        }

        .input-container {
          display: flex;
          align-items: center;
          margin-top: 20px;
          display: grid;
          grid-template-columns: 6fr 1fr; /* This creates a 1fr:1fr layout */
          gap: 20px;
        }

        .input {
         
          color: #fff;
          font-size: 0.9rem;
          background-color: transparent;
          box-sizing: border-box;
          padding-inline: 0.5em;
          padding-block: 0.7em;
          border: none;
          border-bottom: 2px solid var(--border-before-color); /* Changed to 2px */
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          width: 100%;
          
        }

        .input-border {
          position: absolute;
          background: var(--border-after-color);
          width: 0%;
          height: 2px;
          bottom: 0;
          left: 0;
          transition: width 0.3s cubic-bezier(0.6, -0.28, 0.735, 0.045);
        }

        .input:focus {
          outline: none;
        }

        .input:focus + .input-border {
          width: 100%;
        }

        .form-control {
          position: relative;
        }

        .input-alt {
          font-size: 1.2rem;
          padding-inline: 1em;
          padding-block: 0.8em;
          box-shadow: 0 0 8px rgba(0, 0, 0, 0.8);
          
        }

        .input-border-alt {
          height: 3px;
          background: linear-gradient(90deg, #FF6464 0%, #FFBF59 50%, #47C9FF 100%);
          transition: width 0.4s cubic-bezier(0.42, 0, 0.58, 1.00);
        }

        .input-alt:focus + .input-border-alt {
          width: 100%;
        }

        .generate-button {
          padding: 10px 20px;
          background-color: #0f9d58;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
          margin-left: 10px;
        }

        .loader {
          text-align: center;
          margin: 20px 0;
          color: #0f9d58;
        }

        .data-container {
          margin-top: 20px;
        }

        .field-box {
          background-color: #444;
          border: 2px solid white;
          padding: 20px;
          margin-bottom: 20px;
        }

        .field-box h2 {
          margin: 0;
          color: #ffbf59;
          font-family: monospace;
          text-transform: capitalize;
        }

        .data-box {
          background-color: white;
          border: 1px solid #0f9d58;
          margin-top: 10px;
          padding: 10px;
          overflow: auto;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
          font-family: monospace;
        }

        .data-table td {
          border: 1px solid #0f9d58;
          padding: 8px;
          color: black;
        }

        .data-value .link {
          color: #0f9d58;
          text-decoration: underline;
        }

          .btn {
          position: relative;
          display: flex;
          flex:1:3;
          
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 1em 2em;
          font-size: 15px;
          font-weight: bold;
          border-width: 0;
          border-radius: 1.5em;
          text-transform: uppercase;
          transition: 0.2s ease;
          background-color: #0f9d58; /* Add your desired background color */
          cursor: pointer;
        }

        .text {
          font-size: 1.2em;
          color: white;
          z-index: 1;
        }

        .btn::before {
          position: absolute;
          content: '';
          width: 120%;
          height: 260%;
          background-image: linear-gradient(135deg, rgba(0, 5, 255, 1) 0%, rgba(255, 0, 159, 1) 100%);
        }

        .btn::after {
          position: absolute;
          content: '';
          width: 88%;
          height: 80%;
          border-width: 0;
          border-radius: 1.2em;
          background-color: black;
          opacity: 0.7;
          transition: 100ms ease;
        }

        .btn:hover {
          transform: scale(1.1);
        }

        .btn:hover::after {
          opacity: 0.5;
        }

        .btn:hover::before {
          animation: turn_4810 0.4s infinite linear;
        }

        .btn:active {
          transform: scale(1.05);
        }

        .btn:active::before {
          transform: scale(1.05);
          animation: turn_4810 0.2s infinite linear;
        }

        @keyframes turn_4810 {
          0% {
            transform: rotate(0deg);
          }

          100% {
            transform: rotate(360deg);
          }
        }

        .loader-container {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .loader {
          --dur: 1s;
          width: 12em;
          height: 12em;
          font-size: 14px;
        }

        .wheel-and-hamster {
          --dur: 1s;
          position: relative;
          width: 12em;
          height: 12em;
          font-size: 14px;
        }
        
        .wheel,
        .hamster,
        .hamster div,
        .spoke {
          position: absolute;
        }
        
        .wheel,
        .spoke {
          border-radius: 50%;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        
        .wheel {
          background: radial-gradient(100% 100% at center,hsla(0,0%,60%,0) 47.8%,hsl(0,0%,60%) 48%);
          z-index: 2;
        }
        
        .hamster {
          animation: hamster var(--dur) ease-in-out infinite;
          top: 50%;
          left: calc(50% - 3.5em);
          width: 7em;
          height: 3.75em;
          transform: rotate(4deg) translate(-0.8em,1.85em);
          transform-origin: 50% 0;
          z-index: 1;
        }
        
        .hamster__head {
          animation: hamsterHead var(--dur) ease-in-out infinite;
          background: hsl(30,90%,55%);
          border-radius: 70% 30% 0 100% / 40% 25% 25% 60%;
          box-shadow: 0 -0.25em 0 hsl(30,90%,80%) inset,
            0.75em -1.55em 0 hsl(30,90%,90%) inset;
          top: 0;
          left: -2em;
          width: 2.75em;
          height: 2.5em;
          transform-origin: 100% 50%;
        }
        
        .hamster__ear {
          animation: hamsterEar var(--dur) ease-in-out infinite;
          background: hsl(0,90%,85%);
          border-radius: 50%;
          box-shadow: -0.25em 0 hsl(30,90%,55%) inset;
          top: -0.25em;
          right: -0.25em;
          width: 0.75em;
          height: 0.75em;
          transform-origin: 50% 75%;
        }
        
        .hamster__eye {
          animation: hamsterEye var(--dur) linear infinite;
          background-color: hsl(0,0%,0%);
          border-radius: 50%;
          top: 0.375em;
          left: 1.25em;
          width: 0.5em;
          height: 0.5em;
        }
        
        .hamster__nose {
          background: hsl(0,90%,75%);
          border-radius: 35% 65% 85% 15% / 70% 50% 50% 30%;
          top: 0.75em;
          left: 0;
          width: 0.2em;
          height: 0.25em;
        }
        
        .hamster__body {
          animation: hamsterBody var(--dur) ease-in-out infinite;
          background: hsl(30,90%,90%);
          border-radius: 50% 30% 50% 30% / 15% 60% 40% 40%;
          box-shadow: 0.1em 0.75em 0 hsl(30,90%,55%) inset,
            0.15em -0.5em 0 hsl(30,90%,80%) inset;
          top: 0.25em;
          left: 2em;
          width: 4.5em;
          height: 3em;
          transform-origin: 17% 50%;
          transform-style: preserve-3d;
        }
        
        .hamster__limb--fr,
        .hamster__limb--fl {
          clip-path: polygon(0 0,100% 0,70% 80%,60% 100%,0% 100%,40% 80%);
          top: 2em;
          left: 0.5em;
          width: 1em;
          height: 1.5em;
          transform-origin: 50% 0;
        }
        
        .hamster__limb--fr {
          animation: hamsterFRLimb var(--dur) linear infinite;
          background: linear-gradient(hsl(30,90%,80%) 80%,hsl(0,90%,75%) 80%);
          transform: rotate(15deg) translateZ(-1px);
        }
        
        .hamster__limb--fl {
          animation: hamsterFLLimb var(--dur) linear infinite;
          background: linear-gradient(hsl(30,90%,90%) 80%,hsl(0,90%,85%) 80%);
          transform: rotate(15deg);
        }
        
        .hamster__limb--br,
        .hamster__limb--bl {
          border-radius: 0.75em 0.75em 0 0;
          clip-path: polygon(0 0,100% 0,100% 30%,70% 90%,70% 100%,30% 100%,40% 90%,0% 30%);
          top: 1em;
          left: 2.8em;
          width: 1.5em;
          height: 2.5em;
          transform-origin: 50% 30%;
        }
        
        .hamster__limb--br {
          animation: hamsterBRLimb var(--dur) linear infinite;
          background: linear-gradient(hsl(30,90%,80%) 90%,hsl(0,90%,75%) 90%);
          transform: rotate(-25deg) translateZ(-1px);
        }
        
        .hamster__limb--bl {
          animation: hamsterBLLimb var(--dur) linear infinite;
          background: linear-gradient(hsl(30,90%,90%) 90%,hsl(0,90%,85%) 90%);
          transform: rotate(-25deg);
        }
        
        .hamster__tail {
          animation: hamsterTail var(--dur) linear infinite;
          background: hsl(0,90%,85%);
          border-radius: 0.25em 50% 50% 0.25em;
          box-shadow: 0 -0.2em 0 hsl(0,90%,75%) inset;
          top: 1.5em;
          right: -0.5em;
          width: 1em;
          height: 0.5em;
          transform: rotate(30deg) translateZ(-1px);
          transform-origin: 0.25em 0.25em;
        }
        
        .spoke {
          animation: spoke var(--dur) linear infinite;
          background: radial-gradient(100% 100% at center,hsl(0,0%,60%) 4.8%,hsla(0,0%,60%,0) 5%),
            linear-gradient(hsla(0,0%,55%,0) 46.9%,hsl(0,0%,65%) 47% 52.9%,hsla(0,0%,65%,0) 53%) 50% 50% / 99% 99% no-repeat;
        }
        
        /* Animations */
        @keyframes hamster {
          from, to {
            transform: rotate(4deg) translate(-0.8em,1.85em);
          }
        
          50% {
            transform: rotate(0) translate(-0.8em,1.85em);
          }
        }
        
        @keyframes hamsterHead {
          from, 25%, 50%, 75%, to {
            transform: rotate(0);
          }
        
          12.5%, 37.5%, 62.5%, 87.5% {
            transform: rotate(8deg);
          }
        }
        
        @keyframes hamsterEye {
          from, 90%, to {
            transform: scaleY(1);
          }
        
          95% {
            transform: scaleY(0);
          }
        }
        
        @keyframes hamsterEar {
          from, 25%, 50%, 75%, to {
            transform: rotate(0);
          }
        
          12.5%, 37.5%, 62.5%, 87.5% {
            transform: rotate(12deg);
          }
        }
        
        @keyframes hamsterBody {
          from, 25%, 50%, 75%, to {
            transform: rotate(0);
          }
        
          12.5%, 37.5%, 62.5%, 87.5% {
            transform: rotate(-2deg);
          }
        }
        
        @keyframes hamsterFRLimb {
          from, 25%, 50%, 75%, to {
            transform: rotate(50deg) translateZ(-1px);
          }
        
          12.5%, 37.5%, 62.5%, 87.5% {
            transform: rotate(-30deg) translateZ(-1px);
          }
        }
        
        @keyframes hamsterFLLimb {
          from, 25%, 50%, 75%, to {
            transform: rotate(-30deg);
          }
        
          12.5%, 37.5%, 62.5%, 87.5% {
            transform: rotate(50deg);
          }
        }
        
        @keyframes hamsterBRLimb {
          from, 25%, 50%, 75%, to {
            transform: rotate(-60deg) translateZ(-1px);
          }
        
          12.5%, 37.5%, 62.5%, 87.5% {
            transform: rotate(20deg) translateZ(-1px);
          }
        }
        
        @keyframes hamsterBLLimb {
          from, 25%, 50%, 75%, to {
            transform: rotate(20deg);
          }
        
          12.5%, 37.5%, 62.5%, 87.5% {
            transform: rotate(-60deg);
          }
        }
        
        @keyframes hamsterTail {
          from, 25%, 50%, 75%, to {
            transform: rotate(30deg) translateZ(-1px);
          }
        
          12.5%, 37.5%, 62.5%, 87.5% {
            transform: rotate(10deg) translateZ(-1px);
          }
        }
        
        @keyframes spoke {
          from {
            transform: rotate(0);
          }
        
          to {
            transform: rotate(-1turn);
          }
        }
      `}</style>
    </div>
  );
}
