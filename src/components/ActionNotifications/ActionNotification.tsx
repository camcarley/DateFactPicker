import { MessageStatus } from "../../types/fact";
import "./ActionNotification.css";

interface ActionNotificationProps {
	description: string;
	msgStatus: MessageStatus;
}

const ActionNotification: React.FC<ActionNotificationProps> = (props) => {
	return (
		<div>
			{props.description ? (
				<p id={props.msgStatus === "error" ? "error_msg" : "success_msg"}>{props.description}</p>
			) : (
				<></>
			)}
		</div>
	);
};

export default ActionNotification;
