import { useState } from "react";
import {
    Modal,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Platform
} from "react-native";
import commonStyles from "../commomStyles";

import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function AddTask(props) {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(Platform.OS === 'ios')
        if(selectedDate){
            setDate(selectedDate)
        }
    };

    const formattedDate = moment(date).format('ddd, D [de] MMMM [de] YYYY');

    return (
        <Modal
            transparent={true}
            visible={props.isVisible}
            onRequestClose={props.onCancel}
            animationType="slide"
        >
            <TouchableWithoutFeedback onPress={props.onCancel}>
                <View style={styles.background} />
            </TouchableWithoutFeedback>

            <View style={styles.container}>
                <Text style={styles.header}>Nova anotação</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Informe um Titulo"
                    onChangeText={setTitle}
                    value={title}
                />
                
                <TextInput
                    style={styles.input}
                    placeholder="Informe a Descrição"
                    onChangeText={setDesc}
                    value={desc}
                />

                
                {Platform.OS === 'android' && (
                    <View>
                        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                            <Text style={styles.date}>{formattedDate}</Text>
                        </TouchableOpacity>
                        {showDatePicker && (
                            <DateTimePicker
                                value={date}
                                mode="date"
                                display="spinner"
                                onChange={handleDateChange}
                            />
                        )}
                    </View>
                )}

                
                {Platform.OS === 'ios' && (
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display="spinner"
                        onChange={handleDateChange}
                        style={{ marginTop: 10 }}
                    />
                )}

                <View style={styles.buttons}>
                    <TouchableOpacity onPress={props.onCancel}>
                        <Text style={styles.button}>Cancelar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => props.onSave({ desc, date })}>
                        <Text style={styles.button}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableWithoutFeedback onPress={props.onCancel}>
                <View style={styles.background} />
            </TouchableWithoutFeedback>
        </Modal>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
    container: {
        backgroundColor: "#fff",
        flex: 1,
    },
    header: {
        backgroundColor: "blue",
        color: commonStyles.colors.secondary,
        textAlign: "center",
        padding: 15,
        fontSize: 18,
    },
    input: {
        height: 40,
        margin: 15,
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: "blue",
        borderRadius: 6,
    },
    date: {
        fontSize: 18,
        marginLeft: 15,
        marginTop: 10,
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    button: {
        margin: 20,
        marginRight: 30,
        color: "blue",
    },
});


