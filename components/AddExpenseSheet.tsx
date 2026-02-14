import {
  StyleSheet,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { useExpenses } from "@/context/ExpenseContext";
import { EXPENSE_CATEGORIES } from "@/types/expense";
import { Button } from "@/components/Button";

export interface AddExpenseSheetRef {
  present: () => void;
  dismiss: () => void;
}

export const AddExpenseSheet = forwardRef<AddExpenseSheetRef>((_, ref) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null
  );
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const { addExpense } = useExpenses();

  useImperativeHandle(ref, () => ({
    present: () => bottomSheetRef.current?.present(),
    dismiss: () => bottomSheetRef.current?.dismiss(),
  }));

  const resetForm = () => {
    setAmount("");
    setDescription("");
    setSelectedCategory(null);
    setSelectedSubCategory(null);
  };

  const handleAddExpense = () => {
    const parsed = parseFloat(amount);
    if (!amount || isNaN(parsed) || parsed <= 0) {
      Alert.alert("Invalid amount", "Please enter a valid amount.");
      return;
    }
    if (!selectedCategory || !selectedSubCategory) {
      Alert.alert("Missing category", "Please select a category and sub-category.");
      return;
    }

    addExpense({
      amount: parsed,
      category: selectedCategory,
      subCategory: selectedSubCategory,
      date: new Date(),
      description: description.trim() || undefined,
    });

    resetForm();
    bottomSheetRef.current?.dismiss();
  };

  const categories = Object.keys(EXPENSE_CATEGORIES);
  const subCategories = selectedCategory
    ? EXPENSE_CATEGORIES[selectedCategory]
    : [];

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={["70%"]}
      enablePanDownToClose
      onDismiss={resetForm}
    >
      <BottomSheetView style={styles.container}>
        <ThemedText type="title" style={styles.title}>
          Add New Expense
        </ThemedText>

        <View style={styles.inputContainer}>
          <ThemedText style={styles.label}>Amount</ThemedText>
          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={setAmount}
            placeholder="0.00"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <ThemedText style={styles.label}>Category</ThemedText>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.chipScroll}
          >
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.chip,
                  selectedCategory === cat && styles.chipSelected,
                ]}
                onPress={() => {
                  setSelectedCategory(cat);
                  setSelectedSubCategory(null);
                }}
              >
                <ThemedText
                  style={[
                    styles.chipText,
                    selectedCategory === cat && styles.chipTextSelected,
                  ]}
                >
                  {cat}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {selectedCategory && (
          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Sub-category</ThemedText>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.chipScroll}
            >
              {subCategories.map((sub) => (
                <TouchableOpacity
                  key={sub}
                  style={[
                    styles.chip,
                    selectedSubCategory === sub && styles.chipSelected,
                  ]}
                  onPress={() => setSelectedSubCategory(sub)}
                >
                  <ThemedText
                    style={[
                      styles.chipText,
                      selectedSubCategory === sub && styles.chipTextSelected,
                    ]}
                  >
                    {sub}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        <View style={styles.inputContainer}>
          <ThemedText style={styles.label}>Description (optional)</ThemedText>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={setDescription}
            placeholder="What was this expense for?"
          />
        </View>

        <Button title="Add Expense" onPress={handleAddExpense} />
      </BottomSheetView>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },
  inputContainer: {
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  chipScroll: {
    flexDirection: "row",
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    marginRight: 8,
  },
  chipSelected: {
    backgroundColor: "#007AFF",
  },
  chipText: {
    fontSize: 14,
    color: "#333",
  },
  chipTextSelected: {
    color: "#fff",
  },
});
