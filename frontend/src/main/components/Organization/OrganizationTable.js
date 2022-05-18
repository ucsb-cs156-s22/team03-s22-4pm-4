import OurTable, { ButtonColumn } from "main/components/OurTable";
import { useBackendMutation } from "main/utils/useBackend";
import {
  cellToAxiosParamsDelete,
  onDeleteSuccess,
} from "main/utils/organizationUtils";
import { useNavigate } from "react-router-dom";
import { hasRole } from "main/utils/currentUser";

export default function OrganizationTable({ organization, currentUser }) {
  const navigate = useNavigate();

  const editCallback = (cell) => {
    navigate(`/ucsborganization/edit/${cell.row.values.orgCode}`);
  };

  // Stryker disable all : hard to test for query caching
  const deleteMutation = useBackendMutation(
    cellToAxiosParamsDelete,
    { onSuccess: onDeleteSuccess },
    ["/api/ucsbdates/all"]
  );
  // Stryker enable all

  // Stryker disable next-line all : TODO try to make a good test for this
  const deleteCallback = async (cell) => {
    deleteMutation.mutate(cell);
  };

  const columns = [
    {
      Header: "orgCode",
      accessor: "orgCode", // accessor is the "key" in the data
    },
    {
      Header: "orgTranslationShort",
      accessor: "orgTranslationShort",
    },
    {
      Header: "orgTranslation",
      accessor: "orgTranslation",
    },
    {
      Header: "inactive",
      id: "inactive",
      accessor: (row, _rowIndex) => String(row.inactive),
    },
  ];

  const columnsIfAdmin = [
    ...columns,
    ButtonColumn("Edit", "primary", editCallback, "OrganizationTable"),
    ButtonColumn("Delete", "danger", deleteCallback, "OrganizationTable"),
  ];

  const columnsToDisplay = hasRole(currentUser, "ROLE_ADMIN")
    ? columnsIfAdmin
    : columns;

  return (
    <OurTable
      data={organization}
      columns={columnsToDisplay}
      testid={"OrganizationTable"}
    />
  );
}
