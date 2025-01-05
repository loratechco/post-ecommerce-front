import SearchComponent from "../SearchComponent";

import TableDesc, {
  TbodyDesc,
  TdDesc,
  ThDesc,
  TheadDesc,
  TrDesc,
} from "@/components/table-responsive/TableDesc";

import TableCardsMobile, {
  CardTable,
  ContentTable,
  WrapContent,
} from "@/components/table-responsive/TableCardsMobile";

import Link from "next/link";
import { PaginationComponent } from "@/components/pagination";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface Props {
  OptionalComponentNextToInput?: ReactNode;
  headerItems: { key: string; label: string }[];
  lastPageForPagination: number;
  searchInput?: boolean;
  table: {
    currentPage: string;
    tableBodyData: {
      actions?: ReactNode;
      urlLink?: string;
      id?: number;
      badge?: {
        badgeValue: string;
        badgeClassname: string;
      };
    }[];
    indexItemsAvalabe?: boolean;
    customErrorMassage?: string;
  };
  searchDelay?: number;
}

/**
 * MyDatatTable Component
 *
 * This component is a customizable data table designed for displaying tabular data in a responsive way.
 * It supports both desktop and mobile views, with additional features like pagination and custom error messages.
 *
 * ## Usage Example
 * ```tsx
 * import { MyDatatTable } from "@/components/MyDatatTable";
 *
 * <MyDatatTable
 *   headerItems={[
 *       { key: "email", label: "Email" },
 *       { key: "name", label: "Name" },
 *       { key: "lastName", label: "Last Name" },
 *       { key: "phone", label: "Phone" },
 *   ]}
 *   table={{
 *     currentPage: "1",
 *     tableBodyData: data?.map((item) => ({
 *       name: item?.name,
 *       lastName: item?.last_name,
 *       phone: item?.phone,
 *       email: item?.email,
 *     })),
 *     customErrorMassage: "There is no data",
 *   }}
 *   lastPageForPagination={last_page}
 * />
 * ```
 *
 * ## Props
 *
 * ### `headerItems`
 * - **Type:** `Array<{ key: string; label: string }>`
 * - **Description:** Defines the columns of the table. Each object in the array should include:
 *   - `key`: The property name from `tableBodyData` that will be displayed in the column.
 *   - `label`: The header label displayed in the table.
 *
 * ### `table`
 * - **Type:** `Object`
 * - **Description:** Contains the table data and additional configuration.
 *
 * #### Properties:
 * - `currentPage` (string): The current page number for pagination.
 * - `tableBodyData` (Array<Record<string, any>>): An array of objects representing the table rows.
 * - `customErrorMassage` (string): A message displayed when no data is available.
 * - `indexItemsAvalabe` (optional, boolean): If `true`, displays row numbers in the table. Default is `true`.
 *
 * ### `lastPageForPagination`
 * - **Type:** `number`
 * - **Description:** The total number of pages for pagination.
 *
 * ### `OptionalComponentNextToInput` (optional)
 * - **Type:** `ReactNode`
 * - **Description:** Allows you to add a custom component next to the search input field.
 *
 * ### `searchInput` (optional)
 * - **Type:** `boolean`
 * - **Default:** `true`
 * - **Description:** Toggles the search input visibility.
 *
 * ## Features
 * - **Responsive Design:** Automatically adapts for mobile and desktop views.
 * - **Dynamic Columns:** Fully customizable headers and data binding via `headerItems` and `tableBodyData`.
 * - **Pagination:** Built-in pagination for large datasets.
 * - **Custom Error Message:** Display a friendly error message when no data is available.
 *
 * ## Notes
 * - Ensure that the keys in `headerItems` match the property names in `tableBodyData` objects.
 * - Use the `OptionalComponentNextToInput` prop to add buttons or filters alongside the search bar if needed.
 */

