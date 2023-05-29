import { useIf } from "composables/run/if";
import { IS_TEST } from "../constants/dev";

const [inTest, inNotTest] = useIf(IS_TEST);

export { inTest, inNotTest };
