import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Expense } from "@/types/expense";
import { format } from "date-fns";
import { FontAwesome } from "@expo/vector-icons";
import { useExpenses } from "@/context/ExpenseContext";

interface ExpenseItemProps {
  expense: Expense;
}

export function ExpenseItem({ expense }: ExpenseItemProps) {
  const { deleteExpense } = useExpenses();

  const handleDelete = () => {
    Alert.alert("Delete Expense", "Are you sure you want to delete this expense?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteExpense(expense.id),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Text style={styles.amount}>${expense.amount.toFixed(2)}</Text>
        <Text style={styles.category}>
          {expense.category} - {expense.subCategory}
        </Text>
        {expense.description && (
          <Text style={styles.description}>{expense.description}</Text>
        )}
      </View>
      <View style={styles.rightSection}>
        <Text style={styles.date}>{format(expense.date, "MMM d, yyyy")}</Text>
        <Text style={styles.time}>{format(expense.date, "h:mm a")}</Text>
        <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
          <FontAwesome name="trash-o" size={16} color="#ff3b30" />
        </TouchableOpacity>
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
  deleteButton: {
    marginTop: 8,
    padding: 4,
  },
});
