import { FileUploader } from "react-drag-drop-files";
import styles from "../Recipes/AddImageFile.module.css";

const fileTypes = ["JPG", "PNG", "GIF", "SVG", "JPEG"];

const AddImageFile = (props) => {
  const { image, setImage } = props;

  const handleFileChange = (file) => {
    const imageReader = new FileReader();
    imageReader.readAsDataURL(file);
    imageReader.onload = (event) => {
      setImage(event.target.result);
    };
  };

  return (
    <>
      {!image && (
        <FileUploader
          handleChange={handleFileChange}
          name="imageFile"
          types={fileTypes}
          fileOrFiles={image}
          label="Upload or drop an image file here"
          uploadedLabel="Upload Successful! Click to change."
        />
      )}
      {image && (
        <>
          <img src={image} className={styles.image} alt="image not found" />
          <button onClick={() => setImage(null)} className={styles.button}>
            Change image
          </button>
        </>
      )}
    </>
  );
};

export default AddImageFile;
