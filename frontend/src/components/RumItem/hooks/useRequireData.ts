import { useMemo } from "react";
import { REQUIRE } from "../../../constants";
import { Requirement } from "../../../types";

export const useRequireData = (require: Requirement[]) => {
	const hasMultipleItems = require.length > 1;
	const hasSingleItem = require.length === 1;
	const lastItemLabel = require[require.length - 1]?.label;
	const firstItemLabel = require[0]?.label;
	const mustExist = require.some(({ must }) => must);

    const avatarTitle = useMemo(() => {
        if (hasMultipleItems) {
          return String(require.length);
        } else if (hasSingleItem) {
          return firstItemLabel;
        } else {
          return REQUIRE[REQUIRE.length - 1].label;
        }
      }, [hasMultipleItems, hasSingleItem, firstItemLabel, require]);

      const avatarColor = useMemo(() => {
        if (hasMultipleItems) {
          return REQUIRE.find(({ label }) => label === lastItemLabel)?.color;
        } else if (hasSingleItem) {
          return REQUIRE.find(({ label }) => label === firstItemLabel)?.color;
        } else {
          return REQUIRE[REQUIRE.length - 1].color;
        }
      }, [hasMultipleItems, hasSingleItem, lastItemLabel, firstItemLabel]);

      const avatarMust = useMemo(() => hasMultipleItems || mustExist, [hasMultipleItems, mustExist]);

	return {
		avatarTitle,
		avatarColor,
		avatarMust,
		hasMultipleItems,
		hasSingleItem,
		lastItemLabel,
		firstItemLabel,
		mustExist,
	};
};
