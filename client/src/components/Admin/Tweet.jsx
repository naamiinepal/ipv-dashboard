import {
  Alert,
  Button,
  Checkbox,
  Snackbar,
  TableCell,
  TableRow,
  TextField
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { columns } from "../../constants";

const Tweet = ({ row, verified, action }) => {
  const [changedColumn, setChangedColumn] = useState({ ...row });
  const [isVerified, setIsVerified] = useState(verified);
  const [snackOpen, setSnackOpen] = useState({
    display: false,
    message: "",
    intent: "success",
  });

  useEffect(() => {
    setChangedColumn({ ...row });
    setIsVerified(verified);
  }, [row, verified]);

  const modifySubmit = () => {
    const toSubmit = {};
    for (const prop in row) {
      toSubmit[prop] = changedColumn[prop];
    }
    const accessToken = sessionStorage.getItem("accessToken");
    axios
      .patch(`/tweets/${row.id}`, toSubmit, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(() => {
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

  const verifySubmit = () => {
    const toSubmit = {};
    for (const prop in row) {
      if (row[prop] !== changedColumn[prop]) {
        toSubmit[prop] = changedColumn[prop];
      }
    }
    const accessToken = sessionStorage.getItem("accessToken");
    axios
      .patch(`/pseudo_tweets/${row.id}`, toSubmit, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(() => {
        setIsVerified(true);
      });
  };

  const handleClose = () => {
    console.log("Closed");
    setSnackOpen({ ...snackOpen, display: false });
  };

  const handleChange = (value, column) => {
    const changeTemp = JSON.parse(JSON.stringify(changedColumn));
    changeTemp[column] = value;
    console.log(changeTemp);
    setChangedColumn(changeTemp);
  };

  return (
    <TableRow
      key={row.id}
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      {columns
        .map((column) => column.field)
        .filter((datum) => datum !== "action" && datum !== "others")
        .map((datum, index) => {
          if (datum === "text")
            return (
              <TableCell key={index} sx={{ fontSize: "1rem" }} align="left">
                {row[datum]}
              </TableCell>
            );
          else if (datum === "sexual_score")
            return (
              <TableCell key={index} align="right">
                <TextField
                  inputProps={{ inputMode: "numeric", pattern: "[1-9]|10" }}
                  value={changedColumn[datum]}
                  onChange={({ target: { value } }) => {
                    handleChange(value, datum);
                  }}
                  helperText="1-10"
                />
              </TableCell>
            );
          else
            return (
              <TableCell key={index} align="right">
                <Checkbox
                  checked={changedColumn[datum]}
                  onChange={({ target: { checked } }) => {
                    handleChange(checked, datum);
                  }}
                />
              </TableCell>
            );
        })}
      <TableCell align="right">
        {action === "modify" ? (
          <>
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
            <Button variant="contained" onClick={modifySubmit}>
              Modify
            </Button>
          </>
        ) : (
          <>
            {isVerified ? (
              <Button
                color="success"
                disabled={action === "verify" && isVerified}
                // variant="contained"
                onClick={verifySubmit}
              >
                Verified
              </Button>
            ) : (
              <Button variant="contained" onClick={verifySubmit}>
                Verify
              </Button>
            )}
          </>
        )}
      </TableCell>
    </TableRow>
  );
};

export default Tweet;
