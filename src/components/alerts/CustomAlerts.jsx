import { useSelector } from "react-redux";

export default function CustomAlerts() {
  let ClassAlert = useSelector((state) => state.customAlert);
  alert(ClassAlert.state);
  return (
    <div className="CustomAlerts">
      <div>{ClassAlert.message}</div>
    </div>
  );
}
