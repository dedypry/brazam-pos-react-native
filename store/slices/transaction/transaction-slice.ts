import {
    ITransaction,
    ITrxFilter,
    ITrxTodayStat,
} from "@/utils/interfaces/product";
import { createSlice } from "@reduxjs/toolkit";

export const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    selectedFilter: "all",
    searchQuery: "",
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
      {
        id: "001233",
        type: "sale",
        date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        total: "23.75",
        items: 2,
        paymentMethod: "Cash",
      },
      {
        id: "001232",
        type: "sale",
        date: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
        total: "67.20",
        items: 5,
        customer: "Jane Smith",
        paymentMethod: "Credit Card",
      },
      {
        id: "001231",
        type: "sale",
        date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Yesterday
        total: "12.99",
        items: 1,
        paymentMethod: "Mobile Pay",
      },
      {
        id: "001230",
        type: "sale",
        date: new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString(), // Yesterday
        total: "89.45",
        items: 7,
        customer: "Bob Johnson",
        paymentMethod: "Credit Card",
      },
    ] as ITransaction[],
    filters: [
      { id: "all", name: "All", color: "#FF6B6B" },
      { id: "today", name: "Today", color: "#4ECDC4" },
      { id: "week", name: "This Week", color: "#45B7D1" },
      { id: "month", name: "This Month", color: "#96CEB4" },
    ] as ITrxFilter[],
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

export const { setTrx, setSelectedFilter, setSearchQuery } = transactionSlice.actions;
export default transactionSlice.reducer;
