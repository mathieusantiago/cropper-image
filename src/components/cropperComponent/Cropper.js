import React, { useState } from "react";
import "./Cropper.css";

//Import Axios
import Axios from "axios";

//Import Croper.js
import CropPicture from "react-cropper";
import "cropperjs/dist/cropper.css";

//Import React-BootStrap
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Cropper = () => {
  const [image, setImage] = useState("");
  const [cropData, setCropData] = useState("");
  const [cropper, setCropper] = useState();
  const [spinner, setSpinner] = useState("");
  const [uploadErr, setUploadErr] = useState("");

  const onChange = (e) => {
    e.preventDefault();
    let files;

    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
  };

  const uploadImage = () => {
    const formData = new FormData();

    formData.append("file", cropData);
    formData.append("upload_preset", "mathieu");

    Axios.post(
      "https://api.cloudinary.com/v1_1/montpelliler/image/upload",
      formData
    ).then(
      (response) => {
        setImage("");
        setCropData("");
        setCropper("");
        setUploadErr("");
        setSpinner("Your picture is uploaded");
      },
      (reason) => {
        setUploadErr("1");
        setSpinner("");

        console.log("err", reason); // Error!
      }
    );
  };
  return (
    <div>
      <Container fluid="md">
        <div className="mt-5">
          <h5 className="text-center">Select your picture</h5>
        </div>
        <Form.Group
          controlId="formFileLg"
          className="mb-3 mt-5 d-flex justify-content-center"
        >
          <Form.Control type="file" size="sm" onChange={onChange} />
        </Form.Group>
        {spinner !== "" ? (
          <h5 className="text-success text-center">{spinner}</h5>
        ) : (
          ""
        )}
        {uploadErr === "1" ? (
          <h5 className="text-danger text-center">an error has occurred</h5>
        ) : (
          ""
        )}
        <Row>
          <Col className="d-flex justify-content-center">
            <h1>
              <Button variant="primary" onClick={getCropData}>
                Crop Image
              </Button>
            </h1>
          </Col>
          <Col className="d-flex justify-content-center">
            <h1>
              <Button className="mt-2" variant="primary" onClick={uploadImage}>
                Upload
              </Button>
            </h1>
          </Col>
        </Row>
        <Row>
          <Col>
            {image !== "" ? (
              <CropPicture
                zoomTo={0.5}
                initialAspectRatio={1}
                preview=".img-preview"
                src={image}
                viewMode={2}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                background={true}
                responsive={true}
                autoCropArea={1}
                checkOrientation={false}
                onInitialized={(instance) => {
                  setCropper(instance);
                }}
                guides={true}
              />
            ) : (
              <b className="d-flex justify-content-center text-warning">
                No picture selected
              </b>
            )}
          </Col>
          <Col>
            {cropData !== "" ? (
              <div className="box d-flex justify-content-center">
                <img className="img-fluid" src={cropData} alt="cropped" />
              </div>
            ) : (
              <b className="d-flex justify-content-center text-warning">
                No picture croped
              </b>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Cropper;
