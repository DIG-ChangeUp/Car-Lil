import {atom, PrimitiveAtom} from 'jotai';
import {ICheckRentalData} from '../../globals';

export const atomCheckRentalData:PrimitiveAtom<ICheckRentalData> = atom({} as ICheckRentalData);