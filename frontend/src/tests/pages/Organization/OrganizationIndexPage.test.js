import { fireEvent, render, waitFor } from "@testing-library/react"
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import OrganizationIndexPage from "main/pages/Organization/OrganizationIndexPage";

import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import _mockConsole from "jest-mock-console";
import { organizationFixtures } from "fixtures/organizationFixtures";

const mockToast = jest.fn();
jest.mock("react-toastify", () => {
  const originalModule = jest.requireActual("react-toastify");
  return {
    __esModule: true,
    ...originalModule,
    toast: (x) => mockToast(x),
  };
});

describe("OrganizationIndexPage tests", () => {
  const axiosMock = new AxiosMockAdapter(axios);

  const testId = "OrganizationTable";
  
  const setupUserOnly = () => {
    axiosMock.reset();
    axiosMock.resetHistory();
    axiosMock
      .onGet("/api/currentUser")
      .reply(200, apiCurrentUserFixtures.userOnly);
    axiosMock
      .onGet("/api/systemInfo")
      .reply(200, systemInfoFixtures.showingNeither);
  };

  const setupAdminUser = () => {
    axiosMock.reset();
    axiosMock.resetHistory();
    axiosMock
      .onGet("/api/currentUser")
      .reply(200, apiCurrentUserFixtures.adminUser);
    axiosMock
      .onGet("/api/systemInfo")
      .reply(200, systemInfoFixtures.showingNeither);
  };

  test("renders without crashing for regular user", () => {
    setupUserOnly();
    const queryClient = new QueryClient();
    axiosMock.onGet("/api/ucsborganization/all").reply(200, []);

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <OrganizationIndexPage />
        </MemoryRouter>
      </QueryClientProvider>
    );
  });

  test("renders without crashing for admin user", () => {
    setupAdminUser();
    const queryClient = new QueryClient();
    axiosMock.onGet("/api/ucsborganization/all").reply(200, []);

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <OrganizationIndexPage />
        </MemoryRouter>
      </QueryClientProvider>
    );
  });

  test("renders three organization without crashing for regular user", async () => {
    setupUserOnly();
    const queryClient = new QueryClient();
    axiosMock
      .onGet("/api/ucsborganization/all")
      .reply(200, organizationFixtures.threeOrganization);

    const { getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <OrganizationIndexPage />
        </MemoryRouter>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(getByTestId(`${testId}-cell-row-0-col-orgCode`)).toHaveTextContent(
        "ABC"
      );
    });
    expect(getByTestId(`${testId}-cell-row-1-col-orgCode`)).toHaveTextContent(
      "DEF"
    );
    expect(getByTestId(`${testId}-cell-row-2-col-orgCode`)).toHaveTextContent(
      "GHI"
    );
  });

  test("renders three organization without crashing for admin user", async () => {
    setupAdminUser();
    const queryClient = new QueryClient();
    axiosMock
      .onGet("/api/ucsborganization/all")
      .reply(200, organizationFixtures.threeOrganization);

    const { getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <OrganizationIndexPage />
        </MemoryRouter>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(getByTestId(`${testId}-cell-row-0-col-orgCode`)).toHaveTextContent(
        "ABC"
      );
    });
    expect(getByTestId(`${testId}-cell-row-1-col-orgCode`)).toHaveTextContent(
      "DEF"
    );
    expect(getByTestId(`${testId}-cell-row-2-col-orgCode`)).toHaveTextContent(
      "GHI"
    );
  });

  test("renders empty table when backend unavailable, user only", async () => {
    setupUserOnly();

    const queryClient = new QueryClient();
    axiosMock.onGet("/api/ucsborganization/all").timeout();

    const { queryByTestId, getByText } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <OrganizationIndexPage />
        </MemoryRouter>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(axiosMock.history.get.length).toBeGreaterThanOrEqual(3);
    });

    const expectedHeaders = [
      "orgCode",
      "orgTranslationShort",
      "orgTranslation",
      "inactive",
    ];

    expectedHeaders.forEach((headerText) => {
      const header = getByText(headerText);
      expect(header).toBeInTheDocument();
    });

    expect(
      queryByTestId(`${testId}-cell-row-0-col-orgCode`)
    ).not.toBeInTheDocument();
  });

  test("test what happens when you click delete, admin", async () => {
    setupAdminUser();

    const queryClient = new QueryClient();
    axiosMock
      .onGet("/api/ucsborganization/all")
      .reply(200, organizationFixtures.threeOrganization);
    axiosMock
      .onDelete("/api/ucsborganization", { params: { orgCode: "ABC" } })
      .reply(200, "UCSBOrganization with id ABC deleted");

    const { getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <OrganizationIndexPage />
        </MemoryRouter>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(
        getByTestId(`${testId}-cell-row-0-col-orgCode`)
      ).toBeInTheDocument();
    });

    expect(getByTestId(`${testId}-cell-row-0-col-orgCode`)).toHaveTextContent(
      "ABC"
    );

    const deleteButton = getByTestId(`${testId}-cell-row-0-col-Delete-button`);
    expect(deleteButton).toBeInTheDocument();

    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockToast).toBeCalledWith("UCSBOrganization with id ABC deleted");
    });
  });
});
