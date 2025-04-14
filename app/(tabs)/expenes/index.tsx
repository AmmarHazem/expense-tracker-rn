import { View, FlatList, StyleSheet } from "react-native";
import { ExpenseItem } from "../../../components/ExpenseItem";
import { dummyExpenses } from "../../../types/expense";

export default function ExpensesScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={dummyExpenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ExpenseItem expense={item} />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  list: {
    paddingBottom: 16,
  },
});
