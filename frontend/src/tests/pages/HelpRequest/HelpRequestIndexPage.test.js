<<<<<<< HEAD
import { fireEvent, render, waitFor } from "@testing-library/react";
=======
import { render } from "@testing-library/react";
>>>>>>> f5b8906406158e4199835c7e351f772c232e5130
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import HelpRequestIndexPage from "main/pages/HelpRequest/HelpRequestIndexPage";


import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
<<<<<<< HEAD
import { helpRequestFixtures } from "fixtures/helpRequestFixtures";
=======
>>>>>>> f5b8906406158e4199835c7e351f772c232e5130
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import _mockConsole from "jest-mock-console";


const mockToast = jest.fn();
jest.mock('react-toastify', () => {
    const originalModule = jest.requireActual('react-toastify');
    return {
        __esModule: true,
        ...originalModule,
        toast: (x) => mockToast(x)
    };
});

describe("HelpRequestIndexPage tests", () => {

    const axiosMock =new AxiosMockAdapter(axios);

<<<<<<< HEAD
    const testId = "HelpRequestTable";
=======

>>>>>>> f5b8906406158e4199835c7e351f772c232e5130

    const setupUserOnly = () => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    };

    const setupAdminUser = () => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.adminUser);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    };

    test("renders without crashing for regular user", () => {
        setupUserOnly();
        const queryClient = new QueryClient();
<<<<<<< HEAD
        axiosMock.onGet("/api/helprequest/all").reply(200, []);
=======
>>>>>>> f5b8906406158e4199835c7e351f772c232e5130

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <HelpRequestIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );


    });

    test("renders without crashing for admin user", () => {
        setupAdminUser();
        const queryClient = new QueryClient();
<<<<<<< HEAD
        axiosMock.onGet("/api/helprequest/all").reply(200, []);
=======
>>>>>>> f5b8906406158e4199835c7e351f772c232e5130

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <HelpRequestIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );


    });
<<<<<<< HEAD

    test("renders three helpRequest without crashing for regular user", async () => {
        setupUserOnly();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/helprequest/all").reply(200, helpRequestFixtures.threeRequests);

        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <HelpRequestIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(  () => { expect(getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent("1"); } );
        expect(getByTestId(`${testId}-cell-row-1-col-id`)).toHaveTextContent("2");
        expect(getByTestId(`${testId}-cell-row-2-col-id`)).toHaveTextContent("3");

    });

    test("renders three requests without crashing for admin user", async () => {
        setupAdminUser();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/helprequest/all").reply(200, helpRequestFixtures.threeRequests);

        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <HelpRequestIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => { expect(getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent("1"); });
        expect(getByTestId(`${testId}-cell-row-1-col-id`)).toHaveTextContent("2");
        expect(getByTestId(`${testId}-cell-row-2-col-id`)).toHaveTextContent("3");

    });

    test("renders empty table when backend unavailable, user only", async () => {
        setupUserOnly();

        const queryClient = new QueryClient();
        axiosMock.onGet("/api/helprequest/all").timeout();

        const { queryByTestId, getByText } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <HelpRequestIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => { expect(axiosMock.history.get.length).toBeGreaterThanOrEqual(1); });

        const expectedHeaders = ['id',  'Requester Email', 'Team ID','Table or Breakout Room','Time','Explanation','Solved'];
    
        expectedHeaders.forEach((headerText) => {
          const header = getByText(headerText);
          expect(header).toBeInTheDocument();
        });

        expect(queryByTestId(`${testId}-cell-row-0-col-id`)).not.toBeInTheDocument();
    });

    test("test what happens when you click delete, admin", async () => {
        setupAdminUser();

        const queryClient = new QueryClient();
        axiosMock.onGet("/api/helprequest/all").reply(200, helpRequestFixtures.threeRequests);
        axiosMock.onDelete("/api/helprequest").reply(200, "HelpRequest with id 1 was deleted");


        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <HelpRequestIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => { expect(getByTestId(`${testId}-cell-row-0-col-id`)).toBeInTheDocument(); });

       expect(getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent("1"); 


        const deleteButton = getByTestId(`${testId}-cell-row-0-col-Delete-button`);
        expect(deleteButton).toBeInTheDocument();
       
        fireEvent.click(deleteButton);

        await waitFor(() => { expect(mockToast).toBeCalledWith("HelpRequest with id 1 was deleted") });

    });

=======
>>>>>>> f5b8906406158e4199835c7e351f772c232e5130
});