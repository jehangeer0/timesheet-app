import { getStatusBgColor, getStatusColor } from "@/lib/statusColors";

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => (
  <div
    style={{
      display: "inline-block",
      padding: "2px 8px",
      borderRadius: "6px",
      backgroundColor: getStatusBgColor(status),
      color: getStatusColor(status),
      fontWeight: 600,
      fontSize: 12,
      letterSpacing: 0.5,
    }}
  >
    {status}
  </div>
);

export default StatusBadge;
