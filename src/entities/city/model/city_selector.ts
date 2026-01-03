import { StateSchema } from '../../../app/providers/store/model/state_interfaces';

export const getCityName = (state: StateSchema) => state.city.name;
