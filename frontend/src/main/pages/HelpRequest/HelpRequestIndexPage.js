import React from 'react'
import { useBackend } from 'main/utils/useBackend';

import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import HelpRequestTable from 'main/components/HelpRequest/HelpRequestTable';
import { useCurrentUser } from 'main/utils/currentUser';

export default function HelpRequestIndexPage() {
  
  const currentUser = useCurrentUser()

  const { data: helpRequest, error: _error, status: _status} = 
    useBackend(
       // Stryker disable next-line all : don't test internal caching of React Query
       ["/api/helprequest/all"],
       // Stryker disable next-line StringLiteral,ObjectLiteral : since "GET" is default, "" is an equivalent mutation
       { method: "GET", url: "/api/helprequest/all" },
       []

    );
  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Help Request Item</h1>
          <HelpRequestTable helpRequest={helpRequest} currentUser={currentUser} />
      </div>
    </BasicLayout>
  )
}