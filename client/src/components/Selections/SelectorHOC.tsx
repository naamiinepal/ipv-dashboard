import DoneAllIcon from "@mui/icons-material/DoneAll";
import RemoveDoneIcon from "@mui/icons-material/RemoveDone";
import { Button, Select } from "@mui/material";
import { forwardRef, useImperativeHandle, useState } from "react";

interface SelectionProps extends React.ComponentPropsWithoutRef<typeof Select> {
  isAdmin?: boolean;
}

type FilterArrayType = string[];

interface WrappedComponentProps
  extends React.ComponentPropsWithoutRef<typeof Select> {
  filters: FilterArrayType;
  setFilters: React.Dispatch<React.SetStateAction<FilterArrayType>>;
}

const SelectorHOC = (
  WrappedComponent: React.ComponentType<WrappedComponentProps>,
  componentName: string,
  allSources: FilterArrayType
) =>
  forwardRef(({ isAdmin = false, ...props }: SelectionProps, ref) => {
    const [filters, setFilters] = useState(allSources);

    useImperativeHandle(ref, () => ({ filters }), [filters]);

    return (
      <div className={`flex justify-between${isAdmin ? "" : " flex-1 mx-1"}`}>
        <div className="mr-3 flex flex-col">
          <span
            className={`${isAdmin ? "" : "text-white font-semibold "}text-base`}
          >
            Filter by {componentName}:
          </span>
          <div>
            <Button
              variant="contained"
              startIcon={<DoneAllIcon />}
              size="small"
              onClick={() => setFilters(allSources)}
              sx={{ marginRight: "1rem" }}
            >
              All
            </Button>
            <Button
              variant="contained"
              startIcon={<RemoveDoneIcon />}
              size="small"
              color="warning"
              onClick={() => setFilters([])}
            >
              None
            </Button>
          </div>
        </div>
        <WrappedComponent
          {...props}
          filters={filters}
          setFilters={setFilters}
        />
      </div>
    );
  });

export default SelectorHOC;

export type { FilterArrayType, WrappedComponentProps };
