import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useExpenses } from "@/context/ExpenseContext";
import { useMemo } from "react";

const CATEGORY_COLORS: Record<string, string> = {
  Food: "#FF6384",
  Transportation: "#36A2EB",
  Entertainment: "#FFCE56",
  Shopping: "#4BC0C0",
  Bills: "#9966FF",
  Health: "#FF9F40",
  Other: "#C9CBCF",
};

export default function AnalyticsScreen() {
  const { expenses } = useExpenses();

  const stats = useMemo(() => {
    const total = expenses.reduce((sum, e) => sum + e.amount, 0);
    const byCategory: Record<string, number> = {};
    for (const e of expenses) {
      byCategory[e.category] = (byCategory[e.category] || 0) + e.amount;
    }

    const sorted = Object.entries(byCategory).sort(([, a], [, b]) => b - a);
    return { total, byCategory: sorted, count: expenses.length };
  }, [expenses]);

  if (expenses.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No data yet</Text>
        <Text style={styles.emptySubText}>
          Add some expenses to see analytics.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>Total Spending</Text>
        <Text style={styles.summaryAmount}>${stats.total.toFixed(2)}</Text>
        <Text style={styles.summaryCount}>
          {stats.count} expense{stats.count !== 1 ? "s" : ""}
        </Text>
      </View>

      <Text style={styles.sectionTitle}>By Category</Text>

      {stats.byCategory.map(([category, amount]) => {
        const percentage = (amount / stats.total) * 100;
        const color = CATEGORY_COLORS[category] || "#C9CBCF";

        return (
          <View key={category} style={styles.categoryRow}>
            <View style={styles.categoryHeader}>
              <View style={styles.categoryLabelRow}>
                <View
                  style={[styles.colorDot, { backgroundColor: color }]}
                />
                <Text style={styles.categoryName}>{category}</Text>
              </View>
              <Text style={styles.categoryAmount}>${amount.toFixed(2)}</Text>
            </View>
            <View style={styles.barBackground}>
              <View
                style={[
                  styles.barFill,
                  { width: `${percentage}%`, backgroundColor: color },
                ]}
              />
            </View>
            <Text style={styles.percentage}>{percentage.toFixed(1)}%</Text>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#666",
  },
  emptySubText: {
    fontSize: 14,
    color: "#999",
    marginTop: 8,
  },
  summaryCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  summaryAmount: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#333",
  },
  summaryCount: {
    fontSize: 14,
    color: "#999",
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 12,
  },
  categoryRow: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  categoryLabelRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  colorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  categoryAmount: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  barBackground: {
    height: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: 4,
  },
  percentage: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
    textAlign: "right",
  },
});
