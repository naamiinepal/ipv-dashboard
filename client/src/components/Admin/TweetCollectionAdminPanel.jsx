import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { columns } from "../../constants";
import SelectionAdmin from "./SelectionAdmin";
import Tweet from "./Tweet";

const TweetCollectionAdminPanel = ({ action }) => {
  const [dataList, setDataList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams([
      ["offset", offset],
      ["limit", 10],
    ]);
    axios
      .get(`/${action === "verify" ? "pseudo_tweets" : "tweets"}/`, { params })
      .then(({ data }) => {
        // console.log("Tweet Collection", data);
        setDataList(data);
      });
  }, [offset, action, reload]);

  const toggleReload = () => {
    setReload(!reload);
  };

  return (
    <div className=" mt-10 w-11/12 mx-auto ">
      <SelectionAdmin
        offset={offset}
        setOffset={setOffset}
        toggleReload={toggleReload}
      />
      <TableContainer component={Paper} sx={{ height: 500 }}>
        <Table
          stickyHeader
          sx={{ minWidth: 650, borderSpacing: "0 20px" }}
          aria-label="simple table"
        >
          <colgroup>
            <col width="80%" />
            <col width="2%" />
            <col width="2%" />
            <col width="2%" />
            <col width="2%" />
            <col width="2%" />
            <col width="2%" />
            <col width="2%" />
            <col width="2%" />
            <col width="6%" />
          </colgroup>
          <TableHead>
            <TableRow>
              {columns
                .filter((column) => column.field !== "others")
                .map((column, index) => {
                  return (
                    <TableCell
                      key={index}
                      sx={{
                        width: 50,
                        fontWeight: "bold",
                      }}
                    >
                      {column.headerName}
                    </TableCell>
                  );
                })}
            </TableRow>
          </TableHead>

          <TableBody>
            {dataList.map((row) => (
              <Tweet
                key={row.id}
                row={{ ...row }}
                action={action}
                verified={Boolean(row.verified_at)}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TweetCollectionAdminPanel;
