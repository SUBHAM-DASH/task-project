import React, { useState, useEffect } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import { FaCalendarWeek } from "react-icons/fa";
import { dateRangeWisegettingData } from "../service/clientRequest.ts";

const DatePikerComponent = ({ setClients }) => {
  const token = localStorage.getItem("task-token");
  const [showPicker, setShowPicker] = useState(false);
  const [selectedRange, setSelectedRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  useEffect(() => {
    if (selectedRange.endDate) {
      setShowPicker(false);
    }
  }, [selectedRange.endDate]);

  const handleSelect = (ranges) => {
    setSelectedRange(ranges.selection);
    dateRangeWisegettingData(token, {
      startDate: ranges.selection?.startDate,
      endDate: ranges.selection?.endDate,
    })
      .then((response) => {
        setClients(response?.data?.clients);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div>
      <div>
        <button
          className="btn mb-2 bg-light text-emphasis-success"
          onClick={() => setShowPicker(!showPicker)}
        >
          <FaCalendarWeek /> Select Date
        </button>
      </div>
      {showPicker && (
        <div style={{ position: "absolute", zIndex: 9999, right: 120 }}>
          <DateRangePicker
            ranges={[selectedRange]}
            onChange={handleSelect}
            months={2}
          />
        </div>
      )}
      {selectedRange.startDate && selectedRange.endDate && (
        <div>
          <span className="fw-bold">Selected Date Range:</span>{" "}
          {`${selectedRange.startDate.toDateString()} - ${selectedRange.endDate.toDateString()}`}
        </div>
      )}
    </div>
  );
};

export default DatePikerComponent;
