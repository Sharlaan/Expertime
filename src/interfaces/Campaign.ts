import { Brand } from './Brand';

export interface Campaign {
  requestId: number;
  advice: false;
  campaignName: string;
  campaignDescription: string;
  decisionDeadline: Date;
  decisionDescription: string;
  key: string;
  numberOfAssets: number;
  createdDate: Date;
  updatedDate: Date | null;
  submittedDate: Date | null;
  validatedDate: Date | null;
  affiliate: Affiliate;
  brand: Brand;
  requestStatus: RequestStatus;
  createdBy: Author;
  updatedBy: Updater | null;
  submittedBy: Submitter | null;
  validatedBy: Validator | null;
  countries: Country[];
  media: Media[];
}

interface Affiliate {
  affiliateId: number;
  name: string;
}

interface RequestStatus {
  requestStatusId: number;
  name: string;
  value: string;
  step: number;
}

interface Media {
  mediaId: number;
  name: string;
  value: string;
}

interface Country {
  countryId: number;
  name: string;
  value: string;
}

interface User {
  userInfoId: number;
  name: string;
  email: string;
}

interface Author extends User {}

interface Updater extends User {}

interface Validator extends User {}

interface Submitter extends User {}
