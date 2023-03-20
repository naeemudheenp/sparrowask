import { useSelector } from "react-redux";

export default function CustomAlerts() {
  let ClassAlert = useSelector((state) => state.customAlert);

  return (
    <div className="CustomAlerts">
      <div>{ClassAlert.message}</div>
    </div>
  );
}
