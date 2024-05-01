import request from '../../util/request';
import { teamMapper } from './mapper';

export async function getMyTeam({
  is_deleted = false,
  is_under_pip = false,
}: {
  is_deleted?: boolean;
  is_under_pip?: boolean;
}) {
  const response = await request.get(
    `/my-team/team/employees-list?is_deleted=${+!!is_deleted}`
  );

  if (is_under_pip) {
    return response?.data?.rows?.filter((employee: any) => employee?.is_under_pip);
  }

  return teamMapper.list(response);
}
