/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import Page from "./page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as apiModule from "../utils/api";
import { generateMockTesting } from "utils/testingUtils";
import userEvent from '@testing-library/user-event'

jest.mock("../utils/api", () => ({
  getTestings: jest.fn(),
  importNextPatient: jest.fn()
}));

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
      queries: {
          retry: false,
      },
  }
});

export function renderWithClient(ui: React.ReactElement) {
  const testQueryClient = createTestQueryClient()
  const { rerender, ...result } = render(
      <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>
  )
  return {
      ...result,
      rerender: (rerenderUi: React.ReactElement) =>
          rerender(
              <QueryClientProvider client={testQueryClient}>{rerenderUi}</QueryClientProvider>
          ),
  }
}

describe('Home page', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render a page', () => {
    renderWithClient(<Page />);
    
    expect(screen.getByRole('heading')).toHaveTextContent('Ino test assessment');
    expect(screen.getByText('Import next patient')).toBeInTheDocument();
    expect(screen.getByText('Refresh testings')).toBeInTheDocument();
  });

  it('should render a page with no data', async () => {
    (apiModule.getTestings as jest.Mock).mockResolvedValue([]);

    renderWithClient(<Page />);

    await screen.findByText('No data');
    expect(screen.getByText('No data')).toBeInTheDocument();
  });

  it('should render a page with data', async () => {
    const testing = generateMockTesting();
    (apiModule.getTestings as jest.Mock).mockResolvedValue([testing]);

    renderWithClient(<Page />);

    await screen.findByText(new RegExp(testing.patient.externalId));
    expect(screen.getByText(new RegExp(testing.patient.externalId))).toBeInTheDocument();
  });

  describe('Refresh testings button', () => {
    const user = userEvent.setup();
    const getTestingsFn = apiModule.getTestings as jest.Mock;

    beforeEach(() => {
      getTestingsFn.mockResolvedValue([]);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('should refetch data on refresh testings button click', async () => {
      renderWithClient(<Page />);
  
      const refreshButton = screen.getByText('Refresh testings');
  
      expect(getTestingsFn).toHaveBeenCalledTimes(1);
  
      await user.click(refreshButton);
  
      expect(getTestingsFn).toHaveBeenCalledTimes(2)
    });

    it('should show loading... when refetching the data', async () => {
      renderWithClient(<Page />);
  
      const refreshButton = screen.getByText('Refresh testings');
  
      user.click(refreshButton);
      expect(screen.queryByText('loading...')).toBeInTheDocument();
    });
  });

  describe('Import next patient button', () => {
    const user = userEvent.setup();
    const getTestingsFn = apiModule.getTestings as jest.Mock;
    const importNextPatientFn = apiModule.importNextPatient as jest.Mock;

    beforeEach(() => {
      getTestingsFn.mockResolvedValue([]);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('should refetch data on refresh testings button click', async () => {
      renderWithClient(<Page />);
  
      const importButton = screen.getByText('Import next patient');
  
      expect(importNextPatientFn).toHaveBeenCalledTimes(0);
  
      await user.click(importButton);
  
      expect(importNextPatientFn).toHaveBeenCalledTimes(1)
    });

    it('should show loading... when refetching the data', async () => {
      renderWithClient(<Page />);
  
      const importButton = screen.getByText('Import next patient');
  
      user.click(importButton);
      expect(screen.queryByText('loading...')).toBeInTheDocument();
    });
  });
});
