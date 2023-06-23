import { REQUIRE } from "../../constants";
import { Requirement } from "../../types";
import { Avatar } from "../Avatar";
import "./RequireForm.scss";

type Props = {
	newRequire: Requirement[];
	setRequire: (arr: Requirement[]) => void;
};

export const RequireForm = ({ setRequire, newRequire }: Props) => {
	const findItemByLabel = (label: string) => {
		return REQUIRE.find((item) => item.label === label);
	};

	const someItemByLabel = (label: string) => {
		return newRequire.some((checkedItem) => checkedItem.label === label);
	};

	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, label: string) => {
		if (event.target.checked) {
			const item = findItemByLabel(label);
			if (item) {
				const { label, must } = item;
				setRequire([...newRequire, { label, must }]);
			}
		} else {
			setRequire(newRequire.filter((item) => item.label !== label));
		}
	};

	return (
		<div className="RequireForm">
			{REQUIRE.map((item) => (
				<div key={item.label}>
					<input
						id={item.label}
						type="checkbox"
						checked={someItemByLabel(item.label)}
						onChange={(event) => handleCheckboxChange(event, item.label)}
					/>
					<label htmlFor={item.label} className={someItemByLabel(item.label) ? "active" : ""}>
						<Avatar title={item.label} color={item.color} must={item.must} />
						<p>{item.label}</p>
					</label>
				</div>
			))}
		</div>
	);
};