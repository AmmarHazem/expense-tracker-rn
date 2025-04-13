import { View, Text, StyleSheet } from "react-native";
import { Expense } from "../types/expense";
import { format } from "date-fns";

interface ExpenseItemProps {
  expense: Expense;
}

export function ExpenseItem({ expense }: ExpenseItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Text style={styles.amount}>${expense.amount.toFixed(2)}</Text>
        <Text style={styles.category}>
          {expense.category} - {expense.subCategory}
        </Text>
        {expense.description && <Text style={styles.description}>{expense.description}</Text>}
      </View>
      <View style={styles.rightSection}>
        <Text style={styles.date}>{format(expense.date, "MMM d, yyyy")}</Text>
        <Text style={styles.time}>{format(expense.date, "h:mm a")}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    backgroundColor: "white",
  },
  leftSection: {
    flex: 1,
  },
  rightSection: {
    alignItems: "flex-end",
  },
  amount: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  description: {
    fontSize: 12,
    color: "#999",
  },
  date: {
    fontSize: 14,
    color: "#666",
  },
  time: {
    fontSize: 12,
    color: "#999",
  },
});
