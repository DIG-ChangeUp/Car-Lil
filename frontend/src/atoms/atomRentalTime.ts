import {atom, PrimitiveAtom} from 'jotai';
import {ICheckRentalInfo} from '../../globals';

export const atomCheckRentalInfo:PrimitiveAtom<ICheckRentalInfo> = atom({} as ICheckRentalInfo);