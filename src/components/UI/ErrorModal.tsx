import ReactDOM from "react-dom";
import Card from "./Card";
import Button from "./Button";
// @ts-ignore
import styles from "./ErrorModal.module.css";

interface backdropProps {
  onConfirm: () => void;
}

const Backdrop = (props: backdropProps) => {
  return <div className={styles.backdrop} onClick={props.onConfirm} />;
};

interface overlayProps {
  title: string;
  message: string;
  onConfirm: () => void;
}

const ModalOverlay = (props: overlayProps) => {
  return (
    <Card classname={styles.modal}>
      <header className={styles.header}>
        <h2>{props.title}</h2>
      </header>
      <div className={styles.content}>
        <p>{props.message}</p>
      </div>
      <footer className={styles.actions}>
        <Button type='button' onClick={props.onConfirm}>Okay</Button>
      </footer>
    </Card>
  );
};

interface modalProps {
  title: string;
  message: string;
  onConfirm: () => void;
}

const ErrorModal = (props: modalProps) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById("backdrop-root") as HTMLElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          onConfirm={props.onConfirm}
          title={props.title}
          message={props.message}
        />,
        document.getElementById("overlay-root") as HTMLElement
      )}
    </>
  );
};

export default ErrorModal;
