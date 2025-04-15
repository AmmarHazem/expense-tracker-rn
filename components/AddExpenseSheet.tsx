import { Button, StyleSheet, TextInput, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useState, forwardRef, useImperativeHandle } from "react";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { useRef } from "react";

export interface AddExpenseSheetRef {
  present: () => void;
  dismiss: () => void;
}

export const AddExpenseSheet = forwardRef<AddExpenseSheetRef>((_, ref) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  useImperativeHandle(ref, () => ({
    present: () => bottomSheetRef.current?.present(),
    dismiss: () => bottomSheetRef.current?.dismiss(),
  }));

  const handleAddExpense = () => {
    // TODO: Implement expense addition logic
    bottomSheetRef.current?.dismiss();
  };

  return (
    <BottomSheetModal ref={bottomSheetRef} snapPoints={["50%"]} enablePanDownToClose>
      <BottomSheetView style={styles.container}>
        <ThemedText type="title">Add New Expense</ThemedText>

        <View style={styles.inputContainer}>
          <ThemedText>Amount</ThemedText>
          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={setAmount}
            placeholder="Enter amount"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <ThemedText>Description</ThemedText>
          <TextInput style={styles.input} value={description} onChangeText={setDescription} placeholder="Enter description" />
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
  inputContainer: {
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
});
