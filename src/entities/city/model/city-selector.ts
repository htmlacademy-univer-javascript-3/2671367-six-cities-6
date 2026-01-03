import { StateSchema } from '../../../app/providers/store/model/state-interfaces';

export const getCityName = (state: StateSchema) => state.city.name;
