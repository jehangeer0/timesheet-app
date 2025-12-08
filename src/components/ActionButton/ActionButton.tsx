import { TimesheetRecord } from "@/interface/timeSheetInterface";

interface ActionButtonProps {
  record: TimesheetRecord;
  onClick: (record: TimesheetRecord) => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ record, onClick }) => (
  <button
    onClick={() => onClick(record)}
    className="text-blue-500 hover:text-blue-700 font-medium cursor-pointer"
  >
    {record.action}
  </button>
);

export default ActionButton;
