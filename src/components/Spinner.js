import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

const Spinner = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let timer = setTimeout(() => setShow(true), 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);


  return(
    <View style={styles.container}>
      <ActivityIndicator size="large" />
      {
        show && (
          <View style={styles.message}>
            <Text>This is taking longer than usual...</Text>
            <Text>Please go back and try again</Text>
          </View>
        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  message: {
    alignItems: 'center',
    marginTop: 15
  }
});

export default Spinner;
