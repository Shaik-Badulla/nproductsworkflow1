export type Demo = {
  
  id: string;
  medicineCategory: string;
  medicineName: string;
  batchNo: string;
  expiryDate: string  ;
  mrp: boolean;
  batchAmount: boolean;
  salePrice: boolean;
  packingQuantity: number;
  quantity: number;
  purchasePrice: boolean;
  tax: boolean;
  amount: boolean;
  // createdDateTime: string;
  
};
export type DemoRequest = {

  id?: string;
  medicineCategory?: string;
  medicineName?: string;
  batchNo?: string;
  expiryDate?: string;  
  mrp?: boolean;
  batchAmount?: boolean;
  salePrice?: boolean;
  packingQuantity?: number;
  quantity?: number;
  purchasePrice?: boolean;
  tax?: boolean;
  amount?: boolean;
  // createdDateTime?: string;
};

export type DemoState = {
  loadingStatus: string;
  createStatus: string;
  updateStatus: string;
  deleteStatus: string;
  statusChangeStatus: string;
  error: boolean;
  errorMessage: string | null;
  demos: Demo[];
  demo: Demo | null;
  sortBy: string | null;
  filters: {
    email: string;
  };
  selectedDemosName: string;
};
