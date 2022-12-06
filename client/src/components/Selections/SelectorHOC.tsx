import DoneAllIcon from "@mui/icons-material/DoneAll";
import RemoveDoneIcon from "@mui/icons-material/RemoveDone";
import { Button, Select } from "@mui/material";
import type { ComponentPropsWithoutRef } from "react";
import { forwardRef, useImperativeHandle, useState } from "react";

interface SelectionProps extends ComponentPropsWithoutRef<typeof Select> {
  isWhite?: boolean;
}

type FilterArrayType = string[];

interface WrappedComponentProps
  extends ComponentPropsWithoutRef<typeof Select> {
  filters: FilterArrayType;
  setFilters: React.Dispatch<React.SetStateAction<FilterArrayType>>;
}

const SelectorHOC = (
  WrappedComponent: React.ComponentType<WrappedComponentProps>,
  componentName: string,
  allSources: FilterArrayType
) =>
  forwardRef(({ isWhite = false, ...props }: SelectionProps, ref) => {
    const [filters, setFilters] = useState(allSources);

    useImperativeHandle(ref, () => ({ filters }), [filters]);

    return (
      <div className="flex justify-between">
        <div className="mr-3 flex flex-col">
          <span
            className={`${
              isWhite ? "text-white" : "text-black"
            } text-base font-semibold`}
          >
            Filter by {componentName}:
          </span>
          <div className="flex justify-between">
            <Button
              variant="contained"
              startIcon={<DoneAllIcon />}
              size="small"
              onClick={() => setFilters(allSources)}
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
