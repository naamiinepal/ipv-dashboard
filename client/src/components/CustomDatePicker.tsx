import { TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

interface CustomDatePickerProps
  extends Omit<React.ComponentPropsWithoutRef<typeof DatePicker>, "renderInput"> {
  textLabel: React.ReactNode;
}

const CustomDatePicker: React.FunctionComponent<CustomDatePickerProps> = ({
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
