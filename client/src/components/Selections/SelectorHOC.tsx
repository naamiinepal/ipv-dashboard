import DoneAllIcon from "@mui/icons-material/DoneAll";
import RemoveDoneIcon from "@mui/icons-material/RemoveDone";
import { Button, Select } from "@mui/material";

type FilterArrayType<T> = T[];

interface WrappedComponentProps<T>
  extends React.ComponentPropsWithoutRef<typeof Select> {
  filters: FilterArrayType<T>;
  setFilters: React.Dispatch<React.SetStateAction<FilterArrayType<T>>>;
}

interface SelectionProps<T> extends WrappedComponentProps<T> {
  isAdmin?: boolean;
}

const SelectorHOC =
  <T,>(
    WrappedComponent: React.ComponentType<WrappedComponentProps<T>>,
    componentName: string,
    allFilters: FilterArrayType<T>,
    displayNoneButton: boolean = true
  ) =>
  ({ isAdmin = false, ...props }: SelectionProps<T>) =>
    (
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
              onClick={() => props.setFilters(allFilters)}
              sx={{ marginRight: "1rem" }}
            >
              All
            </Button>
            {displayNoneButton && (
              <Button
                variant="contained"
                startIcon={<RemoveDoneIcon />}
                size="small"
                color="warning"
                onClick={() => props.setFilters([])}
              >
                None
              </Button>
            )}
          </div>
        </div>
        <WrappedComponent {...props} />
      </div>
    );

export default SelectorHOC;

export type { FilterArrayType, WrappedComponentProps, SelectionProps };
