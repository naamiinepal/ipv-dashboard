import {
  Alert,
  Button,
  Card,
  Checkbox,
  Chip,
  FormControlLabel,
  Snackbar,
} from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import PersonIcon from "@mui/icons-material/Person";
import axios from "axios";
import { useEffect, useState } from "react";
import { columns, months } from "../constants";

const Tweet = ({ tweet }) => {
  const [changedColumn, setChangedColumn] = useState({ ...tweet });
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [snackOpen, setSnackOpen] = useState({
    display: false,
    message: "",
    intent: "success",
  });

  useEffect(() => {
    setChangedColumn({ ...tweet });
  }, [tweet]);

  const editSubmit = () => {
    axios
      .post(`/tweets/edit_request/${tweet.id}`, changedColumn)
      .then(() => {
        setIsEditOpen(false);
        setSnackOpen({
          display: true,
          message: "Successfully Modified",
          intent: "success",
        });
      })
      .catch(() => {
        setSnackOpen({
          display: false,
          message: "Modification Failed",
          intent: "error",
        });
      });
  };

  const handleClose = () => {
    console.log("Closed");
    setSnackOpen({ ...snackOpen, display: false });
  };
  const handleChange = (event, column) => {
    let changeTemp = JSON.parse(JSON.stringify(changedColumn));
    changeTemp[column] = event.target.checked;
    console.log(changeTemp);
    setChangedColumn(changeTemp);
  };

  const created_date = new Date(tweet.created_at);

  return (
    <Card className="p-5 mb-2" variant="outlined">
      <div>
        <PersonIcon />
        <span className="text-primary"> {tweet.username}</span> on{" "}
        <span className="text-primary">
          {months[created_date.getMonth()]} {created_date.getDate()},{" "}
          {created_date.getFullYear()}
        </span>
      </div>
      {tweet.text}
      <div className="mt-1 flex">
        {tweet.is_abuse && (
          <>
            <Chip className="mr-1" label="abusive" color="success" />
            <Chip
              className="mr-1"
              label={`Sexual Score: ${tweet.sexual_score}`}
              color="success"
            />
          </>
        )}
        <Button
          sx={{ marginLeft: "auto" }}
          onClick={() => {
            setIsEditOpen(true);
          }}
        >
          Edit
        </Button>
      </div>
      {isEditOpen && (
        <>
          <FormGroup sx={{ fontSize: "0.5em" }}>
            {columns
              .map((column) => column.field)
              .filter(
                (datum) =>
                  datum !== "verify" && datum !== "others" && datum !== "text"
              )
              .map((datum) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={changedColumn[datum]}
                      onChange={(event) => {
                        handleChange(event, datum);
                      }}
                    />
                  }
                  label={datum}
                />
              ))}
          </FormGroup>
          <Snackbar
            open={snackOpen.display}
            autoHideDuration={3000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity={snackOpen.intent}
              sx={{ width: "100%" }}
            >
              {snackOpen.message}
            </Alert>
          </Snackbar>
          <Button variant="contained" onClick={editSubmit}>
            Request
          </Button>
        </>
      )}
    </Card>
  );
};

export default Tweet;
