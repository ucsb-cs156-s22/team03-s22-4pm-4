import {  render } from "@testing-library/react";
import { ucsbDiningCommonsMenuItemFixtures } from "fixtures/ucsbDiningCommonsMenuItemFixtures";
import UCSBDiningCommonsMenuItemTable from "main/components/UCSBDiningCommonsMenuItem/UCSBDiningCommonsMenuItemTable";
import { cellToAxiosParamsDelete } from "main/components/UCSBDiningCommonsMenuItem/UCSBDiningCommonsMenuItemTable";
import { onDeleteSuccess } from "main/utils/UCSBDateUtils"
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import { currentUserFixtures } from "fixtures/currentUserFixtures";
import mockConsole from "jest-mock-console";


const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));

describe("UCSBDiningCommonsMenuItemTable tests", () => {
  const queryClient = new QueryClient();


  test("renders without crashing for empty table with user not logged in", () => {
    const currentUser = null;

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <UCSBDiningCommonsMenuItemTable ucsbDiningCommonsMenuItems={[]} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>

    );
  });
  test("renders without crashing for empty table for ordinary user", () => {
    const currentUser = currentUserFixtures.userOnly;

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <UCSBDiningCommonsMenuItemTable ucsbDiningCommonsMenuItems={[]} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>

    );
  });

  test("renders without crashing for empty table for admin", () => {
    const currentUser = currentUserFixtures.adminUser;

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <UCSBDiningCommonsMenuItemTable ucsbDiningCommonsMenuItems={[]} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>

    );
  });

  test("Has the expected column headers and content for adminUser", () => {
    const currentUser = currentUserFixtures.adminUser;
    const { getByText, getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <UCSBDiningCommonsMenuItemTable ucsbDiningCommonsMenuItems={ucsbDiningCommonsMenuItemFixtures.threeMenuItems} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>
    );
    const expectedHeaders = ['id',  'Dining Commons Code', 'Name','Station'];
    const expectedFields = ['id', 'diningCommonsCode','name', 'station'];
    const testId = "UCSBDiningCommonsMenuItemTable";
    expectedHeaders.forEach((headerText) => {
      const header = getByText(headerText);
      expect(header).toBeInTheDocument();
    });
    expectedFields.forEach((field) => {
      const header = getByTestId(`${testId}-cell-row-0-col-${field}`);
      expect(header).toBeInTheDocument();
    });
    expect(getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent("1");
    expect(getByTestId(`${testId}-cell-row-1-col-id`)).toHaveTextContent("2");
    // const editButton = getByTestId(`${testId}-cell-row-0-col-Edit-button`);
    // expect(editButton).toBeInTheDocument();
    // expect(editButton).toHaveClass("btn-primary");
    const deleteButton = getByTestId(`${testId}-cell-row-0-col-Delete-button`);
    expect(deleteButton).toBeInTheDocument();
    expect(deleteButton).toHaveClass("btn-danger");
  });
  // test("Edit button navigates to the edit page for admin user", async () => {
  //   const currentUser = currentUserFixtures.adminUser;
  //   const { getByTestId } = render(
  //     <QueryClientProvider client={queryClient}>
  //       <MemoryRouter>
  //         <UCSBDatesTable diningCommons={ucsbDatesFixtures.threeDates} currentUser={currentUser} />
  //       </MemoryRouter>
  //     </QueryClientProvider>
  //   );
  //   await waitFor(() => { expect(getByTestId(`UCSBDatesTable-cell-row-0-col-id`)).toHaveTextContent("1"); });
  //   const editButton = getByTestId(`UCSBDatesTable-cell-row-0-col-Edit-button`);
  //   expect(editButton).toBeInTheDocument();
    
  //   fireEvent.click(editButton);
  //   await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith('/ucsbdates/edit/1'));
  // });

});

const mockToast = jest.fn();
jest.mock('react-toastify', () => {
  const originalModule = jest.requireActual('react-toastify');
  return {
      __esModule: true,
      ...originalModule,
      toast: (x) => mockToast(x)
  };
});

describe("UCSBDiningCommonsUtils", () => {

  describe("onDeleteSuccess", () => {

      test("It puts the message on console.log and in a toast", () => {
          // arrange
          const restoreConsole = mockConsole();

          // act
          onDeleteSuccess("abc");

          // assert
          expect(mockToast).toHaveBeenCalledWith("abc");
          expect(console.log).toHaveBeenCalled();
          const message = console.log.mock.calls[0][0];
          expect(message).toMatch("abc");

          restoreConsole();
      });

  });
  describe("cellToAxiosParamsDelete", () => {

      test("It returns the correct params", () => {
          // arrange
          const cell = { row: { values: { id: 17 } } };

          // act
          const result = cellToAxiosParamsDelete(cell);

          // assert
          expect(result).toEqual({
              url: "/api/ucsbdiningcommonsmenuitem",
              method: "DELETE",
              params: { id: 17 }
          });
      });

  });
});
