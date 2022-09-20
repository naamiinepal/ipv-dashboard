import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import type { TweetRead } from "../../client";
import { PseudoTweetsService, TweetsService } from "../../client";
import { columns } from "../../constants";
import SelectionAdmin from "./SelectionAdmin";
import Tweet from "./Tweet";

interface Props {
  action: "verify" | "modify";
}

const TweetCollectionAdminPanel = ({ action }: Props) => {
  const [dataList, setDataList] = useState<TweetRead[]>([]);
  const [offset, setOffset] = useState(0);
  const [reload, setReload] = useState(false);

  const tweetFetcher = useMemo(
    () =>
      action === "verify"
        ? PseudoTweetsService.pseudoTweetsReadPseudoTweets
        : TweetsService.tweetsReadTweets,
    [action]
  );

  useEffect(() => {
    tweetFetcher({ offset, limit: 10 }).then((data) => setDataList(data));
  }, [offset, reload, tweetFetcher]);

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
                .map((column, index) => (
                  <TableCell
                    key={index}
                    sx={{
                      width: 50,
                      fontWeight: "bold",
                    }}
                  >
                    {column.headerName}
                  </TableCell>
                ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {dataList.map((row) => (
              <Tweet key={row.id} row={row} action={action} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TweetCollectionAdminPanel;
