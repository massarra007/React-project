import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect({
  label,
  value,
  name,
  onChange,
  className,
  items = [],
  disabled = false,
  dataTest = "",
}) {
  return (
    <FormControl fullWidth className={className}>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label={label}
        name={name}
        onChange={onChange}
        disabled={disabled}
        data-test={dataTest}
      >
        {items.map((item, key) => {
          return (
            <MenuItem data-test={`option-${key}`} key={key} value={item.value}>
              {item.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
