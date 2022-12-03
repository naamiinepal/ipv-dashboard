import { TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import type {
  ComponentPropsWithoutRef,
  FunctionComponent,
  ReactNode,
} from "react";

interface CustomDatePickerProps
  extends Omit<ComponentPropsWithoutRef<typeof DatePicker>, "renderInput"> {
  textLabel: ReactNode;
}

const CustomDatePicker: FunctionComponent<CustomDatePickerProps> = ({
  textLabel,
  ...props
}) => (
  <div className="mx-2 flex items-center w-2/12">
    <div className="text-white text-base font-semibold mr-2">{textLabel}</div>
    <div className="bg-white pt-2">
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker
          inputFormat="DD/MM/YYYY"
          {...props}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </div>
  </div>
);

export default CustomDatePicker;