function MyDatatTable({
  OptionalComponentNextToInput,
  headerItems,
  lastPageForPagination,
  table: {
    currentPage = "1",
    tableBodyData = [],

    indexItemsAvalabe = true,
    customErrorMassage = "There is no data",
  },
  searchInput = true,
  searchDelay = 1000,
}: Props) {
  return (
    <div className="size-full">
      {searchInput && (
        <SearchComponent delay={searchDelay}>
          {OptionalComponentNextToInput}
        </SearchComponent>
      )}

      <div className="pt-3 w-full">
        <TableDesc>
          <TheadDesc>
            <TrDesc>
              {indexItemsAvalabe && <ThDesc title="#" />}

              {headerItems?.map(({ label }, index) => (
                <ThDesc title={label} key={index} />
              ))}
            </TrDesc>
          </TheadDesc>

          <TbodyDesc>
            {tableBodyData?.length > 0 ? (
              tableBodyData?.map((row, rowIndex) => (
                <>
                  <TrDesc key={row?.id ? row.id + 1 : rowIndex}>
                    {indexItemsAvalabe && (
                      <TdDesc>
                        {calculateIndexListItems(rowIndex, currentPage)}
                      </TdDesc>
                    )}

                    {!row?.actions
                      ? headerItems.map(({ key }, colIndex) => (
                          <TdDesc key={colIndex}>
                            <Link
                              href={
                                row?.urlLink && colIndex == 0
                                  ? row?.urlLink || ""
                                  : ""
                              }
                              className={cn(
                                "ps-3 block",
                                row?.urlLink && colIndex == 0
                                  ? "pointer-events-auto select-auto underline"
                                  : "cursor-default select-none"
                              )}
                            >
                              {row[key] || "-"}
                            </Link>
                          </TdDesc>
                        ))
                      : headerItems.map(({ key }, colIndex) => (
                          <TdDesc key={colIndex}>
                            {key === "actions" ? row?.actions : row[key] || "-"}
                          </TdDesc>
                        ))}
                  </TrDesc>
                </>
              ))
            ) : (
              <TrDesc>
                <TdDesc>{customErrorMassage}</TdDesc>
              </TrDesc>
            )}
          </TbodyDesc>
        </TableDesc>

        {/* card box for mobile size  */}
        <TableCardsMobile>
          {tableBodyData.length > 0 ? (
            tableBodyData.map((row, rowIndex) => (
              <div
                className="flex items-center justify-center w-full hover:bg-zinc-200 transition-colors"
                key={row?.id || rowIndex}
              >
                <Link
                  href={row?.urlLink || ""}
                  className={cn(
                    row?.urlLink
                      ? "pointer-events-auto cursor-pointer "
                      : "w-full cursor-default pointer-events-none select-none"
                  )}
                >
                  <CardTable className="w-full max-sm:max-w-[250px] truncate">
                    <WrapContent>
                      {headerItems.map(({ key, label }, colIndex) => (
                        <div
                          className="flex items-center justify-start gap-1.5 w-full"
                          key={colIndex}
                        >
                          {!key.includes("actions") && (
                            <div className="text-zinc-800 font-semibold">
                              {label}:
                            </div>
                          )}

                          <ContentTable
                            className="truncate overflow-hidden text-ellipsis max-sm:max-w-[160px]"
                            content={`${
                              !key.includes("actions") ? row[key] || "-" : ""
                            }`}
                          />
                        </div>
                      ))}
                    </WrapContent>
                  </CardTable>
                </Link>

                <div className="w-1/12 flex items-center justify-center flex-col h-16 gap-5">
                  {row?.badge && (
                    <Badge
                      className={cn(
                        row?.badge?.badgeClassname,
                        "justify-self-start"
                      )}
                    >
                      {row?.badge?.badgeValue}
                    </Badge>
                  )}

                  {row?.actions && row?.actions}
                </div>
              </div>
            ))
          ) : (
            <CardTable>
              <WrapContent>
                <div className="text-black font-semibold">
                  {customErrorMassage}
                </div>
              </WrapContent>
            </CardTable>
          )}
        </TableCardsMobile>
      </div>

      <div className="pt-7 pb-5">
        <PaginationComponent pages={lastPageForPagination || 1} />
      </div>
    </div>
  );
}

const calculateIndexListItems = (index: number, page: string) => {
  return (+page - 1) * 10 + index + 1;
};

export { MyDatatTable, calculateIndexListItems };
