import React, { useState } from "react";

function ImageExtractor() {
  const [textOutput, setTextOutput] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const containerStyle = {
    textAlign: "center",
    padding: "20px",
    background: "#222",
    color: "#fff",
  };

  const headerStyle = {
    fontSize: "40px",
    marginBottom: "20px",
    fontFamily: "monospace",
  };

  const generateButtonStyle = {
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "16px",
    margin: "10px",
  };

  const fileInputStyle = {
    display: "none",
  };

  const customFileInputStyle = {
    backgroundColor: "#333",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "16px",
    margin: "10px",
  };

  const uploadButtonStyle = {
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "16px",
    margin: "10px",
  };

  const imagePreviewContainerStyle = {
    marginTop: "20px",
    display: selectedImage ? "block" : "none",
  };

  const imagePreviewStyle = {
    maxWidth: "400px",
    border: "1px solid #ccc",
    background: "#444",
  };

  const textOutputContainerStyle = {
    marginTop: "20px",
    position: "relative",
  };

  const textOutputStyle = {
    whiteSpace: "pre-wrap",
    fontFamily: "Arial, sans-serif",
    fontSize: "30px",
    border: "1px solid #ccc",
    padding: "10px",
    backgroundColor: "#333",
    color: "#fff",
    height: "300px",
  };

  const copyButtonStyle = {
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "16px",
    position: "absolute",
    bottom: "10px",
    left: "10px", // Adjust the left position as needed
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview("");

      // Display image preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!selectedImage) {
      alert("Please select an image file first.");
      return;
    }

    // Clear existing output and set loading to true
    setTextOutput("");
    setLoading(true);

    const form = new FormData();
    form.append("image", selectedImage);
    form.append("output_type", "json");
    const BEARER_TOKEN = 'Bearer sk-2e6be5baf9594746a8cfd3b2783e5286';

    const options = {
      method: "POST",
      headers: {
        Authorization: BEARER_TOKEN,
      },
      body: form,
    };

    try {
      const response = await fetch(
        "https://api.worqhat.com/api/ai/images/v2/image-text-detection",
        options
      );

      const data = await response.json();
      console.log("result", data.data);

      var content = [];

      for (let i = 0; i < data.data.length; i++) {
        if (data.data[i].type === "LINE") {
          console.log("data", data.data[i].detected_text);
          content.push(data.data[i].detected_text);
        }
      }
      console.log("content", content);
      // Process the content to replace newline characters with spaces
      // const processedContent = data.data.replace(/\n/g, " ");

      // Update text output and set loading to false
      setTextOutput(content);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleCopyText = () => {
    const textArea = document.createElement("textarea");
    textArea.value = textOutput;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    alert("Text copied to clipboard!");
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>IMAGE TEXT EXTRACTOR</h1>
      <label htmlFor="imageInput" style={customFileInputStyle}>
        UPLOAD
      </label>
      <input
        type="file"
        id="imageInput"
        accept=".png, .jpg, .jpeg, .gif"
        onChange={handleFileChange}
        style={fileInputStyle}
      />
      <button style={generateButtonStyle} onClick={handleGenerate}>
        GENERATE
      </button>
      {loading && <p>LOADING...</p>}
      <div style={imagePreviewContainerStyle}>
        <h2>IMAGE PREVIEW:</h2>
        <img
          id="imagePreview"
          src={imagePreview}
          alt="Image Preview"
          style={imagePreviewStyle}
        />
      </div>
      <div style={textOutputContainerStyle}>
        <h2>TEXT OUTPUT:</h2>
        <pre style={textOutputStyle}>{textOutput}</pre>
        <button style={copyButtonStyle} onClick={handleCopyText}>
          COPY
        </button>
      </div>
    </div>
  );
}

export default ImageExtractor;
