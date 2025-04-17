import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

function CustomModel({ trigger, childrenComp, title }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    < >
      {React.cloneElement(trigger, { handleShow })}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{React.cloneElement(childrenComp, { handleClose })}</Modal.Body>
      </Modal>
    </>
  );
}

export default CustomModel;
