import { useRef, useEffect } from "react";

interface inputProps {
  title: string;
  list: string[];
  setList: ((prevList: string[]) => void) & ((func: (prevList: string[]) => string[]) => void);
}

const Inputs = (props: inputProps) => {
  const { title, list, setList } = props;
  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    setList((prevList) => {
      if (prevList[0] !== "") {
        return [...prevList, ""];
      }
      return prevList;
    });
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = event.target;
    const updatedList = [...list];
    updatedList[index] = value;
    if (list.length - 1 === index && value.trim().length > 0) {
      return setList([...updatedList, ""]);
    }
    setList(updatedList);
  };

  const handleRemove = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = event.target;

    if (value.length === 0 && list.length > 1 && list.length - 1 !== index) {
      const newList = [...list];
      newList.splice(index, 1);
      setList(newList);
    }
  };

  const setInputRef = (ref: HTMLInputElement | null, index: number) => {
    if (ref) {
      inputRefs.current[index] = ref;
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === "Enter" || event.key === "ArrowDown") {
      event.preventDefault();
      const nextIndex = index + 1;

      if (inputRefs.current[nextIndex]) {
        inputRefs.current[nextIndex].focus();
      }
    } else if (event.key === "ArrowUp") {
      const nextIndex = index - 1;

      if (inputRefs.current[nextIndex]) {
        inputRefs.current[nextIndex].focus();
      }
    }
  };

  return (
    <>
      <label htmlFor={title}>{title}</label>
      {list.map((singleListItem, index) => (
        <input
          key={index}
          type="text"
          name="item"
          value={singleListItem}
          onChange={(event) => handleChange(event, index)}
          onBlur={(event) => handleRemove(event, index)}
          onKeyDown={(event) => handleKeyDown(event, index)}
          ref={(ref) => setInputRef(ref, index)}
        />
      ))}
    </>
  );
};

export default Inputs;
