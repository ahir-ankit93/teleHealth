import React, {useRef} from "react";

const UploadButton = (props) => {
    const fileControl = useRef(null);

    const handleUpload = () => {
        fileControl.current.click();
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0];
            props.onFileSelect(file, e.target.name);
            e.target.value = null;
        }
    };

    return (
        <div>
            <input type="file" ref={fileControl} className="d-none" name={props.name} onChange={handleFileChange} />
            <button className="custom-btn-primary" type="button" onClick={handleUpload}>{props.title || 'Upload'}</button>
        </div>
    );
};

export default UploadButton;
