import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import type { TweetRead } from "../../client";
import { CancelError, PseudoTweetsService, TweetsService } from "../../client";
import { predictionColumns } from "../../constants";
import { toTitleCase } from "../../utility";
import SelectionAdmin from "./SelectionAdmin";
import Tweet from "./Tweet";

interface Props {
  action: "verify" | "modify";
}

const TweetCollectionAdminPanel = ({ action }: Props) => {
  const [dataList, setDataList] = useState<TweetRead[]>([]);
  const [offset, setOffset] = useState(0);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const tweetFetcher =
      action === "verify"
        ? PseudoTweetsService.pseudoTweetsReadPseudoTweets
        : TweetsService.tweetsReadTweets;
    const request = tweetFetcher(offset, 10);
    request
      .then((data) => setDataList(data))
      .catch((err) => {
        if (err instanceof CancelError) {
          console.log("TweetCollectionAdminPanel umounted");
        }
      });
    return () => {
      request?.cancel();
    };
  }, [offset, reload]);

  const toggleReload = () => setReload(!reload);

  return (
    <div className="mt-10 w-11/12 mx-auto ">
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
            <col width="70%" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
          </colgroup>
          <TableHead>
            <TableRow>
              {["Text", ...predictionColumns.map(({ field }) => field)]
                .map(toTitleCase)
                .map((titleColumn, index) => (
                  <TableCell
                    align="center"
                    key={index}
                    sx={{
                      width: 50,
                      fontWeight: "bold",
                    }}
                  >
                    {titleColumn}
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
