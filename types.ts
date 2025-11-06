export interface GuestData {
  id: string;
  field1: string;
  field2: string;
  timestamp: string;
}

export interface DataContextType {
  guestData: GuestData[];
  addGuestData: (data: { field1: string; field2: string }) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}