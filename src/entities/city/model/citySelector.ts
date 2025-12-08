import { StateSchema } from '../../../app/providers/store/model/stateInterfaces';

export const getCityName = (state: StateSchema) => state.city.name;
