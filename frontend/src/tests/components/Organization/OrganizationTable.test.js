import { fireEvent, render, waitFor } from "@testing-library/react";
import { organizationFixtures } from "fixtures/organizationFixtures";
import OrganizationTable from "main/components/Organization/OrganizationTable";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import { currentUserFixtures } from "fixtures/currentUserFixtures";

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("OrganizationTable tests", () => {
  const queryClient = new QueryClient();

  test("renders without crashing for empty table with user not logged in", () => {
    const currentUser = null;

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <OrganizationTable organization={[]} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>
    );
  });
  test("renders without crashing for empty table for ordinary user", () => {
    const currentUser = currentUserFixtures.userOnly;

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <OrganizationTable organization={[]} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>
    );
  });

  test("renders without crashing for empty table for admin", () => {
    const currentUser = currentUserFixtures.adminUser;

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <OrganizationTable organization={[]} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>
    );
  });

  test("Has the expected column headers and content for adminUser", () => {
    const currentUser = currentUserFixtures.adminUser;

    const { getByText, getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <OrganizationTable
            organization={organizationFixtures.threeOrganization}
            currentUser={currentUser}
          />
        </MemoryRouter>
      </QueryClientProvider>
    );

    const expectedHeaders = [
      "orgCode",
      "orgTranslationShort",
      "orgTranslation",
      "inactive",
    ];
    const expectedFields = [
      "orgCode",
      "orgTranslationShort",
      "orgTranslation",
      "inactive",
    ];
    const testId = "OrganizationTable";

    expectedHeaders.forEach((headerText) => {
      const header = getByText(headerText);
      expect(header).toBeInTheDocument();
    });

    expectedFields.forEach((field) => {
      const header = getByTestId(`${testId}-cell-row-0-col-${field}`);
      expect(header).toBeInTheDocument();
    });

    expect(getByTestId(`${testId}-cell-row-0-col-orgCode`)).toHaveTextContent(
      "ABC"
    );
    expect(getByTestId(`${testId}-cell-row-1-col-orgCode`)).toHaveTextContent(
      "DEF"
    );

    const editButton = getByTestId(`${testId}-cell-row-0-col-Edit-button`);
    expect(editButton).toBeInTheDocument();
    expect(editButton).toHaveClass("btn-primary");

    // const deleteButton = getByTestId(`${testId}-cell-row-0-col-Delete-button`);
    // expect(deleteButton).toBeInTheDocument();
    // expect(deleteButton).toHaveClass("btn-danger");
  });

  test("Edit button navigates to the edit page for admin user", async () => {
    const currentUser = currentUserFixtures.adminUser;

    const { getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <OrganizationTable
            organization={organizationFixtures.threeOrganization}
            currentUser={currentUser}
          />
        </MemoryRouter>
      </QueryClientProvider>
    );

    const testId = "OrganizationTable";

    await waitFor(() => {
      expect(getByTestId(`${testId}-cell-row-0-col-orgCode`)).toHaveTextContent(
        "ABC"
      );
    });

    const editButton = getByTestId(`${testId}-cell-row-0-col-Edit-button`);
    expect(editButton).toBeInTheDocument();

    fireEvent.click(editButton);

    await waitFor(() =>
      expect(mockedNavigate).toHaveBeenCalledWith("/ucsborganization/edit/ABC")
    );
  });
});
