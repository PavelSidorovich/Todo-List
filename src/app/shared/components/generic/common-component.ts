import { FetchStatus } from '../../enums/fetch-status.enum';

export abstract class CommonComponent {
  availiableFetchStatus = FetchStatus;
  fetchStatus: FetchStatus = FetchStatus.INITIAL;
  errorMsg: string | undefined;
}
