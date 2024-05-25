'use client';

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { getTestings, importNextPatient } from "utils/api";
import { QueryKeys } from "utils/types";

export default function Page() {

  const { data: testings, isPending: testingsIsLoading, refetch } = useQuery({ queryKey: [QueryKeys.testings], queryFn: getTestings });
  const queryClient = useQueryClient()

  const { isPending: importingIsLoading, mutate} = useMutation({
    mutationFn: importNextPatient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.testings] })
    },
  })

  const isLoading = testingsIsLoading || importingIsLoading;

  return <>
    <h1>Ino test assessment</h1>
    {isLoading && <div>loading...</div>}
    <div><button onClick={() => mutate()}>Import next patient</button></div>
    <div><button onClick={() => refetch()}>Refresh testings</button></div>
    {!isLoading && !testings?.length && <div>No data</div>}
    <table style={{border:'solid 1px black'}}>
      {(testings ?? []).map(testing => (
        <tr key={`testing-${testing.id}`}>
          <td style={{border:'solid 1px black'}}>{format(testing.createdAt, 'yyyy-MM-dd')}</td>
          <td style={{border:'solid 1px black'}}>
            patient: {testing.patient.externalId} ({testing.patient.id})<br />
            birthday: {format(testing.patient.birthday, 'yyyy-MM-dd')}<br />
            gnd/etn: {testing.patient.gender}/{testing.patient.ethnicity}
          </td>
          {(testing.testingItems ?? []).map(testingItem => (<td style={{border:'solid 1px black'}}>{testingItem.name}: {testingItem.value} {testingItem.unit}</td>))}
        </tr>
      ))}
    </table>
  </>;
}
