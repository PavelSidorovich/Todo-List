import { FetchStatus } from '../../../core/enums/fetch-status';

export abstract class CommonComponent {
  availiableFetchStatus = FetchStatus;
  fetchStatus: FetchStatus = FetchStatus.Initial;
  errorMsg: string | undefined;
}
