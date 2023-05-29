import { useIf } from "composables/run/if";
import { IS_PRODUCTION } from "../constants/dev";

const [inProduction, inNotProduction] = useIf(IS_PRODUCTION);

export { inProduction, inNotProduction };
