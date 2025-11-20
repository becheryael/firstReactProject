import React, { useState } from "react";

const Input = (props) => {
  const { title, list, setList } = props;

  const handleChange = (event, index) => {
    const { value } = event.target;
    const updatedList = [...list];
    updatedList[index] = value;
    if (list.length - 1 === index && value.length > 0) {
      return setList([...updatedList, ""]);
    }
    setList(updatedList);
  };

  const handleRemove = (event, index) => {
    const { value } = event.target;

    if (value.length === 0 && list.length > 1 && list.length - 1 !== index) {
      const newList = [...list];
      newList.splice(index, 1);
      setList(newList);
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
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
            }
          }}
        />
      ))}
    </>
  );
};

export default Input;
