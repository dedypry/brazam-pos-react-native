import { ITransaction, ITrxTodayStat } from "@/utils/interfaces/product";
import { createSlice } from "@reduxjs/toolkit";

export const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    selectedFilter: "all",
    searchQuery: "",
    transaction: {
      type: "input",
      price: 0,
      totalPrice: 0,
      note: "",
      customerId: null,
      paymentMethod: "",
      addtionalNote: "",
      photo: "",
      discount: 0,
      discountType: "percentage",
      additionFee:[],
    },
    paymentMethod: [
      { id: "cash", label: "Tunai" },
      { id: "bank_transfer", label: "Transfer Bank" },
      { id: "debit_card", label: "Kartu Debit" },
      { id: "credit_card", label: "Kartu Kredit" },
      { id: "other", label: "Lainnya" },
    ],
    transactions: [
      {
        id: "001234",
        type: "sale",
        date: new Date().toISOString(),
        total: "45.50",
        items: 3,
        customer: "John Doe",
        paymentMethod: "Credit Card",
      },
    ] as ITransaction[],
    filters: [
      { id: "all", name: "All", color: "#FF6B6B" },
      { id: "today", name: "Today", color: "#4ECDC4" },
      { id: "week", name: "This Week", color: "#45B7D1" },
      { id: "month", name: "This Month", color: "#96CEB4" },
    ] as any[],
    todayStats: [
      {
        title: "Today's Revenue",
        value: "$149.44",
        change: "+12.5%",
        isPositive: true,
      },
      {
        title: "Transactions",
        value: "12",
        change: "+8.2%",
        isPositive: true,
      },
      {
        title: "Avg. Sale",
        value: "$38.61",
        change: "-2.1%",
        isPositive: false,
      },
    ] as ITrxTodayStat[],
  },
  reducers: {
    setTransaction: (state, action) => {
      state.transaction = { ...state.transaction, ...action.payload };
    },
    resetTransaction: (state) => {
      state.transaction = {
        type: "input",
        price: 0,
        totalPrice: 0,
        note: "",
        customerId: null,
        paymentMethod: "",
        addtionalNote: "",
        photo: "",
        discount: 0,
        discountType: "",
        additionFee: [],
      };
    },

    setTrx: (state, action) => {
      state.transactions = action.payload;
    },
    setSelectedFilter: (state, action) => {
      state.selectedFilter = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  setTrx,
  setSelectedFilter,
  setSearchQuery,
  setTransaction,
  resetTransaction,
} = transactionSlice.actions;
export default transactionSlice.reducer;
