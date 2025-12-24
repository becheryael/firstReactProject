import { FileUploader } from "react-drag-drop-files";
import { useState } from "react";
// @ts-ignore
import styles from "../Recipes/AddImageFile.module.css";

const fileTypes = ["JPG", "PNG", "GIF", "SVG", "JPEG"];

const AddImageFile: React.FC<{
  image: string | undefined;
  setImage: (image: string | undefined) => void;
}> = (props) => {
  const { image, setImage } = props;
  const [imageFile, setImageFile] = useState<File | Array<File> | null>(null);

  const handleFileChange = (file: File | Array<File>) => {
    setImageFile(file);
    const imageReader = new FileReader();
    imageReader.readAsDataURL(file as File);
    imageReader.onload = (event: ProgressEvent<FileReader>) => {
      setImage(event.target?.result as string);
    };
  };

  return (
    <>
      {!image && (
        <FileUploader
          handleChange={handleFileChange}
          name="imageFile"
          fileOrFiles={imageFile}
          types={fileTypes}
          label="Upload or drop an image file here"
          uploadedLabel="Upload Successful! Click to change."
        />
      )}
      {image && (
        <>
          <img src={image} className={styles.image} alt="image not found" />
          <button onClick={() => setImage(undefined)} className={styles.button}>
            Change image
          </button>
        </>
      )}
    </>
  );
};

export default AddImageFile;
