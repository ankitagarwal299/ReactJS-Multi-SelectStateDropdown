import "./styles.css";
import React, { useState } from "react";

//WEBDEV CODY
//https://www.youtube.com/watch?v=V2zEAXLQbF4&t=104s

const optionList = [];
for (let i = 0; i < 100; i++) {
  optionList.push(`people ${i}`);
}

export default function App() {
  return (
    <div className="App">
      <h2>Start editing to see some magic happen!</h2>

      <SelectDropdown
        label="Add providers"
        optionList={optionList}
      ></SelectDropdown>
    </div>
  );
}

function SelectDropdown({ label, optionList }) {
  const [open, setOpen] = useState(false);
  const [allOptions, setAllOptions] = useState(
    optionList.map((o) => ({ label: o, selected: false }))
  );

  const selectedOptions = allOptions.filter((o) => o.selected === true);

  // handler functions here (add, remove)
  function handleSelection(option) {
    let updatedOptions = allOptions.map((o) => {
      if (o.label === option.label) {
        return { ...o, selected: !option.selected };
      }
      return o;
    });
    setAllOptions(updatedOptions);
  }

  return (
    <>
      <label>{label}</label>

      <BadgeArea
        open={open}
        setOpen={setOpen}
        selectedOptions={selectedOptions}
      ></BadgeArea>

      {open && (
        <DropdownArea
          options={allOptions}
          handleSelection={handleSelection}
        ></DropdownArea>
      )}
    </>
  );
}

function BadgeArea({ open, setOpen, selectedOptions }) {
  function handleToggle(e) {
    setOpen((prev) => !prev);
  }

  return (
    <div className="dropdown-container" onClick={(e) => handleToggle(e)}>
      <span>{selectedOptions.length} selected</span>

      <button type="button" className={`arrowBtn ${open ? "active" : ""}`}>
        v
      </button>
    </div>
  );
}

function DropdownArea({ options, handleSelection }) {
  return (
    <div className="options-dropdown">
      {options.map((o, i) => {
        return (
          <span className="chips" key={i}>
            <input
              type="checkbox"
              name="options"
              checked={o.selected}
              onChange={() => handleSelection(o)}
            />
            {o.label}
          </span>
        );
      })}
    </div>
  );
}
