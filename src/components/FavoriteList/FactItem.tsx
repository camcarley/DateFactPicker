interface FactItemProps {
	id: string;
	index: number;
	description: string;
	removeFactFromList: (id: string) => void;
}

const FactItem: React.FC<FactItemProps> = ({ description, id, removeFactFromList, index }: FactItemProps) => {
	/**
	 * @param e React.MouseEvent<HTMLButtonElement>
	 * @param id of fact to be deleted
	 */
	const handleDelete = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
		e.preventDefault();
		removeFactFromList(id);
	};

	return (
		<div
			aria-label="Fact Item"
			style={{
				float: "left",
				height: 100,
				position: "absolute",
				width: "100%",
				top: `${index * 100}px`,
			}}
		>
			{description}
			<button id={`Delete fact ${index}`} onClick={(e) => handleDelete(e, id)}>
				Delete
			</button>
		</div>
	);
};

export default FactItem;
