import React, { useState } from "react";

import DeleteOutlined from "@ant-design/icons/lib/icons/DeleteOutlined";
import { Button, Divider, Input, Select, Space } from "antd";

import useFiltersStore from "../../store/filtersStore";

import { TagField } from "../Tag";

interface FilterRow {
  id: number;
  selectedKey: string | null;
  selectedValues: (string | number | boolean)[];
}

interface FilterFormProps {
  handleVisibleChange: (visible: boolean) => void;
}

const FilterForm: React.FC<FilterFormProps> = ({ handleVisibleChange }) => {
  const { filters } = useFiltersStore();
  const [filterRows, setFilterRows] = useState<FilterRow[]>([
    {
      id: Date.now(),
      selectedKey: null,
      selectedValues: [],
    },
  ]);

  const getOptionsForKey = (key: string | null) => {
    if (!key) return [];
    const filter = filters[key];
    return (
      filter?.options.map((option) => ({
        label: option.toString(),
        value: typeof option === "boolean" ? option : option.toString(),
      })) || []
    );
  };

  const getSelectedKeys = () =>
    filterRows.map((row) => row.selectedKey).filter(Boolean) as string[];

  const getDefaultSizeValues = () => {
    const sizeValues = filters["size"]?.values || [];
    const defaultUnit = "MiB";
    const sizeValueInBytes = sizeValues[0] as number;
    return {
      operator: "ge",
      value: sizeValueInBytes / (1024 * 1024),
      unit: defaultUnit,
    };
  };

  const addFilterRow = () => {
    setFilterRows((prevRows) => [
      ...prevRows,
      {
        id: Date.now(),
        selectedKey: null,
        selectedValues: [],
      },
    ]);
  };

  const removeFilterRow = (id: number) => {
    setFilterRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  const updateKey = (id: number, key: string) => {
    setFilterRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id
          ? {
              ...row,
              selectedKey: key,
              selectedValues:
                key === "size"
                  ? [
                      getDefaultSizeValues().operator,
                      getDefaultSizeValues().value,
                      getDefaultSizeValues().unit,
                    ]
                  : filters[key]?.values || [],
            }
          : row
      )
    );
  };

  const updateValues = (id: number, values: (string | number | boolean)[]) => {
    setFilterRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, selectedValues: values } : row
      )
    );
  };

  const handleSubmit = () => {
    const validFilters = filterRows
      .filter((row) => row.selectedKey && row.selectedValues.length > 0)
      .map((row) => ({
        key: row.selectedKey,
        values: row.selectedValues,
      }));
    handleVisibleChange(false);
    console.log("Filters:", validFilters);
  };

  const handleReset = () => {
    setFilterRows([{ id: Date.now(), selectedKey: null, selectedValues: [] }]);
  };

  const handleCancel = () => {
    handleVisibleChange(false);
  };

  return (
    <div>
      {filterRows.map((row) => (
        <div key={row.id} style={{ marginBottom: 16 }}>
          <Space align="center">
            <Select
              style={{ width: 150 }}
              placeholder="Filter"
              value={row.selectedKey || undefined}
              onChange={(key) => updateKey(row.id, key)}
              options={Object.keys(filters).map((key) => ({
                label: key,
                value: key,
                disabled: getSelectedKeys().includes(key),
              }))}
            />

            {row.selectedKey === "size" ? (
              <Input
                style={{ width: 300 }}
                addonBefore={
                  <Select
                    value={row.selectedValues[0] as string}
                    style={{ width: 70 }}
                    onChange={(operator) =>
                      updateValues(row.id, [
                        operator,
                        row.selectedValues[1],
                        row.selectedValues[2],
                      ])
                    }
                    options={[
                      { label: "≥", value: "ge" },
                      { label: "≤", value: "le" },
                    ]}
                  />
                }
                addonAfter={
                  <Select
                    value={row.selectedValues[2] as string}
                    style={{ width: 70 }}
                    onChange={(unit) =>
                      updateValues(row.id, [
                        row.selectedValues[0],
                        row.selectedValues[1],
                        unit,
                      ])
                    }
                    options={[
                      { label: "MiB", value: "MiB" },
                      { label: "GiB", value: "GiB" },
                      { label: "TiB", value: "TiB" },
                      { label: "PiB", value: "PiB" },
                    ]}
                  />
                }
                placeholder="Enter size"
                type="number"
                value={row.selectedValues[1] as number}
                onChange={(e) => {
                  const value = parseFloat(e.target.value) || 0;
                  updateValues(row.id, [
                    row.selectedValues[0] || "ge",
                    value,
                    row.selectedValues[2] || "MiB",
                  ]);
                }}
              />
            ) : (
              <Select
                mode={row.selectedKey === "activated" ? undefined : "multiple"}
                style={{ width: 300 }}
                placeholder="Select"
                value={
                  row.selectedKey === "activated"
                    ? row.selectedValues[0]
                      ? "On"
                      : "Off"
                    : row.selectedValues
                }
                onChange={(values) =>
                  updateValues(
                    row.id,
                    Array.isArray(values) ? values : [values]
                  )
                }
                options={getOptionsForKey(row.selectedKey)}
                disabled={!row.selectedKey}
                tagRender={
                  row.selectedKey === "status" ||
                  row.selectedKey === "parent_id"
                    ? TagField
                    : undefined
                }
              />
            )}
            <DeleteOutlined onClick={() => removeFilterRow(row.id)} />
          </Space>
        </div>
      ))}

      <Button
        type="link"
        onClick={addFilterRow}
        disabled={filterRows.length >= Object.keys(filters).length}
      >
        + Add Filter
      </Button>
      <Divider />
      <div
        style={{
          marginTop: 16,
          display: "flex",
          justifyContent: "end",
          gap: "10px",
        }}
      >
        <Button type="text" onClick={handleReset}>
          Clear all
        </Button>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button
          type="primary"
          onClick={handleSubmit}
          disabled={filterRows.every(
            (row) => !row.selectedKey || row.selectedValues.length === 0
          )}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default FilterForm;
