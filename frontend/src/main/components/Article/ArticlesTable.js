import OurTable, { _ButtonColumn} from "main/components/OurTable";
import { _useBackendMutation } from "main/utils/useBackend";
import { _hasRole } from "main/utils/currentUser";

export default function ArticlesTable({ articles, _currentUser }) {

    const columns = [
        {
            Header: 'id',
            accessor: 'id', 
        },
        {
            Header: 'Date Added',
            accessor: 'dateAdded', 
        },
        {
            Header: 'Email',
            accessor: 'email',
        },
        {
            Header: 'Explanation',
            accessor: 'explanation',
        },
        {
            Header: 'Title',
            accessor: 'title',
        },
        {
            Header: 'URL',
            accessor: 'url',
        }
    ];

    const testid = "ArticlesTable";

    // const columnsIfAdmin = [
    //     ...columns,
    //     ButtonColumn("Delete", "danger", deleteCallback, testid)
    // ];

    // const columnsToDisplay = hasRole(currentUser, "ROLE_ADMIN") ? columnsIfAdmin : columns;
    const columnsToDisplay = columns;

    return <OurTable
        data={articles}
        columns={columnsToDisplay}
        testid={testid}
    />;
};