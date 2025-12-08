
export const getStatusColor = (status: string) => {
  switch (status) {
    case "COMPLETED":
      return "#03543F";
    case "INCOMPLETE":
      return "#723B13";
    case "MISSING":
      return "#99154B";
    default:
      return "#d9d9d9";
  }
};

export const getStatusBgColor = (status: string) => {
  switch (status) {
    case "COMPLETED":
      return "#DEF7EC";
    case "INCOMPLETE":
      return "#FDF6B2";
    case "MISSING":
      return "#FCE8F3";
    default:
      return "#fafafa";
  }
};
