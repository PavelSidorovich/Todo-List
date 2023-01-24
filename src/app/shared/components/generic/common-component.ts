import { FetchStatus } from '../../constants/fetch-status.enum';

export abstract class CommonComponent {
  availiableFetchStatus = FetchStatus;
  fetchStatus: FetchStatus = FetchStatus.INITIAL;
  errorMsg: string | undefined;
}
