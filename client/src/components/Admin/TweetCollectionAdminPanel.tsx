import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import { useEffect, useState } from "react";
import type { AspectEnum, TweetRead } from "../../client";
import { CancelError, PseudoTweetsService, TweetsService } from "../../client";
import { sentenceColumns } from "../../constants";
import { toTitleCase } from "../../utility";
import { allSources, allTopics, useCombinedSelection } from "../Selections";
import SelectionAdmin from "./SelectionAdmin";
import Tweet from "./Tweet";

interface TweetCollectionAdminPanelProps {
  action: "verify" | "modify";
}

const TweetCollectionAdminPanel: React.FunctionComponent<
  TweetCollectionAdminPanelProps
> = ({ action }) => {
  const [dataList, setDataList] = useState<TweetRead[]>([]);
  const [offset, setOffset] = useState(0);
  const [reload, setReload] = useState(false);
  const combinedProps = useCombinedSelection();
  const { topics, sources } = combinedProps;

  const isVerify = action === "verify";

  useEffect(() => {
    let isAbuse: boolean | undefined;
    let aspects: typeof topics;

    if (topics.length === allTopics.length + 1 || topics.length === 0) {
      isAbuse = undefined;
      aspects = [];
    } else {
      const abuseIndex = topics.indexOf(-1);
      if (abuseIndex < 0) {
        isAbuse = undefined;
        aspects = topics.length === allTopics.length ? [] : topics;
      } else {
        isAbuse = true;
        aspects = [
          ...topics.slice(0, abuseIndex),
          ...topics.slice(abuseIndex + 1, topics.length),
        ];
      }
    }

    const currSources = sources.length === allSources.length ? [] : sources;

    const tweetFetcher = isVerify
      ? PseudoTweetsService.pseudoTweetsReadPseudoTweets
      : TweetsService.tweetsReadTweets;

    const request = tweetFetcher(
      isAbuse,
      currSources,
      aspects as AspectEnum[],
      offset,
      10
    );
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
  }, [offset, reload, topics, sources]);

  const toggleReload = () => setReload(!reload);

  return (
    <div className="w-11/12 mx-auto">
      <h1 className="my-5 text-xl font-bold text-cyan-700 text-center">
        {isVerify ? "Verify Model's Predictions" : "Modify Verifications"}
      </h1>
      <SelectionAdmin
        offset={offset}
        setOffset={setOffset}
        toggleReload={toggleReload}
        combinedProps={combinedProps}
      />
      {dataList.length > 0 ? (
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
                {["Text", ...sentenceColumns.map(({ field }) => field)]
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
      ) : (
        <p className="flex justify-center h-96 items-center">
          <b>No texts to show</b>
        </p>
      )}
    </div>
  );
};

export default TweetCollectionAdminPanel;
